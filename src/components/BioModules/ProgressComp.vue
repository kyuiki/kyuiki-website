<template>
  <div class="w-full flex md:flex-col" v-for="(activity, i) in currentActivity" :key="i">
    <div class="flex max-md:flex-col md:w-full md:items-center">
      <div class="px-2 py-2 relative rounded-full bg-background">
        <Icon :icon="activity.icon" class="text-white text-2xl inline relative" />
      </div>
      <div
        class="md:border-b-2 max-md:border-l-2 border-white border-dashed w-full max-md:h-full max-md:ml-5"
        v-if="i + 1 != currentActivity?.length"
      ></div>
    </div>
    <div class="md:border-l-2 border-white border-dashed w-full md:ml-5 px-2 max-md:pb-4">
      <p class="font-bold text-lg">{{ activity.title }}</p>
      <p class="text-sm opacity-75">{{ activity.description }}</p>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, watch, computed } from "vue";
  const currentActivity = ref([
    {
      icon: "mingcute:house-fill",
      title: "Home",
      description: "Currently at home"
    },
    {
      icon: "mingcute:airplane-fill",
      title: "Traveling",
      description: "Traveling to destination"
    },
    {
      icon: "mingcute:location-fill",
      title: "At Destination",
      description: "Reached the destination"
    }
  ]);
</script>
