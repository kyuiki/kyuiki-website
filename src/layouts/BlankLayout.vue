<template>
  <div class="">
    <RouterView></RouterView>
  </div>
</template>

<script setup>
  import { RouterLink, RouterView } from "vue-router";
  import FooterComp from "@/components/FooterComp.vue";
  import NavigationComponent from "@/components/NavigationComponent.vue";
</script>
