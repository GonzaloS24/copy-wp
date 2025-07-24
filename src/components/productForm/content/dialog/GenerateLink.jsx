import React, { useState } from 'react';

export const GenerateLink = ({ initialMessage = 'quiero más información', onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [startWord, setStartWord] = useState(initialMessage);
  const [generatedLink, setGeneratedLink] = useState('');
  const [showGenerated, setShowGenerated] = useState(false);

  const generateLink = () => {
    if (phoneNumber.trim()) {
      const encodedMessage = encodeURIComponent(startWord);
      const link = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
      setGeneratedLink(link);
      setShowGenerated(true);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink);
  };

  const closeModal = () => {
    setShowGenerated(false);
    setPhoneNumber('');
    setStartWord(initialMessage);
    setGeneratedLink('');
    if (onClose) onClose();
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg font-sans relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-slate-700">Generador de enlace WhatsApp</h2>
        <button 
          onClick={closeModal}
          className="bg-transparent border-none text-3xl cursor-pointer text-slate-500 hover:text-slate-700 w-8 h-8 flex items-center justify-center"
        >
          ×
        </button>
      </div>

      <div className="mb-6">
        <label className="font-semibold text-slate-700 mb-2 block">
          Número de WhatsApp:
        </label>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl bg-slate-50 text-base font-medium focus:outline-none focus:border-blue-400"
          placeholder="Ej: 5491123456789 (sin + ni espacios)"
        />
      </div>

      <div className="mb-6">
        <label className="font-semibold text-slate-700 mb-2 block">
          Mensaje inicial:
        </label>
        <input
          type="text"
          value={startWord}
          onChange={(e) => setStartWord(e.target.value)}
          className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl bg-slate-50 text-base font-medium focus:outline-none focus:border-blue-400"
          placeholder="Mensaje que enviará el cliente"
        />
      </div>

      <button
        onClick={generateLink}
        className="w-full bg-gradient-to-br from-green-500 to-green-600 text-white border-none py-3 rounded-xl font-semibold text-base cursor-pointer mb-8 transition-all duration-300 hover:from-green-600 hover:to-green-700"
      >
        Generar enlace
      </button>

      {showGenerated && (
        <div className="border-t border-slate-200 pt-6">
          <h3 className="font-bold text-sky-500 text-base mb-4">
            Enlace generado
          </h3>
          
          <div className="flex border-2 border-slate-200 rounded-xl overflow-hidden mb-6">
            <input
              type="text"
              value={generatedLink}
              readOnly
              className="flex-1 px-3 py-3 border-none bg-slate-50 text-sm text-slate-700 focus:outline-none"
            />
            <button
              onClick={copyToClipboard}
              className="bg-sky-500 text-white border-none px-4 cursor-pointer font-semibold transition-all duration-200 hover:bg-sky-600"
            >
              Copiar
            </button>
          </div>
          
          <p className="font-semibold text-slate-700 mb-2">
            Tu cliente llegará diciendo:
          </p>
          <div className="border-2 border-slate-200 rounded-xl p-3 bg-slate-50 text-sm font-medium text-slate-700">
            {startWord}
          </div>
        </div>
      )}
    </div>
  );
};