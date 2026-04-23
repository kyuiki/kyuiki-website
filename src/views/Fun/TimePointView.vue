<template>
  <div class="min-h-[100dvh] bg-gray-50 p-3 sm:p-4" style="padding-bottom: env(safe-area-inset-bottom)">
    <div class="max-w-4xl mx-auto">
      <div class="bg-white rounded-lg shadow-lg p-4 sm:p-6">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5 sm:mb-6">
          <h1 class="text-xl sm:text-2xl font-bold text-gray-800">Point Location Planning</h1>
          <div class="flex gap-2">
            <button
              @click="showJson = true"
              class="flex-1 sm:flex-none bg-gray-600 active:bg-gray-800 sm:hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors text-sm sm:text-base min-h-[44px]"
            >
              View JSON
            </button>
            <button
              @click="startCreate"
              class="flex-1 sm:flex-none bg-blue-500 active:bg-blue-700 sm:hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors text-sm sm:text-base min-h-[44px]"
            >
              Create Point
            </button>
          </div>
        </div>

        <div v-if="points.length === 0" class="text-center py-12">
          <p class="text-gray-500 text-lg">No locations saved</p>
          <p class="text-gray-400 text-sm">Tap "Create Point" to add your first location</p>
        </div>

        <!-- Mobile: card list -->
        <div v-else class="sm:hidden space-y-2">
          <div
            v-for="point in points"
            :key="point.id"
            class="border border-gray-200 rounded-lg p-3"
          >
            <div class="flex items-start justify-between gap-2">
              <div class="min-w-0 flex-1">
                <p class="font-semibold text-gray-800 truncate">{{ point.name }}</p>
                <p class="font-mono text-xs text-gray-600 mt-0.5 break-all">
                  {{ point.lat.toFixed(6) }}, {{ point.lng.toFixed(6) }}
                </p>
                <p class="text-xs text-gray-500 mt-1">
                  Radius: {{ point.radius }}m · {{ formatDate(point.createdAt) }}
                </p>
              </div>
              <button
                @click="deletePoint(point.id)"
                class="text-red-500 active:text-red-800 px-2 py-1 text-sm min-h-[44px]"
              >
                Delete
              </button>
            </div>
          </div>
        </div>

        <!-- Desktop: table -->
        <div v-if="points.length !== 0" class="hidden sm:block overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-gray-200 text-left text-gray-600">
                <th class="py-2 px-2">Name</th>
                <th class="py-2 px-2">Latitude</th>
                <th class="py-2 px-2">Longitude</th>
                <th class="py-2 px-2">Radius (m)</th>
                <th class="py-2 px-2">Created</th>
                <th class="py-2 px-2"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="point in points" :key="point.id" class="border-b border-gray-100 hover:bg-gray-50">
                <td class="py-2 px-2 font-medium text-gray-800">{{ point.name }}</td>
                <td class="py-2 px-2 font-mono text-gray-700">{{ point.lat.toFixed(6) }}</td>
                <td class="py-2 px-2 font-mono text-gray-700">{{ point.lng.toFixed(6) }}</td>
                <td class="py-2 px-2 text-gray-700">{{ point.radius }}</td>
                <td class="py-2 px-2 text-gray-500">{{ formatDate(point.createdAt) }}</td>
                <td class="py-2 px-2 text-right">
                  <button
                    @click="deletePoint(point.id)"
                    class="text-red-500 hover:text-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Create modal -->
    <div
      v-if="showCreate"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-end sm:items-center justify-center sm:p-4 z-40"
      @click.self="cancelCreate"
    >
      <div
        class="bg-white rounded-t-2xl sm:rounded-lg shadow-xl p-5 sm:p-6 w-full sm:max-w-md max-h-[90dvh] overflow-y-auto"
        style="padding-bottom: max(1.25rem, env(safe-area-inset-bottom))"
      >
        <h2 class="text-xl font-bold text-gray-800 mb-4">New Location</h2>

        <div class="space-y-4">
          <div>
            <label class="block text-xs font-medium text-gray-600 mb-1">Current GPS</label>
            <div
              v-if="gpsLoading"
              class="flex items-center gap-2 text-sm text-gray-600 px-3 py-2 bg-gray-50 rounded-md"
            >
              <div class="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
              Acquiring location...
            </div>
            <div
              v-else-if="gpsError"
              class="text-sm px-3 py-2 bg-red-100 text-red-700 rounded-md"
            >
              <div>{{ gpsError }}</div>
              <button
                @click="fetchLocation"
                class="mt-1 underline active:no-underline min-h-[32px]"
              >
                Retry
              </button>
            </div>
            <div
              v-else-if="form.lat !== null"
              class="font-mono text-sm text-gray-800 px-3 py-2 bg-gray-50 rounded-md break-all"
            >
              {{ form.lat.toFixed(6) }}, {{ form.lng.toFixed(6) }}
              <span v-if="form.accuracy" class="text-xs text-gray-500 ml-2">
                (±{{ Math.round(form.accuracy) }}m)
              </span>
            </div>
          </div>

          <div>
            <label class="block text-xs font-medium text-gray-600 mb-1">Name</label>
            <input
              v-model="form.name"
              type="text"
              placeholder="e.g. Home"
              autocomplete="off"
              autocapitalize="words"
              autocorrect="off"
              class="w-full px-3 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label class="block text-xs font-medium text-gray-600 mb-1">
              Radius: {{ form.radius }}m
            </label>
            <input
              v-model.number="form.radius"
              type="number"
              inputmode="numeric"
              pattern="[0-9]*"
              min="1"
              step="1"
              class="w-full px-3 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div class="flex justify-end gap-2 mt-6">
          <button
            @click="cancelCreate"
            class="px-4 py-2 text-sm text-gray-700 active:bg-gray-200 sm:hover:bg-gray-100 rounded-md transition-colors min-h-[44px]"
          >
            Cancel
          </button>
          <button
            @click="savePoint"
            :disabled="!canSave"
            :class="[
              'px-4 py-2 text-sm font-medium rounded-md transition-colors min-h-[44px]',
              canSave
                ? 'bg-blue-500 active:bg-blue-700 sm:hover:bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            ]"
          >
            Save
          </button>
        </div>
      </div>
    </div>

    <!-- JSON modal -->
    <div
      v-if="showJson"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-end sm:items-center justify-center sm:p-4 z-40"
      @click.self="showJson = false"
    >
      <div
        class="bg-white rounded-t-2xl sm:rounded-lg shadow-xl p-5 sm:p-6 w-full sm:max-w-2xl max-h-[90dvh] flex flex-col"
        style="padding-bottom: max(1.25rem, env(safe-area-inset-bottom))"
      >
        <div class="flex items-center justify-between gap-2 mb-4">
          <h2 class="text-lg sm:text-xl font-bold text-gray-800">Saved Locations JSON</h2>
          <button
            @click="copyJson"
            class="text-sm bg-gray-600 active:bg-gray-800 sm:hover:bg-gray-700 text-white px-3 py-2 rounded-md transition-colors min-h-[40px]"
          >
            {{ copied ? "Copied!" : "Copy" }}
          </button>
        </div>
        <pre
          class="flex-1 overflow-auto bg-gray-900 text-green-300 text-xs p-3 sm:p-4 rounded-md font-mono whitespace-pre-wrap break-all"
          style="-webkit-overflow-scrolling: touch"
        >{{ jsonString }}</pre>
        <div class="flex justify-end mt-4">
          <button
            @click="showJson = false"
            class="px-4 py-2 text-sm text-gray-700 active:bg-gray-200 sm:hover:bg-gray-100 rounded-md transition-colors min-h-[44px]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, watch } from "vue";

  const STORAGE_KEY = "timepoint.locations";

  const loadPoints = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  };

  const points = ref(loadPoints());
  const showCreate = ref(false);
  const showJson = ref(false);
  const copied = ref(false);
  const gpsLoading = ref(false);
  const gpsError = ref("");
  const form = ref({ name: "", radius: 50, lat: null, lng: null, accuracy: null });

  const canSave = computed(
    () => form.value.name.trim() && form.value.lat !== null && form.value.radius > 0
  );
  const jsonString = computed(() => JSON.stringify(points.value, null, 2));

  // Lock body scroll when a modal is open (iOS Safari rubber-band fix)
  watch(
    () => showCreate.value || showJson.value,
    (open) => {
      if (typeof document === "undefined") return;
      document.body.style.overflow = open ? "hidden" : "";
    }
  );

  const persist = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(points.value));
  };

  const fetchLocation = () => {
    gpsError.value = "";
    if (!("geolocation" in navigator)) {
      gpsError.value = "Geolocation not supported by this browser.";
      return;
    }
    if (!window.isSecureContext) {
      gpsError.value = "Location requires HTTPS. Open this page over https:// or localhost.";
      return;
    }
    gpsLoading.value = true;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        form.value.lat = pos.coords.latitude;
        form.value.lng = pos.coords.longitude;
        form.value.accuracy = pos.coords.accuracy;
        gpsLoading.value = false;
      },
      (err) => {
        let msg = err.message || "Unable to retrieve location.";
        if (err.code === 1) msg = "Location permission denied. Enable it in Settings › Safari › Location.";
        else if (err.code === 2) msg = "Position unavailable. Check Location Services.";
        else if (err.code === 3) msg = "Location request timed out.";
        gpsError.value = msg;
        gpsLoading.value = false;
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  };

  const startCreate = () => {
    form.value = { name: "", radius: 50, lat: null, lng: null, accuracy: null };
    showCreate.value = true;
    fetchLocation();
  };

  const cancelCreate = () => {
    showCreate.value = false;
  };

  const savePoint = () => {
    if (!canSave.value) return;
    points.value.push({
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
      name: form.value.name.trim(),
      lat: form.value.lat,
      lng: form.value.lng,
      accuracy: form.value.accuracy,
      radius: form.value.radius,
      createdAt: new Date().toISOString()
    });
    persist();
    showCreate.value = false;
  };

  const deletePoint = (id) => {
    points.value = points.value.filter((p) => p.id !== id);
    persist();
  };

  const formatDate = (iso) => {
    if (!iso) return "";
    const d = new Date(iso);
    return d.toLocaleString();
  };

  const copyJson = async () => {
    const text = jsonString.value;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        // iOS Safari fallback for non-secure / older contexts
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.top = "0";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        ta.setSelectionRange(0, text.length);
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      copied.value = true;
      setTimeout(() => (copied.value = false), 1500);
    } catch {
      copied.value = false;
    }
  };
</script>
