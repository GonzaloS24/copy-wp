import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { baseAsistentes } from "../utils/asistentUtils";
import {
  getInstalledAssistants,
  isAssistantInstalled,
} from "../services/asistentService";
import AssistantInstaller from "../components/AssistantInstaller";
import { MainLayout } from "../components/MainLayout";

export const ConfigureAsistent = () => {
  const { template_ns } = useParams();
  const navigate = useNavigate();
  const [asistente, setAsistente] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInstalled, setIsInstalled] = useState(false);

  const getDynamicContent = () => {
    switch (template_ns) {
      case "zkyasze0q8tquwio0fnirvbdgcp0luva":
        return {
          title: `Descubre cómo este asistente puede ayudarte a automatizar el seguimiento logístico`,
          videoDescription:
            "Aprende a configurar el seguimiento de guías y solución de novedades.",
          benefits: [
            "Automatiza el seguimiento de envíos",
            "Notifica novedades automáticamente",
            "Integración con principales transportistas",
          ],
          src: "/asistente-logistico",
          defaultTab: "generalConfig",
        };
      case "6oaa4zwoupsuuhmsdregbas919fhocgh":
        return {
          title: `Descubre cómo este asistente puede ayudarte a escalar tus ventas por WhatsApp automáticamente`,
          videoDescription:
            "Aprende a automatizar tus conversaciones de venta.",
          benefits: [
            "Responde automáticamente a consultas",
            "Segmenta clientes por interés",
            "Envía catálogos automáticamente",
            "Convierte más del 10% de leads",
          ],
          src: "/productos-config",
          defaultTab: "productos",
        };
      case "mjvisba1ugmhdttuqnbpvjtocbllluea":
        return {
          title: `Descubre cómo este asistente puede ayudarte a recuperar ventas automáticamente`,
          videoDescription: "Aprende a recuperar carritos abandonados.",
          benefits: [
            "Recupera hasta un 20% de carritos abandonados",
            "Instalación rápida en segundos",
            "Mensajes automáticos y personalizados",
            "Aumenta tus ventas sin esfuerzo adicional",
          ],
          src: "/asistente-carritos",
        };
      case "ugmasxccs5mpnzqj4rb1ex9rdvld4diu":
        return {
          title: `Descubre cómo este asistente puede ayudarte a gestionar comentarios automáticamente`,
          videoDescription: "Aprende a automatizar la gestión de comentarios.",
          benefits: [
            "Elimina comentarios negativos automáticamente",
            "Convierte comentarios en ventas",
            "Respuesta automática en redes sociales",
            "Mejora tu reputación online",
          ],
          src: "/productos-config",
          defaultTab: "productos",
        };
      case "byu2drpxtxhmcbgvyuktxrjyofbmemha":
        return {
          title: `Descubre cómo este asistente puede ayudarte con remarketing automático`,
          videoDescription: "Aprende a automatizar el remarketing.",
          benefits: [
            "Reactiva clientes inactivos",
            "Campañas automáticas personalizadas",
            "Aumenta el valor de vida del cliente",
            "Fideliza a tus compradores",
          ],
          src: "/productos-config",
          defaultTab: "productos",
        };
      default:
        return {
          title: `Descubre cómo este asistente puede ayudarte a automatizar tu negocio`,
          videoDescription:
            "Aprende a configurar este asistente para tu negocio.",
          benefits: [
            "Automatiza procesos clave",
            "Mejora la experiencia del cliente",
            "Fácil de configurar y usar",
          ],
          src: "/productos-config",
          defaultTab: "productos",
        };
    }
  };

  useEffect(() => {
    const checkAssistantStatus = async () => {
      try {
        setIsLoading(true);

        console.log(
          `[ConfigureAsistent] Verificando estado del template: ${template_ns}`
        );

        // Buscar el asistente en la lista base
        const foundAsistente = baseAsistentes.find(
          (a) => a.template_ns === template_ns
        );

        if (!foundAsistente) {
          console.warn(
            `[ConfigureAsistent] Template ${template_ns} no encontrado`
          );
          navigate("/");
          return;
        }

        setAsistente(foundAsistente);

        // Verificar si está instalado
        try {
          const installedData = await getInstalledAssistants();
          const assistantInstalled = isAssistantInstalled(
            template_ns,
            installedData
          );

          console.log(
            `[ConfigureAsistent] ¿Asistente instalado?`,
            assistantInstalled
          );
          setIsInstalled(assistantInstalled);

          // Si está instalado, redirigir directamente a la configuración
          if (assistantInstalled) {
            const content = getDynamicContent();
            console.log(
              `[ConfigureAsistent] Asistente ya instalado, redirigiendo a: ${content.src}`
            );
            navigate(content.src, { state: { activeTab: content.defaultTab } });
            return;
          }

          // Caso especial para el asistente logístico
          if (template_ns === "zkyasze0q8tquwio0fnirvbdgcp0luva") {
            navigate("/asistente-logistico", {
              state: { activeTab: "generalConfig" },
            });
            return;
          }
        } catch (statusError) {
          console.error(
            "[ConfigureAsistent] Error verificando estado:",
            statusError
          );
          // En caso de error, mostrar el instalador
          setIsInstalled(false);
        }
      } catch (error) {
        console.error("[ConfigureAsistent] Error general:", error);
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    };

    if (template_ns) {
      checkAssistantStatus();
    }
  }, [template_ns, navigate]);

  const handleInstallComplete = () => {
    console.log("[ConfigureAsistent] Instalación completada");
    const content = getDynamicContent();
    navigate(content.src, { state: { activeTab: content.defaultTab } });
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-slate-600">
              Verificando estado del asistente...
            </p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!asistente) {
    return (
      <MainLayout>
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
      </MainLayout>
    );
  }

  // mostrar el instalador
  const content = getDynamicContent();

  return (
    <MainLayout>
      <AssistantInstaller
        template_ns={template_ns}
        title={content.title}
        benefits={content.benefits}
        videoDescription={content.videoDescription}
        onInstall={handleInstallComplete}
      />
    </MainLayout>
  );
};
