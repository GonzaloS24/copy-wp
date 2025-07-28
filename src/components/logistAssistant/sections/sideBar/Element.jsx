export const Element = ({ activeSection, setActiveSection, item }) => {
  return (
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
