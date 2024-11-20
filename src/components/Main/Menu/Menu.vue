<template>
  <!-- Menu Section -->
  <section class="menu section" id="menu">
    <h2 class="styled-header heading px-5 py-5">
      BEST SELLING
      <span class="fs-heading-4">BEST SELLING</span>
    </h2>
    <div class="container px-5 py-3">
      <div class="row gap-1">
        <div class="menu-col-1 col bg-secondary rounded p-5 mb-3">
          <div class="d-flex flex-column gap-3 menu-intro mx-auto">
            <h3 class="fs-heading-4 fs-semi-bold text-white">
              Our Best Selling <br />
              Products!
            </h3>
            <p class="text-light fs-paragraph tagline">
              Discover our best-selling garden products! From vibrant flowers to
              charming plants, find out why our collection is a customer
              favorite. Shop our top picks today!
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
            <div class="col m-0">
              <div class="product-card shadow px-4 py-3 rounded bg-white">
                <div class="d-flex aling-items-center">
                  <div class="img-container rounded me-3">
                    <img
                      class="rounded"
                      src="../../../assets/images/flower-sample.jpg"
                      alt="Flower"
                      width="50"
                    />
                  </div>
                  <div
                    class="details d-flex flex-column justify-content-center"
                  >
                    <h5 class="fs-paragraph fs-semi-bold mb-1">₱150</h5>
                    <p class="fs-small">Miniature Roses</p>
                    <div class="meta d-flex align-items-center">
                      <p class="text-black fs-xsmall mb-0">
                        10 <span class="text-accent-3">Stock</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col m-0">
              <div class="product-card shadow px-4 py-3 rounded bg-white">
                <div class="d-flex aling-items-center">
                  <div class="img-container rounded me-3">
                    <img
                      class="rounded"
                      src="../../../assets/images/flower-sample.jpg"
                      alt="Flower"
                      width="50"
                    />
                  </div>
                  <div
                    class="details d-flex flex-column justify-content-center"
                  >
                    <h5 class="fs-paragraph fs-semi-bold mb-1">₱150</h5>
                    <p class="fs-small">Miniature Roses</p>
                    <div class="meta d-flex align-items-center">
                      <p class="text-black fs-xsmall mb-0">
                        10 <span class="text-accent-3">Stock</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col m-0">
              <div class="product-card shadow px-4 py-3 rounded bg-white">
                <div class="d-flex aling-items-center">
                  <div class="img-container rounded me-3">
                    <img
                      class="rounded"
                      src="../../../assets/images/flower-sample.jpg"
                      alt="Flower"
                      width="50"
                    />
                  </div>
                  <div
                    class="details d-flex flex-column justify-content-center"
                  >
                    <h5 class="fs-paragraph fs-semi-bold mb-1">₱150</h5>
                    <p class="fs-small">Miniature Roses</p>
                    <div class="meta d-flex align-items-center">
                      <p class="text-black fs-xsmall mb-0">
                        10 <span class="text-accent-3">Stock</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col m-0">
              <div class="product-card shadow px-4 py-3 rounded bg-white">
                <div class="d-flex aling-items-center">
                  <div class="img-container rounded me-3">
                    <img
                      class="rounded"
                      src="../../../assets/images/flower-sample.jpg"
                      alt="Flower"
                      width="50"
                    />
                  </div>
                  <div
                    class="details d-flex flex-column justify-content-center"
                  >
                    <h5 class="fs-paragraph fs-semi-bold mb-1">₱150</h5>
                    <p class="fs-small">Miniature Roses</p>
                    <div class="meta d-flex align-items-center">
                      <p class="text-black fs-xsmall mb-0">
                        10 <span class="text-accent-3">Stock</span>
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
  </section>
</template>

<script setup>
import ArrowIcon from "../../../assets/icons/ArrowIcon.vue";
</script>

<style scoped lang="scss">
@import "./Menu.scss";
</style>
