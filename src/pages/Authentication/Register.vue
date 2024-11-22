<template>
  <div class="authentication">
    <div class="d-flex justify-content-center align-items-center h-100">
      <div class="shadow">
        <div class="row">
          <div
            class="col-lg-6 col-sm-12 d-flex align-items-center justify-content-center img-container"
          >
            <div class="img-container">
              <img
                src="../../assets/images/cavite_garden_logo.png"
                alt="Cavite Garden Logo"
                width="400"
              />
            </div>
          </div>
          <div class="col-lg-6 col-sm-12 form-container text-white bg-primary">
            <div class="content m-auto h-100 p-5">
              <h1 class="fs-heading-4 text-center mb-4">Register</h1>

              <!-- Step Indicators -->
              <div class="step-indicators d-flex justify-content-between mb-4">
                <div :class="['step', currentStep >= 1 ? 'active' : '']">
                  Personal Info
                </div>
                <div :class="['step', currentStep >= 2 ? 'active' : '']">
                  Contact Details
                </div>
                <div :class="['step', currentStep >= 3 ? 'active' : '']">
                  Address
                </div>
              </div>

              <!-- Personal Info Step -->
              <div v-if="currentStep === 1" class="step-1">
                <div class="names mb-3 d-flex gap-3">
                  <div class="mb-2">
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
                  <div class="mb-2">
                    <label for="lastName" class="form-label fs-paragraph">
                      Last Name <span class="text-danger">*</span>
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
                  <label for="birthday" class="form-label fs-paragraph">
                    Birthday <span class="text-danger">*</span> (must be 18
                    years)
                  </label>
                  <input
                    type="date"
                    id="birthday"
                    class="form-control"
                    v-model="birthday"
                    required
                  />
                </div>
                <div class="mt-4 text-end">
                  <button
                    class="btn btn w-50 text-white py-2 bg-accent-1"
                    @click="nextStep"
                    :disabled="!isPersonalInfoValid"
                  >
                    Next
                  </button>
                </div>
              </div>

              <!-- Contact Details Step -->
              <div v-if="currentStep === 2" class="step-2">
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
                <div class="d-flex justify-content-between">
                  <button class="btn btn-secondary" @click="prevStep">
                    Previous
                  </button>
                  <button
                    class="btn btn w-50 text-white py-2 bg-accent-1"
                    @click="nextStep"
                    :disabled="!isContactInfoValid"
                  >
                    Next
                  </button>
                </div>
              </div>

              <!-- Address Step -->
              <div v-if="currentStep === 3" class="step-3">
                <div class="current-address">
                  <h4 class="mb-3">Current Address</h4>
                  <div class="row">
                    <div class="col-md-6 mb-3">
                      <label class="form-label">Region</label>
                      <input
                        v-model="currentAddress.region"
                        class="form-control"
                        required
                      />
                    </div>
                    <div class="col-md-6 mb-3">
                      <label class="form-label">Province</label>
                      <input
                        v-model="currentAddress.province"
                        class="form-control"
                        required
                      />
                    </div>
                    <div class="col-md-6 mb-3">
                      <label class="form-label">Municipality</label>
                      <input
                        v-model="currentAddress.city"
                        class="form-control"
                        required
                      />
                    </div>
                    <div class="col-md-6 mb-3">
                      <label class="form-label">Barangay</label>
                      <input
                        v-model="currentAddress.barangay"
                        class="form-control"
                        required
                      />
                    </div>
                    <div class="col-12 mb-3">
                      <label class="form-label">Street Address</label>
                      <input
                        v-model="currentAddress.streetAddress"
                        class="form-control"
                        required
                      />
                    </div>
                    <div class="col-12 mb-3">
                      <label class="form-label">Landmark</label>
                      <input
                        v-model="currentAddress.landmark"
                        class="form-control"
                      />
                    </div>
                    <div class="col-12 mb-3">
                      <label class="form-label">Label</label>
                      <input
                        v-model="currentAddress.addressLabel"
                        class="form-control"
                        placeholder="e.g. Home, Office, etc."
                      />
                    </div>
                  </div>
                </div>

                <div class="permanent-address">
                  <div class="form-check mb-3">
                    <input
                      type="checkbox"
                      v-model="sameAsPermanent"
                      class="form-check-input"
                      id="sameAddressCheckbox"
                    />
                    <label class="form-check-label" for="sameAddressCheckbox">
                      Permanent address is the same as current address
                    </label>
                  </div>

                  <template v-if="!sameAsPermanent">
                    <h4 class="mb-3">Permanent Address</h4>
                    <div class="row">
                      <div class="col-md-6 mb-3">
                        <label class="form-label">Region</label>
                        <input
                          v-model="permanentAddress.region"
                          class="form-control"
                          required
                        />
                      </div>
                      <div class="col-md-6 mb-3">
                        <label class="form-label">Province</label>
                        <input
                          v-model="permanentAddress.province"
                          class="form-control"
                          required
                        />
                      </div>
                      <div class="col-md-6 mb-3">
                        <label class="form-label">Municipality</label>
                        <input
                          v-model="permanentAddress.city"
                          class="form-control"
                          required
                        />
                      </div>
                      <div class="col-md-6 mb-3">
                        <label class="form-label">Barangay</label>
                        <input
                          v-model="permanentAddress.barangay"
                          class="form-control"
                          required
                        />
                      </div>
                      <div class="col-12 mb-3">
                        <label class="form-label">Street Address</label>
                        <input
                          v-model="permanentAddress.streetAddress"
                          class="form-control"
                          required
                        />
                      </div>
                      <div class="col-12 mb-3">
                        <label class="form-label">Landmark</label>
                        <input
                          v-model="permanentAddress.landmark"
                          class="form-control"
                        />
                      </div>
                      <div class="col-12 mb-3">
                        <label class="form-label">Label</label>
                        <input
                          v-model="permanentAddress.addressLabel"
                          class="form-control"
                          placeholder="e.g. Home, Office, etc."
                        />
                      </div>
                    </div>
                  </template>
                </div>

                <div class="passwords mb-3 d-flex gap-3">
                  <div class="mb-2">
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
                  <div class="mb-2">
                    <label
                      for="confirmPassword"
                      class="form-label fs-paragraph"
                    >
                      Confirm Password <span class="text-danger">*</span>
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
                <div class="d-flex justify-content-between">
                  <button class="btn btn-secondary" @click="prevStep">
                    Previous
                  </button>
                  <button
                    class="btn w-50 text-white py-2 bg-accent-1"
                    @click.prevent="submitForm"
                    :disabled="!isFormValid"
                  >
                    <span v-if="!btnLoadingState"> Register </span>
                    <ButtonLoader v-else />
                  </button>
                </div>
              </div>

              <div class="mt-4 my-2 text-center">
                <p class="d-inline fs-small">Already have an account?</p>
                <router-link
                  :to="{ name: 'login' }"
                  class="fs-small text-accent-2"
                >
                  Login
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
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

