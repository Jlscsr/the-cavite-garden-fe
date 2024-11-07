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
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto ms-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link fs-6 text-black" href="#home">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link fs-6 text-black" href="#about">About</a>
            </li>
            <li class="nav-item">
              <a class="nav-link fs-6 text-black" href="#menu">Menu</a>
            </li>
            <li class="nav-item">
              <a class="nav-link fs-6 text-black" href="#reviews">Reviews</a>
            </li>
          </ul>
        </div>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul
            v-if="!userStore.isUserAuthenticated()"
            class="navbar-nav mb-2 mb-lg-0"
          >
            <li class="nav-item">
              <router-link class="nav-link text-black" :to="{ name: 'login' }"
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
          <ul v-else class="navbar-nav mb-2 mb-lg-0 align-items-center">
            <li class="">
              <div class="dropdown-center">
                <a
                  class="btn dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <p
                    v-if="notificationContainer.length > 0"
                    class="notification fs-bold mb-0 text-danger"
                  >
                    {{ notificationContainer.length }}
                  </p>
                  <i class="fas fa-bell"></i>
                </a>

                <ul class="dropdown-menu" v-if="notificationContainer">
                  <li
                    v-for="notification in notificationContainer"
                    class="cursor-pointer px-3 py-2 text-white mb-2"
                    :class="{
                      'bg-success': notification.status === 'approved',
                      'bg-danger': notification.status === 'cancelled',
                    }"
                    @click="
                      gotoTrackOrderPage(
                        notification.id,
                        notification.customer_id
                      )
                    "
                  >
                    <div class="d-flex align-items-center">
                      <i class="fas fa-bell"></i>
                      <h6 class="fs-medium mb-0 ms-2">Order Notification</h6>
                    </div>
                    <p class="mb-0">
                      Your Order #{{ notification.id }}
                      has been
                      {{ firstLetterUppercase(notification.status) }}
                    </p>
                  </li>
                </ul>
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
                    <router-link
                      class="dropdown-item cursor-pointer"
                      :to="{
                        name: 'track-orders',
                        params: {
                          customerId: userData?.id,
                        },
                      }"
                    >
                      Track Orders
                    </router-link>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">Transaction History</a>
                  </li>
                  <li>
                    <button class="btn dropdown-item" @click="logoutUser">
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
    <div
      class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg"
    >
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5 fs-medium" id="headerActiveModalLabel">
            <i class="fas fa-shopping-cart me-2"></i> Shopping Cart
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div v-if="modalLoadingState" class="d-flex justify-content-center p-5">
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
                  :src="product?.productInfo.productImage"
                  :alt="product?.productInfo.productImage"
                  width="100"
                />
              </div>
              <div
                class="product-data d-flex flex-column justify-content-between w-100"
              >
                <div class="">
                  <p class="fs-5 fs-medium mb-0">
                    {{ product?.productInfo.productName }}
                  </p>
                  <p class="fs-6 text-secondary mb-0">
                    {{
                      firstLetterUppercase(product?.productInfo.categoryName)
                    }}
                  </p>
                </div>
                <div class="d-flex align-items-center justify-content-between">
                  <div class="d-flex align-items-center">
                    <button
                      class="btn py-0"
                      @click="subtractQuantity(product?.id)"
                    >
                      <i class="fas fa-minus"></i>
                    </button>

                    <p class="mb-0 border rounded mx-1 px-3 py-1">
                      {{ product?.productQuantity }}
                    </p>
                    <button class="btn py-0" @click="addQuantity(product?.id)">
                      <i class="fas fa-plus"></i>
                    </button>
                  </div>
                  <div class="price">
                    <p class="fs-6 fs-semi-bold mb-0">
                      ₱{{ product?.totalPrice }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="select">
                <button
                  class="btn btn-outline-danger py-1 px-2"
                  @click="deleteProductFromCart(product?.id)"
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
                >Select Payment Method <span class="text-danger">*</span></label
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
              <button
                v-if="addressLabels.length === 0"
                class="btn btn-outline-primary w-100"
                @click="goToProfilePage"
              >
                Add Your Address
              </button>
              <select
                v-else
                class="form-select"
                id="shippingAddress"
                placeholder="Select shippingg address"
                aria-label="Select shipping address"
                @change="setSelectedAddress($event)"
              >
                <option value="" selected disabled>
                  Select Shipping Address
                </option>
                <option v-for="label in addressLabels" :key="label">
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
import { useRouter } from "vue-router";
import { ref, onMounted, computed } from "vue";

import {
  database,
  ref as dbRef,
  set,
  query,
  orderByChild,
  equalTo,
  onChildChanged,
} from "../../boot/firebase";
import {
  GetAllProductsInUserCartAPI,
  DeleteProductFromCartAPI,
} from "@composables/Cart";
import { useUserStore } from "@stores/userStore.js";
import { firstLetterUppercase } from "@composables/Helpers";
import { LogoutUserAPI } from "@composables/Authentication";
import { addNewTransaction } from "@composables/Transaction";

import bootstrap from "bootstrap/dist/js/bootstrap.bundle.js";

const router = useRouter();

const modalLoadingState = ref(false);
const userStore = useUserStore();
const headerActiveModal = ref(null);
const modalInstance = ref(null);

const deliveryMethod = ref("");
const paymentMethod = ref("");
const cartProducts = ref("");
const selectedShippingAddress = ref("");
const addressLabels = ref([]);
const userShippingAddresses = ref("");
const userData = ref(userStore.getUserInfo());
const notificationContainer = ref([]);

onMounted(async () => {
  modalInstance.value = new bootstrap.Modal(headerActiveModal.value);
  addressLabels.value = [];

  console.log(userData.value);
  if (userStore.isUserAuthenticated()) {
    userShippingAddresses.value = userData.value.shippingAddresses;
    userShippingAddresses.value.forEach((address) => {
      addressLabels.value.push(firstLetterUppercase(address.addressLabel));
    });

    listenForTransactionChanges(userData.value.id);
  }
});

const overAllCartPrice = computed(() => {
  if (cartProducts.value.length > 0) {
    let totalPrice = 0;

    cartProducts.value.forEach((product) => {
      totalPrice += parseFloat(product.totalPrice);
    });

    return totalPrice.toFixed(2);
  }
});

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

const gotoTrackOrderPage = (transactionId, customer_id) => {
  // Remoe the clicked notification base on transaction id
  notificationContainer.value = notificationContainer.value.filter(
    (notification) => notification.id !== transactionId
  );
  router.push({
    name: "track-orders",
    params: { customerId: customer_id },
  });
};

const listenForTransactionChanges = (customer_id) => {
  const transactionQuery = query(
    dbRef(database, "transaction"),
    orderByChild("customer_id"),
    equalTo(customer_id)
  );

  onChildChanged(transactionQuery, (snapshot) => {
    const transactionId = snapshot.key;

    if (snapshot.exists()) {
      const transactionData = snapshot.val();
      notificationContainer.value.push(transactionData);
    } else {
      console.log("No data available for transaction with ID:", transactionId);
    }
  });
};

const setSelectedAddress = (event) => {
  const selectedLabel = event.target.value;
  const selectedAddress = userShippingAddresses.value.find(
    (address) =>
      address.addressLabel.toLowerCase() === selectedLabel.toLowerCase()
  );

  selectedShippingAddress.value = selectedAddress
    ? `${selectedAddress.streetBlkLt}, ${selectedAddress.barangay}, ${selectedAddress.municipality}, ${selectedAddress.province}, ${selectedAddress.region}, Philippines`
    : "";
};

const getCartProducts = async () => {
  const response = await GetAllProductsInUserCartAPI();

  if (response.status === "success") {
    cartProducts.value = response.data || [];
  }

  modalLoadingState.value = false;
};

const toggleCartBtn = async () => {
  modalLoadingState.value = true;
  await getCartProducts();
};

const handleDeleteProductFromCart = async (id) => {
  const response = await DeleteProductFromCartAPI(id);

  if (response.status === "failed") {
    /*  FailedModalMessage(
      "Failed to remove item from cart!",
      "Something went wrong. Please Try Again."
    ); */
    return;
  }

  /* SuccessModalMessage(
    "Item Removed From Cart",
    "Item has been removed from cart."
  ); */
  await getCartProducts();
};

const deleteProductFromCart = async (id) => {
  /* AskUserModalMessage(
        "Remove Product From Cart",
        "Are you sure you want to remove this item from cart?",
        "warning",
        (value) => {
            if (value) {
            }
        }
    ); */
  handleDeleteProductFromCart(id);
};

const proceedToCheckout = async () => {
  const transactionData = {
    deliveryMethod: deliveryMethod.value,
    paymentMethod: paymentMethod.value,
    shippingAddress: selectedShippingAddress.value,
    purchasedProducts: cartProducts.value,
  };

  /*  swal({
    title: "Place Order",
    text: "Are you sure you want to place this order?",
    icon: "warning",
    buttons: ["Cancel", "Yes, I'm sure!"],
  }).then(async (value) => {
    if (value) {
    }
  }); */

  try {
    const response = await addNewTransaction(transactionData);

    if (response.status === "failed") {
      //   swal("Failed to checkout!", "Something went wrong.", "error");
      return;
    }

    /* swal({
      title: "Order Placed!",
      text: "Your orders is being processed!.",
      icon: "success",
    }).then(async (value) => {
      if (value) {
      }
    }); */

    set(dbRef(database, "transaction/" + response.data.transactionID), {
      id: response.data.transactionID,
      customer_id: response.data.customerID,
      status: response.data.status,
    })
      .then(() => {
        alert("Order has been placed!");
      })
      .catch((error) => {
        console.error(error);
      });
    await getCartProducts();
  } catch (error) {
    console.log(error);
  } finally {
    resetForm();
    modalInstance.value.hide();
  }
};

const resetForm = () => {
  deliveryMethod.value = "";
  paymentMethod.value = "";
  selectedShippingAddress.value = "";
};

const updateTotalPrice = (product, operation) => {
  let totalPrice = parseFloat(product.totalPrice);
  let productPrice = parseFloat(product.productInfo.productPrice);
  product.totalPrice =
    operation === "add" ? totalPrice + productPrice : totalPrice - productPrice;
  product.totalPrice = product.totalPrice.toFixed(2);
};

const addQuantity = (id) => {
  const index = cartProducts.value.findIndex((product) => product.id === id);
  if (index !== -1) {
    cartProducts.value[index].productQuantity++;
    updateTotalPrice(cartProducts.value[index], "add");
  }
};

const subtractQuantity = (id) => {
  const index = cartProducts.value.findIndex((product) => product.id === id);
  if (index !== -1 && cartProducts.value[index].productQuantity > 1) {
    cartProducts.value[index].productQuantity--;
    updateTotalPrice(cartProducts.value[index], "subtract");
  }
};

const handleLogoutUser = async () => {
  await LogoutUserAPI();

  userStore.setUserInfo({});
  userStore.setUserAuthenticated(false);

  router.go();
};

const logoutUser = async () => {
  /* AskUserModalMessage(
    "Logout",
    "Are you sure you want to logout?",
    "warning",
    (value) => {
      if (value) {
    }
}
); */
  handleLogoutUser();
};

const goToProfilePage = () => {
  modalInstance.value.hide();
  router.push({ name: "profile" });
};
</script>

<style scoped lang="scss">
@import "./Header.scss";
</style>
