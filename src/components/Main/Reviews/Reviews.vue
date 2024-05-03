<template>
    <!-- Reviews Section -->
    <section class="reviews section" id="reviews">
        <h2 class="heading px-5 py-5">
            Reviews
            <span class="fs-3">What People Say</span>
        </h2>

        <div class="container mt-3 mb-5 p-3 border">
            <swiper
                :slides-per-view="2"
                :space-between="30"
                @swiper="onSwiper()"
                @slideChange="onSlideChange()"
                class="px-1 py-2"
            >
                <swiper-slide class="cursor-pointer py-2 px-5 text-center">
                    <div class="my-3">
                        <i class="fas fa-star text-warning"></i>
                        <i class="fas fa-star text-warning"></i>
                        <i class="fas fa-star text-warning"></i>
                        <i class="fas fa-star text-warning"></i>
                        <i class="fas fa-star text-warning"></i>
                    </div>
                    <p class="fs-medium">
                        "The plants from this garden are top-notch! They are healthy and vibrant, and they have transformed my space into a beautiful oasis. I couldn't be happier with my purchase."
                    </p>
                    <p class="fs-6 mb-0">John Cruz</p>
                    <p class="fs-medium text-body-secondary">April 6, 2024</p>
                </swiper-slide>
                <swiper-slide class="cursor-pointer py-2 px-5 text-center">
                    <div class="my-3">
                        <i class="fas fa-star text-warning"></i>
                        <i class="fas fa-star text-warning"></i>
                        <i class="fas fa-star text-warning"></i>
                        <i class="fas fa-star text-warning"></i>
                        <i class="fas fa-star text-warning"></i>
                    </div>
                    <p class="fs-medium">
                        <p class="fs-medium">
                            "The plants from this garden are top-notch! They are healthy and vibrant, and they have transformed my space into a beautiful oasis. I couldn't be happier with my purchase."
                        </p>
                    </p>
                    <p class="fs-6 mb-0">Clarissa Santos</p>
                    <p class="fs-medium text-body-secondary">August 7, 2023</p>
                </swiper-slide>
                <swiper-slide class="cursor-pointer py-2 px-5 text-center">
                    <div class="my-3">
                        <i class="fas fa-star text-warning"></i>
                        <i class="fas fa-star text-warning"></i>
                        <i class="fas fa-star text-warning"></i>
                        <i class="fas fa-star text-warning"></i>
                        <i class="fas fa-star text-warning"></i>
                    </div>
                    <p class="fs-medium">
                        "I absolutely love the plant products from this garden! They are of exceptional quality and have greatly enhanced the beauty of my surroundings. I highly recommend them to anyone looking for top-notch plants."
                    </p>
                    <p class="fs-6 mb-0">Mark Reyes</p>
                    <p class="fs-medium text-body-secondary">May 6, 2024</p>
                </swiper-slide>
                <swiper-slide class="cursor-pointer py-2 px-5 text-center">
                    <div class="my-3">
                        <i class="fas fa-star text-warning"></i>
                        <i class="fas fa-star text-warning"></i>
                        <i class="fas fa-star text-warning"></i>
                        <i class="fas fa-star text-warning"></i>
                        <i class="fas fa-star text-warning"></i>
                    </div>
                    <p class="fs-medium">
                        "I am extremely satisfied with the plant products from this garden! They are of exceptional quality and have greatly enhanced the beauty of my surroundings. The variety of plants available is impressive, and the customer service is outstanding. I highly recommend them to anyone looking for top-notch plants."
                    </p>
                    <p class="fs-6 mb-0">Christine May</p>
                    <p class="fs-medium text-body-secondary">April 6, 2024</p>
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
