<template>
  <div class="container">
    <div v-if="!route.params.id" class="">
      <div class="shop-header mb-5">
        <div class="container">
          <div class="row align-items-center justify-content-center">
            <div class="col-12">
              <h1 class="shop-title text-center">Our Products</h1>
              <p class="shop-subtitle text-center">
                Discover our collection of beautiful plants and gardening
                essentials
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="row gap-3">
        <!-- Left Sidebar -->
        <div class="col-1 border-end px-2">
          <h6 class="sidebar-title">Categories</h6>
          <div class="category-list">
            <div
              class="category-item cursor-pointer"
              :class="{ active: selectedCategory === 'All' }"
              @click="filterProductsByCategory('All')"
            >
              All
            </div>
            <div
              class="category-item cursor-pointer"
              :class="{ active: selectedCategory === 'Plants' }"
              @click="filterProductsByCategory('Plants')"
            >
              Plants
            </div>
            <div
              class="category-item cursor-pointer"
              :class="{ active: selectedCategory === 'Flowers' }"
              @click="filterProductsByCategory('Flowers')"
            >
              Flowers
            </div>
            <div
              class="category-item cursor-pointer"
              :class="{ active: selectedCategory === 'Pots' }"
              @click="filterProductsByCategory('Pots')"
            >
              Pots
            </div>
            <div
              class="category-item cursor-pointer"
              :class="{ active: selectedCategory === 'Soils' }"
              @click="filterProductsByCategory('Soils')"
            >
              Soils
            </div>
            <div
              class="category-item"
              :class="{ active: selectedCategory === 'Rocks' }"
              @click="filterProductsByCategory('Rocks')"
            >
              Rocks
            </div>
          </div>
        </div>

        <!-- Main Content -->
        <div class="col-10">
          <!-- Header with Plants title and filters -->
          <div
            class="content-header d-flex justify-content-between align-items-center mb-4"
          >
            <h2 class="section-title">{{ selectedCategory }}</h2>
            <div class="filters d-flex gap-3">
              <div class="dropdown">
                <button class="btn btn-light dropdown-toggle" type="button">
                  Indoor Plants
                </button>
              </div>
              <div class="search-box">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Search..."
                />
              </div>
            </div>
          </div>

          <!-- Product Grid -->
          <div class="row g-4">
            <div
              v-for="product in filteredProducts"
              :key="product.id"
              class="col-4 shadow-sm py-3 rounded"
            >
              <div class="product-card">
                <div
                  class="product-image-container"
                  @click="goToProductDetails(product.id)"
                >
                  <Product360Viewer class="product-image w-100" />
                </div>
                <div class="product-info">
                  <div class="d-flex justify-content-between">
                    <h5 class="product-name">{{ product.productName }}</h5>
                    <div class="rating">
                      <span class="stars">
                        <i class="fas fa-star"></i>
                      </span>
                      <span class="rating-count">5.0</span>
                    </div>
                  </div>
                  <p class="product-category text-muted">
                    {{ product.categoryName }}
                  </p>

                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <span class="price">₱{{ product.productPrice }}</span>
                    <span> 18 solds </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="">
      <ProductDetails :product="selectedProduct" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

import { GetAllProductsAPI } from "@composables/Products";

import Product360Viewer from "../../Test.vue";
import ProductDetails from "./ProductDetails/ProductDetails.vue";

const selectedCategory = ref("Plants");
const selectedProduct = ref(null);

const route = useRoute();
const router = useRouter();

const products = ref([]);

onMounted(async () => {
  try {
    const response = await GetAllProductsAPI();

    if (response.status === "failed") {
      console.log(response.message);
      return;
    }

    products.value = response.data || [];
  } catch (error) {
    console.log(error);
  }
});

const goToProductDetails = (id) => {
  selectedProduct.value = products.value.find((product) => product.id === id);
  router.push({ name: "shop", params: { id } });
};

const filterProductsByCategory = (category) => {
  selectedCategory.value = category;
};

const filteredProducts = computed(() => {
  return products.value.filter(
    (product) =>
      product.categoryName === selectedCategory.value ||
      selectedCategory.value === "All"
  );
});
</script>

<style lang="scss" scoped>
@import "./Shop.scss";
</style>
