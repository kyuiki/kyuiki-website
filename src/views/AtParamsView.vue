<template>
  <div style="perspective: 1500px" class="p-2 mx-auto max-w-5xl relative z-10 min-h-screen flex items-center">
    <div
      class="bg-secondary mt-10 bg-pattern max-w-lg rounded-md mx-auto overflow-hidden relative min-h-64"
      v-motion
      :initial="{
        rotateY: 30,
        rotateX: 80
      }"
      :enter="{
        rotateY: 0,
        rotateX: 0,
        transition: { type: 'spring', stiffness: 175, damping: 5, mass: 1 }
      }"
    >
      <img
        src="https://media.discordapp.net/attachments/1089038855409246290/1240142863015350393/Kyuiki-Card-Char.png?ex=66457c8b&is=66442b0b&hm=1d19c1029f217c844d405ce57f1aac343dbb97eb93e998faaf9da2d0222f6886&=&format=webp&quality=lossless"
        alt=""
        class="h-full w-auto object-cover absolute bottom-0 left-0"
        v-motion
        :initial="{
          opacity: 0,
          x: -100
        }"
        :enter="{
          opacity: 1,
          x: 0,
          transition: {
            duration: 750,
            delay: 250,
            type: 'keyframes',
            ease: 'easeOut'
          }
        }"
      />
      <div class="p-4 pl-40 h-full relative z-10">
        <div class="text-right mr-2">
          <p class="font-bold"><span class="text-3xl md:text-5xl">Kyuiki's Card</span></p>
          <div
            v-if="!passwordChecker"
            v-motion
            :initial="{
              opacity: 0,
              x: 100
            }"
            :enter="{
              opacity: 1,
              x: 0,
              transition: {
                duration: 1000,
                delay: 300,
                type: 'keyframes',
                ease: 'easeOut'
              }
            }"
          >
            <p class="mt-2">Thank you for checking out x3 But seems like you are not from the QR!</p>
            <p class="mt-2">Mind to type the card version for me?</p>
            <div class="mt-6">
              <input
                v-model="password"
                type="text"
                class="w-full p-2 bg-background rounded font-mono border border-primary"
                placeholder="Card Version?"
              />
              <p class="italic text-sm opacity-75 mt-1">It's at the bottom corner of the card ^^</p>
            </div>
          </div>
          <div
            v-else
            v-motion
            :initial="{
              opacity: 0,
              x: 100
            }"
            :enter="{
              opacity: 1,
              x: 0,
              transition: {
                duration: 500,
                delay: 0,
                type: 'keyframes',
                ease: 'easeOut'
              }
            }"
          >
            <p class="mt-2">Thank you for scanning the QR in the card!</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useRoute } from "vue-router";
  import { ref, onMounted, computed } from "vue";
  import md5 from "@/utils/md5.js";

  const route = useRoute();
  console.log(route.query);
  const password = ref(route.query.v);
  const passwordChecker = computed(() => {
    if (md5(password.value || "") == "5a7d02f0f0185674af2b224444278d4e") return true;
    return false;
    // return /^[0-9]{2}v[0-9]{2}[a-f]$/gi.test(password.value);
    // No Comment
  });
</script>

<style>
  @media (min-width: 1024px) {
    .about {
      min-height: 100vh;
      display: flex;
      align-items: center;
    }
  }
</style>
