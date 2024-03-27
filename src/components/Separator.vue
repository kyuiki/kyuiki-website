<template>
  <div class="mx-auto mt-8 flex items-center gap-2 max-w-xl">
    <div class="border-b-4 border-secondary w-full border-dotted"></div>

    <div class="">
      <Icon
        :icon="icon || 'mingcute:arrow-down-fill'"
        style="font-size: 2.5em"
        class="text-primary inline-block"
        v-motion
        :initial="{
          y: -2
        }"
        :enter="{
          y: 2,
          transition: {
            repeat: Infinity,

            duration: 500,
            repeatType: 'mirror'
          }
        }"
      />
    </div>
    <div class="border-b-4 border-secondary w-full border-dotted"></div>
  </div>
</template>

<script>
  export default {
    props: ["icon"]
  };
</script>
