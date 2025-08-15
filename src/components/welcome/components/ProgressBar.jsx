const ProgressBar = ({ progress, currentStep, totalSteps }) => {
  if (currentStep === 0 || currentStep === totalSteps - 1) {
    return null;
  }

  return (
    <>
      <div className="absolute top-8 left-8 right-8 h-1 bg-slate-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-sky-500 to-sky-600 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="absolute top-16 left-8 text-sm text-slate-500 font-medium">
        Paso {currentStep} de {totalSteps - 2}
      </div>
    </>
  );
};

export default ProgressBar;
