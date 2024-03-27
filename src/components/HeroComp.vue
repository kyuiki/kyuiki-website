<template>
  <div title="Heyya!" class="mx-auto py-24 max-w-3xl" icon="mingcute:heart-fill">
    <div class="flex max-[412px]:flex-col gap-4 max-[412px]:items-center">
      <div class="flex-shrink-0 mt-2">
        <img
          src="/kyuiki_c.jpg"
          v-motion
          :initial="{
            rotate: -10,
            scale: 0,
            opacity: 0
          }"
          :enter="{
            rotate: 0,
            scale: 1,
            opacity: 1,
            transition: {
              duration: 750,
              delay: 200,
              type: 'keyframes',
              ease: 'easeOut'
            }
          }"
          alt=""
          class="rounded-lg w-32 h-32 object-cover"
        />
      </div>
      <div class="py-2">
        <h1
          class="md:text-2xl text-xl"
          v-motion
          :initial="{
            opacity: 0,
            x: 100
          }"
          :enter="{
            opacity: 1,
            x: 0,
            transition: {
              duration: 750,
              delay: 400,
              type: 'keyframes',
              ease: 'easeInOut'
            }
          }"
        >
          <b class="md:text-5xl text-3xl bg-secondary bg-opacity-25 rounded px-1 pb-1">[ Kyuiki ]</b>
          <small class="opacity-50 italic ml-2">/ Rizky Maulana</small>
        </h1>
        <p class="my-2 mt-4 md:text-lg text-md">
          <VueTyper
            class="text-text texty-textu"
            text="A Cute Fluffy Yellow Doggo :3! Full-Stack Javascript Developer. I love to develop fun stuff, doing animations, and drawing."
            initial-action="typing"
            :pre-type-delay="500"
            :repeat="0"
            :type-delay="7"
            caret-animation="blink"
          >
          </VueTyper>
        </p>
      </div>
    </div>
    <div class="flex flex-wrap mt-4 gap-2 justify-center">
      <template v-for="(soc, i) in social">
        <a
          :href="soc.url"
          target="_blank"
          class="px-2 py-1 inline-block border border-secondary bg-secondary bg-opacity-50 rounded hover:bg-opacity-100 duration-200"
          v-motion
          :initial="{
            opacity: 0,
            y: 100,
            rotate: 12
          }"
          :enter="{
            opacity: 1,
            y: 0,
            rotate: 0,
            transition: {
              duration: 750,
              delay: 800 + i * 100,
              type: 'keyframes',
              ease: 'easeInOut'
            }
          }"
        >
          <Icon :icon="'logos:' + soc.icon" class="text-xl inline mr-2" />
          <span>{{ soc.name }}</span>
        </a>
      </template>
    </div>
  </div>
</template>

<script setup>
  import VueTyper from "vue3-typer";
  import "vue3-typer/dist/vue-typer.css";

  const social = [
    { url: "https://www.linkedin.com/in/rizky-m-354153229/", icon: "linkedin-icon", name: "LinkedIn" },
    { url: "https://github.com/kyuiki", icon: "github-icon", name: "GitHub" },
    { url: "https://instagram.com/kyuiki.m", icon: "instagram-icon", name: "Instagram" },
    // { url: "https://instagram.com/kyuiki.m", icon: "facebook", name: "Instagram" },
    { url: "https://youtube.com/@kyuiki", icon: "youtube-icon", name: "YouTube" },
    { url: "https://twitter.com/@kyuikiwork", icon: "twitter", name: "Twitter" }
  ];
</script>

<style>
  .vue-typer .char.typed {
    all: unset;
    animation: in-typing 0.72s;
    position: relative;
    display: inline;
    white-space: pre-wrap;
  }
  @keyframes in-typing {
    0% {
      opacity: 0;
      transform: translateY(-10px);
      top: -10px;
    }
    100% {
      top: 0px;
    }
  }
</style>
