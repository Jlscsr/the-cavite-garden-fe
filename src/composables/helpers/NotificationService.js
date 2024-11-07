import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const notificationDefaultOptions = {
  theme: "colored",
  pauseOnHover: false,
  autoClose: 1000,
  hideProgressBar: true,
  dangerouslyHTMLString: true,
};

const displaySuccessNotification = (message) => {
  toast(message, {
    ...notificationDefaultOptions,
    type: "success",
  });
};

const displayErrorNotification = (message) => {
  toast(message, {
    ...notificationDefaultOptions,
    type: "error",
  });
};

export { displaySuccessNotification, displayErrorNotification };
