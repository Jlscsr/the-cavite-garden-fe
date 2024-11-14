<template>
  <!-- Reviews Section -->
  <section class="reviews section" id="reviews">
    <h2 class="heading px-5 py-5">
      Reviews
      <span class="fs-3">What People Say</span>
    </h2>

    <div class="container mt-3 mb-5 border">
      <swiper
        :slides-per-view="2"
        :space-between="30"
        @swiper="onSwiper()"
        @slideChange="onSlideChange()"
        class="px-1 py-2"
      >
        <swiper-slide class="cursor-pointer py-5 px-5 text-center">
          <div class="my-3 text-start">
            <i class="fas fa-star text-warning"></i>
            <i class="fas fa-star text-warning"></i>
            <i class="fas fa-star text-warning"></i>
            <i class="fas fa-star text-warning"></i>
            <i class="fas fa-star text-warning"></i>
          </div>

          <p
            class="fs-heading-5 fs-semi-bold text-start mb-3"
            style="font-size: 1.75rem !important"
          >
            John Cruz
          </p>
          <p class="fs-parapgraph text-start">
            "The plants from this garden are top-notch! They are healthy and
            vibrant, and they have transformed my space into a beautiful oasis.
            I couldn't be happier with my purchase."
          </p>
          <p class="fs-medium text-accent-3 text-start">April 6, 2024</p>
        </swiper-slide>
        <swiper-slide class="cursor-pointer py-5 px-5 text-center">
          <div class="my-3 text-start">
            <i class="fas fa-star text-warning"></i>
            <i class="fas fa-star text-warning"></i>
            <i class="fas fa-star text-warning"></i>
            <i class="fas fa-star text-warning"></i>
            <i class="fas fa-star text-warning"></i>
          </div>

          <p
            class="fs-heading-5 fs-semi-bold text-start mb-3"
            style="font-size: 1.75rem !important"
          >
            John Cruz
          </p>
          <p class="fs-parapgraph text-start">
            "The plants from this garden are top-notch! They are healthy and
            vibrant, and they have transformed my space into a beautiful oasis.
            I couldn't be happier with my purchase."
          </p>
          <p class="fs-medium text-accent-3 text-start">April 6, 2024</p>
        </swiper-slide>
        <swiper-slide class="cursor-pointer py-5 px-5 text-center">
          <div class="my-3 text-start">
            <i class="fas fa-star text-warning"></i>
            <i class="fas fa-star text-warning"></i>
            <i class="fas fa-star text-warning"></i>
            <i class="fas fa-star text-warning"></i>
            <i class="fas fa-star text-warning"></i>
          </div>

          <p
            class="fs-heading-5 fs-semi-bold text-start mb-3"
            style="font-size: 1.75rem !important"
          >
            John Cruz
          </p>
          <p class="fs-parapgraph text-start">
            "The plants from this garden are top-notch! They are healthy and
            vibrant, and they have transformed my space into a beautiful oasis.
            I couldn't be happier with my purchase."
          </p>
          <p class="fs-medium text-accent-3 text-start">April 6, 2024</p>
        </swiper-slide>
        <swiper-slide class="cursor-pointer py-5 px-5 text-center">
          <div class="my-3 text-start">
            <i class="fas fa-star text-warning"></i>
            <i class="fas fa-star text-warning"></i>
            <i class="fas fa-star text-warning"></i>
            <i class="fas fa-star text-warning"></i>
            <i class="fas fa-star text-warning"></i>
          </div>

          <p
            class="fs-heading-5 fs-semi-bold text-start mb-3"
            style="font-size: 1.75rem !important"
          >
            John Cruz
          </p>
          <p class="fs-parapgraph text-start">
            "The plants from this garden are top-notch! They are healthy and
            vibrant, and they have transformed my space into a beautiful oasis.
            I couldn't be happier with my purchase."
          </p>
          <p class="fs-medium text-accent-3 text-start">April 6, 2024</p>
        </swiper-slide>
        <swiper-slide class="cursor-pointer py-5 px-5 text-center">
          <div class="my-3 text-start">
            <i class="fas fa-star text-warning"></i>
            <i class="fas fa-star text-warning"></i>
            <i class="fas fa-star text-warning"></i>
            <i class="fas fa-star text-warning"></i>
            <i class="fas fa-star text-warning"></i>
          </div>

          <p
            class="fs-heading-5 fs-semi-bold text-start mb-3"
            style="font-size: 1.75rem !important"
          >
            John Cruz
          </p>
          <p class="fs-parapgraph text-start">
            "The plants from this garden are top-notch! They are healthy and
            vibrant, and they have transformed my space into a beautiful oasis.
            I couldn't be happier with my purchase."
          </p>
          <p class="fs-medium text-accent-3 text-start">April 6, 2024</p>
        </swiper-slide>
      </swiper>
    </div>
  </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";

const onSwiper = (swiper) => {
  console.log(swiper);
};

const onSlideChange = () => {
  console.log("slide change");
};
</script>

<style scoped lang="scss">
@import "./Reviews.scss";
</style>
