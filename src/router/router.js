import { createRouter, createWebHistory } from "vue-router";
import {
    checkUserSession,
    RequestToCheckUserRole,
    logout,
} from "../composables/Authentication";
import {
    SetCookieHelper,
    checkAccessTokenKey,
} from "../composables/helpers/CookieHelper";
import swal from "sweetalert";
import routes from "./routes";

const router = createRouter({
    history: createWebHistory(),
    routes,
});

const checkIfUserIsAuthenticated = async () => {
    // TODO: implement check if user is authenticated
};

router.beforeEach(async (to, from, next) => {
    next();
});

export default router;
