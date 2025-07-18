import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ProductList } from '../components/ProductList';
import { ProductConfigPreview } from '../components/productConfig/ProductConfigPreview';
import { MainLayout } from '../components/MainLayout';

export const ProductConfigPage = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(
    location.state?.activeTab || 'productos'
  );

  const tabs = [
    { id: 'productos', label: 'Productos', component: <ProductList /> },
    { id: 'configuracion', label: 'Configuración', component: <ProductConfigPreview /> }
  ];

  React.useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  return (
    <MainLayout>
      <div className="w-full p-8 bg-slate-50 min-h-screen">
        <div className="mb-12 flex justify-center">
          <div className="flex gap-4 bg-white p-2 rounded-2xl shadow-lg border border-slate-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  px-8 py-4 border-none font-semibold text-lg cursor-pointer
                  transition-all duration-300 rounded-xl relative min-w-[180px]
                  flex items-center justify-center gap-2
                  ${activeTab === tab.id 
                    ? 'text-white shadow-[0_6px_20px_rgba(14,165,233,0.4)] bg-gradient-to-br from-sky-500 to-sky-600' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-gray-700 hover:shadow-[0_2px_8px_rgba(0,0,0,0.1)]'
                  }
                `}
                aria-selected={activeTab === tab.id}
                aria-controls={`panel-${tab.id}`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute -bottom-2 w-6 h-1 bg-white rounded-full"></span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          {tabs.map((tab) => (
            <div 
              key={tab.id}
              id={`panel-${tab.id}`}
              role="tabpanel"
              aria-labelledby={tab.id}
              className={activeTab === tab.id ? 'block' : 'hidden'}
            >
              {tab.component}
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};