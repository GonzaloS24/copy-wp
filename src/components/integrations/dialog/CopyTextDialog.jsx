import { useEffect, useState } from "react";

export const CopyTextDialog = ({ field, getText }) => {
  const [textData, setTextData] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCopyText = async (evt) => {
    evt.preventDefault();

    await navigator.clipboard
      .writeText(textData)
      .then(() => {
        setCopied(true);

        setTimeout(() => {
          setCopied(false);
        }, 2000);
      })
      .catch((_) => {});
  };

  useEffect(() => {
    if (!textData) {
      (async () => {
        try {
          const text = await getText();
          setTextData(text);
        } catch (error) {
          setTextData("Error al cargar la información.");
          console.log(error);
        }
      })();
    }
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-stretch gap-2">
        <input
          type="text"
          className="flex-1 py-3.5 px-4 border-2 border-slate-200 rounded-xl text-sm transition-all duration-200 bg-slate-50 text-slate-500 focus:outline-none focus:border-sky-300 focus:ring-2 focus:ring-sky-100"
          placeholder="Cargando información..."
          value={textData}
          readOnly
        />
        <button
          onClick={handleCopyText}
          className={`border-none rounded-xl py-3.5 px-6 text-sm font-semibold cursor-pointer transition-all duration-300 shadow-lg whitespace-nowrap ${
            copied
              ? "bg-gradient-to-r from-green-500 to-green-600 shadow-green-500/25 hover:shadow-green-500/35"
              : "bg-gradient-to-r from-sky-500 to-sky-600 shadow-sky-500/25 hover:from-sky-600 hover:to-sky-700 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-sky-500/35"
          } text-white`}
        >
          {copied ? "✓ Copiado" : "Copiar"}
        </button>
      </div>

      <p className="text-xs text-gray-400 mt-2 leading-relaxed">
        {field.description}
      </p>
    </div>
  );
};
