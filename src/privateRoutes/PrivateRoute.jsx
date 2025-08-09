import { useState, useEffect } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { getAuthToken } from "../utils/authCookies";
import { validateToken } from "../utils/validateToken";

export const PrivateRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const verifyToken = async () => {
      console.group("[Auth] Verificando autenticación");
      const token = getAuthToken();

      if (token) {
        const isValid = await validateToken(token);

        if (isValid) {
          console.log("Token válido. Acceso concedido");
        } else {
          console.warn("Token inválido. Redirigiendo al wizard...");
        }

        setIsAuthenticated(isValid);
      } else {
        console.warn("No se encontró token. Redirigiendo al wizard...");
        setIsAuthenticated(false);
      }

      console.groupEnd();
    };

    verifyToken();
  }, [location]);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-500 mx-auto mb-4"></div>
          <p className="text-slate-600">Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
