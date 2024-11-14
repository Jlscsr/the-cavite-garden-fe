<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    :width="iconSize"
    :height="iconSize"
    x="0"
    y="0"
    viewBox="0 0 459.361 459.361"
    style="enable-background: new 0 0 512 512"
    xml:space="preserve"
    class=""
  >
    <g>
      <path
        d="M371.2 325.731c19.1-.2 35.8-13.1 40.7-31.6l47.1-175.4c1.5-5.7-1.8-11.5-7.5-13.1-.9-.2-1.8-.4-2.7-.4H94.5l-24.1-89c-1.2-4.6-5.4-7.9-10.2-7.9H0v21.3h51.8l23.3 87c-.1.7-.1 1.4 0 2.1l48 176c.3 1.4.8 2.9 1.3 4.3l16.2 59c-15.6 8.3-26.2 24.7-26.2 43.6 0 27.3 22.1 49.4 49.4 49.4 27.3 0 49.4-22.1 49.4-49.4 0-8.5-2.2-16.6-6-23.6-.9-1.6-1.8-3.2-2.9-4.8H330c-5.6 8-9 17.8-9 28.4 0 27.3 22.1 49.4 49.4 49.4s49.4-22.1 49.4-49.4c0-12.9-4.9-24.6-13-33.4-8.7-9.9-21.5-16.2-35.8-16.3H161.9l-7.5-27.5c3.2.8 6.5 1.3 9.8 1.3h207zm-.7 47.5c15.7 0 28.4 12.7 28.4 28.4s-12.7 28.4-28.4 28.4-28.4-12.7-28.4-28.4 12.7-28.4 28.4-28.4zm-206.7 0c15.7 0 28.3 12.8 28.3 28.4 0 15.7-12.7 28.4-28.4 28.4s-28.3-12.7-28.3-28.4 12.7-28.4 28.4-28.4zm-19-82.3-23.9-87.4-21.3-76.8h334.9l-43.3 162.6c-2.4 9.3-10.7 15.8-20.3 16H164c-8.7-.5-16.3-6.1-19.2-14.4z"
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
});

const iconSize = ref(props.size);
const iconColor = ref(props.color);
</script>
