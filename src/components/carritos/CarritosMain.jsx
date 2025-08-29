import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CarritosSidebar from "./CarritosSidebar";
import IdentitySection from "./content/sections/IdentitySection";
import StoreDataSection from "./content/sections/StoreDataSection";
import LogisticsSection from "./content/sections/LogisticsSection";
import RecoveryMessagesSection from "./content/sections/RecoveryMessagesSection";
import EmailSection from "./content/sections/EmailSection";
import SpecialActionsSection from "./content/sections/SpecialActionsSection";
import TestAssistantSection from "./content/sections/TestAssistantSection";
import { CarritosProvider, useCarritos } from "../../context/CarritosContext";
import { CarritosButtons } from "./CarritosButtons";

const CarritosMainInner = () => {
  const { loadCarritoData, isLoading } = useCarritos();
  const [activeSection, setActiveSection] = useState("identidad-asistente");

  // Cargar datos al montar el componente
  useEffect(() => {
    loadCarritoData();
  }, []);

  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
  };

  const handleBackToProducts = () => {
    alert("Funcionalidad para volver a productos");
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case "identidad-asistente":
        return <IdentitySection />;
      case "datos-tienda":
        return <StoreDataSection />;
      case "datos-logisticos":
        return <LogisticsSection />;
      case "mensajes-recuperacion":
        return <RecoveryMessagesSection />;
      case "envio-correos":
        return <EmailSection />;
      case "acciones-especiales":
        return <SpecialActionsSection />;
      case "prueba-asistente":
        return <TestAssistantSection />;
      default:
        return <IdentitySection />;
    }
  };

  // Mostrar loading mientras se cargan los datos
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-500 mx-auto mb-4"></div>
          <p className="text-slate-600">Cargando configuración...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex min-h-screen bg-slate-50">
        <CarritosSidebar
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
          onBackToProducts={handleBackToProducts}
        />
        <main className="ml-72 flex-1 p-8 overflow-y-auto bg-slate-50 min-w-0">
          {renderActiveSection()}
        </main>
        <CarritosButtons />
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        progressStyle={{
          backgroundColor: "#e5e7eb",
        }}
        closeButtonStyle={{
          color: "#6b7280",
        }}
      />
    </>
  );
};

const CarritosMain = () => {
  return (
    <CarritosProvider>
      <CarritosMainInner />
    </CarritosProvider>
  );
};

export default CarritosMain;
