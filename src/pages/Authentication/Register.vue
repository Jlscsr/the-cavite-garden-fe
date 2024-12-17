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
                      <select
                        @change="handleProvince('c', $event)"
                        class="form-select"
                      >
                        <option selected>Select region</option>
                        <option
                          v-for="region in regionOptions"
                          :key="region.region_code"
                          :value="region.region_code"
                        >
                          {{ region.region_name }}
                        </option>
                      </select>
                    </div>

                    <!-- Province -->
                    <div class="col-md-6 mb-3">
                      <label class="form-label">Province</label>
                      <select
                        @change="handleMunicipality('c', $event)"
                        class="form-select"
                      >
                        <option selected>Select province</option>
                        <option
                          v-for="province in provinceOptions"
                          :key="province.province_code"
                          :value="province.province_code"
                        >
                          {{ province.province_name }}
                        </option>
                      </select>
                    </div>

                    <!-- Municipality -->
                    <div class="col-md-6 mb-3">
                      <label class="form-label">Municipality</label>
                      <select
                        @change="handleBarangay('c', $event)"
                        class="form-select"
                      >
                        <option selected>Select municipality</option>
                        <option
                          v-for="city in cityOptions"
                          :key="city.city_code"
                          :value="city.city_code"
                        >
                          {{ city.city_name }}
                        </option>
                      </select>
                    </div>

                    <!-- Barangay -->
                    <div class="col-md-6 mb-3">
                      <label class="form-label">Barangay</label>
                      <select
                        @change="handleBarangayChange('c', $event)"
                        class="form-select"
                      >
                        <option selected>Select barangay</option>
                        <option
                          v-for="barangay in barangayOptions"
                          :key="barangay.brgy_code"
                          :value="barangay.brgy_code"
                        >
                          {{ barangay.brgy_name }}
                        </option>
                      </select>
                    </div>
                    <div class="col-12 mb-3">
                      <label class="form-label">Postal code</label>
                      <input
                        v-model="currentAddress.postalCode"
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
                        placeholder="e.g. subd. blk, lot, street."
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
                      <select
                        class="form-select"
                        v-model="currentAddress.addressLabel"
                      >
                        <option selected>Select Address Label</option>
                        <option value="Home">Home</option>
                        <option value="Office">Office</option>
                        <option value="Apartment">Apartment</option>
                        <option value="Condominium">Condominium</option>
                      </select>
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
                        <select
                          @change="handleProvince('p', $event)"
                          class="form-select"
                        >
                          <option selected>Select region</option>
                          <option
                            v-for="region in regionOptions"
                            :key="region.region_code"
                            :value="region.region_code"
                          >
                            {{ region.region_name }}
                          </option>
                        </select>
                      </div>
                      <div class="col-md-6 mb-3">
                        <label class="form-label">Province</label>
                        <select
                          @change="handleMunicipality('p', $event)"
                          class="form-select"
                        >
                          <option selected>Select province</option>
                          <option
                            v-for="province in provinceOptions"
                            :key="province.province_code"
                            :value="province.province_code"
                          >
                            {{ province.province_name }}
                          </option>
                        </select>
                      </div>
                      <div class="col-md-6 mb-3">
                        <label class="form-label">Municipality</label>
                        <select
                          @change="handleBarangay('p', $event)"
                          class="form-select"
                        >
                          <option selected>Select municipality</option>
                          <option
                            v-for="city in cityOptions"
                            :key="city.city_code"
                            :value="city.city_code"
                          >
                            {{ city.city_name }}
                          </option>
                        </select>
                      </div>
                      <div class="col-md-6 mb-3">
                        <label class="form-label">Barangay</label>
                        <select
                          @change="handleBarangayChange('p', $event)"
                          class="form-select"
                        >
                          <option selected>Select barangay</option>
                          <option
                            v-for="brgy in barangayOptions"
                            :key="brgy.brgy_code"
                            :value="brgy.brgy_code"
                          >
                            {{ brgy.brgy_name }}
                          </option>
                        </select>
                      </div>
                      <div class="col-12 mb-3">
                        <label class="form-label">Postal code</label>
                        <input
                          v-model="permanentAddress.postalCode"
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
                        <select
                          class="form-select"
                          v-model="permanentAddress.addressLabel"
                        >
                          <option selected>Select Address Label</option>
                          <option value="Home">Home</option>
                          <option value="Office">Office</option>
                          <option value="Apartment">Apartment</option>
                          <option value="Condominium">Condominium</option>
                        </select>
                      </div>
                    </div>
                  </template>
                </div>

                <div class="passwords mb-3 d-flex gap-3">
                  <div class="mb-2">
                    <label for="password" class="form-label fs-paragraph">
                      Password <span class="text-danger">*</span>
                    </label>
                    <div class="input-group">
                      <input
                        :type="showPassword ? 'text' : 'password'"
                        id="password"
                        class="form-control"
                        v-model="password"
                        required
                      />
                      <button
                        class="btn btn-light"
                        type="button"
                        @click="showPassword = !showPassword"
                      >
                        <VisionIcon size="20" />
                      </button>
                    </div>
                  </div>
                  <div class="mb-2">
                    <label
                      for="confirmPassword"
                      class="form-label fs-paragraph"
                    >
                      Confirm Password <span class="text-danger">*</span>
                    </label>
                    <div class="input-group">
                      <input
                        :type="showPassword ? 'text' : 'password'"
                        id="confirmPassword"
                        class="form-control"
                        v-model="confirmPassword"
                        required
                      />
                      <button
                        class="btn btn-light"
                        type="button"
                        @click="showPassword = !showPassword"
                      >
                        <VisionIcon size="20" />
                      </button>
                    </div>
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
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import {
  regions,
  provinces,
  cities,
  barangays,
} from "select-philippines-address";
import { registerUser } from "@composables/Authentication";
import {
  displayWarningAlert,
  displaySuccessAlert,
  displayUnexpectedErrorAlert,
  displayErrorAlert,
} from "@composables/helpers/AlertService";

