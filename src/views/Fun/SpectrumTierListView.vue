<template>
  <div class="p-2 py-4 max-w-3xl mx-auto">
    <div ref="canvas" class="artistic-canvas aspect-square relative border-2 border-secondary rounded">
      <div class="absolute w-0 h-full border-l border-secondary top-0 left-1/2">
        <div class="absolute font-bold text-center -translate-x-1/2 h-full py-2">
          <input class="w-auto text-center bg-transparent" value="Good" />
          <input
            class="w-auto absolute text-center left-1/2 bottom-0 mb-2 bg-transparent -translate-x-1/2"
            value="Evil"
          />
        </div>
      </div>
      <div class="absolute w-full h-0 border-t border-secondary left-0 top-1/2">
        <div class="absolute font-bold -translate-y-1/2 w-full px-2">
          <input class="w-auto bg-transparent" value="Good" />
          <input class="w-auto text-right bg-transparent float-right" value="Evil" />
        </div>
      </div>

      <div
        v-for="img in images"
        :style="{ top: img.y + 'px', left: img.x + 'px' }"
        class="absolute w-20 h-20 bg-secondary border-2 rounded-md border-secondary bg-opacity-25 cursor-grab active:border-primary active:cursor-grabbing"
        @mousedown="() => (img.dragging = true)"
        @mousemove="dragImage($event, img)"
        @mouseup="() => (img.dragging = false)"
        :key="img.url"
        @mouseleave="() => (img.dragging = false)"
        @dblclick="() => images.splice(images.indexOf(img), 1)"
      >
        <img :src="img.url" alt="" class="w-full rounded h-full object-cover pointer-events-none" />
      </div>
    </div>
    <div class="flex gap-2 mt-4">
      <div class="">
        <input
          type="file"
          ref="inputImage"
          name=""
          id=""
          @change="(e) => (image = e.target.files[0])"
          class="inputfile bg-transparent px-2 py-1 border border-primary rounded"
          accept="image/*"
        />
        <span class="mx-2 font-extrabold text-xl">OR</span>
        <input
          type="text"
          placeholder="URL Gambar"
          v-model="image"
          class="bg-transparent px-2 py-1 border border-primary rounded"
        />
      </div>
      <button class="bg-secondary p-1 px-2 rounded" @click="addImage">Add!</button>
    </div>
  </div>
</template>

<style scoped>
  .inputfile::-webkit-file-upload-button,
  .inputfile::file-selector-button {
    display: none;
  }
</style>

<script setup>
  import { ref, onMounted } from "vue";

  const image = ref(null);
  const images = ref([]);
  const inputImage = ref(null);
  const canvas = ref(null);

  const dragImage = (e, img) => {
    const canvass = canvas.value;

    const rect = canvass.getBoundingClientRect();
    const canvasLocation = {
      x: rect.left,
      y: rect.top
    };

    if (img.dragging) {
      console.log(e, img.ref);
      // img.x = e.clientX - (80 - e.layerX);
      // img.y = e.clientY - (80 - e.layerY);
      img.x = e.clientX - canvasLocation.x - img.temp.x;
      img.y = e.clientY - canvasLocation.y - img.temp.y;
    } else {
      img.temp.x = e.layerX;
      img.temp.y = e.layerY;
    }
  };

  const addImage = () => {
    const img = image.value;
    // if file
    if (img instanceof File) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = e.target.result;
        images.value.push({ url: img, dragging: false, x: 0, y: 0, temp: { x: 0, y: 0 } });
      };
      reader.readAsDataURL(img);
    } else {
      images.value.push({ url: img, dragging: false, x: 0, y: 0, temp: { x: 0, y: 0 } });
    }

    image.value = null;
    inputImage.value.value = null;
  };
</script>
