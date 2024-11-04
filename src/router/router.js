import swal from "sweetalert";
import routes from "./routes";

import { createRouter, createWebHistory } from "vue-router";
import { CheckUserSessionAPI } from "@composables/Authentication";
import { GetUserInfoAPI } from "@composables/Account";
import { useUserStore } from "@stores/userStore";

const router = createRouter({
    history: createWebHistory(),
    routes,
});

const checkUserSession = async (userStore) => {
    const response = await CheckUserSessionAPI();

    // Checks if the user session is expired
    if (response.status === "unauthorized") {
        if (userStore.isUserAuthenticated()) {
            swal("Session Expired!", "Please login again", "error");
        }
        userStore.setUserInfo({});
        userStore.setUserAuthenticated(false);
        return false;
    }

    userStore.setUserAuthenticated(true);
    return true;
};

const getUserInfo = async (userStore) => {
    const response = await GetUserInfoAPI();

    userStore.setUserInfo(response.data);
    userStore.setUserAuthenticated(true);

    return userStore.getUserRole();
};

router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore();
    const isAuthenticated = await checkUserSession(userStore);

    if (to.name === "home" && isAuthenticated) {
        await getUserInfo(userStore);
    }

    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (!isAuthenticated) {
            return next({ name: "login" });
        }

        const userRole = await getUserInfo(userStore);

        if (
            to.matched.some(
                (record) => record.meta.role && record.meta.role !== userRole
            )
        ) {
            swal(
                "Unauthorized",
                "You do not have permission to access this page",
                "error"
            );
            return next({ name: "home" });
        }
    }

    next();
});

export default router;