import VisionIcon from "../../assets/icons/VisionIcon.vue";
import ButtonLoader from "@components/Loaders/BtnLoader.vue";

const router = useRouter();

const currentStep = ref(1);
const btnLoadingState = ref(false);
const sameAsPermanent = ref(false);
const showPassword = ref(false);

// Personal Info
const firstName = ref("");
const lastName = ref("");
const birthday = ref("");

const regionOptions = ref([]);
const provinceOptions = ref([]);
const cityOptions = ref([]);
const barangayOptions = ref([]);

// Contact Details
const phoneNumber = ref("");
const email = ref("");

// Addresses
const currentAddress = ref({
  region: "",
  province: "",
  city: "",
  barangay: "",
  postalCode: "",
  streetAddress: "",
  landmark: "",
  addressLabel: "",
});

const permanentAddress = ref({
  region: "",
  province: "",
  city: "",
  barangay: "",
  postalCode: "",
  streetAddress: "",
  landmark: "",
  addressLabel: "",
});

// Passwords
const password = ref("");
const confirmPassword = ref("");

onMounted(async () => {
  regionOptions.value = await regions();
  console.log(regionOptions.value);
});

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
  // Track current address validity
  const currentAddressValid =
    currentAddress.value.region &&
    currentAddress.value.province &&
    currentAddress.value.city &&
    currentAddress.value.barangay &&
    currentAddress.value.postalCode &&
    currentAddress.value.streetAddress &&
    currentAddress.value.landmark &&
    currentAddress.value.addressLabel;

  // Track permanent address validity
  const permanentAddressValid =
    sameAsPermanent.value ||
    (permanentAddress.value.region &&
      permanentAddress.value.province &&
      permanentAddress.value.city &&
      permanentAddress.value.postalCode &&
      permanentAddress.value.barangay &&
      permanentAddress.value.streetAddress &&
      permanentAddress.value.landmark &&
      permanentAddress.value.addressLabel);

  const isValid =
    firstName.value &&
    lastName.value &&
    birthday.value &&
    email.value &&
    phoneNumber.value &&
    currentAddressValid &&
    permanentAddressValid &&
    password.value &&
    confirmPassword.value &&
    password.value === confirmPassword.value;

  return isValid;
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

const handleProvince = async (addressType, e) => {
  if (addressType === "c") {
    currentAddress.value.region = e.target.options[e.target.selectedIndex].text;
    provinceOptions.value = await provinces(e.target.value);
  } else {
    permanentAddress.value.region =
      e.target.options[e.target.selectedIndex].text;
    provinceOptions.value = await provinces(e.target.value);
  }
};

const handleMunicipality = async (addressType, e) => {
  if (addressType === "c") {
    currentAddress.value.province =
      e.target.options[e.target.selectedIndex].text;
    cityOptions.value = await cities(e.target.value);
  } else {
    permanentAddress.value.province =
      e.target.options[e.target.selectedIndex].text;
    cityOptions.value = await cities(e.target.value);
  }
};

const handleBarangay = async (addressType, e) => {
  if (addressType === "c") {
    currentAddress.value.city = e.target.options[e.target.selectedIndex].text;
    barangayOptions.value = await barangays(e.target.value);
  } else {
    permanentAddress.value.city = e.target.options[e.target.selectedIndex].text;
    barangayOptions.value = await barangays(e.target.value);
  }
};

const handleBarangayChange = (addressType, e) => {
  if (addressType === "c") {
    currentAddress.value.barangay =
      e.target.options[e.target.selectedIndex].text;
  } else {
    permanentAddress.value.barangay =
      e.target.options[e.target.selectedIndex].text;
  }
};
</script>

<style scoped lang="scss">
@import "./Authentication.scss";
</style>
