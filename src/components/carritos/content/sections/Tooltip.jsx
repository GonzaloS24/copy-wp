const Tooltip = ({ content }) => {
  return (
    <div>
      <div className="relative inline-block group">
        <span className="w-5 h-5 rounded-full bg-sky-500 text-white flex items-center justify-center text-xs font-semibold cursor-help transition-all duration-200 hover:bg-sky-600 hover:scale-110 shadow-sm hover:shadow-md">
          i
        </span>
        <div className="invisible group-hover:visible group-hover:opacity-100 group-hover:-translate-y-1 opacity-0 absolute z-50 bottom-full left-0 mb-3 mr-35 w-80 bg-slate-800 text-white text-left rounded-xl p-4 text-sm leading-relaxed shadow-xl border border-slate-600 transition-all duration-300">
          {content}
          <div className="absolute top-full right-35 -mt-2 border-8 border-transparent border-t-slate-800"></div>
        </div>
      </div>
    </div>
  );
};

export default Tooltip;
