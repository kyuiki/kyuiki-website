<template>
  <div class="py-24 pt-16 px-2 mx-auto max-w-5xl">
    <HeroComp />

    <div class="py-8 text-center rounded">
      <h2 class="text-3xl font-bold text-center">About Me</h2>
      <Separator />
    </div>
    <div class="grid md:grid-cols-2 md:gap-4 w-full gap-12">
      <WindowContainer title="Overall" class="md:row-span-2" icon="mingcute:code-fill">
        <div class="">
          <div class="my-2 mt-4 text-md">
            <h3 class="text-xl mb-2 font-bold max-md:text-center">Overall About Me</h3>
            <p>
              When I was 14 years old, I'm interested with Computer Software. So, I created some silly app with Batch
              and VBscript in windows 7 before stepping into Web Development. At that time, I don't have a powerful
              laptop to start a proper development.
            </p>
            <p class="mt-2">
              I started to learn basic HTML and CSS, and sometimes I'm tinkering with existing website to know how it
              works. At this state I start stepping on NodeJS and creating my first Discord Bot with it, slowly
              exploring Backend Development with Express and then Vue Frameworks as my daily basis until now.
            </p>
          </div>
        </div>
      </WindowContainer>
      <WindowContainer title="Resume" icon="mingcute:document-2-fill">
        <div class="text-center my-2 mb-4">
          <div class="my-2 mt-4 text-md text-left">
            <h3 class="text-xl mb-2 font-bold max-md:text-center">Resume</h3>
            <p>Are you interested with my works? I'm gladly to take the opportunity to work with your Company :D</p>
          </div>
          <button class="px-4 py-2 mt-2 bg-primary font-semibold rounded text-background">
            <Icon icon="mingcute:download-2-fill" class="text-xl inline mr-1" />
            <span> Download</span>
          </button>
        </div>
      </WindowContainer>
      <WindowContainer title="Fursona" icon="mingcute:paw-fill">
        <div class="text-center my-2 mb-4">
          <div class="my-2 mt-4 text-md text-left">
            Are you looking in depth about my furry life? I write and post all of my stuff there x3
          </div>

          <button class="px-4 py-2 mt-2 bg-primary font-semibold rounded text-background">
            <Icon icon="mingcute:sparkles-2-fill" class="text-xl inline mr-1" />
            <span>Know More!</span>
          </button>
        </div>
      </WindowContainer>
      <WindowContainer title="Technologies & Softwares" icon="mingcute:server-fill" class="md:col-span-2 min-w-0">
        <div class="my-2 mb-4 text-center">
          <div class="flex gap-4 max-md:flex-col w-full items-center">
            <div class="my-2 mt-4 text-md md:text-right w-full">
              <h3 class="text-xl mb-2 font-bold max-md:text-center">Technologies Used</h3>
              <p>I have been using some of these technologies for years, especially Front-end part</p>
            </div>
            <div class="my-2 text-md text-left md:w-1/2 w-full">
              <!--  -->
              <Vue3Marquee class="rounded overflow-hidden" :duration="25">
                <template v-for="(logo, text) in prog.tech">
                  <div
                    class="overflow-hidden mx-2 rounded-md bg-secondary px-4 py-2 hover:scale-110 hover:bg-primary hover:text-background duration-300"
                  >
                    <Icon :icon="'devicon:' + logo" class="text-xl inline mr-2" />
                    <b>{{ text }}</b>
                  </div>
                </template>
              </Vue3Marquee>
            </div>
          </div>
          <Separator icon="mingcute:close-fill" />
          <div class="flex gap-4 max-md:flex-col w-full flex-row-reverse items-center">
            <div class="my-2 mt-4 text-md md:text-left w-full">
              <h3 class="text-xl mb-2 font-bold max-md:text-center">Tools Used</h3>
              <p>This is what I mostly use to create, develop, and maintain my projects</p>
            </div>
            <div class="my-2 text-md text-left md:w-1/2 w-full">
              <!--  -->
              <Vue3Marquee class="rounded overflow-hidden" :duration="25">
                <template v-for="(logo, text) in prog.tool">
                  <div
                    class="overflow-hidden mx-2 rounded-md bg-secondary px-4 py-2 hover:scale-110 hover:bg-primary hover:text-background duration-300"
                  >
                    <Icon :icon="'devicon:' + logo" class="text-xl inline mr-2" />
                    <b>{{ text }}</b>
                  </div>
                </template>
              </Vue3Marquee>
            </div>
          </div>
          <Separator icon="mingcute:celebrate-fill" />
          <div class="mt-8 relative">
            <div class="text-center">
              <h3 class="text-3xl mb-2 font-bold max-md:text-center">Programming Languages Used</h3>
              <p>This is the language I've mostly to rarely use. The less visible it is, the less used</p>
            </div>
            <div class="flex flex-wrap gap-4 my-8 justify-center">
              <template v-for="(icon, text, i) in prog.lang">
                <div class="border-secondary border-2 px-3 py-2 rounded" :style="{ opacity: 4 / (i + 1) }">
                  <Icon :icon="'devicon:' + icon" style="font-size: 4em" class="inline mb-2" />
                  <p>
                    {{ text }}
                  </p>
                </div>
              </template>
            </div>
          </div>
        </div>
      </WindowContainer>
    </div>
    <div class="mt-24 mb-16">
      <h2 class="text-3xl font-bold text-center">Projects</h2>
      <Separator />
    </div>
    <WindowContainer title="Unfinished" class="mx-auto max-w-sm" icon="mingcute:code-fill">
      <div class="p-2">
        <h3 class="text-lg text-center">Coming Soon :D</h3>
      </div>
    </WindowContainer>
  </div>
</template>

<script setup>
  import WindowContainer from "../components/WindowContainer.vue";
  import { Vue3Marquee } from "vue3-marquee";
  import HeroComp from "../components/HeroComp.vue";

  const prog = {
    tech: {
      ExpressJS: "express",
      MongoDB: "mongodb",
      "Socket.IO": "socketio",
      Axios: "",
      "Discord.js": "discordjs",
      Argon2: "",
      MySQL: "mysql",
      Vue: "vuejs",
      Nuxt: "nuxtjs",
      Sass: "sass",
      Tailwind: "tailwindcss",
      Bootstrap: "bootstrap",
      JQuery: "jquery",
      CSS: "css3",
      HTML: "html5",
      React: "react",
      "Three.js": "threejs",
      Vite: "vitejs"
    },
    tool: {
      "Visual Studio Code": "vscode",
      Git: "git",
      Vercel: "vercel",
      Cloudflare: "cloudflare",
      Github: "github",
      Gitlab: "gitlab",
      Figma: "figma",
      Docker: "docker",
      NPM: "npm",
      Yarn: "yarn",
      "S3 Bucket": "",
      "Cloudflare R2": "cloudflareworkers",
      Linux: "linux",
      Prettier: "",
      ESLint: "eslint"
    },
    lang: {
      Javascript: "javascript",
      Typescript: "typescript",
      Python: "python",
      Java: "java",
      Kotlin: "kotlin",
      "C++": "cplusplus",
      "C#": "csharp"
    }
  };
</script>
