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

router.beforeEach(async (to, from) => {
  const userStore = useUserStore();

  // Handle login and register routes
  if (["login", "register"].includes(to.name)) {
    if (userStore.isUserAuthenticated()) {
      return { name: "home" };
    }
    return true;
  }

  // Check authentication status
  const isAuthenticated = await checkAndFetchUser(userStore);

  if (!isAuthenticated) {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      displayLoginFirstAlert(() => router.push({ name: "login" }));
      return false; // Stop navigation
    }
    return true;
  }

  // Handle role-based access
  const userRole = userStore.getUserRole();
  if (
    to.matched.some(
      (record) => record.meta.role && record.meta.role !== userRole
    )
  ) {
    displayUnauthorizedPageAccessAlert(() => router.push({ name: "home" }));
    return false; // Stop navigation
  }

  return true; // Allow navigation
});
export default router;
