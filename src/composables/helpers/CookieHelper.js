const SetCookieHelper = (key, value) => {
    const cookieValue = `${key}=${value}`;
    console.log(cookieValue);
    document.cookie = `${cookieValue}; path=/;`;
};

const GetCookieHelper = (key) => {
    const cookieValue = document.cookie.split("=")[1];
    return !Boolean(cookieValue);
};

const checkAccessTokenKey = () => {
    return Boolean(document.cookie);
};

export { SetCookieHelper, GetCookieHelper, checkAccessTokenKey };
