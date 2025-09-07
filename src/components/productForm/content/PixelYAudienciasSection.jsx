import { useProduct } from '../../../context/ProductContext';
import Tooltip from "../../carritos/content/sections/Tooltip";

const PixelYAudienciasSection = () => {
  const { productData, updateProductData } = useProduct();
  
  const metaConversionData = productData.metaConversion || {
    enabled: false,
    useDefault: true,
    pageId: "",
    audienceId: "",
  };

  const toggleEnabled = () => {
    const newEnabled = !metaConversionData.enabled;
    updateProductData('metaConversion', {
      ...metaConversionData,
      enabled: newEnabled,
      // Si se habilita, activar por defecto y limpiar campos
      useDefault: newEnabled ? true : metaConversionData.useDefault,
      pageId: newEnabled ? "" : metaConversionData.pageId,
      audienceId: newEnabled ? "" : metaConversionData.audienceId,
    });
  };

  const toggleUseDefault = () => {
    const newUseDefault = !metaConversionData.useDefault;
    updateProductData('metaConversion', {
      ...metaConversionData,
      useDefault: newUseDefault,
      // Si activa por defecto, limpiar campos personalizados
      pageId: newUseDefault ? "" : metaConversionData.pageId,
      audienceId: newUseDefault ? "" : metaConversionData.audienceId,
    });
  };

  const handlePageIdChange = (value) => {
    updateProductData('metaConversion', {
      ...metaConversionData,
      pageId: value,
    });
  };

  const handleAudienceIdChange = (value) => {
    updateProductData('metaConversion', {
      ...metaConversionData,
      audienceId: value,
    });
  };

  const openPageIdTutorial = () => {
    console.log('Abrir tutorial Page ID');
  };

  const openAudienceIdTutorial = () => {
    console.log('Abrir tutorial Audience ID');
  };

  const isDisabled = !metaConversionData.enabled;
  const isFieldsDisabled = isDisabled || metaConversionData.useDefault;

  return (
    <div className="bg-white rounded-2xl p-10 shadow-xl border border-slate-200 w-full relative z-5">
      <h1 className="text-4xl mb-12 text-sky-500 font-bold tracking-tight">
        Pixel y Audiencias
      </h1>

      {/* Toggle principal para habilitar/deshabilitar toda la sección */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-8">
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-2">
            <label className="font-medium text-slate-700 text-sm">
              ¿Enviar compradores al pixel de Meta?
            </label>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only"
                checked={metaConversionData.enabled}
                onChange={toggleEnabled}
              />
              <div
                className={`w-12 h-6 rounded-full cursor-pointer transition-all duration-300 ease-in-out ${
                  metaConversionData.enabled ? 'bg-sky-500' : 'bg-slate-300'
                }`}
                onClick={toggleEnabled}
              >
                <div
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 ease-in-out ${
                    metaConversionData.enabled ? 'transform translate-x-6' : ''
                  }`}
                />
              </div>
            </div>
            <span className="text-sm text-slate-700 font-medium">
              {metaConversionData.enabled ? 'SI' : 'NO'}
            </span>
          </div>
        </div>
      </div>

      {/* Contenido principal con efecto de deshabilitación */}
      <div className={`${isDisabled ? 'opacity-50 pointer-events-none' : ''}`}>
        {/* ¿Utilizar pixel por defecto o personalizado? */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <label className="block font-semibold text-slate-700 text-base tracking-tight">
              ¿Utilizar pixel por defecto o personalizado?
            </label>
            <Tooltip content="Elige si usar la configuración global de pixel y audiencia, o configurar valores específicos para este producto." />
          </div>
          
          <div className="space-y-4">
            {/* Opción Por defecto */}
            <div
              className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                metaConversionData.useDefault && !isDisabled
                  ? 'border-sky-500 bg-gradient-to-br from-blue-50 to-sky-100'
                  : 'border-slate-200 bg-white hover:border-sky-500 hover:bg-slate-50'
              } ${isDisabled ? 'cursor-not-allowed' : ''}`}
              onClick={() => !isDisabled && (metaConversionData.useDefault || toggleUseDefault())}
            >
              <div
                className={`w-5 h-5 border-2 rounded-full relative transition-all duration-200 flex-shrink-0 ${
                  metaConversionData.useDefault && !isDisabled
                    ? 'border-sky-500 bg-white'
                    : 'border-slate-300 bg-white'
                }`}
              >
                {metaConversionData.useDefault && !isDisabled && (
                  <div className="w-2.5 h-2.5 bg-sky-500 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                )}
              </div>
              <div className="flex items-center gap-3">
                <span className="text-base font-semibold tracking-tight text-slate-700">
                  Por defecto
                </span>
                <Tooltip content="Se utilizarán los IDs de pixel y audiencia configurados globalmente desde la sección general de configuración del producto." />
              </div>
            </div>

            {/* Opción Personalizado */}
            <div
              className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                !metaConversionData.useDefault && !isDisabled
                  ? 'border-sky-500 bg-gradient-to-br from-blue-50 to-sky-100'
                  : 'border-slate-200 bg-white hover:border-sky-500 hover:bg-slate-50'
              } ${isDisabled ? 'cursor-not-allowed' : ''}`}
              onClick={() => !isDisabled && (!metaConversionData.useDefault || toggleUseDefault())}
            >
              <div
                className={`w-5 h-5 border-2 rounded-full relative transition-all duration-200 flex-shrink-0 ${
                  !metaConversionData.useDefault && !isDisabled
                    ? 'border-sky-500 bg-white'
                    : 'border-slate-300 bg-white'
                }`}
              >
                {!metaConversionData.useDefault && !isDisabled && (
                  <div className="w-2.5 h-2.5 bg-sky-500 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                )}
              </div>
              <div className="flex items-center gap-3">
                <span className="text-base font-semibold tracking-tight text-slate-700">
                  Personalizado
                </span>
                <Tooltip content="Usar un Pixel y una Audiencia específicos para este producto, distintos a los valores por defecto." />
              </div>
            </div>
          </div>
        </div>

        {/* Campos personalizados */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {/* Pixel de Meta */}
          <div
            className={`border rounded-xl p-6 transition-all duration-300 ${
              isFieldsDisabled
                ? 'bg-slate-50 border-slate-200 opacity-50'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <h4
              className={`text-lg font-bold text-center mb-6 tracking-tight ${
                isFieldsDisabled ? 'text-slate-400' : 'text-slate-700'
              }`}
            >
              Pixel de Meta
            </h4>
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-3">
                <label
                  className={`text-base font-semibold tracking-tight ${
                    isFieldsDisabled ? 'text-slate-400' : 'text-slate-700'
                  }`}
                >
                  Page ID
                </label>
                <Tooltip 
                  content={
                    <div>
                      ID de la página de Facebook asociada a tu pixel de Meta. 
                      <span
                        className="text-sky-400 underline cursor-pointer hover:text-sky-300 ml-1"
                        onClick={openPageIdTutorial}
                      >
                        ¿No sabes cómo obtenerlo? Haz clic aquí.
                      </span>
                    </div>
                  } 
                />
              </div>
              <input
                type="text"
                className={`p-4 border-2 rounded-xl text-base transition-all duration-200 font-inherit ${
                  isFieldsDisabled
                    ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed placeholder-slate-300'
                    : 'bg-white border-slate-200 text-slate-700 focus:outline-none focus:border-sky-500 focus:shadow-lg focus:shadow-sky-500/10 placeholder-slate-400'
                }`}
                placeholder="Ingresa el Page ID"
                value={metaConversionData.pageId}
                onChange={(e) => handlePageIdChange(e.target.value)}
                disabled={isFieldsDisabled}
              />
            </div>
          </div>

          {/* Audiencias Personalizadas */}
          <div
            className={`border rounded-xl p-6 transition-all duration-300 ${
              isFieldsDisabled
                ? 'bg-slate-50 border-slate-200 opacity-50'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <h4
              className={`text-lg font-bold text-center mb-6 tracking-tight ${
                isFieldsDisabled ? 'text-slate-400' : 'text-slate-700'
              }`}
            >
              Audiencias Personalizadas
            </h4>
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-3">
                <label
                  className={`text-base font-semibold tracking-tight ${
                    isFieldsDisabled ? 'text-slate-400' : 'text-slate-700'
                  }`}
                >
                  Custom Audience ID
                </label>
                <Tooltip 
                  content={
                    <div>
                      ID de la audiencia personalizada en Meta donde se enviarán los datos de compradores.
                      <span
                        className="text-sky-400 underline cursor-pointer hover:text-sky-300 ml-1"
                        onClick={openAudienceIdTutorial}
                      >
                        ¿No sabes cómo obtenerlo? Haz clic aquí.
                      </span>
                    </div>
                  } 
                />
              </div>
              <input
                type="text"
                className={`p-4 border-2 rounded-xl text-base transition-all duration-200 font-inherit ${
                  isFieldsDisabled
                    ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed placeholder-slate-300'
                    : 'bg-white border-slate-200 text-slate-700 focus:outline-none focus:border-sky-500 focus:shadow-lg focus:shadow-sky-500/10 placeholder-slate-400'
                }`}
                placeholder="Ingresa el Custom Audience ID"
                value={metaConversionData.audienceId}
                onChange={(e) => handleAudienceIdChange(e.target.value)}
                disabled={isFieldsDisabled}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PixelYAudienciasSection;