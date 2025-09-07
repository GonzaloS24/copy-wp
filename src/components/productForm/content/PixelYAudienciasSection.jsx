import { useState } from 'react';
import Tooltip from "../../carritos/content/sections/Tooltip";

const PixelYAudienciasSection = () => {
  const [pixelSendEnabled, setPixelSendEnabled] = useState(false);
  const [pixelType, setPixelType] = useState('default');
  const [pageId, setPageId] = useState('');
  const [audienceId, setAudienceId] = useState('');

  const toggleSendToPixel = () => {
    const newState = !pixelSendEnabled;
    setPixelSendEnabled(newState);
    
    if (!newState) {
      setPixelType('default');
      setPageId('');
      setAudienceId('');
    }
  };

  const selectPixelType = (type) => {
    if (!pixelSendEnabled) return;
    setPixelType(type);
    
    if (type === 'default') {
      setPageId('');
      setAudienceId('');
    }
  };

  const openPageIdTutorial = () => {
    console.log('Abrir tutorial Page ID');
  };

  const openAudienceIdTutorial = () => {
    console.log('Abrir tutorial Audience ID');
  };

  return (
    <div className="bg-white rounded-2xl p-10 shadow-xl border border-slate-200 w-full relative z-5">
      <h1 className="text-4xl mb-12 text-sky-500 font-bold tracking-tight">
        Pixel y Audiencias
      </h1>

      {/* ¿Enviar compradores al pixel de Meta? */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <label className="block font-semibold text-slate-700 text-base tracking-tight">
            ¿Enviar compradores al pixel de Meta?
          </label>
          <Tooltip content="Activa esta opción para enviar los datos de compradores a tu pixel de Meta y crear audiencias personalizadas para remarketing." />
        </div>
        <div className="flex items-center gap-4">
          <div
            className={`relative w-11 h-5 rounded-full cursor-pointer transition-all duration-300 border ${
              pixelSendEnabled 
                ? 'bg-emerald-500 border-emerald-500' 
                : 'bg-slate-200 border-slate-200'
            }`}
            onClick={toggleSendToPixel}
          >
            <div
              className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-all duration-300 shadow-md ${
                pixelSendEnabled ? 'transform translate-x-6' : ''
              }`}
            ></div>
          </div>
          <span
            className={`text-base font-medium transition-colors duration-300 ${
              pixelSendEnabled ? 'text-emerald-500' : 'text-slate-500'
            }`}
          >
            {pixelSendEnabled ? 'Sí' : 'No'}
          </span>
        </div>
      </div>

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
              !pixelSendEnabled
                ? 'bg-slate-50 border-slate-200 opacity-60 cursor-not-allowed'
                : pixelType === 'default'
                ? 'border-sky-500 bg-gradient-to-br from-blue-50 to-sky-100'
                : 'border-slate-200 bg-white hover:border-sky-500 hover:bg-slate-50'
            }`}
            onClick={() => selectPixelType('default')}
          >
            <div
              className={`w-5 h-5 border-2 rounded-full relative transition-all duration-200 flex-shrink-0 ${
                !pixelSendEnabled
                  ? 'border-slate-300 bg-slate-100'
                  : pixelType === 'default'
                  ? 'border-sky-500 bg-white'
                  : 'border-slate-300 bg-white'
              }`}
            >
              {pixelType === 'default' && pixelSendEnabled && (
                <div className="w-2.5 h-2.5 bg-sky-500 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
              )}
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`text-base font-semibold tracking-tight ${
                  !pixelSendEnabled ? 'text-slate-400' : 'text-slate-700'
                }`}
              >
                Por defecto
              </span>
              <Tooltip content="Se utilizarán los IDs de pixel y audiencia configurados globalmente desde la sección general de configuración del producto." />
            </div>
          </div>

          {/* Opción Personalizado */}
          <div
            className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
              !pixelSendEnabled
                ? 'bg-slate-50 border-slate-200 opacity-60 cursor-not-allowed'
                : pixelType === 'custom'
                ? 'border-sky-500 bg-gradient-to-br from-blue-50 to-sky-100'
                : 'border-slate-200 bg-white hover:border-sky-500 hover:bg-slate-50'
            }`}
            onClick={() => selectPixelType('custom')}
          >
            <div
              className={`w-5 h-5 border-2 rounded-full relative transition-all duration-200 flex-shrink-0 ${
                !pixelSendEnabled
                  ? 'border-slate-300 bg-slate-100'
                  : pixelType === 'custom'
                  ? 'border-sky-500 bg-white'
                  : 'border-slate-300 bg-white'
              }`}
            >
              {pixelType === 'custom' && pixelSendEnabled && (
                <div className="w-2.5 h-2.5 bg-sky-500 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
              )}
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`text-base font-semibold tracking-tight ${
                  !pixelSendEnabled ? 'text-slate-400' : 'text-slate-700'
                }`}
              >
                Personalizado
              </span>
              <Tooltip content="Usar un Pixel y una Audiencia específicos para este producto, distintos a los valores por defecto." />
            </div>
          </div>
        </div>
      </div>

      {/* Campos personalizados - Siempre visibles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        {/* Pixel de Meta */}
        <div
          className={`border rounded-xl p-6 transition-all duration-300 ${
            !pixelSendEnabled || pixelType !== 'custom'
              ? 'bg-slate-50 border-slate-200 opacity-50'
              : 'bg-slate-50 border-slate-200'
          }`}
        >
          <h4
            className={`text-lg font-bold text-center mb-6 tracking-tight ${
              !pixelSendEnabled || pixelType !== 'custom'
                ? 'text-slate-400'
                : 'text-slate-700'
            }`}
          >
            Pixel de Meta
          </h4>
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-3">
              <label
                className={`text-base font-semibold tracking-tight ${
                  !pixelSendEnabled || pixelType !== 'custom'
                    ? 'text-slate-400'
                    : 'text-slate-700'
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
                !pixelSendEnabled || pixelType !== 'custom'
                  ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed placeholder-slate-300'
                  : 'bg-white border-slate-200 text-slate-700 focus:outline-none focus:border-sky-500 focus:shadow-lg focus:shadow-sky-500/10 placeholder-slate-400'
              }`}
              placeholder="Ingresa el Page ID"
              value={pageId}
              onChange={(e) => setPageId(e.target.value)}
              disabled={!pixelSendEnabled || pixelType !== 'custom'}
            />
          </div>
        </div>

        {/* Audiencias Personalizadas */}
        <div
          className={`border rounded-xl p-6 transition-all duration-300 ${
            !pixelSendEnabled || pixelType !== 'custom'
              ? 'bg-slate-50 border-slate-200 opacity-50'
              : 'bg-slate-50 border-slate-200'
          }`}
        >
          <h4
            className={`text-lg font-bold text-center mb-6 tracking-tight ${
              !pixelSendEnabled || pixelType !== 'custom'
                ? 'text-slate-400'
                : 'text-slate-700'
            }`}
          >
            Audiencias Personalizadas
          </h4>
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-3">
              <label
                className={`text-base font-semibold tracking-tight ${
                  !pixelSendEnabled || pixelType !== 'custom'
                    ? 'text-slate-400'
                    : 'text-slate-700'
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
                !pixelSendEnabled || pixelType !== 'custom'
                  ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed placeholder-slate-300'
                  : 'bg-white border-slate-200 text-slate-700 focus:outline-none focus:border-sky-500 focus:shadow-lg focus:shadow-sky-500/10 placeholder-slate-400'
              }`}
              placeholder="Ingresa el Custom Audience ID"
              value={audienceId}
              onChange={(e) => setAudienceId(e.target.value)}
              disabled={!pixelSendEnabled || pixelType !== 'custom'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PixelYAudienciasSection;