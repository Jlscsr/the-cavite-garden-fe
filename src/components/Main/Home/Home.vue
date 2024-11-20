<template>
  <!-- Landing Page Section -->
  <section class="landing-page section" id="home">
    <div id="carouselExample" class="carousel slide h-100">
      <!-- Carousel Setup -->
      <div class="carousel-inner h-100">
        <div class="carousel-item h-100 d-flex justify-content-center active">
          <div class="carousel-content mt-5">
            <p class="hero-text fs-1 text-white fs-semi-bold fs-heading-1">
              Blooms of Elegance,
              <span class="text-emphasis d-block">Roots of Serinity</span>
              - Your Oasis In Cavite
            </p>
          </div>
        </div>
        <div class="carousel-item h-100">
          <video
            class="h-100 w-100"
            src="../../../assets/videos/the-cavite-garden-video.mp4"
            loop
            autoplay
            muted
          ></video>
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </section>
</template>

<style scoped lang="scss">
@import "./Home.scss";
</style>
