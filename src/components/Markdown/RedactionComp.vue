<template>
  <span @click="sparkle = !sparkle" class="relative">
    <span ref="sparkle" class="text-transparent relative mix-blend-screen animate-glitch select-none">
      <slot />
    </span>
  </span>
</template>
<script setup>
  import { ref, onMounted, onBeforeUnmount, watch } from "vue";
  import { useIntervalFn, useElementVisibility } from "@vueuse/core";

  const sparkle = ref(null);
  const isVisible = useElementVisibility(sparkle);

  watch(isVisible, (value) => {
    if (value) {
      spawner.resume();
    } else {
      spawner.pause();
    }
  });

  const spawner = useIntervalFn(() => {
    for (let i = 0; i < 3; i++) {
      const span = document.createElement("span");
      span.className = "absolute w-full h-full mix-blend-screen " + ["bg-red-600", "bg-green-600", "bg-blue-600"][i];
      span.style.left = Math.random() * 10 - 5 + "px";
      span.style.top = Math.random() * 10 - 5 + "px";

      sparkle.value.appendChild(span);
      setTimeout(() => {
        span.remove();
      }, 100);
    }
  }, 100);

  onBeforeUnmount(() => {
    spawner.pause();
  });
</script>

<style scoped>
  /* .animate-glitch {
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
  } */
</style>
