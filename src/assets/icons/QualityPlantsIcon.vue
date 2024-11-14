<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    :width="iconSize"
    :height="iconSize"
    x="0"
    y="0"
    viewBox="0 0 60 60"
    style="enable-background: new 0 0 512 512"
    xml:space="preserve"
    class=""
  >
    <g>
      <path
        fill="#72b746"
        d="M26.3 22.31c-3.66 2.43-8.37 1.82-10.3.52-6.12-4.23-5.26-11.839-7.95-16.869a.423.423 0 0 1 .29-.62c2.15-.38 9.82-1.31 16.79 3.27a9.581 9.581 0 0 1 3.5 10.369z"
        opacity="1"
        data-original="#72b746"
        class=""
      ></path>
      <path
        fill="#5d8c3f"
        d="M32.67 24.15a30.636 30.636 0 0 0-11.86-10.98 2 2 0 0 0-1.62 3.66c.41.19 9.1 4.61 12.01 13.67v.01L33 28z"
        opacity="1"
        data-original="#5d8c3f"
        class=""
      ></path>
      <path
        fill="#83d34f"
        d="M34.88 19.617C31.24 14.982 33.386 8.3 37.35 5.228 44.5-.307 54.14 1.021 56.61 1.46a.491.491 0 0 1 .33.718c-3.07 5.771-2.1 14.5-9.12 19.337a11.121 11.121 0 0 1-9.79.658z"
        opacity="1"
        data-original="#83d34f"
      ></path>
      <path
        fill="#72b746"
        d="M31.12 31.28a25.667 25.667 0 0 1 14.07-21.11 2 2 0 0 1 1.62 3.66 21.667 21.667 0 0 0-11.68 17.53L34 32h-2z"
        opacity="1"
        data-original="#72b746"
        class=""
      ></path>
      <path
        fill="#6b4227"
        d="M54.718 37.817a5.363 5.363 0 0 0-7.615-1.54 6.437 6.437 0 0 0-8.678-2.294 6.423 6.423 0 0 0-10.848 0 6.438 6.438 0 0 0-8.677 2.294L35 52z"
        opacity="1"
        data-original="#6b4227"
        class=""
      ></path>
      <path
        fill="#f4b990"
        d="m11.927 52.334 20.09 6.473a3.992 3.992 0 0 0 3.642-.621l22.448-17.052a2.309 2.309 0 0 0 .293-3.377 2.3 2.3 0 0 0-2.952-.38l-19.578 12.4a1.478 1.478 0 0 1-1.683-.072L28 45h14.614a2.69 2.69 0 0 0 2.69-2.69 2.69 2.69 0 0 0-2.281-2.659L20.36 36.057a5 5 0 0 0-3.08.516l-4.936 2.694A6 6 0 0 1 9.469 40H3a2 2 0 0 0-2 2v8.013a1.994 1.994 0 0 0 1.981 2c2.155.014 5.509.033 7.109.032a5.938 5.938 0 0 1 1.837.289z"
        opacity="1"
        data-original="#f4b990"
        class=""
      ></path>
      <path
        fill="#dda27a"
        d="M45.21 43a2.7 2.7 0 0 1-1.08 1.53l-.01.01c-.08.05-.16.1-.23.14a2.758 2.758 0 0 1-1.28.32H23a1 1 0 0 1 0-2z"
        opacity="1"
        data-original="#dda27a"
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
