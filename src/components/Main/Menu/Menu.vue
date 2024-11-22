<template>
  <!-- Menu Section -->
  <section class="menu section" id="menu">
    <h2 class="fs-heading-3 text-center px-5 py-5 fw-semibold text-secondary">
      Product Highlights
    </h2>
    <div class="container px-5 py-3">
      <div class="row gap-1">
        <div
          class="menu-col-1 col-lg-4 col-sm-12 bg-secondary rounded p-5 mb-3"
        >
          <div class="d-flex flex-column gap-3 menu-intro mx-auto">
            <h3 class="fs-heading-5 fs-semi-bold text-white">
              Our Most Popular <br />
              Products!
            </h3>
            <p class="text-light fs-paragraph tagline">
              Explore our most loved products! From top sellers to highly
              reviewed items, discover why these favorites stand out. Find your
              perfect pick today!
            </p>

            <router-link
              :to="{ name: 'shop' }"
              class="text-accent-2 fs-heading-6 fs-medium"
            >
              <span class="me-4">Go to Shop</span>
              <ArrowIcon size="60" color="#ffffff" direction="right" />
            </router-link>
          </div>
        </div>
        <div class="products col">
          <div class="row row-gap-3">
            <div class="col">
              <h4 class="fw-semibold fs-heading-6">
                Our Best Selling Products
              </h4>
              <div
                v-for="product in products.slice(0, 5)"
                :key="product?.id"
                class="col m-0"
              >
                <div
                  class="product-card shadow my-2 px-4 py-3 rounded bg-white cursor-pointer"
                  @click="gotToProduct(product?.id)"
                >
                  <div class="d-flex align-items-center">
                    <div class="video-container rounded me-3">
                      <video
                        class="rounded"
                        :src="product?.productVideoURL"
                        autoplay
                        loop
                        muted
                        alt="Flower"
                      ></video>
                    </div>
                    <div
                      class="details d-flex flex-column justify-content-center"
                    >
                      <h5 class="fs-paragraph fs-semi-bold mb-1">
                        ₱{{ product?.productPrice }}
                      </h5>
                      <p class="fs-small">{{ product?.productName }}</p>
                      <div class="meta d-flex align-items-center">
                        <p class="text-black fs-xsmall mb-0">
                          {{ product?.productStock }}
                          <span class="text-accent-3">Stock</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col">
              <h4 class="fw-semibold fs-heading-6">Our Popular Products</h4>
              <div
                v-for="product in products.slice(5, 10)"
                :key="product?.id"
                class="col m-0"
              >
                <div
                  class="product-card shadow my-2 px-4 py-3 rounded bg-white cursor-pointer"
                  @click="gotToProduct(product?.id)"
                >
                  <div class="d-flex align-items-center">
                    <div class="video-container rounded me-3">
                      <video
                        class="rounded"
                        :src="product?.productVideoURL"
                        autoplay
                        loop
                        muted
                        alt="Flower"
                      ></video>
                    </div>
                    <div
                      class="details d-flex flex-column justify-content-center"
                    >
                      <h5 class="fs-paragraph fs-semi-bold mb-1">
                        ₱{{ product?.productPrice }}
                      </h5>
                      <p class="fs-small">{{ product?.productName }}</p>
                      <div class="meta d-flex align-items-center">
                        <p class="text-black fs-xsmall mb-0">
                          {{ product?.productStock }}
                          <span class="text-accent-3">Stock</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import ArrowIcon from "../../../assets/icons/ArrowIcon.vue";
import { GetAllProductsAPI } from "../../../composables/Products";

const router = useRouter();

const products = ref([]);
onMounted(async () => {
  const response = await GetAllProductsAPI();

  if (response.status === "failed") {
    products.value = [];
    console.log(response.message);
    return;
  }

  if (response.hasOwnProperty("data")) {
    products.value = response.data.slice(0, 10); // Limit the array to 10 products
  }
});

const gotToProduct = (id) => {
  router.push({ name: "shop", params: { id } });
};
</script>

<style scoped lang="scss">
@import "./Menu.scss";
</style>
