import { toast } from "react-toastify";

class sendToast {
  // Success Toast
  static success(message, position = "bottom-left", autoClose = 5000) {
    toast.success(message, {
      position,
      autoClose,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  // Warning Toast

  static warning(message, position = "bottom-left", autoClose = 5000) {
    toast.warn(message, {
      position,
      autoClose,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  // Error Toast

  static error(message, position = "bottom-left", autoClose = 5000) {
    toast.error(message, {
      position,
      autoClose,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  // info toast

  static info(message, position = "bottom-left", autoClose = 5000) {
    toast.info(message, {
      position,
      autoClose,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
}

export default sendToast;
