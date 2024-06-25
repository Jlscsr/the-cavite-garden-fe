import swal from "sweetalert";

const AuthRequiredModalMessage = (
    title = "Unauthorized!",
    message = "You are not authorized to perform this action"
) => {
    swal(title, message, "warning");
};

const unauthorizedPageModalMessage = (callback) => {
    swal(
        "Unauthorized!",
        "You are not authorized to access this page",
        "warning"
    ).then(callback);
};

const SessionExpiredModalMessage = (callback) => {
    swal("Session Expired!", "Please login again", "error").then(callback);
};

const FailedModalMessage = (
    title = "Error",
    message = "Something went wrong."
) => {
    swal(title, message, "error");
};

const SuccessModalMessage = (title, message, callback = () => {}) => {
    swal(title, message, "success").then(callback);
};
const AskUserModalMessage = (title, message, info, callback) => {
    swal({
        title: title,
        text: message,
        icon: info,
        buttons: true,
    }).then(callback);
};

export {
    AuthRequiredModalMessage,
    unauthorizedPageModalMessage,
    SessionExpiredModalMessage,
    FailedModalMessage,
    SuccessModalMessage,
    AskUserModalMessage,
};
