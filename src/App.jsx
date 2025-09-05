import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { PrivateRoute } from "./privateRoutes/PrivateRoute";
import { HomePage } from "./pages/HomePage";
import { ConfigureAsistent } from "./pages/ConfigureAsistent";
import { ProductConfigPage } from "./pages/ProductConfigPage";
import { ProductContentForm } from "./pages/ProductContentForm";
import CarritosPage from "./pages/CarritosPage";
import { LogistAssistantPage } from "./pages/LogistAssistantPage";
import { useEffect, useState, useRef } from "react";
import { shouldShowWelcomeWizard } from "./services/welcome";
import WelcomeWizard from "./components/welcome/WelcomeWizard";
import { IntegrationsView } from "./pages/IntegrationsView";
import { initializeWorkspace } from "./utils/workspace/workspaceUtils";
import { getCurrentWorkspace } from "./utils/workspace/workspaceStorage";
import { TestRestartService } from "./services/apichat/testRestartService";
import { getAuthToken } from "./utils/authCookies";
import { ASSISTANT_TEMPLATE_NS } from "./utils/constants/assistants";

// Componente para manejar cleanup de chat en cambios de ruta
const ChatCleanupHandler = () => {
  const location = useLocation();
  const lastProductRouteRef = useRef(null);

  useEffect(() => {
    const currentPath = location.pathname;
    const lastProductRoute = lastProductRouteRef.current;

    // Detectar si estamos saliendo de una ruta de producto
    const isLeavingProductRoute =
      lastProductRoute &&
      lastProductRoute.startsWith("/producto/") &&
      !currentPath.startsWith("/producto/");

    // Detectar si estamos cambiando de un producto a otro
    const isChangingProduct =
      lastProductRoute &&
      lastProductRoute.startsWith("/producto/") &&
      currentPath.startsWith("/producto/") &&
      lastProductRoute !== currentPath;

    if (isLeavingProductRoute || isChangingProduct) {
      // Extraer productId de la ruta anterior
      const extractProductId = (path) => {
        const match = path.match(/\/producto\/(.+)/);
        if (!match) return null;
        const productName = match[1];
        if (/^\d+$/.test(productName)) return productName;
        const idMatch = productName.match(/\d+/);
        return idMatch ? idMatch[0] : null;
      };

      const productId = extractProductId(lastProductRoute);

      if (productId) {
        const performChatCleanup = async () => {
          try {
            console.log(
              "🧹 Cleanup por cambio de ruta - ProductId:",
              productId
            );
            console.log(
              "🧹 Ruta anterior:",
              lastProductRoute,
              "→ Nueva ruta:",
              currentPath
            );

            const token = getAuthToken();
            if (!token) {
              console.log("⚠️ No hay token para cleanup");
              return;
            }

            await TestRestartService.restartTest(
              productId,
              ASSISTANT_TEMPLATE_NS.WHATSAPP_SALES,
              token
            );

            console.log("✅ Cleanup por cambio de ruta completado");
          } catch (error) {
            console.log(
              "⚠️ Error en cleanup por cambio de ruta:",
              error.message
            );
          }
        };

        performChatCleanup();
      }
    }

    // Actualizar la referencia de la ruta actual
    lastProductRouteRef.current = currentPath;
  }, [location.pathname]);

  return null; // Este componente no renderiza nada
};

function AppContent() {
  const [showWelcome, setShowWelcome] = useState(null);
  const [isCheckingWelcome, setIsCheckingWelcome] = useState(true);
  const [currentWorkspaceId, setCurrentWorkspaceId] = useState(null);

  useEffect(() => {
    const checkWelcomeStatus = async (forceCheck = false) => {
      try {
        console.log("[App] Verificando estado del wizard...");

        // Inicializar workspace y obtener ID
        const workspaceId = await initializeWorkspace();

        // Si el workspace cambió, forzar verificación
        if (forceCheck || currentWorkspaceId !== workspaceId) {
          console.log(
            `[App] Workspace cambió: ${currentWorkspaceId} → ${workspaceId}`
          );
          setCurrentWorkspaceId(workspaceId);

          if (workspaceId) {
            const shouldShow = await shouldShowWelcomeWizard();
            console.log("[App] ¿Mostrar wizard?", shouldShow);
            setShowWelcome(shouldShow);
          } else {
            setShowWelcome(true);
          }
        }
      } catch (error) {
        console.error("[App] Error checking welcome status:", error);
        setShowWelcome(true);
      } finally {
        setIsCheckingWelcome(false);
      }
    };

    // Verificación inicial
    checkWelcomeStatus(true);

    // Listener para cambios de workspace via postMessage
    const handleWorkspaceChange = (event) => {
      if (event.data && event.data.type === "WORKSPACE_ID_RESPONSE") {
        const newWorkspaceId = event.data.workspaceId;
        const current = getCurrentWorkspace();

        if (newWorkspaceId && newWorkspaceId !== current) {
          console.log(
            "[App] Workspace cambió via postMessage, re-verificando..."
          );
          setIsCheckingWelcome(true);
          setTimeout(() => checkWelcomeStatus(true), 100);
        }
      }
    };

    window.addEventListener("message", handleWorkspaceChange);

    return () => {
      window.removeEventListener("message", handleWorkspaceChange);
    };
  }, [currentWorkspaceId]);

  const handleWelcomeComplete = () => {
    console.log("[App] Wizard completado, ocultando...");
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
    <>
      <ChatCleanupHandler />
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/configurar/:template_ns"
            element={<ConfigureAsistent />}
          />
          <Route path="/productos-config" element={<ProductConfigPage />} />
          <Route path="/agregando" element={<ProductContentForm />} />
          <Route
            path="/producto/:productName"
            element={<ProductContentForm />}
          />
          <Route path="/asistente-carritos" element={<CarritosPage />} />
          <Route
            path="/asistente-logistico"
            element={<LogistAssistantPage />}
          />
          <Route path="/integraciones" element={<IntegrationsView />} />

          {/* Capturar todas las rutas no válidas y redirigir a home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
