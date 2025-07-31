import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { baseAsistentes } from '../utils/asistentUtils';
import { MainLayout } from '../components/MainLayout';

export const ConfigureAsistent = () => {
  const { template_ns } = useParams();
  const navigate = useNavigate();
  const [asistente, setAsistente] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAsistente = async () => {
      try {
        const foundAsistente = baseAsistentes.find(a => a.template_ns === template_ns);
        
        if (!foundAsistente) {
          throw new Error('Asistente no encontrado');
        }

        setAsistente(foundAsistente);
      } catch (error) {
        console.error('Error cargando asistente:', error);
        navigate('/'); 
      } finally {
        setIsLoading(false);
      }
    };

    loadAsistente();
  }, [template_ns, navigate]);

  const getDynamicContent = () => {
    switch (template_ns) {
      case "zkyasze0q8tquwio0fnirvbdgcp0luva":
        return {
          title: `Configuración del Asistente Logístico`,
          videoDescription:
            "Aprende a configurar el seguimiento de guías y solución de novedades.",
          benefits: [
            "Automatiza el seguimiento de envíos",
            "Notifica novedades automáticamente",
            "Integración con principales transportistas",
          ],
          buttonText: "Guardar Configuración Logística",
          defaultTab: "generalConfig",
          src: "/asistente-logistico",
        };
      case "ventas-wp-template":
        return {
          title: `Configuración del Asistente de Ventas WhatsApp`,
          videoDescription:
            "Aprende a automatizar tus conversaciones de venta.",
          benefits: [
            "Responde automáticamente a consultas",
            "Segmenta clientes por interés",
            "Envía catálogos automáticamente",
          ],
          buttonText: "Guardar Configuración WhatsApp",
          defaultTab: "productos",
          src: "/productos-config",
        };
      case 'mjvisba1ugmhdttuqnbpvjtocbllluea':
        return {
          title: `Configuración del Asistente de carritos abandonados`,
          videoDescription: 'Aprende a recuperar ventas automaticamente.',
          benefits: [
            'Recupera hasta un 20% de carritos abandonados',
            'Instalación rapida en segundos',
            'Mensajes automáticos y personalizados',
            'Aumenta tus ventas sin esfuerzo adicional'
          ],
          buttonText: 'Guardar Configuración de carritos',
          src: "/asistente-carritos",
        };
      default:
        return {
          title: `Configuración del Asistente`,
          videoDescription:
            "Aprende a configurar este asistente para tu negocio.",
          benefits: [
            "Automatiza procesos clave",
            "Mejora la experiencia del cliente",
            "Fácil de configurar y usar",
          ],
          buttonText: "Guardar Configuración",
          defaultTab: "productos",
          src: "/productos-config",
        };
    }
  };

  const handleSave = (route, activeTab) => {
    alert(`Configuración guardada para ${asistente?.title}`);

    navigate(route, { state: { activeTab } });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!asistente) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-4">
            Asistente no encontrado
          </h2>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  const content = getDynamicContent();

  return (
    <MainLayout>
      <section className="w-full py-16 px-8 bg-slate-50 min-h-[calc(100vh-80px)] flex items-center justify-center">
        <div className="bg-white rounded-3xl p-12 shadow-xl border border-slate-200 max-w-6xl w-full relative">
          <button
            onClick={() => navigate("/")}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors duration-200"
          >
            &times;
          </button>

          <h1 className="text-4xl font-bold text-center text-blue-600 mb-12">
            {content.title}
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="config-section">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Configuración
              </h2>

              <div className="space-y-6">
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre del asistente
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    defaultValue={asistente.title}
                  />
                </div>

                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción
                  </label>
                  <textarea
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    rows="3"
                    defaultValue={asistente.description}
                  ></textarea>
                </div>

                {template_ns === "ventas-wp-template" && (
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Número de WhatsApp
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="+569XXXXXXXX"
                    />
                  </div>
                )}

                {template_ns === "zkyasze0q8tquwio0fnirvbdgcp0luva" && (
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Transportistas asociados
                    </label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
                      <option>Seleccione transportistas</option>
                      <option>Chilexpress</option>
                      <option>Starken</option>
                      <option>Blue Express</option>
                    </select>
                  </div>
                )}
              </div>
            </div>

            <div className="presentacion-section">
              <div className="video-container w-full mb-8">
                <div className="w-full h-48 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl relative overflow-hidden cursor-pointer transition-transform duration-200 hover:-translate-y-1 shadow-lg shadow-blue-500/25">
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-6">
                    <div className="mb-4 transition-transform duration-200 hover:scale-110">
                      <span className="text-3xl">▶️</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-white">
                      Video Tutorial
                    </h3>
                    <p className="text-xs text-white/90 leading-relaxed">
                      {content.videoDescription}
                    </p>
                  </div>
                </div>
              </div>

              <div className="beneficios-section">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Beneficios
                </h3>
                <ul className="space-y-3">
                  {content.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handleSave(content.src, content.defaultTab)}
                className="mt-8 w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold shadow-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
              >
                {content.buttonText}
              </button>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};
