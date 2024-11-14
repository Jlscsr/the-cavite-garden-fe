<template>
  <div class="container product-details">
    <div class="row">
      <!-- Product Image and Basic Info -->
      <div class="col-md-6">
        <video
          src="../../../assets/videos/Bunny_Ears_Cactus.mp4"
          alt="Mecardonia"
          class="product-image img-fluid rounded"
          autoplay
          loop
          muted
        ></video>
      </div>
      <div class="col-md-6">
        <h2 class="product-title">{{ product.productName }}</h2>
        <p class="product-category">{{ product?.categoryName }}</p>

        <div class="stock-info mb-4">
          <span class="text-muted">Stocks: </span>
          <span class="stock-number">{{ product?.productStock }}</span>
        </div>

        <div class="price-section mb-4">
          <h6 class="mb-2">Unit Price</h6>
          <h4 class="price">₱ {{ product?.productPrice }}</h4>
        </div>

        <div class="quantity-section mb-4">
          <div class="row">
            <div class="col-6">
              <h6>Quantity</h6>
              <div class="quantity-control d-flex align-items-center">
                <button
                  class="btn btn-outline-secondary"
                  @click="decrementQuantity"
                >
                  -
                </button>
                <input
                  type="number"
                  class="form-control quantity-input mx-2"
                  v-model="quantity"
                  min="1"
                />
                <button
                  class="btn btn-outline-secondary"
                  @click="incrementQuantity"
                >
                  +
                </button>
              </div>
            </div>
            <div class="col-6">
              <h6>Total Price</h6>
              <h4 class="total-price">
                ₱ {{ (quantity * product?.productPrice).toFixed(2) }}
              </h4>
            </div>
          </div>
        </div>

        <div class="action-buttons d-flex gap-3">
          <button
            class="btn btn-outline-primary flex-grow-1"
            @click="addToCart(product?.id)"
          >
            Add to Cart
          </button>
          <button class="btn btn-primary flex-grow-1">Buy Now</button>
        </div>
      </div>
    </div>

    <!-- Description Section -->
    <div class="description-section mt-5">
      <h3>Description</h3>
      <p>
        Mecardonia, Commonly Called Axilflower, Is A Genus Of About 12 Species
        Of Herbaceous Plants Native To Western South America North Through
        Central America To The Southeastern United States
      </p>
    </div>

    <!-- Reviews Section -->
    <div class="reviews-section mt-5">
      <h3>Reviews</h3>

      <!-- Individual Review -->
      <div v-for="review in reviews" :key="review.id" class="review-card mb-4">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <h5 class="reviewer-name mb-0">{{ review.name }}</h5>
          <div class="rating">
            <span class="stars">{{ "★".repeat(review.rating) }}</span>
            <span class="rating-number">{{ review.rating.toFixed(1) }}</span>
          </div>
        </div>
        <p class="review-text">{{ review.text }}</p>
        <div class="review-images">
          <div class="row g-2">
            <div
              class="col-4"
              v-for="(image, index) in review.images"
              :key="index"
            >
              <img
                :src="image"
                :alt="`Review image ${index + 1}`"
                class="img-fluid rounded"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { AddToCartAPI } from "../../../composables/Cart";
import { useUserStore } from "../../../store/userStore";
import Swal from "sweetalert2";
import { GetProductByIDAPI } from "../../../composables/Products";

const route = useRoute();

const userStore = useUserStore();

const props = defineProps({
  product: Object,
});

const product = ref(props.product || []);
const quantity = ref(1);

onMounted(() => {
  if (product.value.length === 0) {
    getProductByID();
  }
});

const incrementQuantity = () => {
  quantity.value++;
};

const decrementQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};

const reviews = ref([
  {
    id: 1,
    name: "Julius R.",
    rating: 5.0,
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    images: [
      "/path-to-review-image-1.jpg",
      "/path-to-review-image-2.jpg",
      "/path-to-review-image-3.jpg",
    ],
  },
  {
    id: 2,
    name: "Mayoa K.",
    rating: 4.0,
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    images: [
      "/path-to-review-image-4.jpg",
      "/path-to-review-image-5.jpg",
      "/path-to-review-image-6.jpg",
    ],
  },
  {
    id: 3,
    name: "Jane D.",
    rating: 3.0,
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    images: [
      "/path-to-review-image-7.jpg",
      "/path-to-review-image-8.jpg",
      "/path-to-review-image-9.jpg",
    ],
  },
]);

const getProductByID = async () => {
  try {
    const response = await GetProductByIDAPI(route.params.id);

    if (response.status === "failed") {
      Swal.fire({
        icon: "error",
        title: "No Product Found",
        text: "I'm sorry, but we couldn't find the product you're looking for.",
      });
      return;
    }

    product.value = response.data || [];
  } catch (error) {
    console.error(error);
  }
};

const addToCart = (productId) => {
  const payload = {
    productID: productId,
    productQuantity: quantity.value,
    productInitialPrice: product.value.productPrice,
    totalPrice: product.value.productPrice * quantity.value,
  };
  try {
    const response = AddToCartAPI(payload);

    if (response.status === "failed") {
      console.error(response.message);
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Product added to cart",
    });

    quantity.value = 1;
  } catch (error) {
    console.error(error);
  }
};
</script>

<style lang="scss" scoped>
.product-details {
  margin-top: 10em;
  padding-bottom: 4em;

  width: 70%;

  .product-image {
    max-width: 100%;
    height: 100%;
  }

  .product-title {
    font-size: 2rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }

  .product-category {
    color: #6c757d;
    margin-bottom: 1rem;
  }

  .stock-info {
    .stock-number {
      color: #198754;
      font-weight: 500;
    }
  }

  .quantity-input {
    width: 60px;
    text-align: center;
  }

  .price,
  .total-price {
    color: #198754;
    font-weight: 500;
  }

  .btn-primary {
    background-color: #198754;
    border-color: #198754;

    &:hover {
      background-color: darken(#198754, 5%);
      border-color: darken(#198754, 5%);
    }
  }

  .btn-outline-primary {
    color: #198754;
    border-color: #198754;

    &:hover {
      background-color: #198754;
      color: white;
    }
  }

  .review-card {
    padding: 1.5rem;
    border: 1px solid #dee2e6;
    border-radius: 0.5rem;

    .reviewer-name {
      font-weight: 500;
    }

    .rating {
      .stars {
        color: #ffc107;
        margin-right: 0.5rem;
      }

      .rating-number {
        color: #6c757d;
      }
    }

    .review-text {
      color: #6c757d;
      margin-bottom: 1rem;
    }

    .review-images img {
      width: 100%;
      height: 100px;
      object-fit: cover;
    }
  }
}
</style>
