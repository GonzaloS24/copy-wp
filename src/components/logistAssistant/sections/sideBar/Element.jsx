export const Element = ({ activeSection, setActiveSection, item }) => {
  return item.comingSoon ? (
    <div className="p-4 px-6 cursor-not-allowed pointer-events-none relative bg-slate-50 border-2 border-dashed border-gray-300 rounded-xl opacity-70 mb-1">
      <div className="flex flex-col items-center gap-2 w-full">
        <span className="text-gray-500 font-medium text-sm">
          {item.emoji} {item.label}
        </span>
        <span className="bg-gradient-to-br from-sky-500 to-sky-600 text-white px-3 py-1 rounded-xl text-xs font-semibold uppercase tracking-wide shadow-md shadow-sky-500/20">
          {item.badgeText}
        </span>
      </div>
    </div>
  ) : (
    <div
      key={`section-sidebar-${item.id}`}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 ease-in-out font-medium text-base text-slate-500 ${
        activeSection === item.id
          ? "bg-cyan-50 text-cyan-500 border border-cyan-200"
          : "hover:bg-slate-100 hover:text-blue-500 hover:border hover:border-blue-200"
      }`}
      onClick={() => setActiveSection(item.id)}
    >
      <span className="text-lg">{item.emoji}</span>
      <span>{item.label}</span>
    </div>
  );
};
