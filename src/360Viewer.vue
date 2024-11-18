<template>
  <div
    class="viewer-container"
    @mouseenter="onMouseEnter"
    @mousemove="onMouseMove"
    @mouseleave="onMouseLeave"
  >
    <div v-if="isLoading" class="loading-spinner">
      <div class="spinner-border text-primary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <canvas
      v-if="isWebGLAvailable && !isLoading"
      ref="canvasRef"
      class="product-canvas cursor-pointer"
    ></canvas>
    <div v-else class="webgl-error">
      <p>
        WebGL is not available in your browser. Please try a different browser
        or device.
      </p>
    </div>
    <div v-if="loadingError" class="loading-error">
      {{ loadingError }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import * as THREE from "three";

const props = defineProps({
  imageSequence: {
    type: Array,
    required: true,
  },
});

console.log("imageSequence", props.imageSequence);

// Refs and state
const canvasRef = ref(null);
const isWebGLAvailable = ref(true);
const loadingError = ref(null);
const isLoading = ref(true);

let scene, camera, renderer;
let textures = [];
let isHovering = false;
let previousX = 0;
let currentIndex = 0;
const rotationSensitivity = 0.05;
const totalFrames = 16;

// Check WebGL availability
const checkWebGLAvailability = () => {
  try {
    const canvas = document.createElement("canvas");
    const context =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    isWebGLAvailable.value = !!context;
  } catch (e) {
    isWebGLAvailable.value = false;
    console.error("WebGL detection failed:", e);
  }
};

const loadTextures = async () => {
  isLoading.value = true;
  textures = []; // Reset textures array

  const loader = new THREE.TextureLoader();

  try {
    textures = await Promise.all(
      props.imageSequence.map((url) =>
        loader.loadAsync(url).then((texture) => {
          texture.encoding = THREE.sRGBEncoding;
          return texture;
        })
      )
    );
    isLoading.value = false; // Textures loaded, hide loading spinner
  } catch (error) {
    loadingError.value = `Error loading textures: ${error.message}`;
    console.error("Failed to load textures:", error);
    isLoading.value = false;
  }
};

const updateRendererSize = () => {
  if (!canvasRef.value || !renderer) return;

  const container = canvasRef.value.parentElement;
  const width = container.clientWidth;
  const height = width; // Make it square

  renderer.setSize(width, height);

  if (camera) {
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
};

const init = () => {
  if (textures.length === 0) {
    loadingError.value = "No textures loaded";
    return;
  }

  try {
    // Scene setup
    scene = new THREE.Scene();

    // Camera setup with dynamic aspect ratio
    const container = canvasRef.value.parentElement;
    const aspect = container.clientWidth / container.clientWidth; // Square aspect ratio
    camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
    camera.position.z = 500;

    // Renderer setup with error handling
    if (!renderer) {
      renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.value,
        antialias: true,
        alpha: true,
        powerPreference: "default",
        failIfMajorPerformanceCaveat: false,
      });
    } else {
      renderer.setSize(container.clientWidth, container.clientWidth);
    }

    updateRendererSize();

    // Create mesh
    const geometry = new THREE.PlaneGeometry(400, 400);
    const material = new THREE.MeshBasicMaterial({
      map: textures[0],
      transparent: true,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Animation loop
    const render = () => {
      if (renderer && scene && camera) {
        renderer.render(scene, camera);
        requestAnimationFrame(render);
      }
    };
    render();
  } catch (error) {
    loadingError.value = `Failed to initialize 3D viewer: ${error.message}`;
    console.error("Initialization error:", error);
  }
};

const onMouseEnter = (event) => {
  isHovering = true;
  previousX = event.clientX;
};

const onMouseMove = (event) => {
  if (!isHovering || !scene) return;

  const deltaX = event.clientX - previousX;
  previousX = event.clientX;

  currentIndex =
    (currentIndex + deltaX * rotationSensitivity) % textures.length;
  if (currentIndex < 0) currentIndex += textures.length;

  const frameIndex = Math.floor(currentIndex);
  const mesh = scene.children[0];
  if (mesh && mesh.material) {
    mesh.material.map = textures[frameIndex];
    mesh.material.needsUpdate = true;
  }
};

const onMouseLeave = () => {
  isHovering = false;
};

const handleResize = () => {
  updateRendererSize();
};

// Lifecycle hooks
onMounted(async () => {
  try {
    checkWebGLAvailability();
    if (!isWebGLAvailable.value) {
      loadingError.value = "WebGL is not supported in this browser";
      return;
    }

    await loadTextures();
    init();
    window.addEventListener("resize", handleResize);
  } catch (error) {
    loadingError.value = `Initialization failed: ${error.message}`;
    console.error("Error during initialization:", error);
  }
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);

  // Dispose of each texture
  textures.forEach((texture) => texture.dispose());
  textures = []; // Reset textures array

  // Remove each child from the scene
  if (scene) {
    scene.children.forEach((child) => {
      if (child.geometry) child.geometry.dispose();
      if (child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach((mat) => mat.dispose());
        } else {
          child.material.dispose();
        }
      }
      scene.remove(child);
    });
    scene = null; // Reset the scene to free memory
  }

  // Dispose renderer
  if (renderer) {
    renderer.dispose();
    renderer.forceContextLoss();
    renderer = null; // Reset the renderer to free memory
  }

  camera = null; // Reset the camera
});
</script>

<style scoped>
.viewer-container {
  width: 100%;
  aspect-ratio: 1;
  position: relative;
  background: transparent;
}

.product-canvas {
  width: 100%;
  height: 100%;
  display: block;
}

.webgl-error,
.loading-error {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 4px;
  color: #ff4444;
}
</style>
