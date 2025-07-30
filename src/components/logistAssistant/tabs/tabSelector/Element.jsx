export const Element = ({ activeTab, setActiveTab, tab }) => {
  return (
    <button
      key={tab.id}
      onClick={() => setActiveTab(tab.id)}
      className={`
                  px-8 py-4 border-none font-semibold text-lg cursor-pointer
                  transition-all duration-300 rounded-xl relative min-w-[180px]
                  flex items-center justify-center gap-2 
                  ${
                    activeTab === tab.id
                      ? "text-white shadow-[0_6px_20px_rgba(14,165,233,0.4)] bg-gradient-to-br from-sky-500 to-sky-600"
                      : "text-slate-500 hover:bg-slate-50 hover:text-blue-500 hover:shadow-[0_2px_8px_rgba(0,0,0,0.1)]"
                  }
                `}
      aria-selected={activeTab === tab.id}
      aria-controls={`panel-${tab.id}`}
    >
      <span className="text-base">
        {tab.emoji} {tab.label}
      </span>
      {activeTab === tab.id && (
        <span className="absolute -bottom-2 w-6 h-1 bg-white rounded-full"></span>
      )}
    </button>
  );
};
