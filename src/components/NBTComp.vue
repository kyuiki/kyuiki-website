<template>
  <div v-for="obj in Object.keys(item)" class="pl-4">
    <div v-if="typeof item[obj] != `object`" class="flex">
      <label class="mr-2 flex" :class="colors[typeof item[obj]]"
        ><Icon :icon="icons[typeof item[obj]]" class="text-xl mr-2" /> {{ obj }} :
      </label>
      <input
        v-model="item[obj]"
        placeholder="In"
        class="border-b border-secondary border-dashed w-full bg-transparent px-1 w-fit"
        size="0"
      />
    </div>
    <div v-else>
      <label class="mr-2 flex text-lime-300"><Icon icon="ph:brackets-curly" class="text-xl mr-2" />{{ obj }}</label>
      <NBTComp :item="item[obj]" />
    </div>
    <!-- <NBTComp v-for="child in item.children" :item="child" /> -->
  </div>
</template>

<script>
  export default {
    name: "NBTComp",
    data: () => ({
      icons: {
        string: "ph:text-aa",
        object: "ph:brackets-curly",
        number: "ph:number-square-eight",
        boolean: "ph:binary",
        bigint: "ph:math-operations"
      },
      colors: {
        string: "text-blue-300",
        object: "text-lime-300",
        number: "text-yellow-300",
        boolean: "text-red-300",
        bigint: "text-purple-300"
      }
    }),
    props: {
      item: {
        type: Object,
        required: true
      }
    }
  };
</script>
