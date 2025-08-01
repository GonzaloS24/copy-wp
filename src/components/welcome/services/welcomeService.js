const FORCE_SHOW_WELCOME = true;
const SKIP_COMPLETED_CHECK = false;

// Simulación del endpoint que verificará si se debe mostrar la encuesta
export const shouldShowWelcomeWizard = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Para pruebas: forzar mostrar/ocultar encuesta
  if (FORCE_SHOW_WELCOME) {
    console.log("🔧 [TESTING] Forzando mostrar welcome wizard");

    // Si queremos ignorar el check de completado (para testing)
    if (SKIP_COMPLETED_CHECK) {
      console.log("🔧 [TESTING] Ignorando check de completado");
      return true;
    }
  }

  // Verificar si ya se completó localmente
  const completed = localStorage.getItem("welcomeWizardCompleted");
  if (completed === "true") {
    console.log("✅ Welcome wizard ya fue completado");
    return false;
  }

  // Retornar configuración de testing o lógica real
  console.log(`🎯 [TESTING] FORCE_SHOW_WELCOME: ${FORCE_SHOW_WELCOME}`);
  return FORCE_SHOW_WELCOME;

  /* 
  try {
    const response = await fetch('/api/user/should-show-welcome', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Error al verificar estado de encuesta');
    }
    
    const data = await response.json();
    return data.shouldShow || false;
  } catch (error) {
    console.error('Error checking welcome wizard status:', error);
    return false; // No mostrar en caso de error
  }
  */
};

export const saveWelcomeAnswers = async (answers) => {
  // Simulación de guardado
  await new Promise((resolve) => setTimeout(resolve, 1000));

  console.log("Guardando respuestas:", answers);

  // Simulación de respuesta exitosa
  return {
    success: true,
    message: "Respuestas guardadas correctamente",
  };

  /*
  try {
    const response = await fetch('/api/user/welcome-answers', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(answers)
    });
    
    if (!response.ok) {
      throw new Error('Error al guardar respuestas');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error saving welcome answers:', error);
    throw error;
  }
  */
};
