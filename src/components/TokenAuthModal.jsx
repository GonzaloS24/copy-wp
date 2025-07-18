import { useState } from 'react';
import { FiKey, FiX } from 'react-icons/fi';

export const TokenAuthModal = ({ onTokenSubmit }) => {
  const [token, setToken] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!token.trim()) {
      setError('Por favor ingresa un token válido');
      return;
    }
    onTokenSubmit(token);
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-[3000] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="bg-gradient-to-br from-sky-500 to-sky-600 p-6 text-white">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <FiKey className="text-2xl" />
              Autenticación requerida
            </h2>
          </div>
          <p className="mt-2 text-sky-100">
            Ingresa tu token de acceso para continuar
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-5">
            <label htmlFor="token" className="block text-sm font-medium text-slate-700 mb-2">
              Token de acceso
            </label>
            <input
              type="password"
              id="token"
              value={token}
              onChange={(e) => {
                setToken(e.target.value);
                setError('');
              }}
              className={`w-full px-4 py-3 rounded-xl border-2 ${
                error ? 'border-red-300' : 'border-slate-200'
              } focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all`}
              placeholder="Ingresa tu token aquí"
              autoFocus
            />
            {error && (
              <p className="mt-2 text-sm text-red-500">{error}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-br from-sky-500 to-sky-600 text-white font-medium py-3 px-4 rounded-xl shadow-md shadow-sky-500/20 hover:shadow-lg hover:shadow-sky-500/30 transition-all hover:-translate-y-0.5 active:translate-y-0"
          >
            Acceder
          </button>
        </form>

        <div className="px-6 pb-6 text-center">
          <p className="text-sm text-slate-500">
            Contacta al administrador si no tienes un token válido
          </p>
        </div>
      </div>
    </div>
  );
};