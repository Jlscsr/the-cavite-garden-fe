import swal from "sweetalert";

const unauthorizedActionModalMessage = (callback) => {
    swal(
        "Unauthorized!",
        "You are not authorized to perform this action",
        "error"
    ).then(callback);
};

const unauthorizedPageModalMessage = (callback) => {
    swal(
        "Unauthorized!",
        "You are not authorized to access this page",
        "error"
    ).then(callback);
};

const sessionExpiredModalMessage = (callback) => {
    swal("Session Expired!", "Please login again", "error").then(callback);
};

const failedModalMessage = () => {};
const successModalMessage = () => {};

export {
    unauthorizedActionModalMessage,
    unauthorizedPageModalMessage,
    sessionExpiredModalMessage,
    failedModalMessage,
    successModalMessage,
};
