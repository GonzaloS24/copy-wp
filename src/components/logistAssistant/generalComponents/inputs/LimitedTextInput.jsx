import { maxTextSize } from "../../../../utils/logistAssistant/maxSizes/generalSizes";

export const LimitedTextInput = ({
  id,
  onChange,
  type = "text",
  className = "w-full pb-10 p-3.5 pr-16 border border-gray-300 rounded-xl text-sm transition-all duration-200 bg-white text-slate-700 font-inherit leading-relaxed resize-y focus:outline-none focus:border-sky-500 focus:shadow-sky-100 focus:shadow-lg placeholder:text-slate-400 placeholder:text-sm",
  value = "",
  placeholder = "Ingresa aquí el texto",
  limit = maxTextSize,
  disabled = false,
}) => {
  return (
    <div className="relative" disabled={disabled}>
      <input
        id={id}
        type={type}
        className={className}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
      <span
        className={`p-0.5 px-1 rounded-lg bg-white absolute top-1 right-1 text-xs pointer-events-none ${
          value.length >= limit ? "text-red-500" : "text-gray-500"
        }`}
      >
        {value.length}/{limit}
      </span>
    </div>
  );
};
