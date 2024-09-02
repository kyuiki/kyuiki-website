<template>
  <div class="p-2 mx-auto max-w-5xl">
    <div class="border border-secondary">
      <div class="p-4 bg-background">
        <div class="float-right text-right">
          <p class="">{{ post.createdAt }}</p>
          <p class="text-sm font-bold text-primary">
            <Icon icon="mingcute:pencil-fill" class="inline mr-1 text-lg" />
            <span>
              {{ post.updatedAt }}
            </span>
          </p>
        </div>
        <h1 class="text-2xl font-bold">{{ post.title }}</h1>
        <p class="mt-1">By <span class="text-accent font-bold">@ACriminal</span></p>
      </div>
      <div class="p-4 bg-background border-t-2 border-dashed border-secondary">
        <MarkdownComponent :key="post.content" :content="post.content" />
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useRoute } from "vue-router";
  import { ref } from "vue";
  import dayjs from "dayjs";
  import MarkdownComponent from "../components/MarkdownComponent.vue";

  const route = useRoute();

  const handle = route.params.handle;
  const post = ref({
    title: "[Mama] Imma criminal...",
    content: ``,
    createdAt: dayjs("2021-09-01").format("MMMM DD, YYYY"),
    updatedAt: dayjs("2024-12-23").format("MMM DD, YYYY")
  });

  fetch(`https://vanilla.kyuiki.com/readme.md`)
    .then((res) => res.text())
    .then((data) => {
      post.value.content = data;
    });
</script>
