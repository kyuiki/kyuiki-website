<template>
  <div class="grid md:grid-cols-2 gap-4 pt-10">
    <LayoutComp class="w-full">
      <template #default>
        <div class="rounded-b-full h-28 w-28 p-2 overflow-hidden bg-background -top-12 absolute">
          <img src="/kyuiki.png" alt="Avatar" class="h-full rounded-b-full" />
        </div>
        <div class="">
          <div class="ml-32">
            <p class="font-bold text-2xl">Heyy! Im kyuiki</p>
            <p class="text-sm opacity-75">Nice to meet ya :3</p>
          </div>
          <div class="mt-4">
            <p>Congrats on scanning this :3 This place is exclusive btw~</p>
            <div class="flex pt-2 border-t mt-2 border-white">
              <div class="bg-background rounded px-3 flex relative aspect-square text-2xl">
                <div
                  class="text-white bg-background rounded-full absolute -right-2 -bottom-1 p-1"
                  style="font-size: 18px"
                >
                  <Icon icon="mdi:cake-variant" />
                </div>
                <div class="my-auto font-bold relative">21</div>
              </div>
              <div class="ml-3">
                <p class="font-bold text-lg">Age</p>
                <p class="text-sm opacity-75">I'm a big boi now</p>
              </div>
            </div>
            <!-- <div class="flex pt-2 mt-2">
              <div class="bg-background rounded px-3 flex relative aspect-square text-md">
                <div
                  class="text-white bg-background rounded-full absolute -right-2 -bottom-1 p-1"
                  style="font-size: 18px"
                >
                  <Icon icon="mdi:calendar-month" />
                </div>
                <div class="my-auto font-bold relative">2017</div>
              </div>
              <div class="ml-3">
                <p class="font-bold text-lg">Started</p>
                <p class="text-sm opacity-75">Started my journey</p>
              </div>
            </div> -->
          </div>
        </div>
      </template>
    </LayoutComp>
    <LayoutComp class="w-full">
      <template #default>
        <div class="flex gap-2">
          <div class="p-1">
            <Icon icon="mingcute:external-link-fill" class="text-white" style="font-size: 2.5em" />
          </div>
          <div class="w-full">
            <p class="font-bold text-lg">Links and more...</p>
            <p class="text-sm opacity-75">Incase if you wanna know about me xD</p>
          </div>
        </div>
        <div class="mt-4 flex flex-wrap gap-1">
          <a :href="link.link" v-for="(link, i) in links" :key="i" target="_blank">
            <div class="bg-background rounded-full p-2 inline-flex gap-2 font-bold">
              <Icon :icon="link.icon" class="text-white" style="font-size: 1.5em" />
              <span v-if="link.text" class="mr-2">{{ link.text }}</span>
            </div>
          </a>
        </div>
      </template>
    </LayoutComp>
    <EventCalendarComp />
  </div>
</template>

<script setup>
  import { ref, onMounted, watch, computed } from "vue";
  import LayoutComp from "./LayoutComp.vue";
  import EventCalendarComp from "./EventCalendarComp.vue";

  const links = ref([
    {
      icon: "simple-icons:instagram",
      link: "https://instagram.com/kyuikii",
      text: "@kyuikii"
    },
    {
      icon: "simple-icons:telegram",
      link: "https://t.me/kyuiki",
      text: "kyuiki"
    },
    {
      icon: "simple-icons:twitter",
      link: "https://twitter.com/kyuikii",
      text: "@kyuikii"
    },
    {
      icon: "simple-icons:github",
      link: "https://github.com/kyuiki",
      text: "@kyuiki"
    },
    {
      icon: "simple-icons:discord",
      link: "https://discord.com/user/1063846642803023873",
      text: "kyuiki"
    },
    {
      icon: "simple-icons:youtube",
      link: "https://youtube.com/@kyuiki",
      text: "kyuiki"
    },
    {
      icon: "simple-icons:paypal",
      link: "https://paypal.me/kyuiki",
      text: "kyuiki"
    },
    {
      icon: "simple-icons:bluesky",
      link: "https://bsky.app/profile/furry.kyuiki.com",
      text: "furry.kyuiki.com"
    },
    {
      icon: "mingcute:mail-fill",
      link: "mailto:im@kyuiki.com",
      text: "im@kyuiki.com"
    },
    {
      icon: "simple-icons:kofi",
      link: "https://ko-fi.com/kyuiki",
      text: "kyuiki"
    }
  ]);
</script>
