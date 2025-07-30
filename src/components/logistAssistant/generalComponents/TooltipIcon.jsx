import { useState } from "react";

export const TooltipIcon = ({ content }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const mouseEnter = () => {
    setShowTooltip(true);
  };

  const mouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
    >
      <span className="w-4 h-4 rounded-full bg-sky-500 text-white flex items-center justify-center text-xs font-semibold cursor-help transition-all duration-200 hover:bg-sky-600 hover:scale-110">
        i
      </span>

      {showTooltip && (
        <div className="absolute bottom-full right-0 transform translate-x-1/2 mb-2 w-80 bg-slate-800 text-white text-left rounded-lg p-3 z-50 opacity-100 text-sm leading-relaxed shadow-lg transition-all duration-300 -translate-y-1">
          {content}
          <div className="absolute top-full right-1/2 transform translate-x-1/2 border-l-6 border-r-6 border-t-6 border-l-transparent border-r-transparent border-t-slate-800 "></div>
        </div>
      )}
    </div>
  );
};
