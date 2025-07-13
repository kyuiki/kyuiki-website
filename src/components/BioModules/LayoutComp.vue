<template>
  <div
    class="bg-secondary bg-pattern rounded-md mx-auto p-2 relative"
    v-motion
    :initial="{
      opacity: 0,
      x: 10
    }"
    :enter="{
      opacity: 1,
      x: 0,
      transition: { type: 'spring', stiffness: 15, damping: 5, mass: 1 }
    }"
  >
    <slot></slot>
  </div>
</template>
