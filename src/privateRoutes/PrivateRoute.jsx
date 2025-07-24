// privateRoutes/PrivateRoute.jsx
import { useState, useEffect } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { getAuthToken, setAuthToken, removeAuthToken } from '../utils/authCookies';
import { validateToken } from '../utils/validateToken';
import { TokenAuthModal } from '../components/TokenAuthModal';

export const PrivateRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const location = useLocation();

  useEffect(() => {
  const verifyToken = async () => {
    console.group('[Auth] Verificando autenticación');
    const token = getAuthToken();
    
    if (token) {
      console.log('Token encontrado, validando...');
      const isValid = await validateToken(token);
      
      if (isValid) {
        console.log('Token válido. Acceso concedido');
      } else {
        console.warn('Token inválido. Eliminando de cookies...');
        removeAuthToken();
      }
      
      setIsAuthenticated(isValid);
    } else {
      console.warn('No se encontró token en cookies');
      setIsAuthenticated(false);
    }
    
    console.groupEnd();
  };

  verifyToken();
}, [location]);

  const handleTokenSubmit = async (token) => {
    const isValid = await validateToken(token);
    if (isValid) {
      setAuthToken(token);
      setIsAuthenticated(true);
    } else {
      alert('Token inválido. Debe tener al menos 32 caracteres alfanuméricos');
    }
  };

  if (isAuthenticated === null) {
    return <div className="flex justify-center items-center h-screen">Verificando autenticación...</div>;
  }

  if (!isAuthenticated) {
    return <TokenAuthModal onTokenSubmit={handleTokenSubmit} />;
  }

  return <Outlet />;
};