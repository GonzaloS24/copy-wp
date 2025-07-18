import React, { useState, useEffect } from 'react';
import { useProduct } from '../../../context/ProductContext';

export const ProductGuidePrompt = ({ guideData, onGuideDataChange }) => {
  const { validationState, updateValidationState } = useProduct();
  const [formData, setFormData] = useState(guideData || {
    contextualizacion: '',
    fichaTecnica: '',
    guionConversacional: '',
    posiblesSituaciones: '',
    reglasIA: ''
  });

  useEffect(() => {
    setFormData(guideData || {
      contextualizacion: '',
      fichaTecnica: '',
      guionConversacional: '',
      posiblesSituaciones: '',
      reglasIA: ''
    });
  }, [guideData]);

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

  const handleInputChange = (field, value) => {
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
      [field]: value
    };
    setFormData(newData);
    
    // Llamar a onGuideDataChange para actualizar el contexto padre
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

  const insertExample = (field) => {
    const examples = {
      contextualizacion: 'Eres María, una asesora de ventas especializada en productos de belleza. Te diriges a mujeres jóvenes de 18-35 años con un tono amigable y cercano, pero profesional. Evita ser demasiado formal y usa un lenguaje natural que genere confianza.',
      fichaTecnica: 'Producto: Serum Anti-edad Premium\nPrecio: $89.99 (25% de descuento por tiempo limitado)\nEnvío: 24-48 horas a nivel nacional\nCaracterísticas: Contiene ácido hialurónico, vitamina C, reduce arrugas en 15 días, dermatológicamente probado.',
      guionConversacional: '1. Saludo personalizado y presentación del producto\n2. Identificar necesidades específicas del cliente\n3. Destacar beneficios que resuelvan sus problemas\n4. Manejar objeciones con empatía\n5. Crear urgencia con la oferta limitada\n6. Facilitar el proceso de compra\n7. Seguimiento post-venta',
      posiblesSituaciones: 'Duda sobre efectividad: Mostrar testimonios y garantía\nPrecio elevado: Destacar relación calidad-precio y financiación\nDesconfianza online: Ofrecer referencias y política de devolución\nComparación con competencia: Enfocarse en diferenciadores únicos',
      reglasIA: 'Nunca presionar agresivamente para la venta\nResponder con empatía ante dudas\nNo prometer resultados no respaldados\nMantener conversación natural y fluida\nSiempre ofrecer información de contacto adicional'
    };
    
    const newData = {
      ...formData,
      [field]: examples[field] || '...'
    };
    
    setFormData(newData);
    
    // Asegurar que se actualice el contexto padre
    if (onGuideDataChange) {
      onGuideDataChange(newData);
    }
    
    // Marcar el campo como tocado
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
          numberClass: "from-blue-500 to-blue-600"
        },
        {
          number: 2,
          title: "Ficha técnica del producto",
          required: true,
          placeholder: "Ingresa el nombre del producto, el precio o promoción, los tiempos de envío y las características más importantes del producto.",
          field: "fichaTecnica",
          numberClass: "from-blue-500 to-blue-600"
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
          numberClass: "from-green-500 to-green-600"
        },
        {
          number: 4,
          title: "Posibles situaciones",
          required: true,
          placeholder: "¿Qué dudas o preguntas podría tener el cliente durante la conversación? ¿Cómo debería responder la IA ante cada una de ellas?",
          field: "posiblesSituaciones",
          numberClass: "from-green-500 to-green-600"
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
          numberClass: "from-amber-500 to-amber-600"
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
            {/* Stage Header */}
            <div className={`bg-gradient-to-r ${stage.headerClass} p-8 border-b border-slate-200 text-center`}>
              <h2 className="text-2xl font-bold text-slate-700 mb-2 flex items-center justify-center gap-3">
                {stage.title}
              </h2>
              <p className="text-base text-slate-600 m-0 leading-6">
                {stage.description}
              </p>
            </div>

            {/* Sections */}
            <div>
              {stage.sections.map((section, sectionIndex) => (
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
                    <textarea
                      className={`min-h-[120px] font-sans leading-6 resize-y border-2 rounded-xl p-4 px-5 transition-all duration-300 focus:outline-none focus:ring-3 focus:ring-sky-500/10 placeholder-slate-400 placeholder:leading-6 ${
                        !isFieldValid(section.field) 
                          ? 'border-red-500 bg-red-50 focus:border-red-500' 
                          : 'border-slate-200 bg-slate-50 focus:bg-white focus:border-sky-500'
                      }`}
                      rows="6"
                      placeholder={section.placeholder}
                      value={formData[section.field] || ''}
                      onChange={(e) => handleInputChange(section.field, e.target.value)}
                      onBlur={() => section.required && handleBlur(section.field)}
                    />
                    {!isFieldValid(section.field) && section.required && (
                      <span className="text-red-500 text-sm mt-1">Este campo es obligatorio</span>
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
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};