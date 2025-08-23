import { useState } from "react";
import { LuEye, LuEyeClosed } from "react-icons/lu";

export const HiddenTextField = ({
  placeholder = "Ingresa tu contraseña",
  value = "",
  onChange = () => {},
  isDisabled = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative w-full mb-6">
      <input
        type={showPassword ? "text" : "password"}
        className={`w-full p-3.5 pr-12 border border-gray-300 rounded-xl text-sm transition-all duration-200 font-inherit leading-relaxed focus:outline-none placeholder:text-slate-400 placeholder:text-sm ${
          isDisabled
            ? "bg-slate-100 text-slate-400 cursor-not-allowed border-slate-300"
            : "bg-white text-slate-700 focus:border-sky-500 focus:shadow-sky-100 focus:shadow-lg"
        }`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={isDisabled}
      />
      <button
        type="button"
        className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-colors duration-200 ${
          isDisabled
            ? "text-slate-300 cursor-not-allowed"
            : "text-slate-500 hover:text-slate-700"
        }`}
        onClick={togglePasswordVisibility}
        disabled={isDisabled}
      >
        {showPassword ? <LuEyeClosed size={18} /> : <LuEye size={18} />}
      </button>
    </div>
  );
};
