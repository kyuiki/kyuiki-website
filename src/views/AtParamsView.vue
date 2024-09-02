<template>
  <div style="perspective: 1500px" class="p-2 mx-auto max-w-5xl relative z-10 min-h-screen">
    <div>{{ route.params.id }}</div>
  </div>
</template>

<script setup>
  import { useRoute } from "vue-router";
  import { ref, onMounted, computed } from "vue";
  import md5 from "@/utils/md5.js";

  const route = useRoute();
  if (route.params.id) {
    console.log(route.params.id);
  }
</script>

<style>
  @media (min-width: 1024px) {
    .about {
      min-height: 100vh;
      display: flex;
      align-items: center;
    }
  }
</style>
