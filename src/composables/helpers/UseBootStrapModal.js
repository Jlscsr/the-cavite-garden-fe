import { ref, onMounted, onUnmounted } from "vue";

import bootstrap from "bootstrap/dist/js/bootstrap.bundle.js";

export function useBootstrapModal(elementRef) {
  const modalInstance = ref(null);
  const isVisible = ref(false);

  const initialize = () => {
    if (elementRef.value) {
      // Use $el to get the actual DOM element
      const modalElement = elementRef.value.$el || elementRef.value;

      modalInstance.value = new bootstrap.Modal(modalElement, {
        backdrop: true,
        keyboard: true,
      });

      // Add event listeners to track modal state
      modalElement.addEventListener("show.bs.modal", () => {
        isVisible.value = true;
      });

      modalElement.addEventListener("hide.bs.modal", () => {
        isVisible.value = false;
      });
    }
  };

  onMounted(initialize);

  onUnmounted(() => {
    if (modalInstance.value) {
      modalInstance.value.dispose();
    }
  });

  return {
    modalInstance,
    isVisible,
    show: () => modalInstance.value?.show(),
    hide: () => modalInstance.value?.hide(),
    toggle: () => modalInstance.value?.toggle(),
  };
}
