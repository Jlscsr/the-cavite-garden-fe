<template>
  <div class="container cart-container">
    <!-- Cart Header -->
    <div class="cart-header">
      <div class="row border-bottom pb-2">
        <div class="col-6">Product</div>
        <div class="col-2 text-center">Unit Price</div>
        <div class="col-2 text-center">Quantity</div>
        <div class="col-2 text-end">Total Price</div>
      </div>
    </div>

    <!-- Cart Items -->
    <div class="cart-items">
      <div
        v-for="(item, index) in cartItems"
        :key="item.productID"
        class="row cart-item align-items-center py-3 border-bottom"
      >
        <!-- Checkbox and Product Info -->
        <div class="col-6">
          <div class="d-flex align-items-center gap-3">
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                :checked="item.selected"
                @change="toggleItemSelection(index)"
              />
            </div>
            <video
              :src="item.productInfo.productVideoURL"
              autoplay
              loop
              muted
              class="product-image"
            ></video>
            <div class="product-info">
              <h6 class="product-name mb-1">
                {{ item?.productInfo?.productName }}
              </h6>
              <p class="product-category mb-0">
                {{ item?.productInfo?.categoryName }}
              </p>
            </div>
          </div>
        </div>

        <!-- Unit Price -->
        <div class="col-2 text-center">
          <span class="price">₱ {{ item?.productInfo?.productPrice }}</span>
        </div>

        <!-- Quantity Controls -->
        <div class="col-2">
          <div
            class="quantity-controls d-flex justify-content-center align-items-center gap-2"
          >
            <button class="btn btn-quantity" @click="decrementQuantity(index)">
              -
            </button>
            <input
              type="number"
              class="form-control quantity-input"
              v-model="item.productQuantity"
              min="1"
              :max="item.productInfo.productStock"
              @input="
                item.productQuantity = Math.max(
                  1,
                  Math.min(item.productQuantity, item.productInfo.productStock)
                );
                item.totalPrice =
                  parseFloat(item.productInfo.productPrice) *
                  item.productQuantity;
              "
            />
            <button class="btn btn-quantity" @click="incrementQuantity(index)">
              +
            </button>
          </div>
          <button class="btn btn-remove mt-2" @click="removeItem(index)">
            Remove
          </button>
        </div>

        <!-- Total Price -->
        <div class="col-2 text-end">
          <span class="price">₱ {{ item?.totalPrice.toFixed(2) }}</span>
        </div>
      </div>
    </div>

    <!-- Cart Footer -->
    <div class="cart-footer mt-4">
      <div class="row justify-content-between align-items-center">
        <div class="col-auto">
          <span class="total-label">Total Price: </span>
          <span class="total-price">₱ {{ calculateTotal.toFixed(2) }}</span>
        </div>
        <div class="col-auto">
          <button class="btn btn-outline-secondary me-2" @click="backToShop">
            Back to shop
          </button>
          <button class="btn btn-primary" @click="checkout">Checkout</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useRouter } from "vue-router";
import {
  GetAllProductsInUserCartAPI,
  AddToCartAPI,
} from "../../composables/Cart";
import Swal from "sweetalert2";

const router = useRouter();
const cartItems = ref([]);

onMounted(async () => {
  try {
    const response = await GetAllProductsInUserCartAPI();

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
      ...item,
      selected: false,
      initialQuantity: item.productQuantity,
      totalPrice:
        parseFloat(item.productInfo.productPrice) * item.productQuantity,
    }));
  } catch (error) {
    console.error(error);
  }
});

const toggleItemSelection = (index) => {
  cartItems.value[index].selected = !cartItems.value[index].selected;
};

const incrementQuantity = (index) => {
  const item = cartItems.value[index];
  if (item.productQuantity < item.productInfo.productStock) {
    item.productQuantity++;
    item.totalPrice =
      parseFloat(item.productInfo.productPrice) * item.productQuantity;
  } else {
    Swal.fire({
      icon: "warning",
      title: "Stock Limit Reached",
      text: "You cannot add more items than available in stock.",
    });
  }
};

const decrementQuantity = (index) => {
  const item = cartItems.value[index];
  if (item.productQuantity > 1) {
    item.productQuantity--;
    item.totalPrice =
      parseFloat(item.productInfo.productPrice) * item.productQuantity;
  }
};

const removeItem = (index) => {
  cartItems.value.splice(index, 1);
};

const calculateTotal = computed(() => {
  return cartItems.value.reduce((total, item) => {
    return total + item.totalPrice;
  }, 0);
});

const backToShop = () => {
  // Implement navigation back to shop
};

const checkout = async () => {
  const changedItems = cartItems.value.filter(
    (item) => item.selected && item.productQuantity !== item.initialQuantity
  );

  if (changedItems.length === 0) {
    // Proceed to checkout immediately
    const selectedItems = cartItems.value
      .filter((item) => item.selected)
      .map((item) => item.id);
    const idsString = selectedItems.join(",");

    router.push({ name: "checkout", params: { id: idsString } });
    return;
  }

  const updatePromises = changedItems.map(async (item) => {
    const payload = {
      productID: item.productID,
      productQuantity: item.productQuantity,
      productInitialPrice: item.productInfo.productPrice,
      totalPrice: item.totalPrice,
    };

    return AddToCartAPI(payload).then((response) => {
      if (response.status === "failed") {
        throw new Error(response.message);
      }
    });
  });

  try {
    await Promise.all(updatePromises);

    const itemIds = cartItems.value
      .filter((item) => item.selected)
      .map((item) => item.id);
    const idsString = itemIds.join(",");

    router.push({ name: "checkout", params: { id: idsString } });
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Failed to update cart",
      text: error.message,
    });
    console.error("Error updating cart items:", error);
  }
};
</script>

<style lang="scss" scoped>
.cart-container {
  margin-top: 10em;

  .cart-header {
    font-weight: 500;
    color: #333;
  }

  .product-image {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 4px;
  }

  .product-info {
    .product-name {
      font-size: 1rem;
      margin-bottom: 0.25rem;
      color: #333;
    }

    .product-category {
      font-size: 0.875rem;
      color: #6c757d;
    }
  }

  .quantity-controls {
    .btn-quantity {
      width: 32px;
      height: 32px;
      padding: 0;
      border: 1px solid #dee2e6;
      background: white;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        background: #f8f9fa;
      }
    }

    .quantity-input {
      width: 50px;
      text-align: center;
      padding: 0.375rem;
    }
  }

  .btn-remove {
    color: #dc3545;
    font-size: 0.875rem;
    padding: 0;
    border: none;
    background: none;
    width: 100%;
    text-align: center;

    &:hover {
      text-decoration: underline;
    }
  }

  .price {
    font-weight: 500;
    color: #333;
  }

  .form-check-input {
    width: 20px;
    height: 20px;
    cursor: pointer;

    &:checked {
      background-color: #198754;
      border-color: #198754;
    }
  }

  .cart-footer {
    .total-label {
      font-size: 1.1rem;
      color: #333;
    }

    .total-price {
      font-size: 1.2rem;
      font-weight: 600;
      color: #198754;
    }

    .btn-primary {
      background-color: #198754;
      border-color: #198754;
      padding: 0.5rem 2rem;

      &:hover {
        background-color: darken(#198754, 5%);
        border-color: darken(#198754, 5%);
      }
    }

    .btn-outline-secondary {
      padding: 0.5rem 2rem;
    }
  }
}
</style>
