import { useEffect, useState } from "react";
import { uploadImage } from "../../../services/uploadImageService";
import { DialogForm } from "./form";
import { DialogGuide } from "./guide";
import * as getIntegrations from "../../../services/integrations/getIntegrations";
import * as createIntegrations from "../../../services/integrations/createIntegrations";
import { dropiGetWebhook } from "../../../services/integrations/dropi";
import { getCurrentWorkspace } from "../../../utils/workspace/workspaceStorage";
import { showSuccessToast } from "../../../utils/toastNotifications";
import camelize from "camelize";

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

<<<<<<< HEAD
=======
  useEffect(() => {
    if (Object.entries(formData).length === 0 && !!integration) {
      const getFunctionAsync =
        getIntegrations[`${integration.id}GetCredentials`];

      if (!getFunctionAsync) return;

      getFunctionAsync().then((data) => {
        setFormData((prev) => ({
          ...prev,
          ...camelize(data),
        }));
      });
    }
  }, [formData, integration]);

>>>>>>> 935b39b55696da4bbf4562102cc94aefb45eed68
  const integrationFields = {
    dropi: [
      {
        name: 'apiToken',
        label: 'Token de Dropi',
        type: 'password',
        placeholder: 'Ingresa tu token de Dropi',
        required: true
      }
    ],
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
    metaConversionsApi: [
      {
        name: "token",
        label: "Token de acceso",
        type: "textarea",
        placeholder: "Ingresa tu token de acceso de Meta",
        required: true,
      },
      {
<<<<<<< HEAD
        name: 'privateKey',
        label: 'Private Key',
        type: 'textarea',
        placeholder: 'Pega aquí tu clave privada JSON',
        required: true
      }
    ],
    openai: [
      {
        name: 'apiKey',
        label: 'API Key de OpenAI',
        type: 'password',
        placeholder: 'sk-...',
        required: true
      }
    ]
=======
        name: "datasetId",
        label: "Dataset ID",
        type: "textarea",
        placeholder: "Ingresa tu Dataset ID",
        required: true,
      },
    ],
>>>>>>> 935b39b55696da4bbf4562102cc94aefb45eed68
  };

  const workspaceId = getCurrentWorkspace();

  const integrationGuide = {
    googleSheets: {
      video: {
        href: "/integraciones/#",
      },
      steps: [
        {
          title: 'Ingresa a la integración de "Google Sheets"',
          button: {
            href: `https://chateapro.app/settings/accounts/${workspaceId}#/integration/sheet`,
            text: "Ir a Google Sheets",
          },
        },
        {
          title: 'Presiona "Conectar" y selecciona tu cuenta de Google',
          description:
            "Se abrirá una ventana para autenticarte con tu cuenta de Google",
        },
        {
          title:
            'Selecciona "Agregar hoja" y selecciona la sheet que deseas conectar',
          description:
            "Elige la hoja de cálculo específica que quieres vincular a Chatea PRO",
        },
      ],
    },
    metaAudience: {
      video: {
        href: "/integraciones/#",
      },
      steps: [
        {
          title: 'Ingresa a la integración de "Facebook Ads"',
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
          title: 'Ingresa a la integración de "Facebook"',
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
          title: 'Ingresa a la integración de "Facebook"',
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
    googleMaps: {
      video: {
        href: "/integraciones/#",
      },
      steps: [
        {
          title: 'Ingresa a la integración de "Google Maps"',
          button: {
            href: `https://chateapro.app/settings/accounts/${workspaceId}#/google_map`,
            text: "Ir a Google Maps",
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

    // Validaciones específicas
    if (integration?.id === 'dropi') {
      const token = formData.apiToken;
      if (token && token.length < 10) {
        setError('El token debe tener al menos 10 caracteres');
        return false;
      }
    }

    if (integration?.id === 'shopify') {
      const shopUrl = formData.shopUrl;
      if (shopUrl && !shopUrl.includes('.myshopify.com')) {
        setError('La URL debe ser una URL válida de Shopify (.myshopify.com)');
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
<<<<<<< HEAD
      
      switch (integration.id) {
        case 'dropi':
          result = await verifyDropiToken(formData.apiToken);
          break;
        
        case 'backblaze':
          result = await uploadImage.authorize(
            formData.applicationKeyId,
            formData.applicationKey
          );
          break;
        
        case 'openai':
          result = await verifyOpenAIKey(formData.apiKey);
          break;
        
        default:
          await new Promise(resolve => setTimeout(resolve, 2000));
          result = { success: true, message: 'Conexión exitosa' };
=======

      if (integration.id === "backblaze") {
        result = await uploadImage.authorize(
          formData.applicationKeyId,
          formData.applicationKey
        );
      } else {
        const createFunction =
          createIntegrations[`${integration.id}CreateIntegrations`];
        const response = await createFunction(formData);

        if (response.status !== "verified") {
          throw new Error(
            "Error al conectar la integración. Por favor, revisa tus credentiales."
          );
        }
        result = { success: true, message: "Conexión exitosa" };
>>>>>>> 935b39b55696da4bbf4562102cc94aefb45eed68
      }

      console.log("✅ Integración conectada exitosamente:", result);
      showSuccessToast("¡Integración conectada exitosamente!");
      onConnect(integration.id, formData);
      setFormData({});
      onClose();
    } catch (error) {
      console.error("Error connecting integration:", error);
      if (error.status === 500) {
        setError(
          "Ocurrió un error en la comunicación con el servidor. Por favor intente nuevamente más tarde."
        );
      } else {
        setError(
          error.message ||
            "Error al conectar la integración. Por favor, verifica tus credenciales."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Función para verificar el token de Dropi
  const verifyDropiToken = async (token) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Validación básica del token
    if (token.length < 10) {
      throw new Error('Token de Dropi inválido');
    }
    
    return {
      success: true,
      message: 'Conectado exitosamente con Dropi'
    };
  };

  // Función para verificar la API key de OpenAI
  const verifyOpenAIKey = async (apiKey) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (!apiKey.startsWith('sk-')) {
      throw new Error('API Key de OpenAI inválida. Debe comenzar con "sk-"');
    }
    
    return {
      success: true,
      message: 'Conexión con OpenAI verificada'
    };
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

        <div className="p-6">
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

<<<<<<< HEAD
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {fields.map((field) => (
                <div key={field.name} className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  
                  {field.type === 'textarea' ? (
                    <textarea
                      value={formData[field.name] || ''}
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                      placeholder={field.placeholder}
                      required={field.required}
                      rows={4}
                      disabled={isLoading}
                      autoComplete="off"
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all resize-none disabled:bg-gray-50 disabled:cursor-not-allowed"
                    />
                  ) : field.type === 'select' ? (
                    <select
                      value={formData[field.name] || ''}
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                      required={field.required}
                      disabled={isLoading}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
                    >
                      <option value="">Selecciona una opción</option>
                      {field.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      value={formData[field.name] || ''}
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                      placeholder={field.placeholder}
                      required={field.required}
                      disabled={isLoading}
                      autoComplete={field.type === 'password' ? 'new-password' : 'off'}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="flex gap-3 mt-6 pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Conectando...
                  </>
                ) : (
                  'Conectar'
                )}
              </button>
            </div>
          </form>
=======
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
>>>>>>> 935b39b55696da4bbf4562102cc94aefb45eed68
        </div>
      </div>
    </div>
  );
};
