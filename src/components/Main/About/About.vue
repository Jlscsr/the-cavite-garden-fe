<template>
    <!-- About Section -->
    <section class="about section" id="about">
        <h2 class="heading px-5 py-5">
            About Us
            <span class="fs-3">About Us</span>
        </h2>
        <div class="container">
            <div class="row">
                <div class="col">
                    <div id="panorama"></div>
                </div>
                <div class="col ms-3">
                    <h3 class="fs-semi-bold">The Cavite Garden</h3>
                    <a
                        class="fs-6 fs-medium mb-3 d-block"
                        href="https://www.google.com/maps/place/396+Naga+Rd,+Las+Pi%C3%B1as,+1742+Metro+Manila/@14.4613896,120.9932611,17z/data=!3m1!4b1!4m6!3m5!1s0x3397ce0b80413ddd:0xecc7cddc0b9757d3!8m2!3d14.4613896!4d120.9932611!16s%2Fg%2F11c1yxq05k?entry=ttu"
                        target="_blank"
                    >
                        <i class="fas fa-map-marker-alt text-danger me-1"></i>
                        396 Naga Road, Pulang Lupa Dos, Las Pinas City.
                    </a>
                    <p class="fs-6 text-black">
                        At the Cavite Garden, we believe in the transformative
                        power nature and the profound connection between people
                        and plants. Nestled in the heart of Cavite, our garden
                        is not just a space filled with flora; It's a sanctuary
                        where beauty, tranquility, and inspiration converge.
                        Established with a passion for cultivating natural
                        splendor, the Cavite Garden is a labor of love that took
                        root With the vision of creating a haven where
                        individuals and communities could escape the hustle and
                        bustle of everyday life. Our journey began with the
                        intention to not just grow gardens but to nurture
                        experiences that linger in the hearts of our visitors.
                    </p>
                    <div class="container text-center mt-5">
                        <div class="row">
                            <div class="col">
                                <img
                                    src="../../../assets/images/plants.png"
                                    alt="Plant Illustration"
                                    loading="lazy"
                                />
                                <p class="mb-0 mt-1">Quality Plants</p>
                            </div>
                            <div class="col mx-3">
                                <img
                                    src="../../../assets/images/peso.png"
                                    alt="Philippine Pesos Illustration"
                                    loading="lazy"
                                />
                                <p class="mb-0 mt-1">Affordable Price</p>
                            </div>
                            <div class="col">
                                <img
                                    src="../../../assets/images/truck.png"
                                    alt="Truck Illustration"
                                    loading="lazy"
                                />
                                <p class="mb-0 mt-1">Excellent Service</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { onMounted } from "vue";

onMounted(() => {
    pannellum.viewer("panorama", {
        type: "equirectangular",
        panorama: "/src/assets/images/thecavitegarden-360-photo.jpg",
        autoload: true,
    });
});
</script>

<style scoped lang="scss">
@import "./About.scss";
</style>
