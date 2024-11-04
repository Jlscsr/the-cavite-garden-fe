<template>
    <div class="login">
        <div class="d-flex justify-content-center align-items-center h-100">
            <div class="shadow">
                <div class="row">
                    <div class="col img-container">
                        <div class="img-container">
                            <img
                                src="../assets/images/cavite_garden_logo2.png"
                                alt="Cavite Garden Logo"
                                width="400"
                            />
                        </div>
                    </div>
                    <div class="col form-container text-white">
                        <div class="content m-auto h-100 p-5">
                            <div class="icon text-center mb-3">
                                <h1 class="fs-1">Login</h1>
                            </div>
                            <form class="form mt-4">
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
                                <div class="mb-3">
                                    <label
                                        for="password"
                                        class="form-label fs-6"
                                    >
                                        Password
                                        <span class="text-danger">*</span>
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        class="form-control"
                                        v-model="password"
                                    />
                                </div>
                                <div
                                    class="d-flex justify-content-between mb-3"
                                >
                                    <div class="remember">
                                        <input
                                            class="form-check-input me-2"
                                            type="checkbox"
                                            value=""
                                            id="rememberMe"
                                        />
                                        <label
                                            class="form-check-label"
                                            for="rememberMe"
                                        >
                                            Remember Me
                                        </label>
                                    </div>
                                    <div class="forgot">
                                        <router-link to="" class="text-white"
                                            >Forgot password?
                                        </router-link>
                                    </div>
                                </div>
                                <div class="mt-5">
                                    <button
                                        class="btn w-100 text-white py-2"
                                        @click.prevent="submitForm"
                                        :disabled="!isFormValid"
                                    >
                                        <span v-if="!btnLoadingState">
                                            Login
                                        </span>
                                        <div
                                            v-else
                                            class="spinner-border spinner-border-sm mx-4"
                                            role="status"
                                        >
                                            <span class="visually-hidden"
                                                >Loading...</span
                                            >
                                        </div>
                                    </button>
                                </div>
                                <div class="mt-4 text-center">
                                    <p class="d-inline">
                                        Don't have an account?
                                    </p>
                                    <router-link
                                        :to="{ name: 'register' }"
                                        class="text-info"
                                    >
                                        Register</router-link
                                    >
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

import { LoginUserAPI } from "@composables/Authentication";
import { useUserStore } from "@stores/userStore";
import {
    FailedModalMessage,
    SuccessModalMessage,
} from "@composables/helpers/SweetAlertModals";

const router = useRouter();
const userStore = useUserStore();

const btnLoadingState = ref(false);

const email = ref("");
const password = ref("");

const handleSuccessLogin = (response) => {
    resetForm();
    btnLoadingState.value = false;

    userStore.setUserInfo(response.data);
    userStore.setUserAuthenticated(true);

    userStore.getUserRole() === "admin"
        ? router.push({ name: "product-lists" })
        : router.push({ name: "home" });
};

const submitForm = async () => {
    btnLoadingState.value = true;

    const userCredentials = {
        email: email.value,
        password: password.value,
    };

    try {
        const response = await LoginUserAPI(userCredentials);

        if (response.status === "unauthorized") {
            FailedModalMessage("Login Failed", "Invalid email or password.");
            return;
        }

        if (response.status === "failed") {
            FailedModalMessage(
                "Login Failed",
                "Something went wrong. Please try again."
            );
            return;
        }

        SuccessModalMessage("Logged in successfully!", "", (value) => {
            if (value) {
                handleSuccessLogin(response);
            }
        });
    } catch (error) {
        FailedModalMessage("Login Failed", "Something went wrong.");
    } finally {
        btnLoadingState.value = false;
    }
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
.login {
    height: 100vh;
    & > .d-flex {
        & > .shadow {
            & > .row {
                & > .col:nth-of-type(2) {
                    width: 500px;
                    background-color: #173f39;

                    & > .content {
                        & > .form {
                            & > .mb-3:nth-of-type(3) {
                                & > .remember,
                                & > .forgot {
                                    font-size: 0.8rem;
                                }
                            }

                            & > .mt-5 {
                                & > button {
                                    background-color: #41b06e;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
