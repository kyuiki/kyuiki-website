<template>
  <section class="relative">
    <div class="bg-secondary bg-opacity-50 rounded w-full h-full absolute top-0 left-0 -rotate-2"></div>
    <div class="rounded border relative border-secondary bg-secondary h-full flex gap-1">
      <div class="h-full w-full bg-background rounded overflow-hidden relative aspect-video">
        <Icon :icon="'mingcute:fire-fill'" style="font-size: 12em" class="opacity-15 absolute -right-8 -bottom-12" />
        <div class="relative">
          <img src="/kyuiki.png" alt="image" class="h-full w-full" />
        </div>
      </div>
      <div class="px-2 w-full bg-background rounded overflow-hidden">
        <div class="p-2">Hell</div>
      </div>
    </div>
  </section>
</template>
