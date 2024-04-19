<template>
    <header class="header bg-light">
        <nav class="navbar navbar-expand-lg">
            <div class="container-fluid">
                <a class="navbar-brand fs-4" href="#home">
                    The Cavite Garden
                    <i class="fas fa-leaf ms-1"></i>
                </a>
                <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div
                    class="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul class="navbar-nav me-auto ms-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link fs-6 text-black" href="#home"
                                >Home</a
                            >
                        </li>
                        <li class="nav-item">
                            <a class="nav-link fs-6 text-black" href="#about"
                                >About</a
                            >
                        </li>
                        <li class="nav-item">
                            <a class="nav-link fs-6 text-black" href="#menu"
                                >Menu</a
                            >
                        </li>
                        <li class="nav-item">
                            <a class="nav-link fs-6 text-black" href="#reviews"
                                >Reviews</a
                            >
                        </li>
                    </ul>
                </div>

                <div
                    class="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul v-if="!isAuthenticated" class="navbar-nav mb-2 mb-lg-0">
                        <li class="nav-item">
                            <router-link
                                class="nav-link text-black"
                                :to="{ name: 'login' }"
                                >Login</router-link
                            >
                        </li>
                        <li class="nav-item">
                            <router-link
                                class="nav-link text-black"
                                :to="{ name: 'register' }"
                                >Register</router-link
                            >
                        </li>
                    </ul>
                    <ul
                        v-else
                        class="navbar-nav mb-2 mb-lg-0 align-items-center"
                    >
                        <li class="">
                            <div class="mx-3 cursor-pointer">
                                <i class="fas fa-bell"></i>
                            </div>
                        </li>
                        <li class="">
                            <div
                                class="mx-3 cursor-pointer"
                                data-bs-toggle="modal"
                                data-bs-target="#headerActiveModal"
                                @click="toggleCartBtn"
                            >
                                <i class="fas fa-shopping-cart"></i>
                            </div>
                        </li>
                        <li class="">
                            <div class="dropdown">
                                <button
                                    class="btn dropdown-toggle"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <i class="fas fa-user mx-2"></i>
                                </button>
                                <ul class="dropdown-menu">
                                    <li>
                                        <router-link
                                            class="dropdown-item"
                                            :to="{ name: 'profile' }"
                                        >
                                            Profile
                                        </router-link>
                                    </li>
                                    <li>
                                        <a class="dropdown-item" href="#"
                                            >Track Orders</a
                                        >
                                    </li>
                                    <li>
                                        <a class="dropdown-item" href="#"
                                            >Transaction History</a
                                        >
                                    </li>
                                    <li>
                                        <button
                                            class="btn dropdown-item"
                                            @click="logoutUser"
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>

    <div
        ref="headerActiveModal"
        class="modal fade"
        id="headerActiveModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="headerActiveModalLabel"
        aria-hidden="true"
    >
        <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1
                        class="modal-title fs-5 fs-medium"
                        id="headerActiveModalLabel"
                    >
                        <i class="fas fa-shopping-cart me-2"></i> Shopping Cart
                    </h1>
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                </div>
                <div
                    v-if="modalLoadingState"
                    class="d-flex justify-content-center p-5"
                >
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
                <div v-else class="modal-body">
                    <div class="products d-flex flex-column">
                        <div v-if="cartProducts?.length === 0" class="p-5">
                            <p class="text-center">Your Cart is Empty.</p>
                        </div>
                        <div
                            v-else
                            v-for="product in cartProducts"
                            :key="product?.id"
                            class="product p-3 border rounded d-flex align-items-center"
                        >
                            <div class="product-img">
                                <img
                                    :src="product?.product_info.plant_image"
                                    :alt="product?.product_info.plant_name"
                                    width="100"
                                />
                            </div>
                            <div
                                class="product-data d-flex flex-column justify-content-between w-100"
                            >
                                <div class="">
                                    <p class="fs-5 fs-medium mb-0">
                                        {{ product?.product_info.plant_name }}
                                    </p>
                                    <p class="fs-6 text-secondary mb-0">
                                        {{
                                            firstLetterUppercase(
                                                product?.product_info
                                                    .category_name
                                            )
                                        }}
                                    </p>
                                </div>
                                <div
                                    class="d-flex align-items-center justify-content-between"
                                >
                                    <div class="d-flex align-items-center">
                                        <button
                                            class="btn py-0"
                                            @click="
                                                subtractQuantity(product?.id)
                                            "
                                        >
                                            <i class="fas fa-minus"></i>
                                        </button>

                                        <p
                                            class="mb-0 border rounded mx-1 px-3 py-1"
                                        >
                                            {{ product?.quantity }}
                                        </p>
                                        <button
                                            class="btn py-0"
                                            @click="addQuantity(product?.id)"
                                        >
                                            <i class="fas fa-plus"></i>
                                        </button>
                                    </div>
                                    <div class="price">
                                        <p class="fs-6 fs-semi-bold mb-0">
                                            ₱{{ product?.price }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="select">
                                <button
                                    class="btn btn-outline-danger py-1 px-2"
                                    @click="deleteFromCart(product?.id)"
                                >
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                        <p
                            v-if="cartProducts?.length !== 0"
                            class="mt-3 text-end border-bottom"
                        >
                            Total:
                            <span class="fs-bold">₱{{ overAllCartPrice }}</span>
                        </p>
                    </div>

                    <div v-if="cartProducts?.length !== 0" class="body-footer">
                        <hr />
                        <div class="mb-3">
                            <label for="deliveryMethod" class="form-label"
                                >Select Delivery Method
                                <span class="text-danger">*</span></label
                            >
                            <select
                                class="form-select"
                                id="deliveryMethod"
                                placeholder="Select delivery method"
                                aria-label="Select delivery method"
                                v-model="deliveryMethod"
                            >
                                <option value="pickup">Pick up</option>
                                <option value="delivery">Delivery</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="paymentMethod" class="form-label"
                                >Select Payment Method
                                <span class="text-danger">*</span></label
                            >
                            <select
                                class="form-select"
                                id="paymentMethod"
                                placeholder="Select payment method"
                                aria-label="Select payment method"
                                v-model="paymentMethod"
                            >
                                <option value="pay-over-the-counter">
                                    Pay over the counter
                                </option>
                                <option value="pay-online">Pay online</option>
                            </select>
                        </div>
                        <div v-if="deliveryMethod === 'delivery'" class="mb-3">
                            <label class="form-label" for="shippingAddress">
                                Select Shipping Address
                                <span class="text-danger">*</span>
                            </label>
                            <select
                                class="form-select"
                                id="shippingAddress"
                                placeholder="Select shippingg address"
                                aria-label="Select shipping address"
                                @change="setSelectedAddress($event)"
                            >
                                <option value="" selected disabled>
                                    Select Shipping Address
                                </option>
                                <option
                                    v-for="label in addressLabels"
                                    :key="label"
                                >
                                    {{ label }}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
                <div v-if="!modalLoadingState" class="modal-footer">
                    <button
                        type="button"
                        class="btn btn-outline-primary"
                        data-bs-dismiss="modal"
                        @click="resetForm"
                    >
                        <span> Continue Shopping </span>
                    </button>
                    <button
                        type="button"
                        class="btn btn-primary"
                        :disabled="!isFormValid"
                        @click="proceedToCheckout()"
                    >
                        <span> Proceed to Checkout </span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { logout } from "../../composables/Authentication.js";
import { checkUserSession } from "../../composables/Authentication.js";
import { useCustomerStore } from "../../store/customerStore.js";
import {
    getProductsInCart,
    deleteProductFromCart,
} from "../../composables/Cart.js";
import { firstLetterUppercase } from "../../composables/Helpers.js";
import { addNewTransaction } from "../../composables/Transaction.js";
import { getUserInfo } from "../../composables/Account.js";

import swal from "sweetalert";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.js";

const modalLoadingState = ref(false);
const customerStore = useCustomerStore();
const headerActiveModal = ref(null);
const modalInstance = ref(null);
const isAuthenticated = ref(false);

const deliveryMethod = ref("");
const paymentMethod = ref("");
const cartProducts = ref("");
const selectedShippingAddress = ref("");
const addressLabels = ref([]);
const userShippingAddresses = ref("");
const selectedAddressString = ref("");

const setSelectedAddress = (event) => {
    const selectedLabel = event.target.value;

    selectedShippingAddress.value = userShippingAddresses.value.find(
        (address) => address.label === selectedLabel.toLowerCase()
    );

    selectedAddressString.value = `${selectedShippingAddress.value.street_blk_lot}, ${selectedShippingAddress.value.barangay}, ${selectedShippingAddress.value.municipality}, ${selectedShippingAddress.value.province}, ${selectedShippingAddress.value.region}, Philippines`;
    selectedShippingAddress.value = selectedAddressString.value;
};

const deleteFromCart = async (id) => {
    swal({
        title: "Remove from Cart",
        text: "Are you sure you want to remove this item from cart?",
        icon: "warning",
        buttons: ["Cancel", "Yes, I'm sure!"],
    }).then(async (value) => {
        if (value) {
            try {
                const response = await deleteProductFromCart(id);

                if (response.status === "success") {
                    swal("Item removed from cart!", {
                        icon: "success",
                    });
                    await getCartProducts();
                }
            } catch (error) {
                console.error(error);
            }
        }
    });
};

const proceedToCheckout = async () => {
    const transactionData = {
        delivery_method: deliveryMethod.value,
        payment_method: paymentMethod.value,
        shipping_address: selectedShippingAddress.value,
        ...cartProducts.value,
    };

    swal({
        title: "Place Order",
        text: "Are you sure you want to place this order?",
        icon: "warning",
        buttons: ["Cancel", "Yes, I'm sure!"],
    }).then(async (value) => {
        if (value) {
            try {
                const response = await addNewTransaction(transactionData);

                if (response.status !== "success") {
                    swal(
                        "Failed to checkout!",
                        "Something went wrong.",
                        "error"
                    );
                    return;
                }

                swal({
                    title: "Order Placed!",
                    text: "Your orders is being processed!. Go to track orders? ",
                    icon: "success",
                    buttons: [true, "Track Order"],
                }).then((value) => {
                    if (value) {
                        router.push({ name: "admin" });
                    }
                });
                modalInstance.value.hide();
            } catch (error) {
                console.log(error);
            } finally {
                resetForm();
            }
        }
    });
};

const resetForm = () => {
    deliveryMethod.value = "";
    paymentMethod.value = "";
    selectedShippingAddress.value = "";
};
const isFormValid = computed(() => {
    if (deliveryMethod.value === "delivery") {
        return (
            deliveryMethod.value &&
            paymentMethod.value &&
            selectedShippingAddress.value &&
            cartProducts.value.length > 0
        );
    } else {
        return (
            deliveryMethod.value &&
            paymentMethod.value &&
            cartProducts.value.length > 0
        );
    }
});

const getCartProducts = async () => {
    try {
        const response = await getProductsInCart();

        if (response.status === "success") {
            cartProducts.value = response.data;
        }
    } catch (error) {
        console.error(error);
    } finally {
        modalLoadingState.value = false;
    }
};

const toggleCartBtn = async () => {
    modalLoadingState.value = true;
    await getCartProducts();
};
const addQuantity = (id) => {
    cartProducts.value = cartProducts.value.map((product) => {
        if (product.id === id) {
            product.quantity++;
            let totalPrice = parseFloat(product.price);
            let productPrice = parseFloat(product.product_info.plant_price);
            product.price = totalPrice + productPrice;
            product.price = product.price.toFixed(2);
        }
        return product;
    });
};

const subtractQuantity = (id) => {
    cartProducts.value = cartProducts.value.map((product) => {
        if (product.id === id && product.quantity > 1) {
            product.quantity--;
            let totalPrice = parseFloat(product.price);
            let productPrice = parseFloat(product.product_info.plant_price);
            product.price = totalPrice - productPrice;
            product.price = product.price.toFixed(2);
        }
        return product;
    });
};

const overAllCartPrice = computed(() => {
    if (cartProducts.value.length > 0) {
        let totalPrice = 0;

        cartProducts.value.forEach((product) => {
            totalPrice += parseFloat(product.price);
        });

        return totalPrice.toFixed(2);
    }
});

const logoutUser = async () => {
    swal({
        title: "Dont' gooo",
        text: "Are you sure you want to logout?",
        icon: "warning",
        buttons: true,
    }).then(async (value) => {
        if (value) {
            try {
                await logout();
                isAuthenticated.value = false;
                customerStore.unauthticateCustomer();
            } catch (error) {
                console.error(error);
            }
        }
    });
};

onMounted(async () => {
    addressLabels.value = [];
    modalInstance.value = new bootstrap.Modal(headerActiveModal.value);
    if (customerStore.getCustomerAuthStatus()) {
        const response = await checkUserSession();
        if (response.status === "unauthorized") {
            swal("Session Expired!", "Please login again!", "warning").then(
                (value) => {
                    if (value) {
                        isAuthenticated.value = false;
                        customerStore.unauthticateCustomer();
                        return;
                    }
                }
            );
        }
    }

    try {
        const response = await getUserInfo();

        if (response.status === "success") {
            userShippingAddresses.value = response.data[0].shipping_addresses;
            userShippingAddresses.value.forEach((address) => {
                addressLabels.value.push(firstLetterUppercase(address.label));
            });
        }
    } catch (error) {
        console.error(error);
    }

    isAuthenticated.value = customerStore.getCustomerAuthStatus();
});
</script>

<style scoped lang="scss">
@import "./Header.scss";
</style>
