<template>
  <div class="bg-background bg-pattern text-text relative">
    <RouterView></RouterView>
    <NavigationComponent> </NavigationComponent>
  </div>
</template>

<script setup>
  import { RouterLink, RouterView } from "vue-router";
  import NavigationComponent from "@/components/NavigationComponent.vue";
</script>
