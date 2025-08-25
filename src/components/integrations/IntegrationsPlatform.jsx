import { useEffect, useState } from "react";
import { ConnectIntegration } from "./dialog/ConnectIntegration";
import * as deleteIntegrations from "../../services/integrations/deleteIntegrations";
import { ToastContainer } from "react-toastify";
import { getInstalledIntegrations } from "../../services/integrations/getIntegrations";
import audiencias from "../../assets/integrationIcons/Logo_Audiencias.png";
import openIa from "../../assets/integrationIcons/Logo_Chat GPT.png";
import dropi from "../../assets/integrationIcons/Logo_Dropi.png";
import faceInsta from "../../assets/integrationIcons/Logo_Facebook Instagram.png";
import maps from "../../assets/integrationIcons/Logo_Google Maps.png";
import meta from "../../assets/integrationIcons/Logo_Meta.png";
import sheets from "../../assets/integrationIcons/Logo_Sheets.png";
import shopify from "../../assets/integrationIcons/Logo_Shopify.png";
import wpp from "../../assets/integrationIcons/Logo_Whatsapp.png";
import backblaze from "../../assets/integrationIcons/backblaze.png";
//import { uploadImage } from './uploadImageService';

export const IntegrationsPlatform = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState(null);
  const [connectedIntegrations, setConnectedIntegrations] = useState({});

  useEffect(() => {
    if (Object.entries(connectedIntegrations).length === 0) {
      getInstalledIntegrations().then(({ data }) => {
        console.info("[Integrations] Datos de integración obtenidos");
        console.info(data);
        if (!!data && Object.entries(data).length !== 0) {
          setConnectedIntegrations((prev) => ({ ...prev, ...data }));
        }
      });
    }
  }, [connectedIntegrations]);

  const integrations = [
    {
      id: "dropi",
      name: "Dropi",
      description:
        "Conecta con la plataforma logística para gestión de pedidos",
      icon: <img src={dropi} />,
      connected: connectedIntegrations.dropi,
      type: "form",
      iconBg: "bg-blue-50",
      iconColor: "text-blue-500",
      iconBorder: "border-blue-300",
    },
    {
      id: "openai",
      name: "OpenAI",
      description:
        "Potencia tus asistentes con inteligencia artificial avanzada",
      icon: <img src={openIa} />,
      connected: connectedIntegrations.openai,
      type: "form",
      iconBg: "bg-green-50",
      iconColor: "text-green-500",
      iconBorder: "border-green-300",
    },
    {
      id: "shopify",
      name: "Shopify",
      description: "Sincroniza tu tienda online con los asistentes de venta",
      icon: <img src={shopify} />,
      connected: connectedIntegrations.shopify,
      type: "form",
      iconBg: "bg-yellow-50",
      iconColor: "text-yellow-500",
      iconBorder: "border-yellow-300",
    },
    {
      id: "googleSheets",
      name: "Google Sheets",
      description:
        "Exporta y gestiona datos de tus asistentes en hojas de cálculo",
      icon: <img src={sheets} />,
      connected: false,
      type: "guide",
      iconBg: "bg-red-50",
      iconColor: "text-red-500",
      iconBorder: "border-red-300",
    },
    {
      id: "backblaze",
      name: "Backblaze B2",
      description:
        "Almacenamiento en la nube para archivos y respaldos de conversaciones",
      icon: <img src={backblaze} />,
      connected: true,
      type: "form",
      iconBg: "bg-purple-50",
      iconColor: "text-purple-500",
      iconBorder: "border-purple-300",
    },
    {
      id: "metaConversionsApi",
      name: "Meta Conversions API",
      description:
        "Optimiza tus campañas publicitarias con datos de conversión precisos",
      icon: <img src={meta} />,
      connected: connectedIntegrations.metaConversionsApi,
      type: "form",
      iconBg: "bg-blue-50",
      iconColor: "text-blue-500",
      iconBorder: "border-blue-300",
    },
    {
      id: "metaAudience",
      name: "Audiencias de Meta",
      description:
        "Sincroniza y gestiona audiencias personalizadas para tus campañas",
      icon: <img src={audiencias} />,
      connected: false,
      type: "guide",
      iconBg: "bg-blue-50",
      iconColor: "text-blue-500",
      iconBorder: "border-blue-300",
    },
    {
      id: "facebook",
      name: "Facebook e Instagram",
      description: "Conecta tus páginas de Facebook e Instagram con tus bots",
      icon: <img src={faceInsta} />,
      connected: false,
      type: "guide",
      iconBg: "bg-blue-50",
      iconColor: "text-blue-500",
      iconBorder: "border-blue-300",
    },
    {
      id: "whatsappApi",
      name: "WhatsApp API",
      description: "Integra WhatsApp Business API con tus asistentes virtuales",
      icon: <img src={wpp} />,
      connected: false,
      type: "guide",
      iconBg: "bg-green-50",
      iconColor: "text-green-500",
      iconBorder: "border-green-300",
    },
    {
      id: "googleMaps",
      name: "Google Maps",
      description:
        "Integra servicios de geolocalización y mapas en tus asistentes",
      icon: <img src={maps} />,
      connected: false,
      type: "guide",
      iconBg: "bg-red-50",
      iconColor: "text-red-500",
      iconBorder: "border-red-300",
    },
  ];

  const integrationsWithStatus = integrations.map((integration) => ({
    ...integration,
    connected: connectedIntegrations[integration.id],
  }));

  const handleConnectClick = (integration) => {
    setSelectedIntegration(integration);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedIntegration(null);
  };

  const handleConnect = (integrationId, formData) => {
    setConnectedIntegrations((prev) => ({
      ...prev,
      [integrationId]: true,
    }));
    console.log(`Integración ${integrationId} conectada con datos:`, formData);
  };

  const handleDisconnect = async (integrationId) => {
    try {
      const response = await deleteIntegrations[
        `${integrationId}DeleteIntegration`
      ]();

      if (response !== "ok") {
        throw new Error("Error al intentar desconectar la integración.");
      }

      setConnectedIntegrations((prev) => ({
        ...prev,
        [integrationId]: false,
      }));
      console.log(`Integración ${integrationId} desconectada`);
    } catch (error) {
      console.error("Error disconnecting integration:", error);
    }
  };

  return (
    <>
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-sky-500 mb-12 text-center">
            Integraciones de Chatea PRO
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {integrationsWithStatus.map((integration) => (
              <div
                key={integration.id}
                className={`
                  bg-white rounded-3xl border-2 shadow-lg transition-all duration-300 
                  hover:-translate-y-1 hover:shadow-xl flex flex-col overflow-hidden relative
                  ${
                    integration.connected
                      ? "border-green-500 bg-green-50"
                      : "border-slate-200"
                  }
                `}
              >
                {/* Status Badge */}
                <div
                  className={`
                  absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full text-xs font-semibold 
                  flex items-center gap-1.5
                  ${
                    integration.connected
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-100 text-gray-500"
                  }
                `}
                >
                  <span
                    className={`
                    w-2 h-2 rounded-full
                    ${integration.connected ? "bg-green-600" : "bg-gray-500"}
                  `}
                  ></span>
                  {integration.connected ? "Conectado" : "Desconectado"}
                </div>

                <div className="h-36 flex justify-center items-center">
                  <div
                    className={`
                    w-16 h-16 rounded-2xl border-2 flex items-center justify-center text-2xl
                    ${integration.iconBg} ${integration.iconColor} ${integration.iconBorder}
                  `}
                  >
                    {integration.icon}
                  </div>
                </div>

                <div className="p-6 text-center flex flex-col gap-3">
                  <h3 className="text-xl font-bold text-slate-700">
                    {integration.name}
                  </h3>
                  <p className="text-sm text-slate-500 mb-4">
                    {integration.description}
                  </p>

                  {integration.connected ? (
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={() => handleConnectClick(integration)}
                        className="
                          bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 
                          rounded-xl font-semibold text-sm transition-all duration-300
                          hover:-translate-y-0.5
                        "
                      >
                        Configurar
                      </button>
                      <button
                        onClick={() => handleDisconnect(integration.id)}
                        className="
                          bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 
                          rounded-xl font-semibold text-sm transition-all duration-300
                          hover:-translate-y-0.5
                        "
                      >
                        Eliminar
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleConnectClick(integration)}
                      className="
                        bg-gradient-to-r from-sky-500 to-blue-600 hover:from-blue-600 hover:to-blue-700
                        text-white px-5 py-2.5 rounded-xl font-semibold text-sm 
                        transition-all duration-300 hover:-translate-y-0.5
                      "
                    >
                      Conectar
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ConnectIntegration
        isOpen={isModalOpen}
        onClose={handleModalClose}
        integration={selectedIntegration}
        onConnect={handleConnect}
      />

      {/* Componente de toast para retroalimentación rápida */}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        progressStyle={{
          backgroundColor: "#e5e7eb",
        }}
        closeButtonStyle={{
          color: "#6b7280",
        }}
      />
    </>
  );
};
