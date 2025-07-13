<template>
  <div class="grid griddying gap-4 p-2">
    <div class="col-span-2 row-span-2 bg-emerald-300">
      <div>
        <Icon key="icon" icon="mdi:account" class="text-4xl" />
      </div>
      <div>
        <p class="font-bold">Rizky Maulana</p>
        <p>Full-Stack Javascript Developer</p>
      </div>
    </div>
    <div class="bg-emerald-300">
      <div>
        <Icon key="icon" icon="mdi:account" class="text-4xl" />
      </div>
      <div>
        <p class="font-bold">Rizky Maulana</p>
        <p>Full-Stack Javascript Developer</p>
      </div>
    </div>
    <div class="bg-emerald-300">
      <div>
        <Icon key="icon" icon="mdi:account" class="text-4xl" />
      </div>
      <div>
        <p class="font-bold">Rizky Maulana</p>
        <p>Full-Stack Javascript Developer</p>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .griddying {
    display: grid;
    grid-template-columns: repeat(3, minmax(128px, 320px));
    grid-auto-rows: minmax(64px, auto);
    justify-content: center;
  }

  @media (max-width: 768px) {
    .griddying {
      grid-template-columns: repeat(2, minmax(128px, 320px));
    }
  }
</style>
<script setup>
  import { ref, onMounted, watch, computed } from "vue";
</script>
