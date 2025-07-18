import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthToken, validateToken } from '../utils/authCookies';

export const useAuthVerify = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = getAuthToken();
      if (!token || !(await validateToken(token))) {
        navigate('/');
      }
    };

    checkAuth();
  }, [navigate]);
};