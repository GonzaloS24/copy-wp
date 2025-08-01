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
      className={`bg-white rounded-xl p-0 cursor-pointer transition-all duration-500 ease-out text-center shadow-sm hover:shadow-md min-h-[180px] group overflow-hidden relative ${
        isSelected ? "shadow-lg shadow-sky-200/50" : "hover:shadow-sky-100/50"
      }`}
    >
      <div
        className={`absolute inset-0 rounded-xl p-[2px] transition-all duration-75 ease-out ${
          isSelected ? "bg-sky-500" : "bg-sky-500/0 group-hover:bg-sky-500"
        }`}
      >
        <div
          className={`rounded-[calc(0.75rem-2px)] h-full w-full flex flex-col items-center justify-center p-4 transition-all duration-200 ease-out ${
            isSelected ? "bg-[#edf4ff]" : "bg-white group-hover:bg-[#edf4ff]"
          }`}
        >
          {/* Icono */}
          <div
            className={`mb-2 transition-transform duration-200 ease-out ${
              isSelected ? "scale-105" : "group-hover:scale-102"
            }`}
          >
            {iconType === "emoji" ? (
              <span className="text-3xl">{icon}</span>
            ) : (
              <div
                className={`transition-colors duration-200 ease-out ${
                  isSelected
                    ? "text-sky-600"
                    : "text-slate-600 group-hover:text-sky-600"
                }`}
              >
                {icon}
              </div>
            )}
          </div>
          {/* Contenido del texto */}
          <div className="flex flex-col gap-1 text-center">
            <span
              className={`font-semibold text-base transition-colors duration-200 ease-out ${
                isSelected
                  ? "text-sky-700"
                  : "text-slate-800 group-hover:text-sky-700"
              }`}
            >
              {title}
            </span>
            <span
              className={`text-sm text-slate-600 leading-snug transition-colors duration-200 ease-out ${
                !isSelected ? "group-hover:text-slate-600" : ""
              }`}
            >
              {description}
            </span>
          </div>
        </div>
      </div>
    </button>
  );
};

export default OptionButton;
