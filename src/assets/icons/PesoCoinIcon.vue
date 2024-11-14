<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    :width="iconSize"
    :height="iconSize"
    x="0"
    y="0"
    viewBox="0 0 512 512"
    style="enable-background: new 0 0 512 512"
    xml:space="preserve"
    class=""
  >
    <g>
      <g data-name="Currency Icon">
        <circle
          cx="256"
          cy="256"
          r="256"
          fill="#ffce33"
          opacity="1"
          data-original="#ffce33"
        ></circle>
        <circle
          cx="256"
          cy="259.55"
          r="201.28"
          fill="#f28a00"
          opacity="1"
          data-original="#f28a00"
        ></circle>
        <path
          fill="#ffce33"
          d="M390.26 188.8h-26.01a82.16 82.16 0 0 0-8.39-18.04c-8.49-13.67-20.48-24.21-35.95-31.61-15.48-7.41-33.27-11.11-53.38-11.11H161.57v60.77h-21.66v22.2h21.66v7.86h-21.66v22.2h21.66v150.01h63.41v-89.24h40.47c32.04 0 57.24-7.68 75.6-23.03 12.28-10.27 20.44-22.86 24.51-37.73h24.71v-22.2h-21.7c0-.53.04-1.05.04-1.58 0-2.12-.07-4.21-.19-6.28h21.85v-22.2zm-165.28-11.81h42.27c11.44.12 20.47 3.86 27.1 11.2.18.2.35.41.52.61h-69.89zm69.64 66.66c-6.44 6.14-15.81 9.21-28.09 9.21h-41.55v-11.81h72.04c-.74.91-1.54 1.78-2.4 2.6zm9.67-26.01c0 .41-.01.81-.02 1.22h-79.29V211h78.96c.23 2.13.35 4.34.35 6.64z"
          opacity="1"
          data-original="#ffce33"
        ></path>
      </g>
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
