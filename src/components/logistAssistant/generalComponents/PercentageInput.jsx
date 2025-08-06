export const PercentageInput = ({
  placeholder,
  onChange,
  min = 0,
  max = 100,
  value,
}) => (
  <div className="relative">
    <input
      type="number"
      className="w-full p-3.5 pr-8 border border-gray-300 rounded-xl text-sm transition-all duration-200 bg-white text-slate-700 focus:outline-none focus:border-sky-500 focus:shadow-sky-100 focus:shadow-lg"
      placeholder={placeholder}
      value={value}
      min={min}
      max={max}
      onChange={(e) => onChange(parseInt(e.target.value) || 0)}
    />
    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-slate-500 font-medium">
      %
    </span>
  </div>
);
