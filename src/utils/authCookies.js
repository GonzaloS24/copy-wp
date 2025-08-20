const TOKEN_KEY = "auth_token";

export const setAuthToken = (token) => {
  try {
    localStorage.setItem(TOKEN_KEY, token);
    console.log(`[Auth] Token almacenado en localStorage`);
  } catch (error) {
    console.error("[Auth] Error guardando token:", error);
  }
};

export const getAuthToken = () => {
  try {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      console.log(`[Auth] Token encontrado en localStorage`);
    } else {
      console.warn(`[Auth] No se encontró token en localStorage`);
    }
    return token;
  } catch (error) {
    console.error("[Auth] Error leyendo token:", error);
    return null;
  }
};

export const removeAuthToken = () => {
  try {
    localStorage.removeItem(TOKEN_KEY);
    console.log(`[Auth] Token eliminado de localStorage`);
  } catch (error) {
    console.error("[Auth] Error eliminando token:", error);
  }
};
