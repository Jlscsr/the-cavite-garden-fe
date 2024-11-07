<template>
  <div class="authentication">
    <div class="d-flex justify-content-center align-items-center h-100">
      <div class="shadow">
        <div class="row">
          <div
            class="col-6 d-flex align-items-center justify-content-center img-container"
          >
            <div class="img-container">
              <img
                src="../../assets/images/cavite_garden_logo.png"
                alt="Cavite Garden Logo"
                width="400"
              />
            </div>
          </div>
          <div class="col-6 form-container text-white bg-primary">
            <div class="content m-auto h-100 p-5">
              <div class="icon text-center mb-3">
                <h1 class="fs-heading-4">Register</h1>
              </div>
              <form class="form mt-4">
                <div class="mb-3 d-flex gap-3">
                  <div class="">
                    <label for="firstName" class="form-label fs-paragraph">
                      First Name <span class="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      class="form-control"
                      v-model="firstName"
                      required
                    />
                  </div>
                  <div class="">
                    <label for="lastName" class="form-label fs-paragraph">
                      Last Name
                      <span class="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      class="form-control"
                      v-model="lastName"
                      required
                    />
                  </div>
                </div>
                <div class="my-3">
                  <label for="phoneNumber" class="form-label fs-paragraph">
                    Phone Number <span class="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="phoneNumber"
                    class="form-control"
                    v-model="phoneNumber"
                    required
                  />
                </div>
                <div class="my-3">
                  <label for="birthday" class="form-label fs-paragraph">
                    Birthday
                    <span class="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    id="birthday"
                    class="form-control"
                    v-model="birthday"
                    required
                  />
                </div>
                <div class="my-3">
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
                <div class="mb-3 d-flex gap-3">
                  <div class="">
                    <label for="password" class="form-label fs-paragraph">
                      Password <span class="text-danger">*</span>
                    </label>
                    <input
                      type="password"
                      id="password"
                      class="form-control"
                      v-model="password"
                      required
                    />
                  </div>
                  <div class="">
                    <label
                      for="confirmPassword"
                      class="form-label fs-paragraph"
                    >
                      Confirm Password
                      <span class="text-danger">*</span>
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      class="form-control"
                      v-model="confirmPassword"
                      required
                    />
                  </div>
                </div>
                <div class="mt-5">
                  <button
                    class="btn w-100 text-white py-2 bg-accent-1"
                    @click.prevent="submitForm"
                    :disabled="!isFormValid"
                  >
                    <span v-if="!btnLoadingState"> Register </span>
                    <ButtonLoader v-else />
                  </button>
                </div>
                <div class="mt-4 text-center">
                  <p class="d-inline fs-small">Already have an account?</p>
                  <router-link
                    :to="{ name: 'login' }"
                    class="fs-small text-accent-2"
                  >
                    Login
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

import { registerUser } from "@composables/Authentication";
import {
  displayWarningAlert,
  displaySuccessAlert,
  displayUnexpectedErrorAlert,
  displayErrorAlert,
} from "@composables/helpers/AlertService";

import ButtonLoader from "@components/Loaders/BtnLoader.vue";

const router = useRouter();

const btnLoadingState = ref(false);

const firstName = ref("");
const lastName = ref("");
const email = ref("");
const phoneNumber = ref("");
const birthday = ref("");
const password = ref("");
const confirmPassword = ref("");

const register = async () => {
  try {
    const customerData = {
      firstName: firstName.value,
      lastName: lastName.value,
      birthdate: birthday.value,
      phoneNumber: phoneNumber.value,
      customerEmail: email.value,
      password: password.value,
    };
    const response = await registerUser(customerData);

    if (response.status === "failed") {
      return displayErrorAlert("Error", response.message);
    }

    displaySuccessAlert("Successfully Registered", "", () => {
      resetForm();
      router.push({ name: "login" });
    });
  } catch (error) {
    console.error(error);
    displayUnexpectedErrorAlert();
  } finally {
    btnLoadingState.value = false;
  }
};

const resetForm = () => {
  firstName.value = "";
  lastName.value = "";
  email.value = "";
  phoneNumber.value = "";
  birthday.value = "";
  password.value = "";
  confirmPassword.value = "";
};

const submitForm = () => {
  btnLoadingState.value = true;
  if (password.value !== confirmPassword.value) {
    return displayWarningAlert("Passwords do not match!", "", () => {
      password.value = "";
      confirmPassword.value = "";
      btnLoadingState.value = false;
    });
  }

  if (!isLegalAge) {
    return displayWarningAlert("Passwords do not match!", "", () => {
      btnLoadingState.value = false;
    });
  }

  register();
};

const isFormValid = computed(() => {
  return (
    firstName.value &&
    lastName.value &&
    email.value &&
    phoneNumber.value &&
    birthday.value &&
    password.value &&
    confirmPassword.value
  );
});

const isLegalAge = (birthday) => {
  return new Date().getFullYear() - new Date(birthday).getFullYear() < 18;
};
</script>

<style scoped lang="scss">
@import "./Authentication.scss";
</style>
