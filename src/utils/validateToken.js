export const validateToken = (token) => {
  const regex = /^[A-Za-z0-9]+$/;
  const isValid = token && token.length >= 32 && regex.test(token);
  
  console.log(`[Auth] Validación de token:`, {
    hasToken: !!token,
    lengthValid: token?.length >= 32,
    formatValid: token ? regex.test(token) : false,
    isValid
  });

  return isValid;
};