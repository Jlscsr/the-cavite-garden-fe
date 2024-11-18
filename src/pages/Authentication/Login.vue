<template>
  <div class="authentication">
    <div class="d-flex justify-content-center align-items-center h-100">
      <div class="shadow">
        <div class="row">
          <div
            class="col d-flex align-items-center justify-content-center img-container cursor-pointer"
            @click="router.push({ name: 'home' })"
          >
            <div class="img-container">
              <img
                src="../../assets/images/cavite_garden_logo.png"
                alt="Cavite Garden Logo"
                width="400"
              />
            </div>
          </div>
          <div class="col form-container text-white bg-primary">
            <div class="content m-auto h-100 p-5">
              <div class="icon text-center mb-3">
                <h1 class="fs-heading-4">Login</h1>
              </div>
              <form class="form mt-4">
                <div class="mb-3">
                  <label for="email" class="form-label fs-paragraph">
                    Email <span class="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    class="form-control"
                    v-model="email"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label fs-paragraph">
                    Password
                    <span class="text-danger">*</span>
                  </label>
                  <input
                    type="password"
                    id="password"
                    class="form-control"
                    v-model="password"
                    required
                  />
                </div>
                <div class="d-flex justify-content-end mb-3">
                  <div class="forgot">
                    <router-link to="" class="text-white fs-small"
                      >Forgot password?
                    </router-link>
                  </div>
                </div>
                <div class="mt-5">
                  <button
                    class="btn w-100 text-white py-2 bg-accent-1"
                    @click.prevent="submitForm"
                    :disabled="!isFormValid"
                  >
                    <span v-if="!btnLoadingState"> Login </span>
                    <ButtonLoader v-else />
                  </button>
                </div>
                <div class="mt-4 text-center">
                  <p class="d-inline fs-small">Don't have an account?</p>
                  <router-link
                    :to="{ name: 'register' }"
                    class="fs-small text-accent-2"
                  >
                    Register
                  </router-link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

import {
  displayLoginFailedAlert,
  displayUnexpectedErrorAlert,
  displaySuccessAlert,
} from "@composables/helpers/AlertService";
import { useUserStore } from "@stores/userStore";
import { LoginUserAPI } from "@composables/Authentication";

import ButtonLoader from "@components/Loaders/BtnLoader.vue";

const router = useRouter();
const userStore = useUserStore();

const btnLoadingState = ref(false);

const email = ref("");
const password = ref("");

const submitForm = async () => {
  btnLoadingState.value = true;

  const userCredentials = {
    email: email.value,
    password: password.value,
  };

  const response = await LoginUserAPI(userCredentials);

  if (response.status === "unauthorized") {
    return displayLoginFailedAlert(response.message, () => {
      btnLoadingState.value = false;
      password.value = "";
    });
  }

  if (response.status === "failed") {
    return displayUnexpectedErrorAlert(response.message, () => {
      btnLoadingState.value = false;
      resetForm();
    });
  }

  displaySuccessAlert(
    "Login Success",
    "You have successfully logged in",
    () => {
      handleSuccessLogin(response);
    }
  );
};

const handleSuccessLogin = (response) => {
  btnLoadingState.value = false;

  userStore.setUserInfo(response.data);
  userStore.setUserAuthenticated(true);

  userStore.getUserRole() === "admin"
    ? router.push({ name: "product-lists" })
    : router.push({ name: "home" });
  resetForm();
};

const resetForm = () => {
  email.value = "";
  password.value = "";
};

const isFormValid = computed(() => {
  return email.value && password.value;
});
</script>

<style scoped lang="scss">
@import "./Authentication.scss";
</style>
