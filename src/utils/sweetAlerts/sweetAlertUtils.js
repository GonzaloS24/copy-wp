import Swal from "sweetalert2";

const baseConfig = {
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Aceptar",
  cancelButtonText: "Cancelar",
  reverseButtons: true,
  customClass: {
    confirmButton: "swal2-confirm-custom",
    cancelButton: "swal2-cancel-custom",
    actions: "swal2-actions-custom",
  },
};

// Función para inyectar estilos
const injectCustomStyles = () => {
  if (!document.getElementById("swal2-tailwind-fix")) {
    const style = document.createElement("style");
    style.id = "swal2-tailwind-fix";
    style.textContent = `
      .swal2-confirm-custom,
      .swal2-cancel-custom {
        color: white !important;
        border: none !important;
        outline: none !important;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !important;
        padding: 0.5rem 1rem !important;
        border-radius: 0.375rem !important;
        font-weight: 500 !important;
        font-size: 0.875rem !important;
        cursor: pointer !important;
        transition: all 0.15s ease-in-out !important;
        margin: 0 0.25rem !important;
      }
      
      .swal2-confirm-custom {
        background-color: #3085d6 !important;
      }
      
      .swal2-confirm-custom:hover {
        background-color: #2875c4 !important;
        transform: translateY(-1px) !important;
      }
      
      .swal2-cancel-custom {
        background-color: #d33 !important;
      }
      
      .swal2-cancel-custom:hover {
        background-color: #b82e2e !important;
        transform: translateY(-1px) !important;
      }
      
      .swal2-actions-custom {
        gap: 0.5rem !important;
      }
    `;
    document.head.appendChild(style);
  }
};

export const showSuccess = (
  title = "¡Éxito!",
  text = "Operación completada correctamente"
) => {
  injectCustomStyles();
  return Swal.fire({
    ...baseConfig,
    icon: "success",
    title,
    text,
    showConfirmButton: true,
    allowOutsideClick: true,
    allowEscapeKey: true,
  });
};

export const showError = (
  title = "¡Error!",
  text = "Ha ocurrido un error inesperado"
) => {
  injectCustomStyles();
  return Swal.fire({
    ...baseConfig,
    icon: "error",
    title,
    text,
    showConfirmButton: true,
    allowOutsideClick: true,
    allowEscapeKey: true,
  });
};

export const showWarning = (
  title = "¡Advertencia!",
  text = "Por favor revisa la información"
) => {
  injectCustomStyles();
  return Swal.fire({
    ...baseConfig,
    icon: "warning",
    title,
    text,
  });
};

export const showInfo = (
  title = "Información",
  text = "Mensaje informativo"
) => {
  injectCustomStyles();
  return Swal.fire({
    ...baseConfig,
    icon: "info",
    title,
    text,
  });
};

export const showConfirm = (
  title = "¿Estás seguro?",
  text = "Esta acción no se puede deshacer",
  confirmText = "Sí, confirmar",
  cancelText = "Cancelar"
) => {
  injectCustomStyles();
  return Swal.fire({
    ...baseConfig,
    icon: "question",
    title,
    text,
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
  });
};

export const showDeleteConfirm = (
  title = "¿Eliminar elemento?",
  text = "No podrás recuperar este elemento",
  confirmText = "Sí, eliminar",
  cancelText = "Cancelar"
) => {
  injectCustomStyles();
  return Swal.fire({
    ...baseConfig,
    icon: "warning",
    title,
    text,
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
  });
};

export const showInputText = (
  title = "Ingresa un valor",
  placeholder = "Escribe aquí...",
  inputValue = ""
) => {
  injectCustomStyles();
  return Swal.fire({
    ...baseConfig,
    title,
    input: "text",
    inputPlaceholder: placeholder,
    inputValue,
    showCancelButton: true,
    inputValidator: (value) => {
      if (!value) {
        return "Debes ingresar un valor";
      }
    },
  });
};

export const showInputEmail = (
  title = "Ingresa tu email",
  placeholder = "email@ejemplo.com"
) => {
  injectCustomStyles();
  return Swal.fire({
    ...baseConfig,
    title,
    input: "email",
    inputPlaceholder: placeholder,
    showCancelButton: true,
    inputValidator: (value) => {
      if (!value) {
        return "Debes ingresar un email";
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return "Ingresa un email válido";
      }
    },
  });
};

export const showSelect = (
  title = "Selecciona una opción",
  options = { value1: "Opción 1", value2: "Opción 2" },
  placeholder = "Selecciona..."
) => {
  injectCustomStyles();
  return Swal.fire({
    ...baseConfig,
    title,
    input: "select",
    inputOptions: options,
    inputPlaceholder: placeholder,
    showCancelButton: true,
    inputValidator: (value) => {
      if (!value) {
        return "Debes seleccionar una opción";
      }
    },
  });
};

export const showLoading = (
  title = "Procesando...",
  text = "Por favor espera"
) => {
  return Swal.fire({
    title,
    text,
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false,
    showConfirmButton: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });
};

export const closeLoading = () => {
  Swal.close();
};

export const showToast = (
  type = "success",
  title = "Operación exitosa",
  timer = 3000,
  position = "top-end"
) => {
  const Toast = Swal.mixin({
    toast: true,
    position,
    showConfirmButton: false,
    timer,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  return Toast.fire({
    icon: type,
    title,
  });
};

export const showCustomHtml = (
  title = "Contenido personalizado",
  html = "<p>Contenido HTML personalizado</p>"
) => {
  injectCustomStyles();
  return Swal.fire({
    ...baseConfig,
    title,
    html,
    showCloseButton: true,
  });
};

export const showWithImage = (
  title = "Título con imagen",
  text = "Descripción",
  imageUrl = "",
  imageWidth = 400,
  imageHeight = 200,
  imageAlt = "Imagen personalizada"
) => {
  injectCustomStyles();
  return Swal.fire({
    ...baseConfig,
    title,
    text,
    imageUrl,
    imageWidth,
    imageHeight,
    imageAlt,
  });
};

export const showSteps = async (steps = ["Paso 1", "Paso 2", "Paso 3"]) => {
  injectCustomStyles();
  const Queue = Swal.mixin({
    confirmButtonText: "Siguiente &rarr;",
    cancelButtonText: "Anterior",
    showCancelButton: true,
    progressSteps: steps.map((_, index) => index + 1),
    customClass: {
      confirmButton: "swal2-confirm-custom",
      cancelButton: "swal2-cancel-custom",
      actions: "swal2-actions-custom",
    },
  });

  const results = [];

  for (let i = 0; i < steps.length; i++) {
    const result = await Queue.fire({
      title: steps[i],
      text: `Paso ${i + 1} de ${steps.length}`,
      currentProgressStep: i,
      confirmButtonText:
        i === steps.length - 1 ? "Finalizar" : "Siguiente &rarr;",
    });

    if (result.isDismissed) {
      break;
    }

    results.push(result);
  }

  return results;
};

export const configureGlobal = (config) => {
  Object.assign(baseConfig, config);
};
