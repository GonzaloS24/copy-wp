import { getWorkspaceIdFromUrl } from "../../../utils/workspaceUtils";
import { setCurrentWorkspace, getCurrentWorkspace, setWorkspaceToken } from "../../../utils/workspaceStorage";

// URL del webhook de Google Apps Script
const GOOGLE_APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyVoOL1g_5uTkB3s1vABHDns6ICIJlTz9WU79rOR-7bHvhTReglX4pNbdBKwxIivkiB/exec";

// URL del servicio de configuración del workspace
const WORKSPACE_CONFIG_URL = "https://workspace-wizard-config-service-26551171030.us-east1.run.app/api/workspace/token";

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
    let workspaceId = getWorkspaceIdFromUrl();
    
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
    
    // 3. Consultar endpoint siempre
    console.log(`[Welcome] Consultando endpoint para workspace: ${workspaceId}`);
    
    const response = await fetch(`${WORKSPACE_CONFIG_URL}/${workspaceId}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*'
      }
    });
    
    if (response.status === 200) {
      // Workspace configurado - obtener y guardar el token
      const responseText = await response.text();
      console.log("[Welcome] Token recibido del servidor");
      
      let token = responseText.trim();
      
      // parsearlo
      if (token.startsWith('{') || token.startsWith('[')) {
        try {
          const data = JSON.parse(token);
          token = data.token || data.data?.token || data;
        } catch (jsonError) {
          // Es texto plano, usar directamente
        }
      }
      
      // Guardar token si es válido
      if (token && token.length >= 32) {
        setWorkspaceToken(token);
        console.log("[Welcome] Token guardado exitosamente");
      }
      
      console.log("[Welcome] Workspace configurado - NO mostrar wizard");
      return false;
    } else if (response.status === 404) {
      console.log("[Welcome] Workspace sin configurar - SÍ mostrar wizard");
      return true;
    } else {
      console.error(`[Welcome] Error ${response.status} - mostrar wizard por seguridad`);
      return true;
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