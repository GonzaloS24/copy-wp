import Cookies from 'js-cookie';

const TOKEN_KEY = 'auth_token';

export const setAuthToken = (token) => {
  Cookies.set(TOKEN_KEY, token, { expires: 60, secure: true, sameSite: 'strict' });
// console.log(`[Auth] Token almacenado en cookies (expira en 60 días)`);
};

export const getAuthToken = () => {
  const token = Cookies.get(TOKEN_KEY);
  if (token) {
  // console.log(`[Auth] Token encontrado en cookies`);
  } else {
    console.warn(`[Auth] No se encontró token en cookies`);
  }
  return token;
};

export const removeAuthToken = () => {
  Cookies.remove(TOKEN_KEY);
  console.log(`[Auth] Token eliminado de cookies`);
};