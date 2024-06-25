import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
    const userInfo = ref({});
    const isAuthenticated = ref(false);

    const setUserInfo = (data) => {
        userInfo.value = data;
    };

    const getUserInfo = () => {
        return userInfo.value;
    };

    const getUserRole = () => {
        return userInfo.value.role;
    };

    const setUserAuthenticated = (status) => {
        isAuthenticated.value = status;
    };

    const isUserAuthenticated = () => {
        return isAuthenticated.value;
    };

    return {
        setUserInfo,
        getUserInfo,
        getUserRole,
        setUserAuthenticated,
        isUserAuthenticated,
    };
});
