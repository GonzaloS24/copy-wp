export const ToggleSwitch = ({ checked, onChange }) => (
  <div className="flex items-center gap-3">
    <div className="relative">
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <div
        className={`w-12 h-6 rounded-full cursor-pointer transition-all duration-300 ease-in-out ${
          checked ? "bg-sky-500" : "bg-slate-300"
        }`}
        onClick={() => onChange(!checked)}
      >
        <div
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 ease-in-out ${
            checked ? "transform translate-x-6" : ""
          }`}
        />
      </div>
    </div>
    <span className="text-sm text-slate-700 font-medium">
      {checked ? "Sí" : "No"}
    </span>
  </div>
);
