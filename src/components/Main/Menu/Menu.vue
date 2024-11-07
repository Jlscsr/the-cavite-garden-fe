<template>
  <!-- Menu Section -->
  <section class="menu section" id="menu">
    <h2 class="heading px-5 py-5">
      Our Products
      <span class="fs-3">Our Products</span>
    </h2>
    <div class="container text-center px-5 py-3">
      <div class="container text-center">
        <div class="row mt-4" id="btn-container">
          <div
            v-if="productsCategories.length > 0"
            v-for="category in productsCategories"
            class="col"
          >
            <button
              class="btn"
              :class="{
                active: category.id === selectedCategory?.id,
              }"
              @click="filterProductsByCategoryID(category.id)"
            >
              <span class="fs-5 text-black-50">
                {{ firstLetterUppercase(category.categoryName) }}
              </span>
            </button>
          </div>
        </div>

        <div v-if="subCategories.length > 0" class="subcategories mt-4">
          <button
            v-for="subcategory in subCategories"
            :key="subcategory.id"
            :class="{
              active: subcategory.id === selectedSubCategory?.id,
            }"
            class="btn mx-5"
            @click="filterProductsBySubCategoryID(subcategory.id)"
          >
            <span class="fs-5 text-black-50">
              {{ subcategory.subCategoryName }}
            </span>
          </button>
        </div>

        <div class="container-fluid mt-5">
          <div
            v-for="product in products"
            class="box d-flex justify-content-center align-items-center px-3 py-3"
            :key="product?.id"
          >
            <div class="content">
              <div class="img-container">
                <img :src="product?.productImage" :alt="product?.productName" />
              </div>
              <p class="fs-5 fs-medium">
                {{ product?.productName }}
              </p>
              <div
                class="button cursor-pointer"
                data-bs-toggle="modal"
                data-bs-target="#productDetailsModal"
                @click="viewProduct(product?.id)"
              >
                <i class="fs-3 fas fa-cart-plus"></i>
              </div>
            </div>
          </div>
          <div
            v-if="!loadingState && products.length === 0"
            class="d-flex align-items-center justify-content-center w-100"
          >
            <span class="d-block fs-5 fs-semi-bold">No Products Found...</span>
          </div>
          <div
            v-if="loadingState"
            class="d-flex justify-content-center p-4"
            id="spinner"
          >
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      ref="menuActiveModal"
      class="modal fade"
      id="productDetailsModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="productDetailsModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1
              class="modal-title fs-5 fs-medium"
              id="productDetailsModalLabel"
            >
              Product Details
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="px-4 text-center">
              <div class="image-container">
                <img
                  :src="selectedProduct?.productImage"
                  :alt="selectedProduct?.productName"
                />
              </div>
              <hr />
              <div class="product-details">
                <div
                  class="d-flex justify-content-between align-items-center border-bottom mt-2"
                >
                  <p class="fs-medium mb-0">Category:</p>
                  <p class="mb-0">
                    {{
                      selectedProduct?.categoryName &&
                      firstLetterUppercase(selectedProduct.categoryName)
                    }}
                  </p>
                </div>
                <div
                  class="d-flex justify-content-between align-items-center border-bottom mt-2"
                >
                  <p class="fs-medium mb-0">Sub Category:</p>
                  <p class="mb-0">
                    {{
                      selectedProduct?.subCategoryName &&
                      firstLetterUppercase(selectedProduct.subCategoryName)
                    }}
                  </p>
                </div>
                <div
                  class="d-flex justify-content-between align-items-center border-bottom mt-2"
                >
                  <p class="fs-medium mb-0">Product Name:</p>
                  <p class="mb-0">
                    {{ selectedProduct?.productName }}
                  </p>
                </div>
                <div
                  class="d-flex justify-content-between align-items-center border-bottom mt-2 text-start"
                >
                  <p class="fs-medium mb-0 align-self-baseline">Description:</p>
                  <p class="mb-0 text-justify text-end">
                    {{ selectedProduct?.productDescription }}
                  </p>
                </div>
                <div
                  class="d-flex justify-content-between align-items-center border-bottom mt-2"
                >
                  <p class="fs-medium mb-0">Price:</p>
                  <p class="mb-0">₱{{ selectedProduct?.productPrice }}</p>
                </div>
                <div
                  v-if="selectedProduct?.size"
                  class="d-flex justify-content-between align-items-center border-bottom mt-2"
                >
                  <p class="fs-medium mb-0">Size:</p>
                  <p class="mb-0">
                    {{ selectedProduct?.productSize ?? "N/A" }}
                  </p>
                </div>
                <div
                  class="d-flex justify-content-between align-items-center border-bottom mt-2"
                >
                  <p class="fs-medium mb-0">Stock:</p>
                  <p class="mb-0">
                    {{ selectedProduct?.productStock }}
                  </p>
                </div>
                <div class="mt-3 text-start">
                  <label for="quantity" class="form-label">
                    Quantity<span class="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    :max="selectedProduct?.productStock"
                    class="form-control"
                    v-model="productQuantity"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-primary"
              data-bs-dismiss="modal"
            >
              <span> Buy Now </span>
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="addProductToCart(selectedProduct.id, productQuantity)"
            >
              <span> Add to Cart </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

