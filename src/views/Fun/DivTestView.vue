<template>
  <div class="h-screen flex justify-center items-center">
    <div class="bg-test bg-pattern text-white bg-sky-900 shadow-lg shadow-teal-50">
      <iframe class="aspect-video h-64" src="https://www.youtube.com/embed/tgbNymZ7vqY"> </iframe>
    </div>
  </div>
</template>

<style scoped>
  .bg-test {
    --shapeDot-lt: 6px 0;
    --shapeDot-rt: 100% 25px;
    --shapeDot-rb: 100% calc(100% - 4px);
    --shapeDot-lb: 0 calc(100% - 14px);
    clip-path: polygon(var(--shapeDot-lt), var(--shapeDot-rt), var(--shapeDot-rb), var(--shapeDot-lb));
    position: relative;
  }
  /* .bg-test::before {
    clip-path: polygon(var(--shapeDot-lt), var(--shapeDot-rt), var(--shapeDot-rb), var(--shapeDot-lb));
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    will-change: clip-path;
  } */
</style>

<script setup>
  import { ref } from "vue";
</script>
