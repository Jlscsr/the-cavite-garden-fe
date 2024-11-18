<template>
  <div class="container mt-8">
    <div class="row">
      <div class="col-12">
        <h1 class="display-4 mb-4">Checkout</h1>
        <p class="text-muted mb-4">checkout details</p>
      </div>
    </div>

    <div class="row">
      <!-- Left Column - Forms -->
      <div class="col-md-6">
        <div class="mb-4">
          <label class="form-label text-muted">Choose payment method</label>
          <select class="form-select" v-model="paymentMethod">
            <option value="counter">Over the counter</option>
            <option value="cod">Cash On Delivery</option>
            <option value="gcash">GCash</option>
          </select>
        </div>

        <div class="mb-4">
          <label class="form-label text-muted">Choose delivery method</label>
          <select class="form-select" v-model="deliveryMethod">
            <option v-if="paymentMethod !== 'cod'" value="pickup">
              Pickup
            </option>
            <option value="delivery">Delivery</option>
          </select>
        </div>

        <div v-if="deliveryMethod === 'delivery'" class="mb-4">
          <label class="form-label text-muted">Your address</label>
          <select class="form-select" v-model="selectedAddress">
            <option v-for="(address, index) in userAddressses" :key="index">
              {{ address?.addressLabel }}
            </option>
          </select>
        </div>

        <button @click="backToCart" class="btn btn-outline-secondary">
          Back to Cart
        </button>
      </div>

      <!-- Right Column - Order Summary -->
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title mb-4">Order Summary</h5>

            <!-- Product List -->
            <div
              v-for="(item, index) in productCarts"
              :key="index"
              class="d-flex mb-3"
            >
              <video
                :src="item.video"
                class="me-3"
                style="width: 60px; height: 60px; object-fit: cover"
              ></video>
              <div class="flex-grow-1">
                <h6 class="mb-0">{{ item.name }}</h6>
                <small class="text-muted">Qty: {{ item.quantity }}</small>
              </div>
              <div class="text-end">
                <span>₱ {{ item.price.toFixed(2) }}</span>
              </div>
            </div>

            <!-- Order Total -->
            <div class="border-top pt-3 mt-3">
              <div class="d-flex justify-content-between">
                <h6 class="mb-0">Order Total</h6>
                <h6 class="mb-0">₱ {{ orderTotal.toFixed(2) }}</h6>
              </div>
            </div>
          </div>
        </div>

        <button
          @click="processCheckout"
          class="btn btn-success w-100 mt-3"
          :disabled="btnLoadingState"
        >
          <!-- Add loading spinner in bootstrap -->
          <span v-if="!btnLoadingState">Place Order</span>
          <span v-else class="spinner-border spinner-border-sm text-center">
            <span class="visually-hidden">Loading...</span>
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { GetCartProductByID } from "../../composables/Cart";
import { useUserStore } from "../../store/userStore";
import Swal from "sweetalert2";
import { AddNewTransactionAPI } from "../../composables/Transaction";

const route = useRoute();
const router = useRouter();

const userStore = useUserStore();

const btnLoadingState = ref(false);

// Form data
const paymentMethod = ref("counter");
const deliveryMethod = ref("pickup");
const selectedAddress = ref("");
const cartItems = ref([]);
const productCarts = ref([]);

const userAddressses = ref(userStore.getUserInfo().shippingAddresses);

// Computed order total
const orderTotal = computed(() => {
  return productCarts.value.reduce((total, item) => {
    return total + item.totalPrice;
  }, 0);
});

// Methods
const backToCart = () => {
  router.push({ name: "cart" });
};

