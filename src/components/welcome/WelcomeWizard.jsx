import { useState } from "react";
import { useWelcomeWizard } from "./hooks/useWelcomeWizard";
import ProgressBar from "./components/ProgressBar";
import Step0Welcome from "./steps/Step0Welcome";
import Step1SalesChannel from "./steps/Step1SalesChannel";
import Step2Experience from "./steps/Step2Experience";
import Step3Volume from "./steps/Step3Volume";
import Step4Goals from "./steps/Step4Goals";
import Step5Contact from "./steps/Step5Contact";
import "./styles/animations.css";

const WelcomeWizard = ({ onComplete }) => {
  const {
    currentStep,
    answers,
    totalSteps,
    isSaving,
    saveError,
    updateAnswer,
    nextStep,
    previousStep,
    getProgress,
    canProceed,
    finishWizard,
    retryFinish,
  } = useWelcomeWizard();

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState(1);

  // Override nextStep y previousStep para manejar animaciones
  const animatedNextStep = () => {
    setDirection(1);
    setIsTransitioning(true);
    setTimeout(() => {
      nextStep();
      setIsTransitioning(false);
    }, 150);
  };

  const animatedPreviousStep = () => {
    setDirection(-1);
    setIsTransitioning(true);
    setTimeout(() => {
      previousStep();
      setIsTransitioning(false);
    }, 150);
  };

  const handleNext = async () => {
    if (currentStep === totalSteps - 2) {
      try {
        await finishWizard();
        animatedNextStep();
      } catch (error) {
        console.error("No se pudo guardar, no avanzando al siguiente paso");
      }
    } else {
      animatedNextStep();
    }
  };

  const handlePrevious = () => {
    animatedPreviousStep();
  };

  const handleFinish = async () => {
    try {
      if (saveError) {
        // Si hubo un error previo, reintentar
        await retryFinish();
      }
      onComplete();
    } catch (error) {
      console.error("Error al finalizar:", error);
    }
  };

  const handleRetry = async () => {
    try {
      await retryFinish();
      animatedNextStep();
    } catch (error) {
      console.error("Error en reintento:", error);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <Step0Welcome onNext={animatedNextStep} />;

      case 1:
        return (
          <Step1SalesChannel
            selectedValue={answers.salesChannel}
            onSelect={(value) => updateAnswer("salesChannel", value)}
            onNext={handleNext}
            onPrevious={handlePrevious}
            canProceed={canProceed()}
          />
        );

      case 2:
        return (
          <Step2Experience
            selectedValue={answers.experience}
            onSelect={(value) => updateAnswer("experience", value)}
            onNext={handleNext}
            onPrevious={handlePrevious}
            canProceed={canProceed()}
          />
        );

      case 3:
        return (
          <Step3Volume
            selectedValue={answers.volume}
            onSelect={(value) => updateAnswer("volume", value)}
            onNext={handleNext}
            onPrevious={handlePrevious}
            canProceed={canProceed()}
          />
        );

      case 4:
        return (
          <Step4Goals
            selectedValue={answers.goals}
            onSelect={(value) => updateAnswer("goals", value)}
            onNext={handleNext}
            onPrevious={handlePrevious}
            canProceed={canProceed()}
          />
        );

      case 5:
        return (
          <Step5Contact
            fullName={answers.fullName}
            whatsappNumber={answers.whatsappNumber}
            countryCode={answers.countryCode}
            onNameChange={(value) => updateAnswer("fullName", value)}
            onPhoneChange={(value) => updateAnswer("whatsappNumber", value)}
            onCountryCodeChange={(value) => updateAnswer("countryCode", value)}
            onNext={handleNext}
            onPrevious={handlePrevious}
            canProceed={canProceed()}
            isSaving={isSaving}
            saveError={saveError}
            onRetry={handleRetry}
          />
        );

      case 6:
        return (
          <div className="text-center max-w-2xl mx-auto px-8 animate-fade-in">
            <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl relative overflow-hidden animate-scale-in">
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent"></div>

              <svg
                className="w-16 h-16 text-white relative z-10 animate-draw-check"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </div>

            <h1 className="text-4xl font-bold text-emerald-600 mb-4 tracking-tight animate-slide-up-1">
              ¡Gracias!
            </h1>
            <h2 className="text-2xl font-semibold text-slate-700 mb-6 leading-tight animate-slide-up-2">
              Respuestas guardadas exitosamente
            </h2>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-xl mx-auto animate-slide-up-3">
              Hemos configurado Chatea PRO según tus necesidades y guardado tus
              respuestas. Ahora verás recomendaciones y asistentes más
              relevantes para tu negocio.
            </p>

            {saveError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl shadow-sm animate-slide-up-3">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-red-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-red-700 font-semibold mb-1">
                      Hubo un problema al guardar
                    </p>
                    <p className="text-red-600 text-sm mb-4">{saveError}</p>
                    <button
                      onClick={handleRetry}
                      disabled={isSaving}
                      className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 disabled:opacity-50 font-medium transition-all duration-200 hover:shadow-md"
                    >
                      {isSaving ? "Reintentando..." : "Reintentar guardado"}
                    </button>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={handleFinish}
              disabled={isSaving}
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-12 py-4 rounded-2xl text-xl font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-xl animate-slide-up-4 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? "Guardando..." : "Continuar a la plataforma"}
            </button>
          </div>
        );

      default:
        return <Step0Welcome onNext={animatedNextStep} />;
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-50 to-slate-100 z-[5000]">
      <div className="relative w-full h-full overflow-y-auto">
        <ProgressBar
          progress={getProgress()}
          currentStep={currentStep}
          totalSteps={totalSteps}
        />

        <div className="flex items-center justify-center min-h-full p-4 sm:p-0">
          <div
            className={`w-full max-w-6xl transition-all duration-500 ease-in-out ${
              currentStep === 0 || currentStep === 6 ? "mt-0" : "mt-16 sm:mt-16"
            }`}
          >
            <div
              className={`step-transition ${
                isTransitioning
                  ? direction > 0
                    ? "transform translate-x-8 opacity-0 scale-[0.98]"
                    : "transform -translate-x-8 opacity-0 scale-[0.98]"
                  : "transform translate-x-0 opacity-100 scale-100"
              }`}
            >
              {renderStep()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeWizard;
