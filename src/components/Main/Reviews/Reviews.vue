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
                        "Lorem ipsum dolor sit amet consectetur adipisicing
                        elit. Deserunt dolorum numquam ullam tenetur animi culpa
                        pariatur nisi rerum ipsum vitae."
                    </p>
                    <p class="fs-6 mb-0">John Doe</p>
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
                        "Lorem ipsum dolor sit amet consectetur adipisicing
                        elit. Deserunt dolorum numquam ullam tenetur animi culpa
                        pariatur nisi rerum ipsum vitae."
                    </p>
                    <p class="fs-6 mb-0">John Doe</p>
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
                        "Lorem ipsum dolor sit amet consectetur adipisicing
                        elit. Deserunt dolorum numquam ullam tenetur animi culpa
                        pariatur nisi rerum ipsum vitae."
                    </p>
                    <p class="fs-6 mb-0">John Doe</p>
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
                        "Lorem ipsum dolor sit amet consectetur adipisicing
                        elit. Deserunt dolorum numquam ullam tenetur animi culpa
                        pariatur nisi rerum ipsum vitae."
                    </p>
                    <p class="fs-6 mb-0">John Doe</p>
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
