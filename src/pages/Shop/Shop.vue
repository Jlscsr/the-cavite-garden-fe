<template>
  <div class="container">
    <div v-if="!route.params.id">
      <!-- Shop Header -->
      <div class="mb-5">
        <div class="container py-2 shadow-sm">
          <div class="row align-items-center justify-content-center">
            <div class="col-12 text-center">
              <h1 class="shop-title">Our Products</h1>
              <p class="shop-subtitle">
                Discover our collection of beautiful plants and gardening
                essentials
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="row gap-3">
        <!-- Left Sidebar (only visible on large screens) -->
        <div
          v-if="windowWidth > 1000"
          class="left-sidebar col-md-3 col-lg-2 border-end px-3 py-4"
        >
          <h6 class="sidebar-title">Categories</h6>
          <div class="category-list">
            <div
              v-for="category in [
                'All',
                'Plants',
                'Flowers',
                'Pots',
                'Soils',
                'Rocks',
              ]"
              :key="category"
              class="category-item cursor-pointer"
              :class="{ active: selectedCategory === category }"
              @click="filterProductsByCategory(category)"
            >
              {{ category }}
            </div>
          </div>
        </div>

        <!-- Main Content (Product Grid) -->
        <div class="main col-12 col-md-9">
          <!-- Filters and Header -->
          <div
            class="content-header d-flex justify-content-between align-items-center mb-4"
          >
            <h2 v-if="windowWidth > 1000" class="section-title">
              {{ selectedCategory }}
            </h2>
            <div class="filters d-flex gap-3 align-items-center">
              <div v-if="windowWidth < 1000" class="dropdown">
                <select class="form-select" v-model="selectedCategory">
                  <option selected>Select plant category</option>
                  <option value="Plants">Plants</option>
                  <option value="Flowers">Flowers</option>
                  <option value="Pots">Pots</option>
                  <option value="Soils">Soils</option>
                  <option value="Rocks">Rocks</option>
                </select>
              </div>
              <div class="search-box d-flex align-items-center">
                <input
                  type="text"
                  class="form-control"
                  v-model="searchQuery"
                  placeholder="Search..."
                  aria-label="Search products"
                />
                <i class="bi bi-search ms-2"></i>
              </div>
            </div>
          </div>

          <div v-if="pageLoadingState" class="d-flex justify-content-center">
            <div class="spinner-border text-primary" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>

          <!-- Product Grid -->
          <div v-if="!pageLoadingState" class="row g-4">
            <div
              v-for="product in filteredProducts"
              :key="product.id"
              class="col-12 col-sm-6 col-md-4 col-lg-3 shadow-sm py-3 rounded product-card"
            >
              <div
                class="product-image-container"
                @click="goToProductDetails(product.id)"
              >
                <Product360Viewer
                  class="product-image w-100"
                  :imageSequence="product.imageSequence"
                />
              </div>
              <div class="product-info mt-2">
                <div class="d-flex flex-column">
                  <h5 class="product-name">{{ product.productName }}</h5>
                  <div class="rating">
                    <span class="stars">
                      <span>
                        {{ "★".repeat(Math.round(product.averageRating)) }}
                        {{ "☆".repeat(5 - Math.round(product.averageRating)) }}
                      </span>
                    </span>
                    <span class="rating-count">
                      {{ product.reviewCount }} reviews
                    </span>
                  </div>
                </div>
                <div
                  class="category-info d-flex justify-content-between align-items-center mt-3"
                >
                  <p class="product-category text-muted">
                    {{ product.categoryName }}
                  </p>
                  <p class="product-category text-muted">
                    {{ product.subCategoryName }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Product Details (if route params id is present) -->
    <div v-else>
      <ProductDetails :product="selectedProduct" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, onBeforeMount, onBeforeUnmount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getDownloadURL, listAll, ref as storageRef } from "firebase/storage";
import { storage } from "../../boot/firebase";
import { GetAllProductsAPI } from "@composables/Products";

import Product360Viewer from "../../360Viewer.vue";
import ProductDetails from "./ProductDetails/ProductDetails.vue";

const selectedCategory = ref("Plants");
const selectedPlantType = ref(null); // New variable for selected plant type
const searchQuery = ref(""); // New variable for search query
const selectedProduct = ref(null);

const pageLoadingState = ref(false);

const route = useRoute();
const router = useRouter();

const products = ref([]);
const windowWidth = ref(window.innerWidth);

const handleResize = () => {
  windowWidth.value = window.innerWidth;
};

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});

onMounted(async () => {
  pageLoadingState.value = true;
  try {
    window.addEventListener("resize", handleResize);

    const response = await GetAllProductsAPI();
    if (response.status === "failed") {
      console.log(response.message);
      return;
    }
    const productData = response.data || [];
    for (const product of productData) {
      product.imageSequence = await getImageSequenceFromFirebase(
        product.imageSequenceFolderURL
      );
      if (product.reviews && product.reviews.length > 0) {
        product.averageRating = calculateAverageRating(product.reviews);
        product.reviewCount = product.reviews.length;
      } else {
        product.averageRating = 0;
        product.reviewCount = 0;
      }
    }
    products.value = productData;
    pageLoadingState.value = false;
  } catch (error) {
    console.log(error);
  }
});

const getImageSequenceFromFirebase = async (folderURL) => {
  const listRef = storageRef(storage, folderURL);
  const imageSequence = [];

  try {
    const res = await listAll(listRef);
    const urls = await Promise.all(
      res.items.map(async (itemRef) => {
        const url = await getDownloadURL(itemRef);
        return url;
      })
    );

    // Sort URLs based on the frame number
    urls.sort((a, b) => {
      const numA = parseInt(a.match(/frame_(\d+)\.jpg/)[1]); // Extract frame number from URL
      const numB = parseInt(b.match(/frame_(\d+)\.jpg/)[1]);
      return numA - numB; // Sort numerically
    });

    return urls;
  } catch (error) {
    console.error("Error retrieving image sequence from Firebase:", error);
    return imageSequence;
  }
};

const calculateAverageRating = (reviews) => {
  const totalRating = reviews.reduce(
    (sum, review) => sum + review.userRating,
    0
  );
  return reviews.length ? totalRating / reviews.length : 0;
};

const goToProductDetails = (id) => {
  selectedProduct.value = products.value.find((product) => product.id === id);
  router.push({ name: "shop", params: { id } });
};

const filterProductsByCategory = (category) => {
  selectedCategory.value = category;
};

const filteredProducts = computed(() => {
  return products.value.filter((product) => {
    const matchesCategory =
      product.categoryName === selectedCategory.value ||
      selectedCategory.value === "All";
    const matchesPlantType =
      !selectedPlantType.value ||
      product.subCategoryName === selectedPlantType.value;
    const matchesSearchQuery =
      !searchQuery.value ||
      product.productName
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase());
    return matchesCategory && matchesPlantType && matchesSearchQuery;
  });
});
</script>

<style lang="scss" scoped>
@import "./Shop.scss";
</style>
