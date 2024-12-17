<template>
  <div class="container-fluid">
    <div class="d-flex justify-content-between align-items-center">
      <h2 class="mb-4">Profile</h2>

      <!-- Delete button -->
      <button @click="deleteProfile" class="btn btn-danger btn-sm">
        Delete Account
      </button>
    </div>

    <div>
      <!-- Basic Info -->
      <div class="row mb-4">
        <div class="col-md-6">
          <div class="mb-3">
            <label class="form-label">First Name</label>
            <input
              type="text"
              class="form-control"
              v-model="profile.firstName"
            />
          </div>
        </div>
        <div class="col-md-6">
          <div class="mb-3">
            <label class="form-label">Last Name</label>
            <input
              type="text"
              class="form-control"
              v-model="profile.lastName"
            />
          </div>
        </div>
      </div>

      <div class="mb-4">
        <label class="form-label">Email</label>
        <input
          type="email"
          class="form-control"
          v-model="profile.email"
          disabled
        />
      </div>

      <div class="mb-4 d-flex align-items-center">
        <div class="flex-grow-1">
          <label class="form-label">Phone Number</label>
          <input
            type="text"
            class="form-control"
            v-model="profile.phoneNumber"
          />
        </div>
      </div>

      <div class="mb-4">
        <label class="form-label">Birthday</label>
        <input type="date" class="form-control" v-model="profile.birthdate" />
      </div>

      <button @click="saveProfile" class="btn btn-primary">Save</button>

      <!-- Addresses Section -->
      <div class="mt-4">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h3>Addresses</h3>
          <button @click="addAddress" class="btn btn-success btn-sm">
            Add Address
          </button>
        </div>

        <div class="address-list">
          <div
            v-for="(address, index) in profile.addresses"
            :key="index"
            class="card mb-3"
          >
            <div class="card-body">
              <div
                class="d-flex justify-content-between align-items-start mb-2"
              >
                <h5 class="card-title">Address {{ index + 1 }}</h5>
                <button
                  @click="removeAddress(address.id)"
                  class="btn btn-link text-danger p-0"
                >
                  Remove
                </button>
              </div>

              <!-- Address Details -->
              <div class="mb-3">
                <label class="form-label">Address Label</label>
                <select
                  class="form-select"
                  v-model="address.addressLabel"
                  @change="address.isEdited = true"
                >
                  <option selected>Select Address Label</option>
                  <option value="Home">Home</option>
                  <option value="Office">Office</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Condominium">Condominium</option>
                </select>
              </div>
              <div class="mb-3">
                <label class="form-label">Region</label>
                <select
                  @change="handleProvince(address, $event)"
                  class="form-select"
                >
                  <option selected>
                    {{ address.region || "Select region" }}
                  </option>
                  <option
                    v-for="region in regionOptions"
                    :key="region.region_code"
                    :value="region.region_code"
                  >
                    {{ region.region_name }}
                  </option>
                </select>
              </div>
              <div class="mb-3">
                <label class="form-label">Province</label>
                <select
                  @change="handleMunicipality(address, $event)"
                  class="form-select"
                >
                  <option selected>
                    {{ address.province || "Select Province" }}
                  </option>
                  <option
                    v-for="province in provinceOptions"
                    :key="province.province_code"
                    :value="province.province_code"
                  >
                    {{ province.province_name }}
                  </option>
                </select>
              </div>
              <div class="mb-3">
                <label class="form-label">Municipality</label>
                <select
                  @change="handleBarangay(address, $event)"
                  class="form-select"
                >
                  <option selected>
                    {{ address.municipality || "Select City" }}
                  </option>
                  <option
                    v-for="city in cityOptions"
                    :key="city.city_code"
                    :value="city.city_code"
                  >
                    {{ city.city_name }}
                  </option>
                </select>
              </div>
              <div class="mb-3">
                <label class="form-label">Postal Code</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="address.postalCode"
                  @input="address.isEdited = true"
                />
              </div>
              <div class="mb-3">
                <label class="form-label">Barangay</label>
                <select
                  @change="handleBarangayChange(address, $event)"
                  class="form-select"
                >
                  <option selected>
                    {{ address.barangay || "Select Barangay" }}
                  </option>
                  <option
                    v-for="barangay in barangayOptions"
                    :key="barangay.brgy_code"
                    :value="barangay.brgy_code"
                  >
                    {{ barangay.brgy_name }}
                  </option>
                </select>
              </div>
              <div class="mb-3">
                <label class="form-label">Street Address</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="address.streetAddress"
                />
              </div>
              <div class="mb-3">
                <label class="form-label">Landmark</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="address.landmark"
                />
              </div>

              <!-- Conditional Save Button -->
              <button
                v-if="address.isNew || address.isEdited"
                @click="saveAddress(index)"
                class="btn btn-primary mt-4"
              >
                {{ address.isNew ? "Save" : "Update" }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import {
  regions,
  provinces,
  cities,
  barangays,
} from "select-philippines-address";

import { useUserStore } from "../../../store/userStore";
import {
  UpdateCustomerDataAPI,
  AddNewCustomerAddressAPI,
  UpdateCustomerAddressAPI,
  DeleteCustomerAddressAPI,
  DeleteCustomerAPI,
} from "../../../composables/Customers";
import { LogoutUserAPI } from "../../../composables/Authentication";
import Swal from "sweetalert2";
import { displaySuccessNotification } from "../../../composables/helpers/NotificationService";

const router = useRouter();

const userStore = useUserStore();
const user = userStore.getUserInfo();

const regionOptions = ref([]);
const provinceOptions = ref([]);
const cityOptions = ref([]);
const barangayOptions = ref([]);

const profile = ref({
  firstName: user.firstName,
  lastName: user.lastName,
  phoneNumber: user.phoneNumber,
  email: user.email,
  birthdate: user.birthdate,
  addresses:
    user.shippingAddresses.map((address) => ({
      ...address,
      isNew: false,
      isEdited: false,
    })) || [],
});

const addAddress = () => {
  profile.value.addresses.push({
    addressLabel: "",
    region: "",
    province: "",
    municipality: "",
    postalCode: "",
    barangay: "",
    streetAddress: "",
    landmark: "",
    isNew: true,
  });
};

const removeAddress = async (addressID) => {
  try {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await DeleteCustomerAddressAPI(addressID);

        if (response.status === "failed") {
          Swal.fire({
            icon: "error",
            title: "Failed to delete address",
            text: response.message,
          });
          return;
        }

        displaySuccessNotification("Address deleted successfully");
        profile.value.addresses = profile.value.addresses.filter(
          (address) => address.id !== addressID
        );
      }
    });
  } catch (error) {}
};