import { addToCart } from "@composables/Cart";
import { useUserStore } from "@stores/userStore";
import { GetAllProductsAPI } from "@composables/Products";
import { firstLetterUppercase } from "@composables/Helpers";
import { GetAllCategoriesAPI } from "@composables/Categories";

import bootstrap from "bootstrap/dist/js/bootstrap.bundle.js";

const router = useRouter();
const menuActiveModal = ref(null);
const modalInstance = ref(null);
const userStore = useUserStore();

const loadingState = ref(false);

const products = ref([]);
const selectedProduct = ref(null);
const productsCopy = ref([]);
const productsCategories = ref([]);
const selectedCategory = ref([]);
const subCategories = ref([]);
const selectedSubCategory = ref([]);

const productQuantity = ref(1);

/**
 * @description
 * - Load all product categories and products on mount
 *
 * @function onMounted
 * @param {Object} - Vue lifecycle hook
 * @returns {Promise<void>}
 */
onMounted(async () => {
  modalInstance.value = new bootstrap.Modal(menuActiveModal.value);
  loadingState.value = true;

  const [categoriesResponse, productsResponse] = await Promise.all([
    GetAllCategoriesAPI(),
    GetAllProductsAPI(),
  ]);

  productsCategories.value = categoriesResponse.data ?? [];
  products.value = productsResponse.data ?? [];
  productsCopy.value = [...products.value];

  if (productsCategories.value.length > 0) {
    filterProductsByCategoryID(productsCategories.value[0].id);
  }

  loadingState.value = false;
});

/**
 * Filters products by a specific category ID.
 *
 * @param {int} categoryId - The ID of the category to filter products by.
 */
const filterProductsByCategoryID = (categoryId) => {
  selectedCategory.value = productsCategories.value.find(
    (category) => category.id === categoryId
  );

  products.value = productsCopy.value.filter(
    (product) => product.categoryID === selectedCategory.value.id
  );

  setSubCategories(selectedCategory.value.subCategories);
};

/**
 * Set the subcategories with the provided new subcategories or an empty array if newSubCategories is null or undefined.
 *
 * @param {any} newSubCategories - The new subcategories to set.
 * @return {void}
 */
const setSubCategories = (newSubCategories) => {
  subCategories.value = newSubCategories || [];
};

/**
 * Filters products by a specific subcategory ID.
 *
 * @param {type} subcategoryId - description of parameter
 * @return {type} description of return value
 */
const filterProductsBySubCategoryID = (subcategoryId) => {
  selectedSubCategory.value = subCategories.value.find(
    (subcategory) => subcategory.id === subcategoryId
  );

  products.value = productsCopy.value.filter(
    (product) => product.subCategoryID === subcategoryId
  );
};

/**
 * Sets the selected product to the one with the provided ID.
 *
 * @param {type} id - The ID of the product to set as selected.
 * @return {type} description of return value
 */
const viewProduct = (id) => {
  selectedProduct.value = products.value.find((plant) => plant.id === id);
};

/**
 * Checks if the user is authenticated. If the user is not authenticated, a modal is displayed
 * prompting the user to log in. Returns a Promise that resolves to true if the user is authenticated,
 * and false otherwise.
 *
 * @return {Promise<boolean>} A Promise that resolves to true if the user is authenticated, and false otherwise.
 */
const checkUserIfAuthenticated = () => {
  if (!userStore.isUserAuthenticated()) {
    /*  AuthRequiredModalMessage(
            "Login Required!",
            "Please login to add product to your cart!"
        ); */

    return false;
  }
  return true;
};

/**
 * Handles adding a product to the cart.
 *
 * @param {number} productId - The ID of the product to add to the cart.
 * @param {number} quantity - The quantity of the product to add to the cart.
 * @return {Promise<void>} - A promise that resolves when the product is successfully added to the cart.
 */
const handleAddProductToCart = async (productId, quantity) => {
  const payload = {
    productID: productId,
    productQuantity: quantity,
    productBasePrice: selectedProduct.value.productPrice,
  };

  const response = await addToCart(payload);

  if (response.status === "failed") {
    /* FailedModalMessage(
      "Failed to add product to cart",
      "Something went wrong. Please try again."
    ); */
    return;
  }

  /*  SuccessModalMessage(
    "Product has been added to your cart!",
    "Check your cart."
  ); */
  productQuantity.value = 1;
  modalInstance.value.hide();
};

/**
 * Adds a product to the cart after checking if the user is authenticated.
 *
 * @param {number} productId - The ID of the product to add to the cart.
 * @param {number} quantity - The quantity of the product to add to the cart.
 * @return {Promise<void>} - A promise that resolves when the product is successfully added to the cart.
 */
const addProductToCart = (productId, quantity) => {
  // Check if user is authenticated before adding the product to cart
  const isAuthenticated = checkUserIfAuthenticated();

  // If user is not authenticated, redirect to login
  if (!isAuthenticated) {
    modalInstance.value.hide();
    router.push({ name: "login" });
    return;
  }

  // If user is authenticated, add to cart
  /* AskUserModalMessage(
    "Add to Cart",
    "Do you want to add this product to your cart?",
    "info",
    (value) => {
      if (value) {
    }
}
); */
  handleAddProductToCart(productId, quantity);
};
</script>

<style scoped lang="scss">
@import "./Menu.scss";
</style>
