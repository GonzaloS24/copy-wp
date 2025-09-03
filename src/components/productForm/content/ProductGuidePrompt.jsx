import React, { useState, useEffect, useCallback } from 'react';
import { useProduct } from '../../../context/ProductContext';

// CONSTANTES INMUTABLES para los límites de caracteres
const CHARACTER_LIMITS = {
  contextualizacion: 1000,
  fichaTecnica: 2000,
  guionConversacional: 4000,
  posiblesSituaciones: 4000,
  reglasIA: 2000
};

export const ProductGuidePrompt = ({ guideData, onGuideDataChange }) => {
  const { validationState, updateValidationState } = useProduct();
  const [formData, setFormData] = useState(guideData || {
    contextualizacion: '',
    fichaTecnica: '',
    guionConversacional: '',
    posiblesSituaciones: '',
    reglasIA: ''
  });

  const [localTexts, setLocalTexts] = useState({
    contextualizacion: '',
    fichaTecnica: '',
    guionConversacional: '',
    posiblesSituaciones: '',
    reglasIA: ''
  });

  // Función de validación robusta
  const validateAndTruncateText = useCallback((text, field) => {
    if (typeof text !== 'string') return '';
    
    const maxLength = CHARACTER_LIMITS[field] || 1000;
    const sanitizedText = text.slice(0, maxLength);
    
    if (sanitizedText.length > maxLength) {
      console.warn(`Intento de exceder límite de caracteres en ${field}`);
      return sanitizedText.slice(0, maxLength);
    }
    
    return sanitizedText;
  }, []);

  useEffect(() => {
    const initialData = guideData || {
      contextualizacion: '',
      fichaTecnica: '',
      guionConversacional: '',
      posiblesSituaciones: '',
      reglasIA: ''
    };

    // Validar y truncar los datos iniciales
    const validatedData = Object.keys(initialData).reduce((acc, field) => {
      acc[field] = validateAndTruncateText(initialData[field], field);
      return acc;
    }, {});

    setFormData(validatedData);
    
    // Inicializar textos locales
    setLocalTexts(validatedData);
  }, [guideData, validateAndTruncateText]);

  const isFieldValid = (field) => {
    const requiredFields = [
      'contextualizacion', 
      'fichaTecnica', 
      'guionConversacional',
      'posiblesSituaciones',
      'reglasIA'
    ];
    
    if (!requiredFields.includes(field)) return true;
    if (!validationState.freePrompt.touchedFields?.[field]) return true;
    
    return !!formData[field];
  };

  const isFieldExceeded = (field) => {
    return formData[field]?.length > CHARACTER_LIMITS[field];
  };

  const handleInputChange = (field, value) => {
    const validatedValue = validateAndTruncateText(value, field);
    
    // Actualizar texto local para respuesta inmediata
    setLocalTexts(prev => ({
      ...prev,
      [field]: validatedValue
    }));

    if (!validationState.freePrompt.touchedFields?.[field]) {
      updateValidationState('freePrompt', {
        touchedFields: {
          ...validationState.freePrompt.touchedFields,
          [field]: true
        }
      });
    }
    
    const newData = {
      ...formData,
      [field]: validatedValue
    };
    setFormData(newData);
    
    if (onGuideDataChange) {
      onGuideDataChange(newData);
    }
  };

  const handleBlur = (field) => {
    if (!validationState.freePrompt.touchedFields?.[field]) {
      updateValidationState('freePrompt', {
        touchedFields: {
          ...validationState.freePrompt.touchedFields,
          [field]: true
        }
      });
    }
  };

  // Protección contra manipulación del DOM
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'maxlength') {
          const textareas = document.querySelectorAll('textarea[data-guide-prompt]');
          textareas.forEach((textarea) => {
            const field = textarea.getAttribute('data-field');
            const expectedMaxLength = CHARACTER_LIMITS[field];
            if (textarea.getAttribute('maxlength') !== String(expectedMaxLength)) {
              textarea.setAttribute('maxlength', expectedMaxLength);
            }
          });
        }
      });
    });

    const textareas = document.querySelectorAll('textarea[data-guide-prompt]');
    textareas.forEach((textarea) => {
      observer.observe(textarea, { attributes: true, attributeFilter: ['maxlength'] });
    });

    return () => observer.disconnect();
  }, []);

  const insertExample = (field) => {
    const examples = {
      contextualizacion: 'Eres María, una asesora de ventas especializada en productos de belleza. Te diriges a mujeres jóvenes de 18-35 años con un tono amigable y cercano, pero profesional. Evita ser demasiado formal y usa un lenguaje natural que genere confianza.',
      fichaTecnica: 'Producto: Serum Anti-edad Premium\nPrecio: $89.99 (25% de descuento por tiempo limitado)\nEnvío: 24-48 horas a nivel nacional\nCaracterísticas: Contiene ácido hialurónico, vitamina C, reduce arrugas en 15 días, dermatológicamente probado.',
      guionConversacional: '1. Saludo personalizado y presentación del producto\n2. Identificar necesidades específicas del cliente\n3. Destacar beneficios que resuelvan sus problemas\n4. Manejar objeciones con empatía\n5. Crear urgencia con la oferta limitada\n6. Facilitar el proceso de compra\n7. Seguimiento post-venta',
      posiblesSituaciones: 'Duda sobre efectividad: Mostrar testimonios y garantía\nPrecio elevado: Destacar relación calidad-precio y financiación\nDesconfianza online: Ofrecer referencias y política de devolución\nComparación con competencia: Enfocarse en diferenciadores únicos',
      reglasIA: 'Nunca presionar agresivamente para la venta\nResponder con empatía ante dudas\nNo prometer resultados no respaldados\nMantener conversación natural y fluida\nSiempre ofrecer información de contacto adicional'
    };
    
    const exampleText = validateAndTruncateText(examples[field] || '...', field);
    
    const newData = {
      ...formData,
      [field]: exampleText
    };
    
    setFormData(newData);
    setLocalTexts(prev => ({ ...prev, [field]: exampleText }));
    
    if (onGuideDataChange) {
      onGuideDataChange(newData);
    }
    
    updateValidationState('freePrompt', {
      touchedFields: {
        ...validationState.freePrompt.touchedFields,
        [field]: true
      }
    });
  };

  const stages = [
    {
      title: "🎯 Etapa Contextual",
      description: "Define la identidad y el contexto básico de tu asistente",
      headerClass: "from-blue-50 to-blue-100",
      sections: [
        {
          number: 1,
          title: "Contextualización de la IA",
          required: true,
          placeholder: "Ingresa el nombre del asesor, el rol que representa, a qué tipo de audiencia se dirige, y cómo debería adaptar su lenguaje (formal, cercano, técnico, etc).",
          field: "contextualizacion",
          numberClass: "from-blue-500 to-blue-600",
          maxLength: CHARACTER_LIMITS.contextualizacion
        },
        {
          number: 2,
          title: "Ficha técnica del producto",
          required: true,
          placeholder: "Ingresa el nombre del producto, el precio o promoción, los tiempos de envío y las características más importantes del producto.",
          field: "fichaTecnica",
          numberClass: "from-blue-500 to-blue-600",
          maxLength: CHARACTER_LIMITS.fichaTecnica
        }
      ]
    },
    {
      title: "💬 Etapa Conversacional",
      description: "Diseña el flujo de conversación y manejo de situaciones",
      headerClass: "from-green-50 to-green-100",
      sections: [
        {
          number: 3,
          title: "Guión conversacional",
          required: true,
          placeholder: "Describe la secuencia ideal de interacciones para llevar al cliente desde el primer contacto hasta la venta.",
          field: "guionConversacional",
          numberClass: "from-green-500 to-green-600",
          maxLength: CHARACTER_LIMITS.guionConversacional
        },
        {
          number: 4,
          title: "Posibles situaciones",
          required: true,
          placeholder: "¿Qué dudas o preguntas podría tener el cliente durante la conversación? ¿Cómo debería responder la IA ante cada una de ellas?",
          field: "posiblesSituaciones",
          numberClass: "from-green-500 to-green-600",
          maxLength: CHARACTER_LIMITS.posiblesSituaciones
        }
      ]
    },
    {
      title: "⚖️ Etapa Reglas",
      description: "Establece las limitaciones y consideraciones especiales",
      headerClass: "from-yellow-50 to-yellow-100",
      sections: [
        {
          number: 5,
          title: "Reglas de la IA",
          required: true,
          placeholder: "Especifica qué cosas debe tener en cuenta la IA durante toda la interacción.",
          field: "reglasIA",
          numberClass: "from-amber-500 to-amber-600",
          maxLength: CHARACTER_LIMITS.reglasIA
        }
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="space-y-12">
        {stages.map((stage, stageIndex) => (
          <div
            key={stageIndex}
            className="border-2 border-slate-200 rounded-3xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className={`bg-gradient-to-r ${stage.headerClass} p-8 border-b border-slate-200 text-center`}>
              <h2 className="text-2xl font-bold text-slate-700 mb-2 flex items-center justify-center gap-3">
                {stage.title}
              </h2>
              <p className="text-base text-slate-600 m-0 leading-6">
                {stage.description}
              </p>
            </div>

            <div>
              {stage.sections.map((section, sectionIndex) => {
                const charCount = formData[section.field]?.length || 0;
                const maxLength = CHARACTER_LIMITS[section.field];
                const isExceeded = charCount > maxLength;
                const isValid = isFieldValid(section.field);
                
                return (
                  <div
                    key={sectionIndex}
                    className={`p-8 ${sectionIndex < stage.sections.length - 1 ? 'border-b border-slate-100' : ''}`}
                  >
                    <h3 className="text-lg font-semibold text-slate-700 mb-6 flex items-center gap-4">
                      <span className={`w-8 h-8 bg-gradient-to-r ${section.numberClass} text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0`}>
                        {section.number}
                      </span>
                      {section.title}
                      {section.required && <span className="text-red-500">*</span>}
                    </h3>
                    
                    <div className="flex flex-col w-full">
                      <div className="relative">
                        <textarea
                          data-guide-prompt
                          data-field={section.field}
                          className={`min-h-[120px] w-full p-4 border-2 rounded-xl text-base bg-white text-slate-700 focus:outline-none focus:ring-4 focus:ring-sky-500/10 transition-all resize-vertical ${
                            !isValid 
                              ? 'border-red-500 focus:border-red-500' 
                              : isExceeded
                                ? 'border-orange-500 focus:border-orange-500'
                                : 'border-slate-200 focus:border-sky-500'
                          }`}
                          rows="6"
                          placeholder={section.placeholder}
                          value={localTexts[section.field] || ''}
                          onChange={(e) => handleInputChange(section.field, e.target.value)}
                          onBlur={() => section.required && handleBlur(section.field)}
                          maxLength={maxLength}
                          onKeyDown={(e) => {
                            if (charCount >= maxLength && e.key !== 'Backspace' && e.key !== 'Delete') {
                              e.preventDefault();
                            }
                          }}
                        />
                        <div className={`absolute bottom-3 right-4 text-xs px-2 py-1 rounded transition-colors duration-300 pointer-events-none select-none ${
                          isExceeded 
                            ? 'text-red-500 bg-red-50/90' 
                            : !isValid 
                              ? 'text-red-500 bg-red-50/90'
                              : 'text-slate-400 bg-slate-50/90'
                        }`}>
                          {charCount}/{maxLength}
                        </div>
                      </div>
                      
                      {!isValid && section.required && (
                        <span className="text-red-500 text-sm mt-1">Este campo es obligatorio</span>
                      )}
                      
                      {isExceeded && (
                        <span className="text-orange-500 text-sm mt-1">
                          Límite excedido en {charCount - maxLength} caracteres
                        </span>
                      )}
                      
                      <button
                        type="button"
                        onClick={() => insertExample(section.field)}
                        className="flex items-center gap-2 text-sm text-sky-500 cursor-pointer transition-all duration-200 no-underline mt-3 self-end font-medium hover:text-sky-600 hover:underline"
                      >
                        <span className="text-base transition-transform duration-200 hover:scale-110">👁️</span>
                        <span>Ver texto de ejemplo</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};