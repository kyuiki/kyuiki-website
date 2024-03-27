<script setup>
  // If unfinished checked, It will be there :3
  const checkDev = import.meta.env.VITE_ISUNFINISHED;
</script>

<template>
  <div class="p-2 bg-red-800 text-white" v-if="checkDev">
    <div class="max-w-5xl mx-auto">
      <p class="font-bold">This website is currently unfinished!</p>
      <p>
        Some fix: and feat: will be sent thru as long as im working on it :D Hang tight as I later post this to
        Production!
      </p>
    </div>
  </div>
  <RouterView />
</template>

<style scoped></style>
