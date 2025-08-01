import { useWelcomeWizard } from "../../hooks/useWelcomeWizard";
import ProgressBar from "./shared/ProgressBar";
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
            countryCode={answers.countryCode}
            onNameChange={(value) => updateAnswer("fullName", value)}
            onPhoneChange={(value) => updateAnswer("whatsappNumber", value)}
            onCountryCodeChange={(value) => updateAnswer("countryCode", value)}
            onNext={handleNext}
            onPrevious={previousStep}
            onSkip={handleSkip}
            canProceed={canProceed()}
          />
        );

      case 6:
        return (
          <div className="text-center max-w-2xl mx-auto px-8">
            <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent"></div>

              <svg
                className="w-16 h-16 text-white relative z-10"
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

            <h1 className="text-4xl font-bold text-emerald-600 mb-4 tracking-tight">
              ¡Gracias!
            </h1>
            <h2 className="text-2xl font-semibold text-slate-700 mb-6 leading-tight">
              Personalizamos tu experiencia
            </h2>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-xl mx-auto">
              Hemos configurado Chatea PRO según tus necesidades. Ahora verás
              recomendaciones y asistentes más relevantes para tu negocio.
            </p>
            <button
              onClick={handleFinish}
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-12 py-4 rounded-2xl text-xl font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-xl transform active:scale-95"
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
