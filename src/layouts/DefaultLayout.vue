<template>
  <div class="bg-background bg-pattern text-text relative">
    <NavigationComponent> </NavigationComponent>
    <img src="/wavy-bg.svg" alt="" class="absolute -top-0 opacity-25 w-full min-w-[512px] h-auto -left-1/4" />
    <RouterView></RouterView>
    <FooterComp />
  </div>
</template>

<script setup>
  import { RouterLink, RouterView } from "vue-router";
  import FooterComp from "@/components/FooterComp.vue";
  import NavigationComponent from "@/components/NavigationComponent.vue";
</script>
