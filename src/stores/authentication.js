import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {
  const isOpen = ref(false);
  function toggle() {
    isOpen.value = !isOpen.value;
  }

  return { isOpen, toggle };
});
