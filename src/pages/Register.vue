<template>
    <div class="register d-flex justify-content-center align-items-center">
        <div class="content">
            <div class="header text-center mb-5 fs-semi-bold">
                <h1 class="fs-1">Sign Up</h1>
            </div>
            <form class="form mt-4">
                <div class="d-flex mb-3">
                    <div>
                        <label for="firstName" class="form-label fs-6">
                            First Name <span class="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            class="form-control"
                            v-model="firstName"
                        />
                    </div>
                    <div>
                        <label for="lastname" class="form-label fs-6">
                            Last Name <span class="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            id="lastname"
                            class="form-control"
                            v-model="lastName"
                        />
                    </div>
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label fs-6">
                        Email <span class="text-danger">*</span>
                    </label>
                    <input
                        type="email"
                        id="email"
                        class="form-control"
                        v-model="email"
                    />
                </div>
                <div class="mb-3 d-flex">
                    <div>
                        <label for="phoneNumber" class="form-label fs-6">
                            Phone Number <span class="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            id="phoneNumber"
                            class="form-control"
                            v-model="phoneNumber"
                        />
                    </div>
                    <div>
                        <label for="bday" class="form-label fs-6">
                            Birthday <span class="text-danger">*</span>
                        </label>
                        <input
                            type="date"
                            id="bday"
                            class="form-control"
                            format="yyyy-MM-dd"
                            v-model="birthday"
                        />
                    </div>
                </div>
                <div class="d-flex mb-3">
                    <div>
                        <label for="password" class="form-label fs-6">
                            Password <span class="text-danger">*</span>
                        </label>
                        <input
                            type="password"
                            id="password"
                            class="form-control"
                            v-model="password"
                        />
                    </div>
                    <div>
                        <label for="confirmPassword" class="form-label fs-6">
                            Confirm Password <span class="text-danger">*</span>
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            class="form-control"
                            v-model="confirmPassword"
                        />
                    </div>
                </div>
                <div class="mt-4">
                    <button
                        class="btn btn-primary w-100"
                        @click.prevent="submitForm"
                        :disabled="!isFormValid"
                    >
                        <span v-if="!btnLoadingState"> Submit </span>
                        <div
                            v-else
                            class="spinner-border spinner-border-sm mx-4"
                            role="status"
                        >
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </button>
                </div>
                <div class="mt-4 text-center">
                    <p class="d-inline">Already have an account?</p>
                    <router-link :to="{ name: 'login' }" class="text-info">
                        Login</router-link
                    >
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { registerUser } from "../composables/Authentication";
import swal from "sweetalert";

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

        if (response.status !== "success") {
            swal("Failed to register user!", "Something went wrong.", "error");
            return;
        }

        swal("Successfully Registered!", "", "success").then((value) => {
            if (value) {
                resetForm();
                router.push({ name: "login" });
            }
        });
    } catch (error) {
        console.error(error);
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
        swal("Passwords do not match!", "", "error");
        password.value = "";
        confirmPassword.value = "";
        btnLoadingState.value = false;
        return;
    }

    if (
        new Date().getFullYear() - new Date(birthday.value).getFullYear() <
        18
    ) {
        swal("You must be 18 years or older to register!", "", "error");
        btnLoadingState.value = false;
        return;
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
</script>

<style scoped lang="scss">
.register {
    height: 100vh;

    & > .content {
        & > .form {
            & > .d-flex {
                column-gap: 2rem;
            }
        }
    }
}
</style>
