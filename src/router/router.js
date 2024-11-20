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

const checkAndFetchUser = async (to, userStore) => {
  const sessionResponse = await CheckUserSessionAPI();

  // If session is unauthorized, check if the route does not require auth
  if (sessionResponse.status === "unauthorized") {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      if (userStore.isUserAuthenticated()) {
        displaySessionExpiredAlert(() => {
          userStore.resetUserSession();
        });
      }
      return false;
    }
    return true; // Allow access to routes without requiresAuth
  }

  // Proceed with authentication logic
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

  // Allow unauthenticated access to login and register
  if (["login", "register"].includes(to.name)) {
    if (userStore.isUserAuthenticated()) {
      return { name: "home" };
    }
    return true;
  }

  // Check authentication status
  const isAuthenticated = await checkAndFetchUser(to, userStore);

  // Allow unauthenticated access to `home` or other public routes
  if (!isAuthenticated) {
    if (!to.matched.some((record) => record.meta.requiresAuth)) {
      return true; // Public route, allow access
    }

    displayLoginFirstAlert(() => {
      return { name: "login" };
    });
    return false; // Stop navigation to protected routes
  }

  // Handle role-based access for authenticated users
  const userRole = userStore.getUserRole();
  console.log(userRole);

  // Check if the route has a defined role array in meta
  const allowedRoles = to.matched.some(
    (record) =>
      record.meta.role && Array.isArray(record.meta.role)
        ? record.meta.role.includes(userRole) // Role check for allowed roles
        : record.meta.role === userRole // If there's only one role
  );

  if (!allowedRoles) {
    displayUnauthorizedPageAccessAlert(() => router.push({ name: "home" }));
    return false; // Stop navigation if user role doesn't match
  }

  return true; // Allow navigation if all checks pass
});

export default router;
