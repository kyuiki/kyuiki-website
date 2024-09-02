<template>
  <nav
    class="sticky p-2 z-20 from-background to-transparent"
    :class="top ? 'bg-gradient-to-b top-0' : 'bg-gradient-to-t bottom-0'"
  >
    <div
      v-motion
      :initial="{
        y: -100,
        opacity: 0,
        rotate: -10
      }"
      :enter="{
        y: 0,
        opacity: 1,
        rotate: 0,
        transition: { type: 'spring', stiffness: 250, damping: 8, mass: 0.5 }
      }"
      class="from-transparent max-w-5xl mx-auto rounded overflow-hidden bg-primary max-w-5xl flex bg-pattern"
    >
      <div class="w-full">
        <router-link
          v-for="(nav, i) in navs"
          :to="nav.path"
          class="px-2 inline-block py-1 text-background duration-300 h-full hover:border-secondary hover:text-secondary border-primary border-b-4"
        >
          <Icon
            v-motion
            :initial="{
              scale: 0,
              rotate: 180
            }"
            :visible="{
              scale: 1,
              rotate: 0,

              transition: { type: 'spring', stiffness: 250, damping: 10, mass: 0.5, delay: i * 100 }
            }"
            :icon="'mingcute:' + nav.icon"
            class="text-4xl inline"
          />
        </router-link>
      </div>
      <div class="px-2 py-1 text-background relative">
        <!-- <Icon icon="mingcute:home-1-fill" class="relative text-3xl inline -top-0.5" /> -->

        <Icon
          icon="mingcute:cloud-fill"
          style="font-size: 12em"
          class="absolute -right-full -top-full text-accent"
          v-motion
          :initial="{
            rotate: -10
          }"
          :enter="{
            rotate: 10,
            transition: {
              repeat: Infinity,

              duration: 5000,
              repeatType: 'mirror'
            }
          }"
        />
        <div
          class="z-10 relative"
          v-motion
          :initial="{
            scale: 0,
            x: 200
          }"
          :enter="{
            scale: 1,
            x: 0,
            transition: {
              duration: 1000,
              type: 'keyframes',
              ease: 'easeOut'
            }
          }"
        >
          <p class="text-xl leading-6 font-bold">Kyuiki</p>
          <p class="font-bold text-xs -mt-2 text-right leading-6 whitespace-nowrap">The Fluff</p>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
  import { defineProps } from "vue";

  const { top } = defineProps(["top"]);

  const navs = [
    { name: "Home", icon: "home-2-fill", path: "/" },
    { name: "Diary", icon: "book-5-fill", path: "/diary" },
    { name: "Furry", icon: "cat-fill", path: "/furry" }
  ];
</script>
