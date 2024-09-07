<template>
  <div v-if="platformToggle()">
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
      <div class="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-80">
        <h1 class="text-2xl font-bold mb-4 text-white text-center">
          Test Platforms
        </h1>
        <p class="text-gray-300 mb-6 text-center">
          Please select a platform to test your 3D scene:
        </p>
        <div class="flex justify-center space-x-4">
          <button
              @click="chooseLibrary('three')"
              class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
            Three.js
          </button>
          <button
              @click="chooseLibrary('babylon')"
              class="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
          >
            Babylon.js
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-else-if="selectedLibrary === 'three'">
    <ThreeScene></ThreeScene>
  </div>
  <div v-else-if="selectedLibrary === 'babylon'">
    <BblScene></BblScene>
  </div>
</template>

<script>
import EventBus from "@/utils/EventBus";
import BblScene from "@/pages/BblScene.vue";
import ThreeScene from "@/pages/ThreeScene.vue";

export default {
  components: { ThreeScene, BblScene },
  data() {
    return {
      toggle: {
        platform: false
      },
      selectedLibrary: localStorage.getItem('chosenLibrary') || null,
    };
  },
  methods: {
    platformToggle() {
      if(this.toggle.platform) return true;
      return !['three', 'babylon'].includes(this.selectedLibrary);
    },
    chooseLibrary(library) {
      this.selectedLibrary = library;
      localStorage.setItem('chosenLibrary', library);
    },
    setAppToggle(key, value) {
      this.toggle[key] = value;
    }
  },
  beforeMount() {
    EventBus.on('setAppToggle', this.setAppToggle);
  },
  beforeUnmount() {
    EventBus.off('setAppToggle', this.setAppToggle);
  },
};
</script>
