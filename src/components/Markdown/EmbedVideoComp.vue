<template>
  <div class="border border-secondary overflow-hidden rounded mx-auto max-w-lg">
    <div class="bg-secondary px-2 font-bold w-full">Video</div>
    <div class="aspect-video w-full">
      <iframe class="w-full h-full" :src="src" frameborder="0" allowfullscreen />
    </div>
  </div>
</template>

<script setup>
  import { defineProps } from "vue";

  const props = defineProps({
    src: String
  });
</script>
