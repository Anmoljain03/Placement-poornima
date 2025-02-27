import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ✅ Success Toast
export const showSuccessToast = (message) => {
  toast.success(` ${message}`, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  });
};

// ❌ Error Toast
export const showErrorToast = (message) => {
  toast.error(` ${message}`, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  });
};

// ⚠️ Warning Toast
export const showWarningToast = (message) => {
  toast.warn(` ${message}`, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  });
};

// ℹ️ Info Toast
export const showInfoToast = (message) => {
  toast.info(` ${message}`, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });
};
