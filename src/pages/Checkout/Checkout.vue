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
            <option value="gcash">GCash</option>
          </select>
        </div>

        <div class="mb-4">
          <label class="form-label text-muted">Choose delivery method</label>
          <select class="form-select" v-model="deliveryMethod">
            <option value="pickup">Pickup</option>
            <option value="delivery">Delivery</option>
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
              v-for="(item, index) in cartItems"
              :key="index"
              class="d-flex mb-3"
            >
              <img
                :src="item.image"
                class="me-3"
                style="width: 60px; height: 60px; object-fit: cover"
              />
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

        <button @click="processCheckout" class="btn btn-success w-100 mt-3">
          Checkout
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { GetAllProductsInUserCartAPI } from "../../composables/Cart"; // Ensure this API can accept an array of IDs to fetch specific cart items
import Swal from "sweetalert2";

const route = useRoute();
const router = useRouter();

// Form data
const paymentMethod = ref("counter");
const deliveryMethod = ref("pickup");
const cartItems = ref([]);

// Computed order total
const orderTotal = computed(() => {
  return cartItems.value.reduce((total, item) => {
    return total + item.totalPrice;
  }, 0);
});

// Methods
const backToCart = () => {
  router.push({ name: "cart" });
};

const processCheckout = async () => {
  console.log("Processing checkout", {
    paymentMethod: paymentMethod.value,
    deliveryMethod: deliveryMethod.value,
    items: cartItems.value,
    total: orderTotal.value,
  });

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
            }).then(() => {
              // Proceed with order processing
              console.log("Payment successful. Proceeding with order.");
              router.push({ name: "shop" });
              // Add your order processing logic here
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
    }
  } else {
    // Handle other payment methods
    console.log("Proceed with non-GCash payment method.");
  }
};

// Fetch cart items based on URL parameter IDs on mount
onMounted(async () => {
  const ids = route.params.id.split(",");

  try {
    const response = await GetAllProductsInUserCartAPI({ ids });

    if (response.status === "failed") {
      Swal.fire({
        icon: "error",
        title: "Oops, something went wrong!",
        text: response.message,
      });
      return;
    }

    cartItems.value = response.data || [];

    cartItems.value = cartItems.value.map((item) => ({
      name: item.productInfo.productName,
      quantity: item.productQuantity,
      price: parseFloat(item.productInfo.productPrice),
      image: item.productInfo.productImageURL,
      totalPrice:
        parseFloat(item.productInfo.productPrice) * item.productQuantity,
    }));

    console.log(cartItems.value);
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
