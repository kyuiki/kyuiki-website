<template>
  <div class="max-w-5xl mx-auto">
    <div class="pt-4">
      <h1 class="text-2xl font-bold">Kyuiki NBT Editor</h1>
      <input class="bg-transparent mt-2" type="file" ref="file" @change="readFile(file.files[0])" />
    </div>

    <pre class="text-sm">
      <NBTComp :item="nbt" />
    </pre>
  </div>
</template>
<script setup>
  import { read, write } from "nbtify";
  import { ref, onMounted } from "vue";
  import NBTComp from "@/components/NBTComp.vue";

  const nbt = ref({
    awesome: {
      sauce: 1,
      cool: 2,
      oops: {
        a: 1,
        b: 2
      }
    }
  });
  const file = ref(null);

  const readFile = async (file) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const buffer = e.target.result;
      const data = await read(buffer);
      nbt.value = data;
      console.log(data);
    };
    reader.readAsArrayBuffer(file);
  };
</script>
