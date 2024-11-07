import { createRouter, createWebHistory } from "vue-router";

import { useUserStore } from "@stores/userStore";
import { GetUserInfoAPI } from "@composables/Account";
import { CheckUserSessionAPI } from "@composables/Authentication";
import {
  displaySessionExpiredAlert,
  displayUnauthorizedPageAccessAlert,
  displayAPIRequestErrorAlert,
  displayLoginFirstAlert,
} from "../composables/helpers/AlertService";

import routes from "./routes";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const checkUserSession = async (userStore) => {
  const response = await CheckUserSessionAPI();

  // Checks if the user session is expired
  if (response.status === "unauthorized") {
    if (userStore.isUserAuthenticated()) {
      displaySessionExpiredAlert(() => {
        userStore.resetUserSession();
        return false;
      });
    }
  }

  userStore.setUserAuthenticated(true);
  return true;
};

const getUserInfo = async (userStore) => {
  const response = await GetUserInfoAPI();

  if (response.status === "failed") {
    displayAPIRequestErrorAlert(
      "Something went wrong",
      response.message,
      () => {
        userStore.resetUserSession();
        return false;
      }
    );
  }

  userStore.setUserInfo(response.data);
  userStore.setUserAuthenticated(true);

  return userStore.getUserRole();
};

router.beforeEach(async (to, from, next) => {
  if (to.name === "register" && from.name === "login") {
    return next();
  }

  if (to.name === "login" && from.name === "register") {
    return next();
  }

  const userStore = useUserStore();
  const isAuthenticated = await checkUserSession(userStore);

  if (to.name === "home" && isAuthenticated) {
    await getUserInfo(userStore);
  }

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      displayLoginFirstAlert(() => {
        return next({ name: "login" });
      });
    }

    const userRole = await getUserInfo(userStore);

    if (
      to.matched.some(
        (record) => record.meta.role && record.meta.role !== userRole
      )
    ) {
      displayUnauthorizedPageAccessAlert(() => {
        return next({ name: "home" });
      });
    }
  }
  next();
});

export default router;
