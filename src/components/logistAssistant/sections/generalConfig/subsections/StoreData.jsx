import { TooltipIcon } from "../../../generalComponents/TooltipIcon";
import { Card } from "../../../generalComponents/Card";
import { storeDataInitialValues } from "../../../../../utils/logistAssistant/initialValues/generalConfig";

const availableCountries = [
  { key: "colombia", value: "Colombia" },
  { key: "chile", value: "Chile" },
  { key: "mexico", value: "México" },
  { key: "ecuador", value: "Ecuador" },
  { key: "peru", value: "Perú" },
  { key: "paraguay", value: "Paraguay" },
  { key: "panama", value: "Panama" },
];

export const StoreData = ({ formData, setFormData }) => {
  const handleInputChange = ({ target }) => {
    setFormData((prev) => ({
      ...prev,
      storeData: {
        ...prev.storeData,
        [target.id]: target.value,
      },
    }));
  };

  return (
    <div className="flex flex-col flex-1">
      <h2 className="text-3xl font-bold text-sky-500 mb-4 tracking-tight">
        🏪 Datos de la Tienda
      </h2>
      <p className="text-base text-slate-500 mb-8 leading-relaxed">
        Configura la información básica que la IA utilizará para personalizar
        los mensajes automáticos
      </p>

      {/* Selección del país de la tienda */}
      <Card mb="8" shadow="sm">
        <h3 className="text-lg font-semibold text-sky-500 mb-6">
          Selecciona el país donde trabaja tu tienda
        </h3>

        <div className="mb-5">
          <div className="flex items-center gap-2 mb-2">
            <label className="font-medium text-slate-700 text-sm">
              País <span className="text-red-500 font-bold">*</span>
            </label>
            {/* <TooltipIcon
              tooltipId="storeCountry"
              content="Indica"
            /> */}
          </div>
          <select
            id="storeCountry"
            className="w-full p-3.5 border border-gray-300 rounded-xl text-sm transition-all duration-200 bg-white text-slate-700 font-inherit leading-relaxed focus:outline-none focus:border-sky-500 focus:shadow-sky-100 focus:shadow-lg"
            onChange={handleInputChange}
          >
            <option value="">Selecciona el país</option>
            {availableCountries.map((country) => (
              <option key={country.key} value={country.key}>
                {country.value}
              </option>
            ))}
          </select>
        </div>
      </Card>

      {/* Nombre de la tienda */}
      <Card mb="8" shadow="sm">
        <h3 className="text-lg font-semibold text-sky-500 mb-6">
          Nombre de la tienda
        </h3>

        <div className="mb-5">
          <label className="block mb-2 font-medium text-slate-700 text-sm">
            Nombre de la tienda{" "}
            <span className="text-red-500 font-bold">*</span>
          </label>
          <input
            id="storeName"
            type="text"
            className="w-full p-3.5 border border-gray-300 rounded-xl text-sm transition-all duration-200 bg-white text-slate-700 font-inherit leading-relaxed focus:outline-none focus:border-sky-500 focus:shadow-sky-100 focus:shadow-lg placeholder:text-slate-400 placeholder:text-sm"
            value={formData.storeData.storeName}
            placeholder="Ej. Moda Urbana Colombia"
            onChange={handleInputChange}
          />
        </div>
      </Card>

      {/* Datos adicionales */}
      <Card mb="8" shadow="sm">
        <h3 className="text-lg font-semibold text-sky-500 mb-6">
          Datos adicionales
        </h3>

        <div className="mb-5">
          <div className="flex items-center gap-2 mb-2">
            <label className="font-medium text-slate-700 text-sm">
              Enlace de la tienda{" "}
              <span className="text-red-500 font-bold">*</span>
            </label>
            <TooltipIcon
              tooltipId="storeLink"
              content="Indica que el enlace de tu página web. En caso de no tenerla, podrías agregar cualquier otro enlace en el que el cliente pueda conocer más información sobre tu tienda. Si prefieres, lo puedes dejar en blanco. La IA usará esta información para redireccionar a tus clientes hacia ver tus otros productos"
            />
          </div>
          <input
            id="storeLink"
            type="url"
            className="w-full p-3.5 border border-gray-300 rounded-xl text-sm transition-all duration-200 bg-white text-slate-700 font-inherit leading-relaxed focus:outline-none focus:border-sky-500 focus:shadow-sky-100 focus:shadow-lg placeholder:text-slate-400 placeholder:text-sm"
            value={formData.storeData.storeLink}
            placeholder="https://mitienda.com"
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-5">
          <div className="flex items-center gap-2 mb-2">
            <label className="font-medium text-slate-700 text-sm">
              Ubicación de la tienda{" "}
              <span className="text-red-500 font-bold">*</span>
            </label>
            <TooltipIcon
              tooltipId="storeLocation"
              content="En caso de tener un local físico, puedes indicarle a la IA la dirección para que esta se la pueda dar a tus clientes. En caso de no tener, podrías indicar que es una tienda virtual con algunos detalles adicionales que eleven la confianza del cliente"
            />
          </div>
          <textarea
            id="storeLocation"
            className="w-full p-3.5 border border-gray-300 rounded-xl text-sm transition-all duration-200 bg-white text-slate-700 font-inherit leading-relaxed resize-y focus:outline-none focus:border-sky-500 focus:shadow-sky-100 focus:shadow-lg placeholder:text-slate-400 placeholder:text-sm"
            rows="4"
            value={formData.storeData.storeLocation}
            placeholder={`Ej. ${storeDataInitialValues.storeLocation}`}
            onChange={handleInputChange}
          />
        </div>
      </Card>

      {/* Manejo de garantías */}
      <Card mb="8" shadow="sm">
        <h3 className="text-lg font-semibold text-sky-500 mb-6">
          Manejo de garantías
        </h3>

        <div className="mb-5">
          <div className="flex items-center gap-2 mb-2">
            <label className="font-medium text-slate-700 text-sm">
              Políticas de garantía
            </label>
            <TooltipIcon
              tooltipId="warrantyPolicies"
              content="Ingresa las políticas de garantía de tu tienda a nivel general. La IA utilizará esta información para indicarle a tus clientes cómo se manejan las garantía en caso de que los clientes manifiesten inquietudes sobre el tema"
            />
          </div>
          <textarea
            id="warrantyPolicies"
            className="w-full p-3.5 border border-gray-300 rounded-xl text-sm transition-all duration-200 bg-white text-slate-700 font-inherit leading-relaxed resize-y focus:outline-none focus:border-sky-500 focus:shadow-sky-100 focus:shadow-lg placeholder:text-slate-400 placeholder:text-sm"
            rows="4"
            value={formData.storeData.warrantyPolicies}
            placeholder={`Ej. ${storeDataInitialValues.warrantyPolicies}...`}
            onChange={handleInputChange}
          />
        </div>
      </Card>

      {/* Obtención de los datos del pedido */}
      <Card mb="8" shadow="sm">
        <h3 className="text-lg font-semibold text-sky-500 mb-6">
          Obtención de los datos del pedido
        </h3>

        <div className="mb-5">
          <div className="flex items-center gap-2 mb-2">
            <label className="font-medium text-slate-700 text-sm">
              Origen de los datos del pedido{" "}
              <span className="text-red-500 font-bold">*</span>
            </label>
            <TooltipIcon
              tooltipId="dataSource"
              content="Indica de dónde prefieres que la IA obtenga los datos de tus productos para tener el contexto suficiente para responder cualquier pregunta del cliente. Si seleccionas shopify, debes tener shopify conectado en la sección de integraciones. Si seleccionas Ecommerce de Chatea PRO, debes tener tus productos agregados con el ID del producto en Dropi"
            />
          </div>
          <select
            id="dataSource"
            className="w-full p-3.5 border border-gray-300 rounded-xl text-sm transition-all duration-200 bg-white text-slate-700 font-inherit leading-relaxed focus:outline-none focus:border-sky-500 focus:shadow-sky-100 focus:shadow-lg"
            value={formData.storeData.dataSource}
            onChange={handleInputChange}
          >
            <option value="">Selecciona el origen de datos</option>
            <option value="shopify">Shopify</option>
            <option value="chatea-pro">Ecommerce de Chatea PRO</option>
          </select>
        </div>
      </Card>
    </div>
  );
};
