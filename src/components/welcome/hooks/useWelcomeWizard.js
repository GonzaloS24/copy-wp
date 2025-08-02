import { useState } from "react";
import { saveWelcomeAnswers } from "../services/welcomeService";

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
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  const totalSteps = 7;

  const updateAnswer = (key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    if (saveError) setSaveError(null);
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
      default:
        return true;
    }
  };

  const getProgress = () => {
    if (currentStep === 0 || currentStep === 6) return 0;
    return (currentStep / 5) * 100;
  };

  const canProceed = () => {
    if (currentStep === 0 || currentStep === 6) return true;
    return isStepValid(currentStep);
  };

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

      // Guardar las respuestas en Google Sheets
      const result = await saveWelcomeAnswers(answers);

      console.log("✅ Respuestas guardadas exitosamente:", result);

      // Marcar como completado solo si se guardó exitosamente
      localStorage.setItem("welcomeWizardCompleted", "true");
      localStorage.setItem(
        "welcomeWizardCompletedAt",
        new Date().toISOString()
      );

      // Limpiar respaldos locales si existían
      localStorage.removeItem("welcomeWizardBackups");

      return result;
    } catch (error) {
      console.error("❌ Error al finalizar wizard:", error);
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
        isStepValid(5),
    };
  };

  return {
    currentStep,
    answers,
    totalSteps,
    isSaving,
    saveError,
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
  };
};
