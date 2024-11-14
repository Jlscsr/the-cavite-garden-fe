import Swal from "sweetalert2";

const displaySessionExpiredAlert = (callback = () => {}) => {
  Swal.fire({
    title: "Session Expired",
    text: "Your session has expired. Please login again.",
    icon: "info",
    confirmButtonText: "Login",
  }).then((result) => {
    if (result.isConfirmed) {
      callback();
    }
  });
};

const displayUnauthorizedPageAccessAlert = (callback = () => {}) => {
  Swal.fire({
    title: "Unauthorized Access",
    text: "You are not authorized to access this page.",
    icon: "error",
  }).then((result) => {
    if (result.isConfirmed) {
      callback();
    }
  });
};

const displayLoginFirstAlert = (callback = () => {}) => {
  Swal.fire({
    title: "Login Required",
    text: "You need to login first to access this page.",
    icon: "info",
    confirmButtonText: "Login",
  }).then((result) => {
    if (result.isConfirmed) {
      callback();
    }
  });
};

const displayAPIRequestErrorAlert = (title, message, callback = () => {}) => {
  Swal.fire({
    title: title,
    text: message,
    icon: "error",
    confirmButtonText: "OK",
  }).then((result) => {
    if (result.isConfirmed) {
      callback();
    }
  });
};

const displayAPISuccessAlert = (title, message, callback = () => {}) => {
  Swal.fire({
    title: title,
    text: message,
    icon: "success",
    confirmButtonText: "OK",
  }).then((result) => {
    if (result.isConfirmed) {
      callback();
    }
  });
};

const displayLoginFailedAlert = (message, callback = () => {}) => {
  Swal.fire({
    title: "Login Failed",
    text: message,
    icon: "error",
    confirmButtonText: "OK",
  }).then((result) => {
    if (result.isConfirmed) {
      callback();
    }
  });
};

const displayUnexpectedErrorAlert = (callback = () => {}) => {
  Swal.fire({
    title: "Unexpected Error",
    text: "An unexpected error occurred. Please try again later.",
    icon: "error",
    confirmButtonText: "OK",
  }).then((result) => {
    if (result.isConfirmed) {
      callback();
    }
  });
};

const displaySuccessAlert = (title, message, callback = () => {}) => {
  Swal.fire({
    title: title,
    text: message,
    icon: "success",
    confirmButtonText: "OK",
  }).then((result) => {
    if (result.isConfirmed) {
      callback();
    }
  });
};

const displayErrorAlert = (title, message, callback = () => {}) => {
  Swal.fire({
    title: title,
    text: message,
    icon: "error",
    confirmButtonText: "OK",
  }).then((result) => {
    if (result.isConfirmed) {
      callback();
    }
  });
};

const displayWarningAlert = (title, message, callback = () => {}) => {
  Swal.fire({
    title: title,
    text: message,
    icon: "warning",
    showDenyButton: true,
    confirmButtonText: "Yes",
    denyButtonText: "No",
  }).then((result) => {
    if (result.isConfirmed) {
      callback();
    }
  });
};

const displayInfoAlert = (title, message, callback = () => {}) => {
  Swal.fire({
    title: title,
    text: message,
    icon: "info",
    confirmButtonText: "OK",
  }).then((result) => {
    if (result.isConfirmed) {
      callback();
    }
  });
};

export {
  displaySessionExpiredAlert,
  displayUnauthorizedPageAccessAlert,
  displayAPIRequestErrorAlert,
  displayAPISuccessAlert,
  displayLoginFirstAlert,
  displayLoginFailedAlert,
  displayUnexpectedErrorAlert,
  displaySuccessAlert,
  displayErrorAlert,
  displayWarningAlert,
  displayInfoAlert,
};
