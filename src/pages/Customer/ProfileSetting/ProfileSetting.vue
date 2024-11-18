<template>
  <div class="container-fluid">
    <h2 class="mb-4">Profile</h2>

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
                <input
                  type="text"
                  class="form-control"
                  v-model="address.addressLabel"
                />
              </div>
              <div class="mb-3">
                <label class="form-label">Region</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="address.region"
                />
              </div>
              <div class="mb-3">
                <label class="form-label">Province</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="address.province"
                />
              </div>
              <div class="mb-3">
                <label class="form-label">Municipality</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="address.municipality"
                />
              </div>
              <div class="mb-3">
                <label class="form-label">Barangay</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="address.barangay"
                />
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
                v-if="address.isNew"
                @click="saveAddress(index)"
                class="btn btn-primary mt-4"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../../../store/userStore";
import {
  UpdateCustomerDataAPI,
  AddNewCustomerAddressAPI,
  DeleteCustomerAddressAPI,
} from "../../../composables/Customers";
import Swal from "sweetalert2";
import { displaySuccessNotification } from "../../../composables/helpers/NotificationService";

const router = useRouter();

const userStore = useUserStore();
const user = userStore.getUserInfo();

const profile = ref({
  firstName: user.firstName,
  lastName: user.lastName,
  phoneNumber: user.phoneNumber,
  email: user.email,
  birthdate: user.birthdate,
  addresses: user.shippingAddresses || [],
});

const addAddress = () => {
  profile.value.addresses.push({
    addressLabel: "",
    region: "",
    province: "",
    municipality: "",
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
      barangay: address.barangay,
      streetAddress: address.streetAddress,
      landmark: address.landmark,
    };

    const response = await AddNewCustomerAddressAPI(payload);

    if (response.status === "failed") {
      Swal.fire({
        icon: "error",
        title: "Failed to add address",
        text: response.message,
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Address added successfully",
    }).then(() => {
      address.isNew = false; // Mark as saved
      router.go();
    });
  } catch (error) {
    console.error(error);
  }
};
</script>
