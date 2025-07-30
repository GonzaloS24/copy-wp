export const InfoBox = ({ children, className = "" }) => (
  <div
    className={`mb-6 p-6 bg-slate-50 border-l-4 border-sky-500 rounded-r-lg ${className}`}
  >
    <p className="m-0 text-slate-600 leading-relaxed text-sm">{children}</p>
  </div>
);
