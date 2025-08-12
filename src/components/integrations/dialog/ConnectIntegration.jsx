import { useEffect, useState } from "react";
import { uploadImage } from "../../../services/uploadImageService";
import { DialogForm } from "./form";
import { DialogGuide } from "./guide";
import * as getIntegrations from "../../../services/integrations/getIntegrations";
import * as createIntegrations from "../../../services/integrations/createIntegrations";
import { dropiGetWebhook } from "../../../services/integrations/dropi";
import { getCurrentWorkspace } from "../../../utils/workspace/workspaceStorage";

export const ConnectIntegration = ({
  isOpen,
  onClose,
  integration,
  onConnect,
}) => {
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState("");

  const integrationFields = {
    backblaze: [
      {
        name: "applicationKeyId",
        label: "Application Key ID",
        type: "text",
        placeholder: "Ingresa tu Application Key ID",
        required: true,
      },
      {
        name: "applicationKey",
        label: "Application Key",
        type: "password",
        placeholder: "Ingresa tu Application Key",
        required: true,
      },
    ],
    dropi: [
      {
        name: "webhook",
        label: "Webhook",
        type: "copyText",
        description:
          'Copia este webhook y pégalo dentro de tu cuenta de dropi en la sección de "mis integraciones" para obtener tu apikey.',
        getTextFunction: dropiGetWebhook,
      },
      {
        name: "apiKey",
        label: "API Key de Dropi",
        type: "text",
        placeholder: "Ingresa tu API Key de Dropi",
        required: true,
      },
      {
        name: "url",
        label: "País",
        placeholder: "Selecciona un país",
        required: true,
        type: "select",
        options: [
          { key: "https://api.dropi.co", value: "Colombia" },
          { key: "https://api.dropi.cl", value: "Chile" },
          { key: "https://api.dropi.mx", value: "México" },
          { key: "https://api.dropi.ec", value: "Ecuador" },
          { key: "https://api.dropi.pe", value: "Perú" },
          { key: "https://api.dropi.py", value: "Paraguay" },
          { key: "https://api.dropi.pa", value: "Panamá" },
        ],
      },
    ],
    openai: [
      {
        name: "apiKey",
        label: "API Key de OpenAI",
        type: "text",
        placeholder: "sk-...",
        required: true,
      },
    ],
    shopify: [
      {
        name: "url",
        label: "URL de la tienda",
        type: "url",
        placeholder: "https://tu-tienda.myshopify.com",
        required: true,
      },
      {
        name: "token",
        label: "Access Token",
        type: "password",
        placeholder: "Ingresa tu Access Token",
        required: true,
      },
      {
        name: "apiKey",
        label: "API Key",
        type: "text",
        placeholder: "Ingresa tu API Key de Shopify",
        required: true,
      },
    ],
    googlesheets: [
      {
        name: "serviceAccountEmail",
        label: "Service Account Email",
        type: "email",
        placeholder: "ejemplo@proyecto.iam.gserviceaccount.com",
        required: true,
      },
      {
        name: "privateKey",
        label: "Private Key",
        type: "textarea",
        placeholder: "Pega aquí tu clave privada JSON",
        required: true,
      },
    ],
    metaConversionsApi: [
      {
        name: "token",
        label: "Token de acceso",
        type: "textarea",
        placeholder: "Ingresa tu token de acceso de Meta",
        required: true,
      },
      {
        name: "datasetId",
        label: "Dataset ID",
        type: "textarea",
        placeholder: "Ingresa tu Dataset ID",
        required: true,
      },
    ],
  };

  const workspaceId = getCurrentWorkspace();

  const integrationGuide = {
    metaAudience: {
      video: {
        href: "/integraciones/#",
      },
      steps: [
        {
          title: 'Ingresa a la integración de "facebook ads"',
          button: {
            href: `https://chateapro.app/settings/accounts/${workspaceId}#/integration/facebook-ads`,
            text: "Ir a Facebook Ads",
          },
        },
        {
          title: 'Presiona "conectar" y selecciona la cuenta correspondiente',
        },
        {
          title: 'Presiona "sincronizar"',
        },
      ],
    },
    facebook: {
      video: {
        href: "/integraciones/#",
      },
      steps: [
        {
          title: 'Ingresa a la integración de "facebook"',
          button: {
            href: `https://chateapro.app/settings/accounts/${workspaceId}#/facebook`,
            text: "Ir a Facebook",
          },
        },
        {
          title: 'Presiona "conectar" y selecciona la cuenta correspondiente',
        },
        {
          title: 'Presiona "sincronizar" y enlaza la página al bot que desees',
        },
      ],
    },
    whatsappApi: {
      video: {
        href: "/integraciones/#",
      },
      steps: [
        {
          title: 'Ingresa a la integración de "facebook"',
          button: {
            href: `https://chateapro.app/settings/accounts/${workspaceId}#/whatsapp-cloud`,
            text: "Ir a Facebook",
          },
        },
        {
          title: 'Presiona "conectar" y selecciona la cuenta correspondiente',
        },
        {
          title: 'Presiona "sincronizar" y enlaza la página al bot que desees',
        },
      ],
    },
  };

  const fields =
    integrationFields[integration?.id] || integrationGuide[integration?.id];

  const handleInputChange = (fieldName, value) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
    if (error) setError("");
  };

  const validateForm = () => {
    for (const field of fields) {
      if (
        field.required &&
        (!formData[field.name] || formData[field.name].trim() === "")
      ) {
        setError(`El campo "${field.label}" es requerido`);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setShowConfirmation(true);
  };

  const handleConfirmedConnect = async () => {
    setIsLoading(true);
    setShowConfirmation(false);

    try {
      let result;

      if (integration.id === "backblaze") {
        result = await uploadImage.authorize(
          formData.applicationKeyId,
          formData.applicationKey
        );
      } else {
        const createFunction =
          createIntegrations[`${integration.id}CreateIntegrations`];
        const response = await createFunction(formData);

        if (response.status !== "ok") {
          throw new Error(
            "Error al conectar la integración. Por favor, revisa tus credentiales."
          );
        }
        result = { success: true, message: "Conexión exitosa" };
      }

      console.log("✅ Integración conectada exitosamente:", result);
      onConnect(integration.id, formData);
      setFormData({});
      onClose();
    } catch (error) {
      console.error("Error connecting integration:", error);
      setError(
        error.message ||
          "Error al conectar la integración. Por favor, verifica tus credenciales."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelConfirmation = () => {
    setShowConfirmation(false);
  };

  const handleClose = () => {
    setFormData({});
    setError("");
    setShowConfirmation(false);
    onClose();
  };

  if (!isOpen || !integration) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-500 to-blue-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`
                w-12 h-12 rounded-xl flex items-center justify-center text-xl
                ${integration.iconBg} ${integration.iconColor} ${integration.iconBorder} border-2
                bg-white
              `}
              >
                {integration.icon}
              </div>
              <div>
                <h2 className="text-xl font-bold">
                  Conectar {integration.name}
                </h2>
                <p className="text-sky-100 text-sm">Configura tu integración</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Confirmation Modal */}
        {showConfirmation && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
            <div className="bg-white rounded-xl p-6 m-4 max-w-sm w-full">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-amber-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-amber-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  ¿Confirmar conexión?
                </h3>
                <p className="text-sm text-gray-600 mb-6">
                  ¿Estás seguro de que deseas conectar {integration.name} con
                  las credenciales proporcionadas? Esta acción verificará tus
                  credenciales con el servicio externo.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={handleCancelConfirmation}
                    className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleConfirmedConnect}
                    className="flex-1 px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg font-medium transition-colors"
                  >
                    Sí, conectar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <div className="p-6">
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-red-500 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          )}

          {integration.type === "form" && !!fields && (
            <DialogForm
              fields={fields}
              formData={formData}
              handleClose={handleClose}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              isLoading={isLoading}
            />
          )}

          {integration.type === "guide" && !!fields && (
            <DialogGuide
              steps={fields.steps}
              video={fields.video}
              handleClose={handleClose}
            />
          )}
        </div>
      </div>
    </div>
  );
};
