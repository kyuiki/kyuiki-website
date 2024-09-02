<template>
  <span @click="click = !click" class="relative">
    <span v-if="click" class="bg-white relative animate-glitch select-none">
      <slot />
    </span>
    <slot v-else />
  </span>
</template>
<script setup>
  import { ref } from "vue";

  const click = ref(!false);
</script>

<style scoped>
  .animate-glitch {
    animation: glitch 0.5s infinite linear;

    background: repeating-linear-gradient(
      45deg,
      var(--tw-gradient-from),
      var(--tw-gradient-from) 10px,
      var(--tw-gradient-to) 10px,
      var(--tw-gradient-to) 20px
    );
    background-size: 120%;
    @apply border border-secondary from-transparent to-secondary text-transparent;
  }

  @keyframes glitch {
    100% {
      background-position: -30px;
    }
  }
</style>
