import { GOOGLE_APPS_SCRIPT_URL } from "../../utils/backendUrl";
import {
  setCurrentWorkspace,
  getCurrentWorkspace,
  setWorkspaceToken,
} from "../../utils/workspace";
import { initializeWorkspace } from "../../utils/workspace/workspaceUtils";
import { checkWorkspaceToken } from "../workspace/workspaceService";

// Mapeo de respuestas a texto completo
const RESPONSE_MAPPINGS = {
  salesChannel: {
    whatsapp: "WhatsApp",
    online: "Landing o tienda online",
    "no-vendiendo": "Aún no estoy vendiendo",
  },
  experience: {
    iniciando: "Estoy iniciando",
    "menos-3-meses": "Menos de 3 meses",
    "3-meses-1-año": "Entre 3 meses y 1 año",
    "mas-1-año": "Más de 1 año",
  },
  volume: {
    "0-10": "De 0 a 10 pedidos",
    "10-50": "De 10 a 50 pedidos",
    "50-100": "De 50 a 100 pedidos",
    "100+": "Más de 100 pedidos",
  },
  goals: {
    "aumentar-ventas": "Aumentar ventas",
    "atencion-cliente": "Mejorar atención al cliente",
    automatizar: "Automatizar procesos",
    todo: "Todo lo anterior",
  },
};

/**
 * Función principal para determinar si mostrar el wizard
 */
export const shouldShowWelcomeWizard = async () => {
  try {
    console.log("[Welcome] Verificando si mostrar wizard...");

    // 1. Obtener workspaceId de la URL o de cookies
    let workspaceId = await initializeWorkspace();

    if (!workspaceId) {
      // Si no está en URL, intentar obtener de cookies
      workspaceId = getCurrentWorkspace();
      console.log(`[Welcome] WorkspaceId desde cookies: ${workspaceId}`);
    }

    if (!workspaceId) {
      console.warn("[Welcome] No se encontró workspaceId - mostrar wizard");
      return true;
    }

    // 2. Guardar workspaceId en cookies
    setCurrentWorkspace(workspaceId);

    const result = await checkWorkspaceToken(workspaceId);

    if (result.success && result.hasToken) {
      // Workspace configurado - guardar token
      setWorkspaceToken(result.token);
      console.log("[Welcome] Workspace configurado - NO mostrar wizard");
      return false;
    } else if (result.success && !result.hasToken) {
      console.log("[Welcome] Workspace sin configurar - SÍ mostrar wizard");
      return true;
    } else {
      console.error("[Welcome] Error al consultar workspace:", result.error);
      return true; // Por seguridad, mostrar wizard si hay error
    }
  } catch (error) {
    console.error("[Welcome] Error al consultar endpoint:", error);
    return true; // Por seguridad, mostrar wizard si hay error
  }
};

// Función para convertir respuestas abreviadas a texto completo
const getFullResponseText = (category, value) => {
  if (!value) return "";
  return RESPONSE_MAPPINGS[category]?.[value] || value;
};

// Función para formatear el número de WhatsApp
const formatWhatsAppNumber = (countryCode, number) => {
  if (!number) return "";
  return number.trim();
};

export const saveWelcomeAnswers = async (answers) => {
  console.log("📤 Iniciando guardado de respuestas:", answers);

  try {
    // Verificar la URL del webhook
    if (!GOOGLE_APPS_SCRIPT_URL) {
      throw new Error("URL del webhook de Google Apps Script no configurada");
    }

    // Validar que answers tenga los campos requeridos
    if (!answers || typeof answers !== "object") {
      throw new Error("Respuestas inválidas o vacías");
    }

    // Verificar campos requeridos
    const requiredFields = [
      "salesChannel",
      "experience",
      "volume",
      "goals",
      "fullName",
      "whatsappNumber",
    ];
    const missingFields = requiredFields.filter((field) => !answers[field]);

    if (missingFields.length > 0) {
      throw new Error(`Faltan campos requeridos: ${missingFields.join(", ")}`);
    }

    console.log("✅ Validación de campos exitosa");

    // Preparar los datos con las respuestas completas
    const formData = new FormData();

    // Convertir respuestas a texto completo
    formData.append(
      "salesChannel",
      getFullResponseText("salesChannel", answers.salesChannel)
    );
    formData.append(
      "experience",
      getFullResponseText("experience", answers.experience)
    );
    formData.append("volume", getFullResponseText("volume", answers.volume));
    formData.append("goals", getFullResponseText("goals", answers.goals));
    formData.append("fullName", answers.fullName || "");
    formData.append(
      "whatsappNumber",
      formatWhatsAppNumber(answers.countryCode, answers.whatsappNumber)
    );
    formData.append("countryCode", answers.countryCode || "");

    console.log("📋 Datos preparados para envío");
    console.log("🌐 Enviando petición a Google Apps Script...");

    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: "POST",
      body: formData,
    });

    console.log("📡 Respuesta recibida, status:", response.status);

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    console.log("📄 Resultado parseado:", result);

    if (!result.success) {
      throw new Error(result.error || "Error desconocido al guardar");
    }

    console.log("✅ Respuestas guardadas exitosamente en Google Sheets");
    return result;
  } catch (error) {
    console.error("❌ Error al guardar respuestas:", error);

    // Manejar diferentes tipos de errores
    let errorMessage = error.message;
    if (!navigator.onLine) {
      errorMessage =
        "Sin conexión a internet. Verifica tu conexión y vuelve a intentar.";
    } else if (error.message.includes("Failed to fetch")) {
      errorMessage = "Error de conexión. Verifica tu conexión a internet.";
    }

    // Guardar en localStorage como respaldo
    try {
      const backupData = {
        timestamp: new Date().toISOString(),
        answers: answers,
        error: errorMessage,
        originalError: error.message,
      };

      let backups = JSON.parse(
        localStorage.getItem("welcomeWizardBackups") || "[]"
      );
      backups.push(backupData);

      // Mantener solo los últimos 10 respaldos
      if (backups.length > 10) {
        backups = backups.slice(-10);
      }

      localStorage.setItem("welcomeWizardBackups", JSON.stringify(backups));
      console.log("💾 Respaldo guardado en localStorage");
    } catch (backupError) {
      console.error("❌ Error al crear respaldo local:", backupError);
    }

    const enhancedError = new Error(errorMessage);
    enhancedError.originalError = error;
    throw enhancedError;
  }
};
