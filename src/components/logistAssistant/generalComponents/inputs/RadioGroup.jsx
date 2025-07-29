export const RadioGroup = ({
  name,
  value,
  onChange,
  options,
  disabled = false,
}) => (
  <div className="flex gap-6">
    {options.map((option) => (
      <label
        key={option.value}
        className="flex items-center gap-2 cursor-pointer"
      >
        <input
          type="radio"
          name={name}
          value={option.value}
          checked={value === option.value}
          onChange={(e) => !disabled && onChange(e.target.value)}
          disabled={disabled}
          className={`cursor-pointer ${disabled ? "cursor-not-allowed" : ""}`}
        />
        <span
          className={`text-sm cursor-pointer ${
            disabled ? "text-slate-400 cursor-not-allowed" : "text-slate-700"
          }`}
        >
          {option.label}
        </span>
      </label>
    ))}
  </div>
);
