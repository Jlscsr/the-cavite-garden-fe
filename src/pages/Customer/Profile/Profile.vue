<template>
    <div class="container mt-3">
        <div class="d-flex align-items-center gap-3 mb-2">
            <router-link class="btn fs-3" :to="{ name: 'home' }">
                <i class="fas fa-arrow-left"></i>
            </router-link>
            <h1 class="fs-3 m-0">My Profile</h1>
        </div>
        <div class="border rounded p-4">
            <div class="d-flex align-items-center mb-2">
                <h3 class="mb-0">Personal Information</h3>
                <button class="btn" @click="personalInfoEditMode = true">
                    <i class="fas fa-edit"></i>
                </button>
            </div>
            <div class="d-flex flex-column row-gap-3">
                <div class="d-flex gap-5">
                    <div class="d-flex flex-column gap-3">
                        <div class="">
                            <p class="text-secondary fs-medium mb-0">
                                First Name
                            </p>
                            <p v-if="!personalInfoEditMode" class="mb-0">
                                {{ userPersonalInfo?.firstName }}
                            </p>
                            <input
                                v-else
                                class="rounded px-2"
                                type="text"
                                v-model="userPersonalInfo.firstName"
                            />
                        </div>
                        <div class="">
                            <p class="text-secondary fs-medium mb-0">Email</p>
                            <p v-if="!personalInfoEditMode" class="mb-0">
                                {{ userPersonalInfo?.email }}
                            </p>
                            <input
                                v-else
                                class="rounded px-2"
                                type="text"
                                v-model="userPersonalInfo.email"
                            />
                        </div>
                    </div>
                    <div class="d-flex flex-column gap-3">
                        <div class="">
                            <p class="text-secondary fs-medium mb-0">
                                Last Name
                            </p>
                            <p v-if="!personalInfoEditMode" class="mb-0">
                                {{ userPersonalInfo?.lastName }}
                            </p>
                            <input
                                v-else
                                class="rounded px-2"
                                type="text"
                                v-model="userPersonalInfo.lastName"
                            />
                        </div>
                        <div class="">
                            <p class="text-secondary fs-medium mb-0">
                                Phone Number
                            </p>
                            <p v-if="!personalInfoEditMode" class="mb-0">
                                {{ userPersonalInfo?.phoneNumber }}
                            </p>
                            <input
                                v-else
                                class="rounded px-2"
                                type="text"
                                v-model="userPersonalInfo.phoneNumber"
                            />
                        </div>
                    </div>
                </div>
                <div class="">
                    <p class="text-secondary fs-medium mb-0">Birthday</p>
                    <p v-if="!personalInfoEditMode" class="mb-0">
                        {{ formatDate(userPersonalInfo?.birthdate) }}
                    </p>
                    <input
                        v-else
                        class="rounded px-2"
                        type="text"
                        v-model="userPersonalInfo.birthdate"
                    />
                </div>
            </div>
            <div
                v-if="personalInfoEditMode"
                class="d-flex mt-4 gap-3 justify-content-end"
            >
                <button
                    class="btn btn-outline-secondary"
                    @click="personalInfoEditMode = false"
                >
                    Cancel
                </button>
                <button class="btn btn-primary">Save Changes</button>
            </div>
        </div>

        <div class="border rounded p-4 mt-3">
            <div class="d-flex justify-content-between mb-3">
                <div class="d-flex align-items-center gap-5">
                    <h2>Shipping Address</h2>
                    <div class="dropdown">
                        <button
                            class="btn btn-secondary dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            {{ selectedAddressLabel }}
                        </button>
                        <ul class="dropdown-menu">
                            <li v-for="label in addressLabels" :key="label">
                                <button
                                    class="btn dropdown-item"
                                    @click="selectAddress(label)"
                                >
                                    {{ label }}
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="d-flex gap-1">
                    <button
                        class="btn"
                        data-bs-toggle="modal"
                        data-bs-target="#addressFormModal"
                    >
                        <i class="fas fa-add"></i>
                    </button>
                    <button class="btn">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <div class="d-flex gap-5">
                <div class="d-flex flex-column gap-3">
                    <div class="">
                        <p class="text-secondary fs-medium mb-0">Region</p>
                        <p class="mb-0">{{ selectedAddress?.region }}</p>
                    </div>
                    <div class="">
                        <p class="text-secondary fs-medium mb-0">Province</p>
                        <p class="mb-0">{{ selectedAddress?.province }}</p>
                    </div>
                    <div class="">
                        <p class="text-secondary fs-medium mb-0">
                            Blk/Lot/Subdivision
                        </p>
                        <p class="mb-0">
                            {{ selectedAddress?.street_blk_lot }}
                        </p>
                    </div>
                </div>
                <div class="d-flex flex-column gap-3">
                    <div class="">
                        <p class="text-secondary fs-medium mb-0">
                            Municipality
                        </p>
                        <p class="mb-0">{{ selectedAddress?.municipality }}</p>
                    </div>
                    <div class="">
                        <p class="text-secondary fs-medium mb-0">Barangay</p>
                        <p class="mb-0">{{ selectedAddress?.barangay }}</p>
                    </div>
                    <div class="">
                        <p class="text-secondary fs-medium mb-0">Landmark</p>
                        <p class="mb-0">{{ selectedAddress?.landmark }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div
            ref="addressFormModal"
            class="modal fade"
            id="addressFormModal"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabindex="-1"
            aria-labelledby="addressFormModalLabel"
            aria-hidden="true"
        >
            <div
                class="modal-dialog modal-dialog-scrollable modal-dialog-centered"
            >
                <div class="modal-content">
                    <div class="modal-header">
                        <h1
                            class="modal-title fs-5 fs-medium"
                            id="addressFormModalLabel"
                        >
                            Add New Shipping Address
                        </h1>
                        <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div class="modal-body">
                        <form id="addressForm">
                            <div class="mb-3">
                                <label for="label" class="form-label"
                                    >Label</label
                                >
                                <input
                                    v-model="label"
                                    type="text"
                                    class="form-control"
                                    id="label"
                                />
                            </div>
                            <div class="mb-3">
                                <label for="region" class="form-label"
                                    >Region</label
                                >
                                <select
                                    class="form-select"
                                    id="region"
                                    @change="handleProvinceChange($event)"
                                >
                                    <option value="" selected disabled>
                                        Select Region
                                    </option>
                                    <option
                                        v-for="region in regionLists"
                                        :key="region.id"
                                        :value="region.region_code"
                                    >
                                        {{ region.region_name }}
                                    </option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="province" class="form-label"
                                    >Province</label
                                >
                                <select
                                    class="form-select"
                                    id="province"
                                    @change="handleCityChange($event)"
                                    :disabled="!region"
                                >
                                    <option value="" selected disabled>
                                        Select Province
                                    </option>
                                    <option
                                        v-for="province in provinceLists"
                                        :key="province.province_code"
                                        :value="province.province_code"
                                    >
                                        {{ province.province_name }}
                                    </option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="city" class="form-label"
                                    >City/Municipality</label
                                >
                                <select
                                    class="form-select"
                                    id="city"
                                    @change="handleBarangayChange($event)"
                                    :disabled="!province"
                                >
                                    <option value="" selected disabled>
                                        Select City/Municipality
                                    </option>
                                    <option
                                        v-for="city in cityLists"
                                        :key="city.city_code"
                                        :value="city.city_code"
                                    >
                                        {{ city.city_name }}
                                    </option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="barangay" class="form-label"
                                    >Barangay</label
                                >
                                <select
                                    class="form-select"
                                    id="barangay"
                                    :disabled="!city"
                                    @change="setBarangay($event)"
                                >
                                    <option value="" selected disabled>
                                        Select Barangay
                                    </option>
                                    <option
                                        v-for="barangay in barangayLists"
                                        :key="barangay.brgy_code"
                                        :value="barangay.brgy_code"
                                    >
                                        {{ barangay.brgy_name }}
                                    </option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="landmark" class="form-label"
                                    >Landmark</label
                                >
                                <input
                                    v-model="landmark"
                                    type="text"
                                    class="form-control"
                                    id="landmark"
                                />
                            </div>
                            <div class="mb-3">
                                <label for="street_blk_lot" class="form-label"
                                    >Blk/Lot/Subdivision</label
                                >
                                <input
                                    v-model="streetBlkLot"
                                    type="text"
                                    class="form-control"
                                    id="street_blk_lot"
                                />
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            class="btn btn-primary"
                            :disabled="isFormValid"
                            @click.prevent="addNewAddress"
                        >
                            <span> Add </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { GetUserInfoAPI } from "../../../composables/Account";
import { formatDate, firstLetterUppercase } from "../../../composables/Helpers";
import {
    regions,
    provinces,
    cities,
    barangays,
} from "select-philippines-address";
import { addNewUserAddress } from "../../../composables/Account";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.js";
import swal from "sweetalert";

const addressFormModal = ref(null);
const modalInstance = ref(null);
const personalInfoEditMode = ref(false);
const userPersonalInfo = ref({});
const selectedAddressLabel = ref("");
const selectedAddress = ref([]);
const addressLabels = ref([]);

const regionLists = ref([]);
const provinceLists = ref([]);
const cityLists = ref([]);
const barangayLists = ref([]);

const label = ref(null);
const region = ref(null);
const province = ref(null);
const city = ref(null);
const barangay = ref(null);
const streetBlkLot = ref(null);
const landmark = ref(null);

const addNewAddress = async () => {
    const newAddress = {
        label: label.value.toLowerCase(),
        region: region.value,
        province: province.value,
        city: city.value,
        barangay: barangay.value,
        street_blk_lot: streetBlkLot.value,
        landmark: landmark.value,
    };

    swal({
        title: "Adding New Address",
        text: "Do you want to add this address?",
        icon: "info",
        buttons: ["Cancel", "Yes"],
    }).then(async (value) => {
        if (value) {
            try {
                const response = await addNewUserAddress(newAddress);

                if (response.status !== "success") {
                    console.error("Something Went Wrong");
                    return;
                }

                swal({
                    title: "Success",
                    text: "New Address Added",
                    icon: "success",
                    button: "OK",
                });

                await GetUserInfoAPIrmation();
                modalInstance.value.hide();
            } catch (error) {
                console.error(error);
            }
        }
    });
};

const isFormValid = computed(() => {
    return (
        !label.value ||
        !region.value ||
        !province.value ||
        !city.value ||
        !barangay.value ||
        !streetBlkLot.value ||
        !landmark.value
    );
});

const handleProvinceChange = (event) => {
    const selectedIndex = event.target.selectedIndex;
    region.value = event.target.options[selectedIndex].text;
    let regionCode = event.target.value;
    provinces(regionCode).then((response) => {
        provinceLists.value = response;
    });
};

const handleCityChange = (event) => {
    const selectedIndex = event.target.selectedIndex;
    province.value = event.target.options[selectedIndex].text;

    let provinceCode = event.target.value;
    cities(provinceCode).then((response) => {
        cityLists.value = response;
    });
};

const handleBarangayChange = (event) => {
    const selectedIndex = event.target.selectedIndex;
    city.value = event.target.options[selectedIndex].text;
    console.log(city.value);
    let cityCode = event.target.value;
    barangays(cityCode).then((response) => {
        barangayLists.value = response;
    });
};

const setBarangay = (event) => {
    const selectedIndex = event.target.selectedIndex;
    barangay.value = event.target.options[selectedIndex].text;
};

const selectAddress = (label) => {
    console.log(label);
    selectedAddressLabel.value = firstLetterUppercase(label);
    console.log(userPersonalInfo.value);
    selectedAddress.value = userPersonalInfo.value.shipping_addresses.find(
        (address) => address.label.toLowerCase() === label.toLowerCase()
    );

    console.log(selectedAddress.value);
};

const getUserInfo = async () => {
    addressLabels.value = [];
    try {
        const response = await GetUserInfoAPI();

        if (response.status !== "success") {
            swal("Server Error", "Something Went Wrong!", "error");
            return;
        }

        regions().then((response) => {
            regionLists.value = response;
        });

        userPersonalInfo.value = response.data;
        selectedAddressLabel.value = firstLetterUppercase(
            userPersonalInfo.value.shippingAddresses[0].label
        );
        selectAddress(selectedAddressLabel.value.toLowerCase());
        userPersonalInfo.value.shippingAddresses.forEach((address) => {
            addressLabels.value.push(firstLetterUppercase(address.label));
        });
    } catch (error) {
        console.error(error);
    }
};

onMounted(async () => {
    modalInstance.value = new bootstrap.Modal(addressFormModal.value);
    await getUserInfo();
});
</script>
