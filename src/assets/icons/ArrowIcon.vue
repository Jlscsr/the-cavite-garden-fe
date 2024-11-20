<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    :width="iconSize"
    :height="iconSize"
    x="0"
    y="0"
    viewBox="0 0 1560 1560"
    style="enable-background: new 0 0 512 512"
    xml:space="preserve"
    :class="{
      'arrow-right': direction === 'right',
      'arrow-left': direction === 'left',
    }"
  >
    <g>
      <path
        d="M1524 811.8H36c-17.7 0-32-14.3-32-32s14.3-32 32-32h1410.7l-194.2-194.2c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l248.9 248.9c9.2 9.2 11.9 22.9 6.9 34.9-5 11.9-16.7 19.7-29.6 19.7z"
        :fill="iconColor"
        opacity="1"
        data-original="#000000"
      ></path>
      <path
        d="M1274.8 1061c-8.2 0-16.4-3.1-22.6-9.4-12.5-12.5-12.5-32.8 0-45.3l249.2-249.2c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3l-249.2 249.2c-6.3 6.3-14.5 9.4-22.7 9.4z"
        :fill="iconColor"
        opacity="1"
        data-original="#000000"
      ></path>
    </g>
  </svg>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  size: {
    type: String,
    default: "512",
  },
  color: {
    type: String,
    default: "#121b1e",
  },
  direction: {
    type: String,
    default: "right",
  },
});
const iconSize = ref(props.size);
const iconColor = ref(props.color);
const direction = ref(props.direction);
</script>

<style lang="scss" scoped>
.arrow-left {
  transform: rotate(180deg);
}

.arrow-right {
  transform: rotate(0deg);
}
</style>
