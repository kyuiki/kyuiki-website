<template>
  <div class="min-h-screen bg-gray-50 p-4">
    <div class="max-w-4xl mx-auto">
      <div class="bg-white rounded-lg shadow-lg p-6">
        <div class="flex items-center justify-between mb-6">
          <h1 class="text-2xl font-bold text-gray-800">WiZ Light Control</h1>
          <button
            @click="addLight"
            class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            Add Light
          </button>
        </div>

        <div v-if="lights.length === 0" class="text-center py-12">
          <p class="text-gray-500 text-lg">No lights configured</p>
          <p class="text-gray-400 text-sm">Click "Add Light" to get started</p>
        </div>

        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="(light, index) in lights"
            :key="light.id"
            class="bg-gray-50 rounded-lg p-4 border border-gray-200"
          >
            <div class="flex items-center justify-between mb-4">
              <h3 class="font-semibold text-gray-700">Light {{ index + 1 }}</h3>
              <button @click="removeLight(index)" class="text-red-500 hover:text-red-700 transition-colors"></button>
            </div>

            <form @submit.prevent="sendCommand(light, index)" class="space-y-3">
              <!-- IP and Port -->
              <div class="grid grid-cols-2 gap-2">
                <div>
                  <label class="block text-xs font-medium text-gray-600 mb-1">IP Address</label>
                  <input
                    v-model="light.ip"
                    type="text"
                    placeholder="192.168.1.100"
                    class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label class="block text-xs font-medium text-gray-600 mb-1">Port</label>
                  <input
                    v-model="light.port"
                    type="number"
                    placeholder="38899"
                    class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <!-- Mode Toggle -->
              <div class="flex bg-gray-200 rounded-lg p-1">
                <button
                  type="button"
                  @click="light.mode = 'color'"
                  :class="[
                    'flex-1 py-2 px-3 text-xs font-medium rounded-md transition-colors',
                    light.mode === 'color' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  ]"
                >
                  Color
                </button>
                <button
                  type="button"
                  @click="light.mode = 'temperature'"
                  :class="[
                    'flex-1 py-2 px-3 text-xs font-medium rounded-md transition-colors',
                    light.mode === 'temperature'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  ]"
                >
                  Temperature
                </button>
              </div>

              <!-- Color Mode -->
              <div v-if="light.mode === 'color'" class="space-y-2">
                <label class="block text-xs font-medium text-gray-600">Color</label>
                <div class="flex items-center gap-2">
                  <input
                    v-model="light.color"
                    type="color"
                    class="w-12 h-8 border border-gray-300 rounded cursor-pointer"
                  />
                  <input
                    v-model="light.color"
                    type="text"
                    class="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <!-- Temperature Mode -->
              <div v-if="light.mode === 'temperature'" class="space-y-2">
                <label class="block text-xs font-medium text-gray-600"> Temperature: {{ light.temperature }}K </label>
                <input
                  v-model="light.temperature"
                  type="range"
                  min="2500"
                  max="6500"
                  step="100"
                  class="w-full h-2 bg-gradient-to-r from-orange-400 via-yellow-300 to-blue-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div class="flex justify-between text-xs text-gray-500">
                  <span>2500K (Warm)</span>
                  <span>6500K (Cool)</span>
                </div>
              </div>

              <hr class="border-gray-300" />

              <!-- Send Button -->
              <button
                type="submit"
                :disabled="light.loading"
                :class="[
                  'w-full py-2 px-4 text-sm font-medium rounded-md transition-colors',
                  light.loading
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-green-500 hover:bg-green-600 text-white'
                ]"
              >
                <div v-if="light.loading" class="flex items-center justify-center gap-2">
                  <div class="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                  Sending...
                </div>
                <div v-else class="flex items-center justify-center gap-2">
                  Set {{ light.mode === "color" ? "Color" : "Temperature" }}
                </div>
              </button>

              <!-- Status Message -->
              <div
                v-if="light.status"
                :class="[
                  'text-xs text-center py-2 px-3 rounded-md',
                  light.status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                ]"
              >
                {{ light.status.message }}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from "vue";

  const lights = ref([]);

  const addLight = () => {
    lights.value.push({
      id: Date.now(),
      ip: "",
      port: 38899,
      mode: "color",
      color: "#ffffff",
      temperature: 4000,
      loading: false,
      status: null
    });
  };

  const removeLight = (index) => {
    lights.value.splice(index, 1);
  };

  const sendCommand = async (light, index) => {
    light.loading = true;
    light.status = null;

    try {
      const endpoint =
        light.mode === "color"
          ? `http://localhost:3001/${light.ip}/${light.port}/color`
          : `http://localhost:3001/${light.ip}/${light.port}/temperature`;

      const payload = light.mode === "color" ? { color: light.color } : { temperature: parseInt(light.temperature) };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        light.status = {
          type: "success",
          message: `${light.mode === "color" ? "Color" : "Temperature"} set successfully!`
        };
      } else {
        throw new Error(`HTTP ${response.status}`);
      }
    } catch (error) {
      light.status = {
        type: "error",
        message: `Failed to set ${light.mode}: ${error.message}`
      };
    } finally {
      light.loading = false;

      // Clear status after 3 seconds
      setTimeout(() => {
        light.status = null;
      }, 3000);
    }
  };

  // Add initial light
  addLight();
</script>

<style scoped>
  .slider::-webkit-slider-thumb {
    appearance: none;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: #ffffff;
    border: 2px solid #d1d5db;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .slider::-moz-range-thumb {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: #ffffff;
    border: 2px solid #d1d5db;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
</style>
