import { useWelcomeWizard } from "../../hooks/useWelcomeWizard";
import ProgressBar from "./shared/ProgressBar";

// Importar todos los pasos
import Step0Welcome from "./steps/Step0Welcome";
import Step1SalesChannel from "./steps/Step1SalesChannel";
import Step2Experience from "./steps/Step2Experience";
import Step3Volume from "./steps/Step3Volume";
import Step4Goals from "./steps/Step4Goals";
import Step5Contact from "./steps/Step5Contact";

const WelcomeWizard = ({ onComplete }) => {
  const {
    currentStep,
    answers,
    totalSteps,
    updateAnswer,
    nextStep,
    previousStep,
    getProgress,
    canProceed,
    finishWizard,
  } = useWelcomeWizard();

  const handleNext = async () => {
    if (currentStep === totalSteps - 2) {
      await finishWizard();
    }
    nextStep();
  };

  const handleSkip = () => {
    nextStep();
  };

  const handleFinish = async () => {
    await finishWizard();
    onComplete();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <Step0Welcome onNext={nextStep} />;

      case 1:
        return (
          <Step1SalesChannel
            selectedValue={answers.salesChannel}
            onSelect={(value) => updateAnswer("salesChannel", value)}
            onNext={handleNext}
            onSkip={handleSkip}
            canProceed={canProceed()}
          />
        );

      case 2:
        return (
          <Step2Experience
            selectedValue={answers.experience}
            onSelect={(value) => updateAnswer("experience", value)}
            onNext={handleNext}
            onPrevious={previousStep}
            onSkip={handleSkip}
            canProceed={canProceed()}
          />
        );

      case 3:
        return (
          <Step3Volume
            selectedValue={answers.volume}
            onSelect={(value) => updateAnswer("volume", value)}
            onNext={handleNext}
            onPrevious={previousStep}
            onSkip={handleSkip}
            canProceed={canProceed()}
          />
        );

      case 4:
        return (
          <Step4Goals
            selectedValue={answers.goals}
            onSelect={(value) => updateAnswer("goals", value)}
            onNext={handleNext}
            onPrevious={previousStep}
            onSkip={handleSkip}
            canProceed={canProceed()}
          />
        );

      case 5:
        return (
          <Step5Contact
            fullName={answers.fullName}
            whatsappNumber={answers.whatsappNumber}
            onNameChange={(value) => updateAnswer("fullName", value)}
            onPhoneChange={(value) => updateAnswer("whatsappNumber", value)}
            onNext={handleNext}
            onPrevious={previousStep}
            onSkip={handleSkip}
            canProceed={canProceed()}
          />
        );

      case 6:
        return (
          <div className="text-center max-w-2xl mx-auto px-8">
            <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center shadow-xl">
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
              >
                <path d="M9 11l3 3 8-8"></path>
                <path d="M21 12c0 1.66-.046 3.22-.134 4.54a2.53 2.53 0 0 1-2.62 2.46c-1.32.08-2.87.12-4.24.12-1.37 0-2.92-.04-4.24-.12a2.53 2.53 0 0 1-2.62-2.46A50.71 50.71 0 0 1 7 12a50.71 50.71 0 0 1 .134-4.54A2.53 2.53 0 0 1 10.24 5c1.32-.08 2.87-.12 4.24-.12 1.37 0 2.92.04 4.24.12a2.53 2.53 0 0 1 2.62 2.46C20.954 8.78 21 10.34 21 12Z"></path>
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-emerald-600 mb-4">
              ¡Gracias!
            </h1>
            <h2 className="text-2xl font-semibold text-slate-700 mb-6">
              Personalizamos tu experiencia
            </h2>
            <p className="text-lg text-slate-600 mb-10">
              Hemos configurado Chatea PRO según tus necesidades. Ahora verás
              recomendaciones y asistentes más relevantes para tu negocio.
            </p>
            <button
              onClick={handleFinish}
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-12 py-4 rounded-2xl text-xl font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-xl"
            >
              Continuar a la plataforma
            </button>
          </div>
        );

      default:
        return <Step0Welcome onNext={nextStep} />;
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-50 to-slate-100 z-[5000] overflow-hidden">
      <div className="relative w-full h-full flex items-center justify-center p-8">
        <ProgressBar
          progress={getProgress()}
          currentStep={currentStep}
          totalSteps={totalSteps}
        />

        <div
          className={`transition-all duration-500 ease-in-out w-full max-w-6xl ${
            currentStep === 0 || currentStep === 6 ? "mt-0" : "mt-16"
          }`}
        >
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default WelcomeWizard;
