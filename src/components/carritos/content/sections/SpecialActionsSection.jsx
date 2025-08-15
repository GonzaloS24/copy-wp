import { useCarritos } from "../../../../context/CarritosContext";
import Tooltip from "./Tooltip";

const SpecialActionsSection = () => {
  const { carritoData, updateCarritoData } = useCarritos();

  const handleInputChange = (field, value) => {
    updateCarritoData("acciones_especiales", {
      [field]: value,
    });
  };

  const autoUpload = carritoData.acciones_especiales?.subida_automatica;
  const infoSource = carritoData.acciones_especiales?.origen_datos;

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

      <div className="mb-8">
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
      </div>

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
