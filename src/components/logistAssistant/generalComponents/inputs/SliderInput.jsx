export const SliderInput = ({
    value,
    onChange,
    min = 0,
    max = 1,
    step = 0.1,
    disabled = false,
  }) => (
    <div className="flex items-center gap-3">
      <button
        type="button"
        className={`w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-sm font-bold transition-all duration-200 ${
          disabled
            ? "bg-slate-100 text-slate-400 cursor-not-allowed border-slate-300"
            : "bg-white text-slate-700 hover:bg-slate-50 focus:outline-none focus:border-sky-500"
        }`}
        onClick={() =>
          !disabled && value > min && onChange(Math.max(min, value - step))
        }
        disabled={disabled}
      >
        −
      </button>
      <div className="flex-1 px-2">
        <input
          type="range"
          className={`w-full h-1.5 rounded-full outline-none appearance-none ${
            disabled ? "bg-slate-300" : "bg-slate-200"
          } slider`}
          style={{
            background: disabled
              ? "#cbd5e1"
              : `linear-gradient(to right, #0ea5e9 0%, #0ea5e9 ${
                  (value / max) * 100
                }%, #e2e8f0 ${(value / max) * 100}%, #e2e8f0 100%)`,
          }}
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => !disabled && onChange(parseFloat(e.target.value))}
          disabled={disabled}
        />
      </div>
      <span
        className={`min-w-[2rem] text-center text-sm font-medium ${
          disabled ? "text-slate-400" : "text-slate-700"
        }`}
      >
        {value.toFixed(1)}
      </span>
      <button
        type="button"
        className={`w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-sm font-bold transition-all duration-200 ${
          disabled
            ? "bg-slate-100 text-slate-400 cursor-not-allowed border-slate-300"
            : "bg-white text-slate-700 hover:bg-slate-50 focus:outline-none focus:border-sky-500"
        }`}
        onClick={() =>
          !disabled && value < max && onChange(Math.min(max, value + step))
        }
        disabled={disabled}
      >
        +
      </button>
    </div>
  );