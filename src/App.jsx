import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PrivateRoute } from './privateRoutes/PrivateRoute';
import { HomePage } from './pages/HomePage';
import { ConfigureAsistent } from './pages/ConfigureAsistent';
import { ProductConfigPage } from './pages/ProductConfigPage';
import { ProductContentForm } from './pages/ProductContentForm';
import CarritosPage from './pages/CarritosPage';
import { LogistAssistantPage } from "./pages/LogistAssistantPage";
import { useEffect, useState } from "react";
import { shouldShowWelcomeWizard } from "./components/welcome/services/welcomeService";
import WelcomeWizard from "./components/welcome/WelcomeWizard";

export default function App() {
  const [showWelcome, setShowWelcome] = useState(null);
  const [isCheckingWelcome, setIsCheckingWelcome] = useState(true);

  useEffect(() => {
    const checkWelcomeStatus = async () => {
      try {
        const shouldShow = await shouldShowWelcomeWizard();
        setShowWelcome(shouldShow);
      } catch (error) {
        console.error("Error checking welcome status:", error);
        setShowWelcome(false);
      } finally {
        setIsCheckingWelcome(false);
      }
    };

    checkWelcomeStatus();
  }, []);

  const handleWelcomeComplete = () => {
    setShowWelcome(false);
  };

  // Mostrar loading mientras se verifica
  if (isCheckingWelcome) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-500 mx-auto mb-4"></div>
          <p className="text-slate-600">Cargando...</p>
        </div>
      </div>
    );
  }

  // Mostrar wizard de bienvenida si es necesario
  if (showWelcome) {
    return <WelcomeWizard onComplete={handleWelcomeComplete} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/configurar/:template_ns"
            element={<ConfigureAsistent />}
          />
          <Route path="/productos-config" element={<ProductConfigPage />} />
          <Route path="/agregando" element={<ProductContentForm />} />
          <Route path="/producto/:productName" element={<ProductContentForm />} />
          <Route path="/asistente-carritos" element={<CarritosPage />} />
          <Route
            path="/asistente-logistico"
            element={<LogistAssistantPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
