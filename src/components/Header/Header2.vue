<template>
  <header class="header bg-white">
    <nav class="navbar navbar-expand-lg">
      <div class="container-fluid">
        <router-link :to="{ name: 'home' }" class="navbar-brand fs-heading-6">
          The Cavite Garden
          <i class="fas fa-leaf ms-1"></i>
        </router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="collapse navbar-collapse justify-content-between"
          id="navbarSupportedContent"
        >
          <ul class="navbar-nav me-auto ms-auto gap-3 mb-2 mb-lg-0 text-center">
            <!-- Nav Items -->
            <li class="nav-item">
              <router-link
                :to="{ name: 'home' }"
                class="nav-link fs-6 text-black"
              >
                Home
              </router-link>
            </li>
            <li class="nav-item">
              <a
                class="nav-link fs-6 text-black cursor-pointer"
                @click="goToOrSlideTo('about')"
              >
                About
              </a>
            </li>
            <li class="nav-item">
              <router-link
                :to="{ name: 'shop' }"
                class="nav-link fs-6 text-black"
              >
                Shop
              </router-link>
            </li>
            <li class="nav-item">
              <a
                class="nav-link fs-6 text-black cursor-pointer"
                @click="goToOrSlideTo('reviews')"
              >
                Reviews
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>
