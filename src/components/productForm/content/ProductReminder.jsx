import React from 'react';
import { useProduct } from '../../../context/ProductContext';

export const ProductReminder = () => {
  const { 
    productData, 
    updateProductData,
    validationState,
    updateValidationState
  } = useProduct();

  const reminderData = productData.reminder || {
    reminder1: {
      time: 5,
      unit: 'minutos',
      text: ''
    },
    reminder2: {
      time: 10,
      unit: 'segundos',
      text: ''
    },
    timeRange: {
      enabled: false,
      minTime: '09:00',
      maxTime: '20:00'
    },
    showTooltips: {
      tooltip1: false,
      tooltip2: false
    }
  };

  const touchedFields = validationState.reminder?.touchedFields || {
    reminder1Time: false,
    reminder1Text: false,
    reminder2Time: false,
    reminder2Text: false
  };

  const example1Text = "EVENTO: El usuario no ha respondido. ¡Debemos recuperar su atención! Engancha al cliente diciendolo sentir mal por dejarnos en visto, con un mensaje como: 'Ay, me dejaste en visto'. MÍNIMO 35 PALABRAS.";
  const example2Text = "EVENTO: El usuario no ha respondido. ¡Debemos recuperar su atención! Engancha al cliente con una prueba social de funcionalidad sobre el producto (es decir, indícale que hay más personas usando el producto y están felices con su compra: 'Recuerda que hay más personas...') y destaca por lo menos 2 beneficios, así como la forma en que eso ha mejorado la vida de los usuarios según la ficha técnica. Termina con una pregunta como: '¿Seguimos con tu proceso de compra?'. MÍNIMO 35 PALABRAS.";

  const tooltipText = "Recuerda que no estás escribiendo el mensaje exacto que la IA debe decir, sino una guía de cómo debe actuar para que adapte el contenido según el punto de la conversación.";

  const isFieldValid = (field) => {
    if (!touchedFields[field]) return true;
    
    switch(field) {
      case 'reminder1Time':
        return reminderData.reminder1?.time > 0;
      case 'reminder1Text':
        return reminderData.reminder1?.text.trim().length > 0;
      case 'reminder2Time':
        return reminderData.reminder2?.time > 0;
      case 'reminder2Text':
        return reminderData.reminder2?.text.trim().length > 0;
      default:
        return true;
    }
  };

  const setTouchedField = (field) => {
    updateValidationState('reminder', {
      touchedFields: {
        ...touchedFields,
        [field]: true
      }
    });
  };

  const handleTooltipToggle = (tooltip, show) => {
    updateProductData('reminder', {
      showTooltips: {
        ...reminderData.showTooltips,
        [tooltip]: show
      }
    });
  };

  const insertReminderExample = (reminderNumber, exampleText) => {
    if (reminderNumber === 1) {
      handleReminder1TextChange(exampleText);
    } else if (reminderNumber === 2) {
      handleReminder2TextChange(exampleText);
    }
  };

  const handleTimeRangeToggle = () => {
    updateProductData('reminder', {
      timeRange: {
        ...reminderData.timeRange,
        enabled: !reminderData.timeRange.enabled
      }
    });
  };

  const handleMinTimeChange = (value) => {
    updateProductData('reminder', {
      timeRange: {
        ...reminderData.timeRange,
        minTime: value
      }
    });
  };

  const handleMaxTimeChange = (value) => {
    updateProductData('reminder', {
      timeRange: {
        ...reminderData.timeRange,
        maxTime: value
      }
    });
  };

  const handleReminder1TimeChange = (value) => {
    if (!touchedFields.reminder1Time) {
      setTouchedField('reminder1Time');
    }
    updateProductData('reminder', {
      reminder1: {
        ...reminderData.reminder1,
        time: parseInt(value) || 0
      }
    });
  };

  const handleReminder1UnitChange = (value) => {
    updateProductData('reminder', {
      reminder1: {
        ...reminderData.reminder1,
        unit: value
      }
    });
  };

  const handleReminder1TextChange = (value) => {
    if (!touchedFields.reminder1Text) {
      setTouchedField('reminder1Text');
    }
    updateProductData('reminder', {
      reminder1: {
        ...reminderData.reminder1,
        text: value
      }
    });
  };

  const handleReminder2TimeChange = (value) => {
    if (!touchedFields.reminder2Time) {
      setTouchedField('reminder2Time');
    }
    updateProductData('reminder', {
      reminder2: {
        ...reminderData.reminder2,
        time: parseInt(value) || 0
      }
    });
  };

  const handleReminder2UnitChange = (value) => {
    updateProductData('reminder', {
      reminder2: {
        ...reminderData.reminder2,
        unit: value
      }
    });
  };

  const handleReminder2TextChange = (value) => {
    if (!touchedFields.reminder2Text) {
      setTouchedField('reminder2Text');
    }
    updateProductData('reminder', {
      reminder2: {
        ...reminderData.reminder2,
        text: value
      }
    });
  };

  // Variables para las horas
  const hora_min = reminderData.timeRange?.minTime || '09:00';
  const hora_max = reminderData.timeRange?.maxTime || '20:00';

  return (
    <div className="p-6 bg-white">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-semibold mb-6 text-center text-slate-700">
          Recordatorios
        </h1>
        


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 items-start">
          <div className="flex flex-col">
            <label className={`text-sm font-medium mb-3 ${
              !isFieldValid('reminder1Time') ? 'text-red-500' : 'text-slate-700'
            }`}>
              Tiempo recordatorio 1<span className="text-red-500 ml-1">*</span>
            </label>
            <div className="flex mt-3">
              <input
                type="number"
                value={reminderData.reminder1?.time || 5}
                onChange={(e) => handleReminder1TimeChange(e.target.value)}
                onBlur={() => setTouchedField('reminder1Time')}
                min="1"
                className={`flex-1 p-4 border-2 border-r-0 rounded-l-xl text-base text-center bg-white focus:outline-none focus:ring-4 focus:ring-sky-500/10 min-w-[100px] ${
                  !isFieldValid('reminder1Time') 
                    ? 'border-red-500 focus:border-red-500' 
                    : 'border-slate-200 focus:border-sky-500'
                }`}
              />
              <select
                value={reminderData.reminder1?.unit || 'minutos'}
                onChange={(e) => handleReminder1UnitChange(e.target.value)}
                className={`flex-[2] p-4 border-2 rounded-r-xl text-base bg-white cursor-pointer focus:outline-none focus:ring-4 focus:ring-sky-500/10 min-w-[140px] ${
                  !isFieldValid('reminder1Time') 
                    ? 'border-red-500 focus:border-red-500' 
                    : 'border-slate-200 focus:border-sky-500'
                }`}
              >
                <option value="minutos">minutos</option>
                <option value="segundos">segundos</option>
                <option value="horas">horas</option>
                <option value="dias">días</option>
              </select>
            </div>
            {!isFieldValid('reminder1Time') && (
              <span className="text-red-500 text-sm mt-1">Este campo es obligatorio</span>
            )}
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <label className={`text-sm font-medium ${
                !isFieldValid('reminder1Text') ? 'text-red-500' : 'text-slate-700'
              }`}>
                Recordatorio 1<span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative inline-block">
                <span 
                  className="w-[18px] h-[18px] bg-sky-500 text-white rounded-full flex items-center justify-center text-xs cursor-pointer"
                  onMouseEnter={() => handleTooltipToggle('tooltip1', true)}
                  onMouseLeave={() => handleTooltipToggle('tooltip1', false)}
                >
                  i
                </span>
                {reminderData.showTooltips?.tooltip1 && (
                  <div className="absolute bottom-[150%] left-1/2 transform -translate-x-1/2 w-[300px] bg-slate-800 text-white text-left rounded-xl p-4 z-50 opacity-100 translate-y-[-4px] transition-all duration-300 text-sm leading-6 shadow-lg">
                    {tooltipText}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-l-transparent border-r-transparent border-t-slate-800"></div>
                  </div>
                )}
              </div>
            </div>
            <textarea
              value={reminderData.reminder1?.text || ''}
              onChange={(e) => handleReminder1TextChange(e.target.value)}
              onBlur={() => setTouchedField('reminder1Text')}
              rows="4"
              className={`mt-3 p-3 border-2 rounded-md focus:outline-none focus:ring-4 focus:ring-sky-500/10 resize-y ${
                !isFieldValid('reminder1Text') 
                  ? 'border-red-500 focus:border-red-500' 
                  : 'border-slate-200 focus:border-sky-500'
              }`}
              placeholder="EVENTO: El cliente ha dejado de responder y necesitamos recuperar su atención. Indícale..."
            />
            {!isFieldValid('reminder1Text') && (
              <span className="text-red-500 text-sm mt-1">Este campo es obligatorio</span>
            )}
            <button
              onClick={() => insertReminderExample(1, example1Text)}
              className="flex items-center justify-end gap-2 text-sm text-sky-500 cursor-pointer transition-all duration-200 hover:text-sky-700 hover:underline mt-3 font-medium"
            >
              <span>Ver texto de ejemplo</span>
              <span className="text-base">👁️</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 items-start">
          <div className="flex flex-col">
            <label className={`text-sm font-medium mb-3 ${
              !isFieldValid('reminder2Time') ? 'text-red-500' : 'text-slate-700'
            }`}>
              Tiempo recordatorio 2<span className="text-red-500 ml-1">*</span>
            </label>
            <div className="flex mt-3">
              <input
                type="number"
                value={reminderData.reminder2?.time || 10}
                onChange={(e) => handleReminder2TimeChange(e.target.value)}
                onBlur={() => setTouchedField('reminder2Time')}
                min="1"
                className={`flex-1 p-4 border-2 border-r-0 rounded-l-xl text-base text-center bg-white focus:outline-none focus:ring-4 focus:ring-sky-500/10 min-w-[100px] ${
                  !isFieldValid('reminder2Time') 
                    ? 'border-red-500 focus:border-red-500' 
                    : 'border-slate-200 focus:border-sky-500'
                }`}
              />
              <select
                value={reminderData.reminder2?.unit || 'segundos'}
                onChange={(e) => handleReminder2UnitChange(e.target.value)}
                className={`flex-[2] p-4 border-2 rounded-r-xl text-base bg-white cursor-pointer focus:outline-none focus:ring-4 focus:ring-sky-500/10 min-w-[140px] ${
                  !isFieldValid('reminder2Time') 
                    ? 'border-red-500 focus:border-red-500' 
                    : 'border-slate-200 focus:border-sky-500'
                }`}
              >
                <option value="segundos">segundos</option>
                <option value="minutos">minutos</option>
                <option value="horas">horas</option>
                <option value="dias">días</option>
              </select>
            </div>
            {!isFieldValid('reminder2Time') && (
              <span className="text-red-500 text-sm mt-1">Este campo es obligatorio</span>
            )}
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <label className={`text-sm font-medium ${
                !isFieldValid('reminder2Text') ? 'text-red-500' : 'text-slate-700'
              }`}>
                Recordatorio 2<span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative inline-block">
                <span 
                  className="w-[18px] h-[18px] bg-sky-500 text-white rounded-full flex items-center justify-center text-xs cursor-pointer"
                  onMouseEnter={() => handleTooltipToggle('tooltip2', true)}
                  onMouseLeave={() => handleTooltipToggle('tooltip2', false)}
                >
                  i
                </span>
                {reminderData.showTooltips?.tooltip2 && (
                  <div className="absolute bottom-[150%] left-1/2 transform -translate-x-1/2 w-[300px] bg-slate-800 text-white text-left rounded-xl p-4 z-50 opacity-100 translate-y-[-4px] transition-all duration-300 text-sm leading-6 shadow-lg">
                    {tooltipText}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-l-transparent border-r-transparent border-t-slate-800"></div>
                  </div>
                )}
              </div>
            </div>
            <textarea
              value={reminderData.reminder2?.text || ''}
              onChange={(e) => handleReminder2TextChange(e.target.value)}
              onBlur={() => setTouchedField('reminder2Text')}
              rows="4"
              className={`mt-3 p-3 border-2 rounded-md focus:outline-none focus:ring-4 focus:ring-sky-500/10 resize-y ${
                !isFieldValid('reminder2Text') 
                  ? 'border-red-500 focus:border-red-500' 
                  : 'border-slate-200 focus:border-sky-500'
              }`}
              placeholder="EVENTO: El cliente ha dejado de responder y necesitamos recuperar su atención. Indícale..."
            />
            {!isFieldValid('reminder2Text') && (
              <span className="text-red-500 text-sm mt-1">Este campo es obligatorio</span>
            )}
            <button
              onClick={() => insertReminderExample(2, example2Text)}
              className="flex items-center justify-end gap-2 text-sm text-sky-500 cursor-pointer transition-all duration-200 hover:text-sky-700 hover:underline mt-3 font-medium"
            >
              <span>Ver texto de ejemplo</span>
              <span className="text-base">👁️</span>
            </button>
          </div>
        </div>
                    {/* Toggle para rango de horas */}
        <div className="mb-8 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={reminderData.timeRange?.enabled || false}
                onChange={handleTimeRangeToggle}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
            <span className="text-slate-700 font-medium">
              ¿Deseas definir un rango de horas para enviar los recordatorios?
            </span>
          </div>

          {reminderData.timeRange?.enabled && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Hora mínima
                </label>
                <div className="relative">
                  <input
                    type="time"
                    value={hora_min}
                    onChange={(e) => handleMinTimeChange(e.target.value)}
                    className="w-full p-3 border-2 border-slate-200 rounded-lg text-base bg-white focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Hora máxima
                </label>
                <div className="relative">
                  <input
                    type="time"
                    value={hora_max}
                    onChange={(e) => handleMaxTimeChange(e.target.value)}
                    className="w-full p-3 border-2 border-slate-200 rounded-lg text-base bg-white focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500"
                  />

                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};