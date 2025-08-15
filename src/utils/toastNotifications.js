import { toast } from "react-toastify";

const baseToastConfig = {
  position: "bottom-right",
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progressStyle: {
    backgroundColor: "#e5e7eb",
  },
};

export const showSuccessToast = (message) => {
  toast.success(message, {
    ...baseToastConfig,
    autoClose: 3000,
    style: {
      ...baseToastConfig.style,
    },
    progressStyle: {
      backgroundColor: "#10B981",
    },
  });
};

export const showErrorToast = (message) => {
  toast.error(message, {
    ...baseToastConfig,
    autoClose: 3000,
    style: {
      ...baseToastConfig.style,
    },
    progressStyle: {
      backgroundColor: "#EF4444",
    },
  });
};

export const showInfoToast = (message) => {
  toast.info(message, {
    ...baseToastConfig,
    autoClose: 3000,
    style: {
      ...baseToastConfig.style,
    },
    progressStyle: {
      backgroundColor: "#3B82F6",
    },
  });
};

export const showWarningToast = (message) => {
  toast.warning(message, {
    ...baseToastConfig,
    autoClose: 3000,
    style: {
      ...baseToastConfig.style,
    },
    progressStyle: {
      backgroundColor: "#F59E0B",
    },
  });
};
