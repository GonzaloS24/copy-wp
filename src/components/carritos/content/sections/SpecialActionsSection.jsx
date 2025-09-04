import { useCarritos } from "../../../../context/CarritosContext";
import { useState, useEffect } from "react";
import { WebhookService } from "../../../../services/webhooks/webhookService";
import Tooltip from "./Tooltip";

const SpecialActionsSection = () => {
  const { carritoData, updateCarritoData } = useCarritos();
  const [webhook, setWebhook] = useState("");
  const [webhookLoading, setWebhookLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    const fetchWebhook = async () => {
      try {
        setWebhookLoading(true);
        const response = await WebhookService.getWebhooks();
        if (response.success && response.data) {
          setWebhook(response.data);
        }
      } catch (error) {
        console.error("Error obteniendo webhook:", error);
      } finally {
        setWebhookLoading(false);
      }
    };

    fetchWebhook();
  }, []);

  const handleInputChange = (field, value) => {
    updateCarritoData("acciones_especiales", {
      [field]: value,
    });
  };

  const handleCopyWebhook = async () => {
    try {
      await navigator.clipboard.writeText(webhook);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      console.error("Error copiando webhook:", error);
      const textArea = document.createElement("textarea");
      textArea.value = webhook;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const autoUpload = carritoData.acciones_especiales?.subida_automatica;
  // const infoSource = carritoData.acciones_especiales?.origen_datos;

  return (
    <div className="bg-white rounded-2xl p-10 shadow-xl border border-slate-200 w-full relative z-5">
      <h1 className="text-4xl mb-12 text-sky-500 font-bold tracking-tight">
        Acciones especiales
      </h1>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <label className="block font-semibold text-slate-700 text-base tracking-tight">
            Subida automática
          </label>
          <Tooltip content="Permite que el pedido recuperado se suba automáticamente a Shopify sin supervisión humana. Si seleccionas 'No', el carrito se quedará en Chatea PRO para que un asesor verifique los datos y lo suba desde chatea pro." />
        </div>
        <div className="flex gap-10 mt-3">
          <div className="flex items-center gap-3">
            <input
              type="radio"
              id="subida-si"
              name="subida-automatica"
              className="w-5 h-5 border-2 border-slate-300 rounded-full cursor-pointer relative appearance-none transition-all duration-200 bg-white checked:border-sky-500"
              value="si"
              checked={autoUpload === "si"}
              onChange={(e) =>
                handleInputChange("subida_automatica", e.target.value)
              }
            />
            <label
              htmlFor="subida-si"
              className="text-base text-slate-700 cursor-pointer font-medium"
            >
              Sí
            </label>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="radio"
              id="subida-no"
              name="subida-automatica"
              className="w-5 h-5 border-2 border-slate-300 rounded-full cursor-pointer relative appearance-none transition-all duration-200 bg-white checked:border-sky-500"
              value="no"
              checked={autoUpload === "no"}
              onChange={(e) =>
                handleInputChange("subida_automatica", e.target.value)
              }
            />
            <label
              htmlFor="subida-no"
              className="text-base text-slate-700 cursor-pointer font-medium"
            >
              No
            </label>
          </div>
        </div>
      </div>

      {/* sección del Webhook */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <label className="block font-semibold text-slate-700 text-base tracking-tight">
            Webhook para Shopify
          </label>
          <Tooltip content="Copia este webhook y pégalo en tu configuración de Shopify para recibir automáticamente los carritos abandonados en Chatea PRO" />
        </div>
        <p className="text-sm text-slate-600 mb-4">
          Ingresa este webhook en tu Shopify para recibir tus carritos
          abandonados en Chatea PRO
        </p>
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={webhookLoading ? "Cargando webhook..." : webhook}
              readOnly
              className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg bg-slate-50 text-slate-700 font-mono text-sm focus:outline-none focus:border-sky-500 transition-colors duration-200"
              placeholder={
                webhookLoading ? "Cargando..." : "Webhook no disponible"
              }
            />
          </div>
          <button
            onClick={handleCopyWebhook}
            disabled={!webhook || webhookLoading}
            className={`px-6 py-3 rounded-lg font-medium text-sm transition-all duration-200 flex items-center gap-2 min-w-[120px] justify-center ${
              copySuccess
                ? "bg-green-500 text-white"
                : webhook && !webhookLoading
                ? "bg-sky-500 text-white hover:bg-sky-600 active:scale-95"
                : "bg-slate-300 text-slate-500 cursor-not-allowed"
            }`}
          >
            {copySuccess ? (
              <>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Copiado
              </>
            ) : (
              <>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                Copiar
              </>
            )}
          </button>
        </div>
      </div>

      {/* <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <label className="block font-semibold text-slate-700 text-base tracking-tight">
            De dónde obtener la información
          </label>
          <Tooltip content="Selecciona desde qué plataforma quieres que el asistente tome la información del producto. Usa Shopify si tus páginas tienen la descripción completa en texto. Si no, puedes usar el ecommerce de Chatea PRO para ingresar dicha información" />
        </div>
        <div className="flex gap-10 mt-3">
          <div className="flex items-center gap-3">
            <input
              type="radio"
              id="info-chatea"
              name="fuente-informacion"
              className="w-5 h-5 border-2 border-slate-300 rounded-full cursor-pointer relative appearance-none transition-all duration-200 bg-white checked:border-sky-500"
              value="Ecommerce de Chatea PRO"
              checked={infoSource === "Ecommerce de Chatea PRO"}
              onChange={(e) =>
                handleInputChange("origen_datos", e.target.value)
              }
            />
            <label
              htmlFor="info-chatea"
              className="text-base text-slate-700 cursor-pointer font-medium"
            >
              Ecommerce de Chatea PRO
            </label>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="radio"
              id="info-shopify"
              name="fuente-informacion"
              className="w-5 h-5 border-2 border-slate-300 rounded-full cursor-pointer relative appearance-none transition-all duration-200 bg-white checked:border-sky-500"
              value="Shopify"
              checked={infoSource === "Shopify"}
              onChange={(e) =>
                handleInputChange("origen_datos", e.target.value)
              }
            />
            <label
              htmlFor="info-shopify"
              className="text-base text-slate-700 cursor-pointer font-medium"
            >
              Shopify
            </label>
          </div>
        </div>
      </div> */}

      <style jsx>{`
        input[type="radio"]:checked::after {
          content: "";
          width: 10px;
          height: 10px;
          background: #0ea5e9;
          border-radius: 50%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      `}</style>
    </div>
  );
};

export default SpecialActionsSection;
