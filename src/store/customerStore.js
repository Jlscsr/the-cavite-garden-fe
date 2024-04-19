import { defineStore } from "pinia";
import { ref } from "vue";

export const useCustomerStore = defineStore("customer", () => {
    const authenticateCustomer = () => {
        localStorage.setItem("iscustauth", true);
    };

    const unauthticateCustomer = () => {
        localStorage.setItem("iscustauth", false);
    };

    const getCustomerAuthStatus = () => {
        const status = JSON.parse(localStorage.getItem("iscustauth"));

        if (status) {
            return true;
        }
        return false;
    };

    return {
        getCustomerAuthStatus,
        authenticateCustomer,
        unauthticateCustomer,
    };
});
