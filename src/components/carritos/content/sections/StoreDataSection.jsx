import { useCarritos } from "../../../../context/CarritosContext";
import Tooltip from "./Tooltip";

const StoreDataSection = () => {
  const { carritoData, updateCarritoData } = useCarritos();

  const countries = [
    { value: "", label: "Selecciona un país" },
    { value: "colombia", label: "Colombia" },
    { value: "mexico", label: "México" },
    { value: "chile", label: "Chile" },
    { value: "ecuador", label: "Ecuador" },
    { value: "peru", label: "Perú" },
    { value: "paraguay", label: "Paraguay" },
    { value: "panama", label: "Panamá" },
  ];

  const handleInputChange = (field, value) => {
    updateCarritoData("datos_tienda", {
      [field]: value,
    });
  };

  const ToggleSwitch = ({ checked, onChange }) => (
    <div className="mt-2">
      <label className="inline-block w-14 h-8 rounded-full relative cursor-pointer transition-all duration-300">
        <input
          type="checkbox"
          className="hidden"
          checked={checked}
          onChange={onChange}
        />
        <div
          className={`absolute inset-0 rounded-full transition-all duration-300 ${
            checked ? "bg-sky-500" : "bg-slate-300"
          }`}
        ></div>
        <span
          className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-all duration-300 shadow-sm z-10 ${
            checked ? "transform translate-x-6" : ""
          }`}
        ></span>
      </label>
    </div>
  );

  const discountEnabled =
    carritoData.datos_tienda?.ofrecer_descuento === "si" ||
    carritoData.datos_tienda?.ofrecer_descuento === true;

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-xl border border-slate-200 w-full relative z-5">
      <h1 className="text-2xl sm:text-3xl md:text-4xl mb-8 sm:mb-10 md:mb-12 text-sky-500 font-bold tracking-tight">
        Datos de la tienda
      </h1>

      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-3 mb-3">
          <label className="block font-semibold text-slate-700 text-base tracking-tight">
            Nombre de la tienda
          </label>
          <Tooltip content="Nombre con el que el asistente debe referirse a tu tienda durante la conversación para reforzar la identidad de marca" />
        </div>
        <input
          type="text"
          className="w-full p-3 sm:p-4 border-2 border-slate-200 rounded-xl text-sm sm:text-base transition-all duration-200 bg-white text-slate-700 font-inherit focus:outline-none focus:border-sky-500 focus:shadow-lg focus:shadow-sky-500/10 placeholder-slate-400"
          placeholder="Ingresa el nombre de la tienda"
          value={carritoData.datos_tienda?.nombre_tienda || ""}
          onChange={(e) => handleInputChange("nombre_tienda", e.target.value)}
        />
      </div>

      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-3 mb-3">
          <label className="block font-semibold text-slate-700 text-base tracking-tight">
            Ubicación de la tienda
          </label>
          <Tooltip content="Ciudad o zona desde la cual se despachan los pedidos, usada para contextualizar tiempos de entrega y generar cercanía con el cliente" />
        </div>
        <input
          type="text"
          className="w-full p-3 sm:p-4 border-2 border-slate-200 rounded-xl text-sm sm:text-base transition-all duration-200 bg-white text-slate-700 font-inherit focus:outline-none focus:border-sky-500 focus:shadow-lg focus:shadow-sky-500/10 placeholder-slate-400"
          placeholder="somos una tienda virtual de la más alta calidad con cobertura nacional"
          value={carritoData.datos_tienda?.ubicacion_tienda || ""}
          onChange={(e) =>
            handleInputChange("ubicacion_tienda", e.target.value)
          }
        />
      </div>

      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-3 mb-3">
          <label className="block font-semibold text-slate-700 text-base tracking-tight">
            País
          </label>
          <Tooltip content="País desde el que opera la tienda" />
        </div>
        <select
          className="w-full p-3 sm:p-4 border-2 border-slate-200 rounded-xl text-sm sm:text-base transition-all duration-200 bg-white text-slate-700 font-inherit focus:outline-none focus:border-sky-500 focus:shadow-lg focus:shadow-sky-500/10"
          value={carritoData.datos_tienda?.pais || ""}
          onChange={(e) => handleInputChange("pais", e.target.value)}
        >
          {countries.map((country) => (
            <option key={country.value} value={country.value}>
              {country.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-3 mb-3">
          <label className="block font-semibold text-slate-700 text-base tracking-tight">
            Descuentos
          </label>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 p-4 sm:p-6 lg:p-8 bg-white border border-slate-200 rounded-2xl items-start shadow-lg mt-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-2">
              <label className="block font-semibold text-slate-700 text-sm tracking-tight">
                Ofrecer descuentos
              </label>
            </div>
            <ToggleSwitch
              checked={discountEnabled}
              onChange={(e) =>
                handleInputChange(
                  "ofrecer_descuento",
                  e.target.checked ? "si" : "no"
                )
              }
            />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-2">
              <label className="block font-semibold text-slate-700 text-sm tracking-tight">
                Descuento máximo
              </label>
              <Tooltip content="Porcentaje máximo de descuento que el asistente puede ofrecer en caso de que el cliente dude o quiera cancelar el pedido" />
            </div>
            <div
              className={`flex items-center relative max-w-35 ${
                !discountEnabled ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              <input
                type="number"
                className="w-20 sm:w-25 p-3 sm:p-4 border-2 border-slate-200 border-r-0 rounded-l-xl text-center font-semibold text-sm sm:text-base bg-white text-slate-700 focus:outline-none focus:border-sky-500 focus:shadow-lg focus:shadow-sky-500/10"
                min="0"
                max="100"
                value={carritoData.datos_tienda?.descuento_maximo || ""}
                onChange={(e) =>
                  handleInputChange(
                    "descuento_maximo",
                    parseInt(e.target.value) || 0
                  )
                }
              />
              <span className="bg-slate-100 border-2 border-slate-200 border-l-0 p-3 sm:p-4 rounded-r-xl text-slate-500 font-semibold text-sm sm:text-base">
                %
              </span>
            </div>
          </div>

          <div className="flex flex-col lg:col-span-1 col-span-1">
            <div className="flex items-center gap-3 mb-2">
              <label className="block font-semibold text-slate-700 text-sm tracking-tight">
                Mensaje de descuento
              </label>
              <Tooltip content="Solo puedes modificar la parte inicial del mensaje. La parte final debe permanecer así para que la IA mantenga su lógica interna" />
            </div>
            <div
              className={`mt-2 border-2 border-slate-200 rounded-xl overflow-hidden bg-white ${
                !discountEnabled ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              <textarea
                className="w-full p-3 sm:p-4 border-none resize-vertical min-h-15 text-xs sm:text-sm font-inherit bg-white focus:outline-none focus:bg-amber-50"
                rows="2"
                placeholder="Espera... nuestro gerente nos acaba de recordar que podrías ser nuestro cliente número 1000 😍."
                value={carritoData.datos_tienda?.mensaje_descuento || ""}
                onChange={(e) =>
                  handleInputChange("mensaje_descuento", e.target.value)
                }
              />
              <div className="p-3 sm:p-4 bg-slate-100 text-slate-500 text-xs sm:text-sm leading-relaxed border-t border-dashed border-slate-300 italic">
                Si aún te interesa, estamos autorizados para ofrecerte un
                descuento del (Porcentaje máximo de descuento), por lo que
                podrías disfrutar de (Producto/s) por tan solo (Nuevo precio con
                descuento) 🥳. ¿Te perderás esta oportunidad?
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreDataSection;
