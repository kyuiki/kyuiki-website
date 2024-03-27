<template>
  <div
    class="relative"
    v-motion
    :initial="{
      opacity: 0,
      y: -100
      // scale: 1.05
    }"
    :visibleOnce="{
      opacity: 1,
      y: 0,
      // scale: 1,
      transition: {
        duration: 500,
        type: 'keyframes',
        ease: 'easeOut'
      }
    }"
  >
    <div class="bg-secondary bg-opacity-50 rounded w-full h-full absolute top-0 left-0 -rotate-2"></div>
    <div class="rounded border relative border-secondary bg-secondary h-full flex flex-col">
      <div class="bg-secondary px-2 py-1">
        <Icon
          v-motion
          :initial="{
            scale: 0,
            rotate: 180
          }"
          :visibleOnce="{
            scale: 1,
            rotate: 0,

            transition: { type: 'spring', stiffness: 250, damping: 10, mass: 0.5, delay: 500 }
          }"
          :icon="icon || 'mingcute:fire-fill'"
          class="text-lg inline"
        />
        <span class="float-right font-bold">{{ title || "Hello" }}</span>
      </div>
      <div class="px-2 h-full bg-background rounded overflow-hidden relative">
        <Icon
          v-motion
          :initial="{
            scale: 0,
            rotate: 10
          }"
          :visibleOnce="{
            scale: 1,
            rotate: 0,

            transition: { type: 'spring', stiffness: 50, damping: 10, mass: 0.5, delay: 500 }
          }"
          :icon="icon || 'mingcute:fire-fill'"
          style="font-size: 12em"
          class="opacity-15 absolute -right-8 -bottom-12"
        />
        <div class="z-10 relative">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ["title", "icon"]
  };
</script>
<style scoped></style>
