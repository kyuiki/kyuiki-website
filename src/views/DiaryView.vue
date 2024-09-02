<template>
  <div class="p-2 mx-auto max-w-5xl relative z-10">
    <!-- <Separator></Separator> -->

    <div class="mt-4 mb-8">
      <p class="text-5xl max-md:text-center font-bold">Lorem Ipsum</p>
    </div>
    <div class="sticky top-16 z-10 rounded bg-secondary px-2 py-2 flex">
      <input type="text" class="bg-background px-2 py-1 rounded" placeholder="s" value="Testing A" />
      <button class="ml-2 bg-primary text-background font-bold px-4 py-1 rounded">Add</button>
    </div>

    <div class="mt-8 grid md:grid-cols-2 gap-4">
      <template v-for="post in posts">
        <router-link
          to="/p/A"
          v-if="post.image === undefined"
          class="bg-background rounded border border-secondary px-4 py-2"
        >
          <div class="flex gap-2 border-b border-secondary border-opacity-50 pb-2">
            <div class="p-1">
              <Icon icon="mingcute:fire-fill" class="text-white" style="font-size: 2.5em" />
            </div>
            <div class="w-full">
              <p class="font-bold text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit Aliquid.</p>
              <p class="text-sm">
                <span class="text-accent font-bold mr-2">@Kyuiki</span>
                <span class="opacity-50"> 12:59, Jun 25 2024 </span>
              </p>
            </div>
            <div class="">
              <button class="pt-1 rounded">
                <Icon icon="mingcute:external-link-fill" class="text-white" style="font-size: 1.5em" />
              </button>
            </div>
          </div>
          <div class="py-2">
            <p class="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, quos.</p>
          </div>
        </router-link>
        <!-- image -->
        <div v-else class="bg-background rounded border border-secondary px-4 py-2 row-span-3 max-sm:row-span-1">
          <div class="py-2">
            <img
              src="/kyuiki_anime.png"
              alt=""
              class="max-w-full aspect-square max-h-full bg-secondary object-cover bg-pattern"
            />
          </div>
          <div class="flex gap-2 border-t border-secondary border-opacity-50 py-2">
            <div class="p-1">
              <Icon icon="mingcute:fire-fill" class="text-white" style="font-size: 2.5em" />
            </div>
            <div class="w-full">
              <p class="font-bold text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit Aliquid.</p>
              <p class="text-sm">
                <span class="text-accent font-bold mr-2">@Kyuiki</span>
                <span class="opacity-50"> 12:59, Jun 25 2024 </span>
              </p>
            </div>
            <div class="">
              <button class="pt-1 rounded">
                <Icon icon="mingcute:external-link-fill" class="text-white" style="font-size: 1.5em" />
              </button>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  const posts = ref([
    {
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit Aliquid.",
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, quos.",
      image: "/kyuiki_anime.png"
    },
    {
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit Aliquid.",
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, quos."
    },
    {
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit Aliquid.",
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, quos."
    },
    {
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit Aliquid.",
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, quos."
    }
  ]);
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
