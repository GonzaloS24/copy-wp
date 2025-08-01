import { useState } from "react";

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

  const totalSteps = 7;

  const updateAnswer = (key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
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

  const saveProgress = async () => {
    // API para guardar progreso
    console.log("Guardando progreso:", answers);
  };

  const finishWizard = async () => {
    await saveProgress();
    localStorage.setItem("welcomeWizardCompleted", "true");
  };

  return {
    currentStep,
    answers,
    totalSteps,
    updateAnswer,
    nextStep,
    previousStep,
    goToStep,
    isStepValid,
    getProgress,
    canProceed,
    saveProgress,
    finishWizard,
  };
};