const currentStep = ref(1);
const btnLoadingState = ref(false);
const sameAsPermanent = ref(false);

// Personal Info
const firstName = ref("");
const lastName = ref("");
const birthday = ref("");

// Contact Details
const phoneNumber = ref("");
const email = ref("");

// Addresses
const currentAddress = ref({
  region: "",
  province: "",
  city: "",
  barangay: "",
  streetAddress: "",
  landmark: "",
  addressLabel: "",
});

const permanentAddress = ref({
  region: "",
  province: "",
  city: "",
  barangay: "",
  streetAddress: "",
  landmark: "",
  addressLabel: "",
});

// Passwords
const password = ref("");
const confirmPassword = ref("");

// Navigation Methods
const nextStep = () => {
  currentStep.value++;
};

const prevStep = () => {
  currentStep.value--;
};

// Validation Computeds
const isPersonalInfoValid = computed(() => {
  return firstName.value && lastName.value && birthday.value;
});

const isContactInfoValid = computed(() => {
  return email.value && phoneNumber.value;
});

const isFormValid = computed(() => {
  const currentAddressValid =
    currentAddress.value.region &&
    currentAddress.value.province &&
    currentAddress.value.city &&
    currentAddress.value.barangay &&
    currentAddress.value.streetAddress &&
    currentAddress.value.landmark &&
    currentAddress.value.addressLabel;

  const permanentAddressValid =
    sameAsPermanent.value ||
    (permanentAddress.value.region &&
      permanentAddress.value.province &&
      permanentAddress.value.city &&
      permanentAddress.value.barangay &&
      permanentAddress.value.streetAddress &&
      permanentAddress.value.landmark &&
      permanentAddress.value.addressLabel);

  return (
    firstName.value &&
    lastName.value &&
    birthday.value &&
    email.value &&
    phoneNumber.value &&
    currentAddressValid &&
    permanentAddressValid &&
    password.value &&
    confirmPassword.value &&
    password.value === confirmPassword.value
  );
});

// Data Preparation
const prepareUserData = () => {
  return {
    firstName: firstName.value,
    lastName: lastName.value,
    birthdate: birthday.value,
    phoneNumber: phoneNumber.value,
    customerEmail: email.value,
    currentAddress: currentAddress.value,
    permanentAddress: sameAsPermanent.value
      ? { ...currentAddress.value }
      : permanentAddress.value,
    password: password.value,
  };
};

// Form Submission
const submitForm = async () => {
  btnLoadingState.value = true;

  try {
    // Password Match Check
    if (password.value !== confirmPassword.value) {
      displayWarningAlert("Passwords do not match!");
      btnLoadingState.value = false;
      return;
    }

    // Age Verification
    const ageDifMs = Date.now() - new Date(birthday.value).getTime();
    const ageDate = new Date(ageDifMs);
    if (Math.abs(ageDate.getUTCFullYear() - 1970) < 18) {
      displayWarningAlert("You must be at least 18 years old to register.");
      btnLoadingState.value = false;
      return;
    }

    // Prepare and Send Data
    const userData = prepareUserData();

    const response = await registerUser(userData);

    if (response.status === "failed") {
      displayErrorAlert("Registration Failed", response.message);
    } else {
      displaySuccessAlert("Successfully Registered", "", () => {
        router.push({ name: "login" });
      });
    }
  } catch (error) {
    console.error(error);
    displayUnexpectedErrorAlert();
  } finally {
    btnLoadingState.value = false;
  }
};
</script>

<style scoped lang="scss">
@import "./Authentication.scss";
</style>
