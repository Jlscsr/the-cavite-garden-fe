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
        <div class="main col-10">
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
                  <Product360Viewer
                    class="product-image w-100"
                    :imageSequence="product.imageSequence"
                  />
                </div>
                <div class="product-info">
                  <div class="d-flex justify-content-between">
                    <h5 class="product-name">{{ product.productName }}</h5>
                    <div class="rating">
                      <span class="stars">
                        <span>
                          {{ "★".repeat(Math.round(product.averageRating)) }}
                          {{
                            "☆".repeat(5 - Math.round(product.averageRating))
                          }}
                        </span>
                      </span>
                      <span class="rating-count">
                        {{ product.reviewCount }} reviews
                      </span>
                    </div>
                  </div>
                  <div
                    class="d-flex justify-content-between align-items-center mt-3"
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
    </div>
    <div v-else class="">
      <ProductDetails :product="selectedProduct" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

import { getDownloadURL, listAll, ref as storageRef } from "firebase/storage";
import { storage } from "../../boot/firebase";
import { GetAllProductsAPI } from "@composables/Products";

import Product360Viewer from "../../360Viewer.vue";
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
