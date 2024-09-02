<template>
  <div>
    <AComp :a="contentParsed" />
  </div>
</template>

<script setup>
  import { defineProps, computed } from "vue";
  import markdownIt from "markdown-it";
  import { Redaction, Spoiler } from "@/utils/markdownPlugin.js";
  import AComp from "./AComp.vue";

  const markdown = markdownIt();

  markdown.use(Redaction);
  markdown.use(Spoiler);
  markdown.renderer.rules.image = function (tokens, idx, options, env, self) {
    const token = tokens[idx];
    const srcIndex = token.attrIndex("src");
    const src = token.attrs[srcIndex][1];

    // if youtube video then embed
    if (/youtube.com|youtu.be/.test(src)) {
      const videoId = src.match(/(?:youtu\.be\/|v=)([^?&]+)/)[1];
      console.log(videoId);
      return `
      <embed-video src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen/>
      `;
    }

    return `<img src="${src}" />`;
  };

  const props = defineProps({
    content: String
  });

  const contentParsed = computed(() => {
    return markdown.render(props.content, {});
  });
</script>
