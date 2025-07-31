export const NumberInput = ({
  value,
  onChange,
  min = 1,
  max = 10,
  disabled = false,
}) => (
  <div className="flex items-center">
    <button
      type="button"
      className={`w-10 h-10 rounded-l-xl border border-r-0 border-gray-300 flex items-center justify-center text-lg font-bold transition-all duration-200 ${
        disabled
          ? "bg-slate-100 text-slate-400 cursor-not-allowed border-slate-300"
          : "bg-white text-slate-700 hover:bg-slate-50 focus:outline-none focus:border-sky-500"
      }`}
      onClick={() => !disabled && value > min && onChange(value - 1)}
      disabled={disabled}
    >
      −
    </button>
    <input
      type="number"
      className={`w-16 h-10 text-center border-t border-b border-gray-300 text-sm font-medium focus:outline-none focus:border-sky-500 ${
        disabled
          ? "bg-slate-100 text-slate-400 cursor-not-allowed"
          : "bg-white text-slate-700"
      }`}
      value={value}
      min={min}
      max={max}
      onChange={(e) =>
        !disabled &&
        onChange(Math.max(min, Math.min(max, parseInt(e.target.value) || min)))
      }
      disabled={disabled}
    />
    <button
      type="button"
      className={`w-10 h-10 rounded-r-xl border border-l-0 border-gray-300 flex items-center justify-center text-lg font-bold transition-all duration-200 ${
        disabled
          ? "bg-slate-100 text-slate-400 cursor-not-allowed border-slate-300"
          : "bg-white text-slate-700 hover:bg-slate-50 focus:outline-none focus:border-sky-500"
      }`}
      onClick={() => !disabled && value < max && onChange(value + 1)}
      disabled={disabled}
    >
      +
    </button>
  </div>
);
