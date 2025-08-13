import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { baseAsistentes } from "../utils/asistentUtils";
import AssistantInstaller from "../components/AssistantInstaller";
import { MainLayout } from "../components/MainLayout";

export const ConfigureAsistent = () => {
  const { template_ns } = useParams();
  const navigate = useNavigate();
  const [asistente, setAsistente] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
    const foundAsistente = baseAsistentes.find(
      (a) => a.template_ns === template_ns
    );

    if (!foundAsistente) {
      navigate("/");
      return;
    }

    setAsistente(foundAsistente);

    if (template_ns === "zkyasze0q8tquwio0fnirvbdgcp0luva") {
      console.log(
        "[ConfigureAsistent] Asistente logístico - redirigiendo directamente"
      );
      navigate("/asistente-logistico", {
        state: { activeTab: "generalConfig" },
      });
      return;
    }

    setIsLoading(false);
  }, [template_ns, navigate]);

  const handleInstallComplete = () => {
    const content = getDynamicContent();
    navigate(content.src, { state: { activeTab: content.defaultTab } });
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
