import { useState } from 'react';
import { Link } from 'react-router-dom'; // Importamos Link
import { FiMenu, FiMessageSquare, FiHome, FiSettings } from 'react-icons/fi';
import { Sidebar } from './Saidbar';

export const MainLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [assistantDropdownOpen, setAssistantDropdownOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleAssistantDropdown = () => {
    setAssistantDropdownOpen(!assistantDropdownOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100">

      <header className="fixed top-0 left-0 right-0 bg-white h-20 z-50 shadow-sm border-b border-slate-200">
        <div className="h-full px-4 flex items-center justify-between relative w-full">

          <div className="flex items-center gap-6">
            <button 
              onClick={toggleSidebar}
              className="bg-slate-50 border-2 border-slate-200 text-slate-500 cursor-pointer p-3 rounded-xl transition-all duration-200 flex items-center justify-center w-13 h-13 shadow-sm hover:bg-slate-100 hover:border-sky-500 hover:text-sky-500 hover:-translate-y-0.5 hover:shadow-md hover:shadow-sky-500/15 active:translate-y-0 active:shadow-sm"
            >
              <FiMenu className="text-xl" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-sky-600 rounded-xl flex items-center justify-center text-white text-xl font-semibold shadow-md shadow-sky-500/20">
                C
              </div>
              <Link to="/" className="flex items-center gap-2"> {/* Envolvemos el span con Link */}
                <span className="text-3xl font-bold text-sky-500 tracking-tight hover:text-sky-600 cursor-pointer">
                  Chatea
                </span>
              </Link>
              <span className="bg-gradient-to-br from-sky-500 to-sky-600 text-white px-2.5 py-1 rounded-lg text-xs font-semibold ml-2 uppercase tracking-wide">
                Pro
              </span>
            </div>
          </div>

          <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-semibold text-slate-600 m-0 tracking-tight">
            Dashboard
          </h1>

          <div className="relative">
            <button 
              onClick={toggleAssistantDropdown}
              className="relative bg-gradient-to-br from-sky-500 to-sky-600 text-white border-none rounded-xl px-5 py-3 cursor-pointer flex items-center gap-3 transition-all duration-200 min-w-56 shadow-md shadow-sky-500/25 font-medium hover:-translate-y-0.5 hover:shadow-lg hover:shadow-sky-500/30"
            >
              <span className="text-white font-medium flex-1 text-center">
                Bot Omnicanal
              </span>
              <span className={`text-white text-sm transition-transform duration-200 ${assistantDropdownOpen ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>
            
            {assistantDropdownOpen && (
              <div className="absolute top-full left-0 right-0 bg-white border border-slate-200 rounded-xl shadow-xl z-50 mt-2 overflow-hidden">
                <div className="py-2">
                  <a href="#" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                    Bot Omnicanal
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                    Asistente Personal
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <Sidebar isOpen={sidebarOpen} onClose={toggleSidebar} />

      <div className="pt-20">
        <main className="bg-gray-100 min-h-screen">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};