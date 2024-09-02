<template>
  <Teleport v-if="authStore.isOpen" to="body">
    <div
      class="text-white z-20 fixed top-0 left-0 w-full h-screen flex justify-center items-center bg-background bg-opacity-25 backdrop-blur-sm"
    >
      <div class="bg-background p-4 rounded border border-secondary max-w-sm w-full">
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-bold">Authentication</h1>
        </div>
        <div class="pt-4">
          <p class="mb-4 text-sm">
            If you are concerned.
            <RouterLink to="/privacy" class="underline text-accent text-sm"> Here what we collect. </RouterLink>
          </p>
          <button class="w-full bg-accent text-white rounded flex px-2">
            <Icon icon="mingcute:discord-fill" class="text-4xl" />
            <span class="ml-2 py-1 w-full">Sign in with Discord</span>
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
  import { useAuthStore } from "@/stores/authentication";

  const authStore = useAuthStore();
</script>
