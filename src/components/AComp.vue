<style scoped>
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    @apply font-bold my-2;
  }
  h1 {
    @apply text-4xl;
  }
  h2 {
    @apply text-3xl;
  }
  h3 {
    @apply text-2xl;
  }
  h4 {
    @apply text-xl;
  }
  h5 {
    @apply text-lg;
  }
  p {
    @apply leading-6 my-4;
  }
  ul {
    @apply list-disc;
  }
  hr {
    @apply my-4 border-t-2 border-secondary border-dashed;
  }
  blockquote {
    @apply border-l-2 border-secondary pl-4 pt-2 my-2 italic;
  }
  table {
    @apply w-full my-4 border border-secondary;
  }
  table th {
    @apply bg-secondary text-white font-bold p-1;
  }
  table td {
    @apply border border-secondary p-1;
  }
  img {
    @apply max-w-lg;
  }
  ul {
    @apply list-disc pl-4;
  }
  ol {
    @apply list-decimal pl-4;
  }
</style>

<script>
  import { h } from "vue";
  import { RouterLink } from "vue-router";
  import EmbedVideoComp from "./Markdown/EmbedVideoComp.vue";
  import SpoilerComp from "./Markdown/SpoilerComp.vue";
  import RedactionComp from "./Markdown/RedactionComp.vue";

  export default {
    props: {
      a: {
        type: String,
        required: true
      }
    },
    setup(props) {
      const a = props.a;

      const parser = new DOMParser();
      const doc = parser.parseFromString(a, "text/html");

      function recursiveParse(node) {
        if (node.nodeType === 3) {
          return node.textContent;
        }
        if (node.nodeType === 1) {
          const children = Array.from(node.childNodes);
          const childrenNodes = children.map((child) => recursiveParse(child));
          return VElement(node, childrenNodes);
        }
      }

      function VElement(node, childrenNodes) {
        const tag = node.tagName.toLowerCase();
        const s = {
          a() {
            const href = new URL(node.href);
            if (href.origin === window.location.origin) {
              return h(RouterLink, { to: href.pathname }, childrenNodes);
            }
            return h(tag, { href: node.href }, childrenNodes);
          },
          "embed-video"() {
            return h(EmbedVideoComp, { src: node.attributes.src.value });
          },
          redaction() {
            return h(RedactionComp, {}, childrenNodes);
          },
          spoiler() {
            return h(SpoilerComp, {}, childrenNodes);
          },
          body() {
            return h("main", {}, childrenNodes);
          }
        };

        return s[tag]
          ? s[tag]()
          : h(
              tag,
              {
                ...props[tag],
                className: node.className ? node.className : null,
                src: node.src
              },
              childrenNodes
            );
      }

      return () => recursiveParse(doc.body);
    }
  };
</script>
