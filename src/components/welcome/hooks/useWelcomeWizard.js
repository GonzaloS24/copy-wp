import { useState } from "react";
import { saveWelcomeAnswers } from "../services/welcomeService";
import { setWorkspaceToken } from "../../../utils/workspaceStorage";

export const useWelcomeWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    salesChannel: "",
    experience: "",
    volume: "",
    goals: "",
    fullName: "",
    whatsappNumber: "",
    countryCode: "+57",
    token: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  // Estados para validación de token
  const [isValidatingToken, setIsValidatingToken] = useState(false);
  const [tokenValidationError, setTokenValidationError] = useState(null);

  const totalSteps = 8;

  const updateAnswer = (key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    if (saveError) setSaveError(null);
    if (key === "token" && tokenValidationError) setTokenValidationError(null);
  };

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const goToStep = (step) => {
    if (step >= 0 && step < totalSteps) {
      setCurrentStep(step);
    }
  };

  const isStepValid = (step) => {
    switch (step) {
      case 1:
        return !!answers.salesChannel;
      case 2:
        return !!answers.experience;
      case 3:
        return !!answers.volume;
      case 4:
        return !!answers.goals;
      case 5:
        return !!(answers.fullName && answers.whatsappNumber);
      case 6:
        return !!(
          answers.token &&
          answers.token.length >= 32 &&
          /^[A-Za-z0-9]+$/.test(answers.token)
        );
      default:
        return true;
    }
  };

  const getProgress = () => {
    if (currentStep === 0 || currentStep === 7) return 0;
    return (currentStep / 6) * 100;
  };

  const canProceed = () => {
    if (currentStep === 0 || currentStep === 7) return true;
    return isStepValid(currentStep);
  };

  // Función unificada: valida token y guarda todo si es válido
  const validateTokenAndSaveAll = async () => {
    setIsValidatingToken(true);
    setSaveError(null);
    setTokenValidationError(null);

    try {
      const token = answers.token;

      // 1. Validar formato del token
      if (!token || token.trim() === "") {
        throw new Error("Por favor ingresa un token válido");
      }

      if (token.length < 32 || !/^[A-Za-z0-9]+$/.test(token)) {
        throw new Error(
          "Token inválido. Debe tener al menos 32 caracteres alfanuméricos"
        );
      }

      // 2. Validar que los datos de la encuesta estén completos
      if (
        !answers.salesChannel ||
        !answers.experience ||
        !answers.volume ||
        !answers.goals
      ) {
        throw new Error("Faltan respuestas requeridas en la encuesta");
      }

      if (!answers.fullName || !answers.whatsappNumber) {
        throw new Error("Faltan datos de contacto requeridos");
      }

      console.log("✅ Token válido, procediendo a guardar todo...");

      // 3. Guardar respuestas en Google Sheets
      const surveyAnswers = {
        salesChannel: answers.salesChannel,
        experience: answers.experience,
        volume: answers.volume,
        goals: answers.goals,
        fullName: answers.fullName,
        whatsappNumber: answers.whatsappNumber,
        countryCode: answers.countryCode,
      };

      console.log("📝 Guardando respuestas en Google Sheets...");
      console.log("📄 Datos a enviar:", surveyAnswers);

      const surveyResult = await saveWelcomeAnswers(surveyAnswers);
      console.log("✅ Respuestas guardadas en Google Sheets:", surveyResult);

      // 4. Guardar token en base de datos
      console.log("🔐 Guardando token en base de datos...");
      const tokenResult = await saveTokenToDatabase(token);
      console.log("✅ Token guardado en base de datos:", tokenResult);

      // 5. Establecer token para el workspace
      console.log("🌐 Guardando token...");
      setWorkspaceToken(token);

      // 6. Marcar como completado SOLO si todo fue exitoso
      localStorage.setItem("welcomeWizardCompleted", "true");
      localStorage.setItem(
        "welcomeWizardCompletedAt",
        new Date().toISOString()
      );
      localStorage.removeItem("welcomeWizardBackups");

      console.log("🎉 Proceso completo exitoso");

      return {
        surveyResult,
        tokenResult,
        success: true,
        token: token,
      };
    } catch (error) {
      console.error("❌ Error en proceso unificado:", error);

      // Determinar tipo de error
      if (
        error.message.includes("Token inválido") ||
        error.message.includes("token válido")
      ) {
        setTokenValidationError(error.message);
      } else {
        setSaveError(error.message);
      }

      throw error;
    } finally {
      setIsValidatingToken(false);
    }
  };

  // Función para guardar token en base de datos
  const saveTokenToDatabase = async (token) => {
    // Simulación de consulta al backend
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Simulación de respuesta exitosa
    const mockResponse = {
      success: true,
      message: "Token guardado exitosamente en la base de datos",
      data: {
        tokenId: Math.random().toString(36).substr(2, 9),
        userId: Math.random().toString(36).substr(2, 9),
        savedAt: new Date().toISOString(),
        userInfo: {
          name: answers.fullName,
          phone: answers.whatsappNumber,
          country: answers.countryCode,
        },
      },
    };

    // TODO: Reemplazar con endpoint real cuando esté disponible
    /*
    const response = await fetch('/api/auth/save-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: token,
        userData: {
          fullName: answers.fullName,
          whatsappNumber: answers.whatsappNumber,
          countryCode: answers.countryCode
        },
        surveyData: {
          salesChannel: answers.salesChannel,
          experience: answers.experience,
          volume: answers.volume,
          goals: answers.goals
        },
        metadata: {
          completedAt: new Date().toISOString(),
          userAgent: navigator.userAgent,
          timestamp: Date.now()
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.message || 'Error al guardar token en la base de datos');
    }

    return result;
    */

    return mockResponse;
  };

  // Función simple para guardar solo encuesta (ya no se usa en el flujo principal)
  const finishWizard = async () => {
    setIsSaving(true);
    setSaveError(null);

    try {
      if (
        !answers.salesChannel ||
        !answers.experience ||
        !answers.volume ||
        !answers.goals
      ) {
        throw new Error("Faltan respuestas requeridas en la encuesta");
      }

      if (!answers.fullName || !answers.whatsappNumber) {
        throw new Error("Faltan datos de contacto requeridos");
      }

      const surveyAnswers = {
        salesChannel: answers.salesChannel,
        experience: answers.experience,
        volume: answers.volume,
        goals: answers.goals,
        fullName: answers.fullName,
        whatsappNumber: answers.whatsappNumber,
        countryCode: answers.countryCode,
      };

      const result = await saveWelcomeAnswers(surveyAnswers);
      console.log("✅ Solo encuesta guardada:", result);
      return result;
    } catch (error) {
      console.error("❌ Error al guardar encuesta:", error);
      setSaveError(error.message);
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  const retryFinish = async () => {
    try {
      setSaveError(null);
      return await finishWizard();
    } catch (error) {
      console.error("❌ Error en reintento:", error);
      throw error;
    }
  };

  const getSummary = () => {
    return {
      totalAnswers: Object.values(answers).filter(
        (answer) => answer && answer.trim()
      ).length,
      answers: answers,
      isComplete:
        isStepValid(1) &&
        isStepValid(2) &&
        isStepValid(3) &&
        isStepValid(4) &&
        isStepValid(5) &&
        isStepValid(6),
    };
  };

  return {
    currentStep,
    answers,
    totalSteps,
    isSaving,
    saveError,
    isValidatingToken,
    tokenValidationError,
    updateAnswer,
    nextStep,
    previousStep,
    goToStep,
    isStepValid,
    getProgress,
    canProceed,
    finishWizard,
    retryFinish,
    getSummary,
    setIsValidatingToken,
    setTokenValidationError,
    validateTokenAndSaveAll,
  };
};
