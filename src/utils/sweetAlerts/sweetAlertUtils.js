import Swal from 'sweetalert2';

// Configuración base para todas las alertas
const baseConfig = {
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Aceptar',
  cancelButtonText: 'Cancelar',
  reverseButtons: true
};

// Alerta de éxito
export const showSuccess = (title = '¡Éxito!', text = 'Operación completada correctamente') => {
  return Swal.fire({
    ...baseConfig,
    icon: 'success',
    title,
    text,
    timer: 3000,
    timerProgressBar: true
  });
};

// Alerta de error
export const showError = (title = '¡Error!', text = 'Ha ocurrido un error inesperado') => {
  return Swal.fire({
    ...baseConfig,
    icon: 'error',
    title,
    text
  });
};

// Alerta de advertencia
export const showWarning = (title = '¡Advertencia!', text = 'Por favor revisa la información') => {
  return Swal.fire({
    ...baseConfig,
    icon: 'warning',
    title,
    text
  });
};

// Alerta de información
export const showInfo = (title = 'Información', text = 'Mensaje informativo') => {
  return Swal.fire({
    ...baseConfig,
    icon: 'info',
    title,
    text
  });
};

// Alerta de confirmación
export const showConfirm = (
  title = '¿Estás seguro?', 
  text = 'Esta acción no se puede deshacer',
  confirmText = 'Sí, confirmar',
  cancelText = 'Cancelar'
) => {
  return Swal.fire({
    ...baseConfig,
    icon: 'question',
    title,
    text,
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText
  });
};

// Alerta de confirmación para eliminación
export const showDeleteConfirm = (
  title = '¿Eliminar elemento?',
  text = 'No podrás recuperar este elemento',
  confirmText = 'Sí, eliminar',
  cancelText = 'Cancelar'
) => {
  return Swal.fire({
    ...baseConfig,
    icon: 'warning',
    title,
    text,
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6'
  });
};

// Alerta con input de texto
export const showInputText = (
  title = 'Ingresa un valor',
  placeholder = 'Escribe aquí...',
  inputValue = ''
) => {
  return Swal.fire({
    ...baseConfig,
    title,
    input: 'text',
    inputPlaceholder: placeholder,
    inputValue,
    showCancelButton: true,
    inputValidator: (value) => {
      if (!value) {
        return 'Debes ingresar un valor';
      }
    }
  });
};

// Alerta con input de email
export const showInputEmail = (
  title = 'Ingresa tu email',
  placeholder = 'email@ejemplo.com'
) => {
  return Swal.fire({
    ...baseConfig,
    title,
    input: 'email',
    inputPlaceholder: placeholder,
    showCancelButton: true,
    inputValidator: (value) => {
      if (!value) {
        return 'Debes ingresar un email';
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return 'Ingresa un email válido';
      }
    }
  });
};

// Alerta con select/dropdown
export const showSelect = (
  title = 'Selecciona una opción',
  options = { value1: 'Opción 1', value2: 'Opción 2' },
  placeholder = 'Selecciona...'
) => {
  return Swal.fire({
    ...baseConfig,
    title,
    input: 'select',
    inputOptions: options,
    inputPlaceholder: placeholder,
    showCancelButton: true,
    inputValidator: (value) => {
      if (!value) {
        return 'Debes seleccionar una opción';
      }
    }
  });
};

// Alerta de carga/loading
export const showLoading = (title = 'Procesando...', text = 'Por favor espera') => {
  return Swal.fire({
    title,
    text,
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false,
    showConfirmButton: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });
};

// Cerrar alerta de carga
export const closeLoading = () => {
  Swal.close();
};

// Toast notification (esquina superior derecha)
export const showToast = (
  type = 'success',
  title = 'Operación exitosa',
  timer = 3000,
  position = 'top-end'
) => {
  const Toast = Swal.mixin({
    toast: true,
    position,
    showConfirmButton: false,
    timer,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
  });

  return Toast.fire({
    icon: type,
    title
  });
};

// Alerta personalizada con HTML
export const showCustomHtml = (
  title = 'Contenido personalizado',
  html = '<p>Contenido HTML personalizado</p>'
) => {
  return Swal.fire({
    ...baseConfig,
    title,
    html,
    showCloseButton: true
  });
};

// Alerta con imagen
export const showWithImage = (
  title = 'Título con imagen',
  text = 'Descripción',
  imageUrl = '',
  imageWidth = 400,
  imageHeight = 200,
  imageAlt = 'Imagen personalizada'
) => {
  return Swal.fire({
    ...baseConfig,
    title,
    text,
    imageUrl,
    imageWidth,
    imageHeight,
    imageAlt
  });
};

// Función para mostrar progreso paso a paso
export const showSteps = async (steps = ['Paso 1', 'Paso 2', 'Paso 3']) => {
  const Queue = Swal.mixin({
    confirmButtonText: 'Siguiente &rarr;',
    cancelButtonText: 'Anterior',
    showCancelButton: true,
    progressSteps: steps.map((_, index) => index + 1)
  });

  const results = [];
  
  for (let i = 0; i < steps.length; i++) {
    const result = await Queue.fire({
      title: steps[i],
      text: `Paso ${i + 1} de ${steps.length}`,
      currentProgressStep: i,
      confirmButtonText: i === steps.length - 1 ? 'Finalizar' : 'Siguiente &rarr;'
    });

    if (result.isDismissed) {
      break;
    }
    
    results.push(result);
  }
  
  return results;
};

// Configuración global personalizada
export const configureGlobal = (config) => {
  Object.assign(baseConfig, config);
};
