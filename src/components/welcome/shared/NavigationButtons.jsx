const NavigationButtons = ({
  currentStep,
  canProceed,
  onNext,
  onPrevious,
  onSkip,
  isLastStep = false,
}) => {
  if (currentStep === 0 || currentStep === 6) {
    return null;
  }

  return (
    <div className="flex justify-between items-center w-full max-w-md mx-auto mt-8">
      {currentStep > 1 ? (
        <button
          onClick={onPrevious}
          className="px-6 py-3 text-sky-600 font-medium hover:text-sky-700 transition-colors duration-200"
        >
          ← Anterior
        </button>
      ) : (
        <div></div>
      )}

      <div className="flex items-center gap-4">
        <button
          onClick={onSkip}
          className="text-slate-500 hover:text-slate-600 transition-colors duration-200 text-sm font-medium"
        >
          Saltar
        </button>

        <button
          onClick={onNext}
          disabled={!canProceed}
          className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
            canProceed
              ? "bg-gradient-to-r from-sky-500 to-sky-600 text-white hover:from-sky-600 hover:to-sky-700 hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
              : "bg-slate-300 text-slate-500 cursor-not-allowed"
          }`}
        >
          {isLastStep ? "Finalizar" : "Siguiente"}
        </button>
      </div>
    </div>
  );
};

export default NavigationButtons;
