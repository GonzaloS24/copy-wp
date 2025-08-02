const NavigationButtons = ({
  currentStep,
  canProceed,
  onNext,
  onPrevious,
  isLastStep = false,
  showPrevious = true,
}) => {
  if (currentStep === 0 || currentStep === 6) {
    return null;
  }

  return (
    <div className="flex justify-between items-center pt-4">
      {showPrevious && currentStep > 1 ? (
        <button
          onClick={onPrevious}
          className="text-slate-500 hover:text-slate-700 font-medium underline transition-colors duration-200"
        >
          ← Anterior
        </button>
      ) : (
        <div></div>
      )}

      <button
        onClick={onNext}
        disabled={!canProceed}
        className={`
          px-8 py-3 rounded-lg font-medium transition-all duration-200
          ${
            canProceed
              ? "bg-sky-500 hover:bg-sky-600 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              : "bg-slate-300 text-slate-500 cursor-not-allowed"
          }
        `}
      >
        {isLastStep ? "Finalizar" : "Siguiente"}
      </button>
    </div>
  );
};

export default NavigationButtons;
