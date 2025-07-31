const OptionButton = ({
  value,
  selectedValue,
  onClick,
  icon,
  title,
  description,
  iconType = "emoji",
}) => {
  const isSelected = selectedValue === value;

  return (
    <button
      onClick={() => onClick(value)}
      className={`bg-white border-2 rounded-2xl p-0 cursor-pointer transition-all duration-300 text-left shadow-sm hover:shadow-lg min-h-[280px] group ${
        isSelected
          ? "border-sky-500 transform -translate-y-1 shadow-sky-200"
          : "border-slate-200 hover:border-sky-300 hover:-translate-y-1"
      }`}
    >
      <div
        className={`p-6 rounded-t-2xl flex items-center justify-center min-h-[150px] ${
          isSelected
            ? "bg-gradient-to-r from-emerald-500 to-emerald-600"
            : "bg-gradient-to-r from-sky-500 to-sky-600 group-hover:from-sky-600 group-hover:to-sky-700"
        }`}
      >
        {iconType === "emoji" ? (
          <span className="text-3xl">{icon}</span>
        ) : (
          <div className="text-white">{icon}</div>
        )}
      </div>

      <div className="p-6 flex flex-col gap-2 justify-center flex-1">
        <span className="font-semibold text-slate-800 text-base">{title}</span>
        <span className="text-sm text-slate-600 leading-relaxed">
          {description}
        </span>
      </div>
    </button>
  );
};

export default OptionButton;
