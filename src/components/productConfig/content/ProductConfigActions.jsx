import React from 'react';
import { useConfig } from '../../../context/ConfigContext';

export const ProductConfigActions = () => {
  const { actionsConfig, updateActionsConfig } = useConfig();
  
  const handleQuantityChange = (increment) => {
    const minValue = actionsConfig.validateDeliveries ? 1 : 0;
    updateActionsConfig({
      minOrdersQuantity: Math.max(minValue, actionsConfig.minOrdersQuantity + increment)
    });
  };

  const handlePercentageChange = (e) => {
    const minValue = actionsConfig.validateDeliveries ? 1 : 0;
    const value = Math.min(100, Math.max(minValue, parseInt(e.target.value) || minValue));
    updateActionsConfig({ minDeliveryPercentage: value });
  };

  const handleFreightValueChange = (e) => {
    const minValue = actionsConfig.validateFreight ? 1 : 0;
    const value = Math.max(minValue, parseInt(e.target.value) || 0);
    updateActionsConfig({ freightValue: value });
  };

  const TooltipComponent = ({ text }) => (
    <div className="relative group">
      <div className="w-4 h-4 rounded-full bg-sky-500 text-white flex items-center justify-center text-xs font-semibold cursor-help transition-all duration-200 hover:bg-sky-600 hover:scale-110">
        i
      </div>
      <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-300 absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50">
        <div className="w-80 bg-slate-800 text-white text-left rounded-xl p-4 text-sm leading-relaxed whitespace-normal">
          {text}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-l-transparent border-r-transparent border-t-slate-800"></div>
        </div>
      </div>
    </div>
  );

  const RadioButton = ({ checked, onClick, label }) => (
    <div className="flex items-center gap-3 cursor-pointer" onClick={onClick}>
      <div className="w-5 h-5 border-2 border-slate-300 rounded-full relative transition-all duration-200 bg-white flex-shrink-0">
        {checked && (
          <>
            <div className="border-2 border-sky-500 rounded-full w-full h-full absolute inset-0" />
            <div className="w-2.5 h-2.5 bg-sky-500 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </>
        )}
      </div>
      <span className="text-gray-700">{label}</span>
    </div>
  );

  const NewBadge = () => (
    <span className="bg-sky-500 text-white text-xs font-semibold px-2 py-1 rounded ml-2">
      NUEVO
    </span>
  );

  return (
    <div className="block">
      <div className="bg-white rounded-2xl p-10 shadow-lg border border-slate-200 w-full relative z-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Acciones especiales</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-emerald-800 text-center mb-6">
              Procesamiento de datos
            </h3>
            
            <div className="mb-4">
              <div className="flex items-start gap-3 mb-4">
                <label className="block text-sm font-medium text-gray-700 flex-1">
                  ¿Deseas subir el pedido automáticamente a dropi?
                </label>
                <TooltipComponent text="Decide si el pedido se debe subir a dropi automáticamente cada vez que Chatea PRO detecte que la venta se completó o si por el contrario, se debe quedar en chatea pro para que el asesor haga una revisión manual" />
              </div>
              
              <div className="flex flex-col gap-4">
                <RadioButton
                  checked={actionsConfig.autoUpload}
                  onClick={() => updateActionsConfig({ autoUpload: true })}
                  label="Sí"
                />
                <RadioButton
                  checked={!actionsConfig.autoUpload}
                  onClick={() => updateActionsConfig({ autoUpload: false })}
                  label="No"
                />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-400 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-amber-800 text-center mb-6">
              Validaciones de la orden
            </h3>
            
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <label className="block text-sm font-medium text-gray-700 flex-1">
                  ¿Desea validar porcentaje de entregas del cliente?
                </label>
                <NewBadge />
                <TooltipComponent text="Información sobre validación de porcentaje de entregas del cliente" />
              </div>
              
              <div className="flex flex-col gap-4 mb-4">
                <RadioButton
                  checked={actionsConfig.validateDeliveries}
                  onClick={() => {
                    updateActionsConfig({ 
                      validateDeliveries: true,
                      minOrdersQuantity: Math.max(1, actionsConfig.minOrdersQuantity),
                      minDeliveryPercentage: Math.max(1, actionsConfig.minDeliveryPercentage)
                    });
                  }}
                  label="Sí"
                />
                <RadioButton
                  checked={!actionsConfig.validateDeliveries}
                  onClick={() => {
                    updateActionsConfig({ 
                      validateDeliveries: false,
                      minOrdersQuantity: 0,
                      minDeliveryPercentage: 0
                    });
                  }}
                  label="No"
                />
              </div>
            </div>

            <div className={`transition-opacity duration-300 ${actionsConfig.validateDeliveries ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
              <div className="mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <label className="block text-sm font-medium text-gray-700 flex-1">
                    Cantidad mínima de órdenes
                  </label>
                  <TooltipComponent text="Especifica la cantidad mínima de órdenes requeridas" />
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    className="w-8 h-8 border border-gray-300 bg-white rounded flex items-center justify-center cursor-pointer text-gray-500 hover:border-sky-500 hover:text-sky-500 transition-all duration-200"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={!actionsConfig.validateDeliveries}
                  >
                    −
                  </button>
                  <input
                    type="number"
                    className="w-16 text-center p-2 border border-gray-300 rounded font-semibold"
                    value={actionsConfig.minOrdersQuantity}
                    onChange={(e) => {
                      const minValue = actionsConfig.validateDeliveries ? 1 : 0;
                      updateActionsConfig({ 
                        minOrdersQuantity: Math.max(minValue, parseInt(e.target.value) || minValue)
                      });
                    }}
                    min={actionsConfig.validateDeliveries ? "1" : "0"}
                    disabled={!actionsConfig.validateDeliveries}
                  />
                  <button
                    className="w-8 h-8 border border-gray-300 bg-white rounded flex items-center justify-center cursor-pointer text-gray-500 hover:border-sky-500 hover:text-sky-500 transition-all duration-200"
                    onClick={() => handleQuantityChange(1)}
                    disabled={!actionsConfig.validateDeliveries}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <label className="block text-sm font-medium text-gray-700 flex-1">
                    Porcentaje mínimo de entregas
                  </label>
                  <TooltipComponent text="Define el porcentaje mínimo de entregas exitosas" />
                </div>
                
                <div className="flex items-center">
                  <input
                    type="number"
                    className="w-20 p-2 border border-gray-300 rounded-l border-r-0 text-center font-semibold"
                    value={actionsConfig.minDeliveryPercentage}
                    onChange={handlePercentageChange}
                    min={actionsConfig.validateDeliveries ? "1" : "0"}
                    max="100"
                    disabled={!actionsConfig.validateDeliveries}
                  />
                  <span className="bg-slate-100 border border-gray-300 border-l-0 px-3 py-2 rounded-r text-gray-500 font-semibold">
                    %
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center gap-3 mb-4">
                <label className="block text-sm font-medium text-gray-700 flex-1">
                  ¿Deseas validar el flete de la orden?
                </label>
                <NewBadge />
                <TooltipComponent text="Configuración para validar el costo de envío de la orden" />
              </div>
              
              <div className="flex flex-col gap-4 mb-4">
                <RadioButton
                  checked={actionsConfig.validateFreight}
                  onClick={() => {
                    updateActionsConfig({ 
                      validateFreight: true,
                      freightValue: Math.max(3, actionsConfig.freightValue)
                    });
                  }}
                  label="Sí"
                />
                <RadioButton
                  checked={!actionsConfig.validateFreight}
                  onClick={() => {
                    updateActionsConfig({ 
                      validateFreight: false,
                      freightValue: 0
                    });
                  }}
                  label="No"
                />
              </div>
            </div>

            <div className={`transition-opacity duration-300 ${actionsConfig.validateFreight ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Indica tu criterio
                </label>
                
                <div className="flex items-center gap-2">
                  <select
                    className="p-2 border border-gray-300 rounded bg-white text-sm min-w-20"
                    value={actionsConfig.freightCriterion}
                    onChange={(e) => updateActionsConfig({ freightCriterion: e.target.value })}
                    disabled={!actionsConfig.validateFreight}
                  >
                    <option value="valor">Valor</option>
                    <option value="peso">Peso</option>
                    <option value="distancia">Distancia</option>
                  </select>
                  
                  <div className="flex items-center">
                    <input
                      type="number"
                      className="w-20 p-2 border border-gray-300 rounded-l border-r-0 text-center font-semibold"
                      value={actionsConfig.freightValue}
                      onChange={handleFreightValueChange}
                      min={actionsConfig.validateFreight ? "1" : "0"}
                      disabled={!actionsConfig.validateFreight}
                    />
                    <span className="bg-slate-100 border border-gray-300 border-l-0 px-3 py-2 rounded-r text-gray-500 font-semibold">
                      $
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};