<template>
  <main class="main">
    <Home />
    <About />
    <Menu />
  </main>
</template>

<script setup>
import Home from "./Home/Home.vue";
import About from "./About/About.vue";
// import History from "./History/OurStory.vue";
import Menu from "./Menu/Menu.vue";
// import Reviews from "./Reviews/Reviews.vue";
</script>

<style scoped lang="scss">
.main {
  margin-top: 95px;
}
</style>