const saveProfile = async () => {
  try {
    const payload = {
      firstName: profile.value.firstName,
      lastName: profile.value.lastName,
      phoneNumber: profile.value.phoneNumber,
      birthdate: profile.value.birthdate,
    };

    // Check if the old data is same with the new data
    if (
      profile.value.firstName === user.firstName &&
      profile.value.lastName === user.lastName &&
      profile.value.phoneNumber === user.phoneNumber &&
      profile.value.birthdate === user.birthdate
    ) {
      Swal.fire({
        icon: "info",
        title: "No changes made",
      });
      return;
    }

    const response = await UpdateCustomerDataAPI(payload);

    if (response.status === "failed") {
      Swal.fire({
        icon: "error",
        title: "Failed to update profile",
        text: response.message,
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Profile updated successfully",
    }).then((result) => {
      if (result.isConfirmed) {
        router.go();
      }
    });
  } catch (error) {
    console.error(error);
  }
};

const saveAddress = async (index) => {
  try {
    const address = profile.value.addresses[index];

    const payload = {
      addressLabel: address.addressLabel,
      region: address.region,
      province: address.province,
      city: address.municipality,
      postalCode: address.postalCode,
      barangay: address.barangay,
      streetAddress: address.streetAddress,
      landmark: address.landmark,
    };

    if (address.isNew) {
      await addNewCustomerAddress(payload);
      address.isNew = false;
    } else {
      await updateCustomerAddress(address.id, payload);
      address.isEdited = false;
    }
  } catch (error) {
    console.error(error);
  }
};

const addNewCustomerAddress = async (payload) => {
  try {
    const response = await AddNewCustomerAddressAPI(payload);

    if (response.status === "failed") {
      Swal.fire({
        icon: "error",
        title: "Failed to add address",
        text: response.message,
      });
      return;
    }

    displaySuccessNotification("Address added successfully");
  } catch (error) {
    console.error(error);
  }
};

const updateCustomerAddress = async (addressID, payload) => {
  try {
    const response = await UpdateCustomerAddressAPI(addressID, payload);

    if (response.status === "failed") {
      Swal.fire({
        icon: "error",
        title: "Failed to update address",
        text: response.message,
      });
      return;
    }

    displaySuccessNotification("Address updated successfully");
  } catch (error) {
    console.error(error);
  }
};

const deleteProfile = async () => {
  try {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this! All your data(orders, addresses, etc.) will be deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await DeleteCustomerAPI(user.id);

        if (response.status === "failed") {
          Swal.fire({
            icon: "error",
            title: "Failed to delete profile",
            text: response.message,
          });
          return;
        }

        Swal.fire({
          icon: "success",
          title: "Profile deleted successfully",
        }).then(async (result) => {
          if (result.isConfirmed) {
            await LogoutUserAPI();
            userStore.setUserInfo({});
            userStore.setUserAuthenticated(false);
            router.push({ name: "home" });
          }
        });
      }
    });
  } catch (error) {
    console.error(error);
  }
};

const handleProvince = async (address, e) => {
  profile.value.addresses[profile.value.addresses.indexOf(address)].region =
    e.target.options[e.target.selectedIndex].text;
  profile.value.addresses[profile.value.addresses.indexOf(address)].province =
    "";
  profile.value.addresses[
    profile.value.addresses.indexOf(address)
  ].isEdited = true;

  provinceOptions.value = await provinces(e.target.value);
};

const handleMunicipality = async (address, e) => {
  profile.value.addresses[profile.value.addresses.indexOf(address)].province =
    e.target.options[e.target.selectedIndex].text;
  profile.value.addresses[
    profile.value.addresses.indexOf(address)
  ].municipality = "";

  cityOptions.value = await cities(e.target.value);
};

const handleBarangay = async (address, e) => {
  profile.value.addresses[
    profile.value.addresses.indexOf(address)
  ].municipality = e.target.options[e.target.selectedIndex].text;
  profile.value.addresses[profile.value.addresses.indexOf(address)].barangay =
    "";

  barangayOptions.value = await barangays(e.target.value);
};

const handleBarangayChange = (address, e) => {
  profile.value.addresses[profile.value.addresses.indexOf(address)].barangay =
    e.target.options[e.target.selectedIndex].text;
};

onMounted(async () => {
  regionOptions.value = await regions();
});
</script>
