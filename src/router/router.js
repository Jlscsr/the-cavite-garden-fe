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

const checkAndFetchUser = async (userStore) => {
  const sessionResponse = await CheckUserSessionAPI();

  if (sessionResponse.status === "unauthorized") {
    if (userStore.isUserAuthenticated()) {
      displaySessionExpiredAlert(() => {
        userStore.resetUserSession();
      });
    }
    return false;
  }

  userStore.setUserAuthenticated(true);

  const userInfoResponse = await GetUserInfoAPI();

  if (userInfoResponse.status === "failed") {
    displayAPIRequestErrorAlert(
      "Something went wrong",
      userInfoResponse.message,
      () => {
        userStore.resetUserSession();
      }
    );
    return false;
  }

  userStore.setUserInfo(userInfoResponse.data);
  return true;
};

router.beforeEach(async (to, from, next) => {
  if (
    ["register", "login"].includes(to.name) &&
    ["login", "register"].includes(from.name)
  ) {
    return next();
  }

  const userStore = useUserStore();
  const isAuthenticated = await checkAndFetchUser(userStore);

  if (
    !isAuthenticated &&
    to.matched.some((record) => record.meta.requiresAuth)
  ) {
    return displayLoginFirstAlert(() => next({ name: "login" }));
  }

  if (isAuthenticated) {
    const userRole = userStore.getUserRole();
    if (
      to.matched.some(
        (record) => record.meta.role && record.meta.role !== userRole
      )
    ) {
      return displayUnauthorizedPageAccessAlert(() => next({ name: "home" }));
    }
  }

  next();
});

export default router;
