<template>
  <LayoutComp>
    <div class="flex gap-2">
      <div class="p-1">
        <Icon icon="mingcute:fire-fill" class="text-white" style="font-size: 2.5em" />
      </div>
      <div class="w-full">
        <p class="font-bold text-lg">
          {{ props.title }}
        </p>
        <div>
          <slot />
        </div>
      </div>
      <!-- <div class="">
        <button class="pt-1 rounded">
          <Icon icon="mingcute:external-link-fill" class="text-white" style="font-size: 1.5em" />
        </button>
      </div> -->
    </div>
  </LayoutComp>
</template>
<script setup>
  import LayoutComp from "./LayoutComp.vue";
  import { defineProps } from "vue";

  const props = defineProps({
    title: String,
    icon: String
  });
</script>