const processCheckout = async () => {
  btnLoadingState.value = true;
  let formatUserAddress;

  if (deliveryMethod.value === "delivery") {
    const userAddress = userAddressses.value.find(
      (address) => address.addressLabel === selectedAddress.value
    );

    formatUserAddress = `${userAddress.streetAddress}, ${userAddress.municipality}, ${userAddress.province}, ${userAddress.region}`;
  } else {
    formatUserAddress = null;
  }

  let status;
  if (paymentMethod.value === "counter" && deliveryMethod.value === "pickup") {
    status = "pending";
  } else if (
    paymentMethod.value === "counter" &&
    deliveryMethod.value === "delivery"
  ) {
    status = "pending";
  } else if (
    paymentMethod.value === "gcash" &&
    deliveryMethod.value === "pickup"
  ) {
    status = "preparing";
  } else if (
    paymentMethod.value === "gcash" &&
    deliveryMethod.value === "delivery"
  ) {
    status = "preparing";
  } else if (
    paymentMethod.value === "cod" &&
    deliveryMethod.value === "delivery"
  ) {
    status = "pending";
  }

  const checkOutData = {
    orderType: deliveryMethod.value,
    paymentType: paymentMethod.value,
    shippingAddress: formatUserAddress,
    status,
    purchasedProducts: cartItems.value,
  };

  if (paymentMethod.value === "gcash") {
    Swal.fire({
      title: "Processing Payment",
      text: "Please wait while we process your payment.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: "Basic c2tfdGVzdF9HUW40cG9nOXVYeVFLS1RnZjVZZm9VanY6",
      },
      body: JSON.stringify({
        data: {
          attributes: {
            amount: orderTotal.value * 100, // Amount in centavos
            description: "Payment for order",
            remarks: "Online order",
          },
        },
      }),
    };

    try {
      const res = await fetch("https://api.paymongo.com/v1/links", options);
      const data = await res.json();

      if (data.errors) {
        Swal.fire({
          icon: "error",
          title: "Payment Failed",
          text: data.errors[0].detail,
        });
        return;
      }

      Swal.fire({
        title: "Payment Link Created",
        text: "Click OK to proceed to GCash payment.",
        icon: "success",
        showCancelButton: true,
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          window.open(data.data.attributes.checkout_url, "_blank");

          Swal.fire({
            title: "Waiting for Payment",
            text: "Please complete the payment in the new tab.",
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            },
          });

          // Simulate payment success
          setTimeout(() => {
            Swal.fire({
              title: "Payment Success",
              text: "Your payment was successful.",
              icon: "success",
            }).then(async () => {
              checkOutData.status = "preparing";

              const response = await AddNewTransactionAPI(checkOutData);

              if (response.status === "failed") {
                Swal.fire({
                  icon: "error",
                  title: "Oops, something went wrong!",
                  text: response.message,
                });
                return;
              }

              Swal.fire({
                icon: "success",
                title: "Order Placed",
                text: "Your order has been placed successfully.",
              });

              router.push({ name: "shop" });
            });
          }, 5000); // Simulate a 5-second delay
        }
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Payment Error",
        text: "An error occurred while processing your payment.",
      });
      console.error("Payment error:", error);
    } finally {
      btnLoadingState.value = false;
    }
  } else {
    const response = await AddNewTransactionAPI(checkOutData);

    if (response.status === "failed") {
      Swal.fire({
        icon: "error",
        title: "Oops, something went wrong!",
        text: response.message,
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Order Placed",
      text: "Your order has been placed successfully.",
    });

    btnLoadingState.value = false;
    router.push({ name: "shop" });
  }
};

onMounted(async () => {
  let ids;

  if (route.params.id.includes(",")) {
    ids = route.params.id.split(",");
  } else {
    ids = [route.params.id];
  }

  try {
    if (ids.length > 1) {
      for (const id of ids) {
        const response = await GetCartProductByID(id);

        if (response.status === "failed") {
          Swal.fire({
            icon: "error",
            title: "Oops, something went wrong!",
            text: response.message,
          });
          return;
        }

        cartItems.value.push(response.data);
        console.log("Multiple items", cartItems.value);
      }
    } else {
      const response = await GetCartProductByID(ids[0]);

      if (response.status === "failed") {
        Swal.fire({
          icon: "error",
          title: "Oops, something went wrong!",
          text: response.message,
        });
        return;
      }

      cartItems.value.push(response.data);
    }

    productCarts.value = cartItems.value.map((item) => ({
      name: item.productInfo.productName,
      quantity: item.productQuantity,
      price: parseFloat(item.productInfo.productPrice),
      video: item.productInfo.productVideoURL,
      totalPrice:
        parseFloat(item.productInfo.productPrice) * item.productQuantity,
    }));

    console.log(cartItems.value);
    console.log(productCarts.value);
  } catch (error) {
    console.error(error);
  }
});
</script>

<style scoped>
.mt-8 {
  margin-top: 8em;
}

/* Optional: Add some hover effects to the product images */
.card img {
  transition: transform 0.2s;
}

.card img:hover {
  transform: scale(1.05);
}
</style>
