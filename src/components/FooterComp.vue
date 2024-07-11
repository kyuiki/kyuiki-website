<template>
  <footer class="max-w-5xl mx-auto p-2 pb-0">
    <div class="bg-secondary rounded-t p-2">
      <div class="flex max-sm:flex-col">
        <div class="w-full relative">
          <h4>
            <b class="text-xl">
              Kyuiki
              <span class="inline-block px-1 text-primary bg-background rounded text-sm">BETA</span>
            </b>
            © 2024 <span> | </span><i class="opacity-75">{{ "V 0.1" }}</i>
          </h4>
          <p class="text-sm">
            Created with
            <Icon icon="mingcute:heart-fill" class="text-lg inline" /> and support from my spouse ^w^
          </p>
        </div>
        <div class="w-full">
          <div class="text-right">
            <Icon icon="devicon:vuejs" class="text-3xl inline mr-2" />
            <Icon icon="devicon:vitejs" class="text-3xl inline mr-2" />
            <Icon icon="devicon:tailwindcss" class="text-3xl inline mr-2" />
            <Icon icon="devicon:javascript" class="text-3xl inline mr-2" />
          </div>
          <div class="text-[.65em] text-right opacity-75 italic mt-2">
            <p>Icons @ MingCute Design</p>
            <p>Background Patterns @ HeroPattern</p>
            <p>Decorative SVG Assets @ WolfDaleKen</p>
            <p>Animated using VueUse Motion</p>
          </div>
        </div>
      </div>
      <p class="text-sm opacity-50">
        <a href="http://github.com/kyuiki/kyuiki-website" target="_blank" rel="noopener noreferrer">
          Website Source Code <Icon icon="mingcute:external-link-line" class="text-lg inline mb-1" />
        </a>
      </p>
    </div>
  </footer>
</template>

<script setup>
  const checkDev = import.meta.env.VITE_ISUNFINISHED;
</script>
