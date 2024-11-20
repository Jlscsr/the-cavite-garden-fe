<template>
  <!-- Reviews Section -->
  <section class="reviews section" id="reviews">
    <h2 class="styled-header heading px-5 py-5">
      Reviews
      <span class="fs-3">What People Say</span>
    </h2>

    <div class="container mt-3 mb-5 border">
      <Swiper
        :slides-per-view="slidesPerView"
        :space-between="spaceBetween"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
        class="px-1 py-2"
      >
        <SwiperSlide
          v-for="(slide, index) in slides"
          :key="index"
          class="cursor-pointer py-5 px-5 text-center shadow-sm"
        >
          <div class="my-3 text-start">
            <i v-for="i in 5" :key="i" class="fas fa-star text-warning"></i>
          </div>
          <p
            class="fs-heading-5 fs-semi-bold text-start mb-3"
            style="font-size: 1.75rem !important"
          >
            John Cruz
          </p>
          <p class="fs-paragraph text-start">
            "The plants from this garden are top-notch! They are healthy and
            vibrant, and they have transformed my space into a beautiful oasis.
            I couldn't be happier with my purchase."
          </p>
          <p class="fs-medium text-accent-3 text-start">April 6, 2024</p>
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { ref, onMounted, onBeforeUnmount } from "vue";
import "swiper/css";

const slides = ref(Array(5).fill({})); // Dummy data
const slidesPerView = ref(2);
const spaceBetween = ref(30);

const onSwiper = (swiper) => {
  console.log(swiper);
};

const onSlideChange = () => {
  console.log("slide change");
};

const updateSwiperConfig = () => {
  const width = window.innerWidth;
  slidesPerView.value = width <= 768 ? 1 : 2;
  spaceBetween.value = width <= 768 ? 10 : 30;
};

onMounted(() => {
  updateSwiperConfig();
  window.addEventListener("resize", updateSwiperConfig);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateSwiperConfig);
});
</script>

<style scoped lang="scss">
@import "./Reviews.scss";
</style>
