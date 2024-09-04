<template>
  <div>
    <div v-if="selectedLibrary==='three'">
      <ThreeScene></ThreeScene>
    </div>
    <div v-else-if="selectedLibrary==='babylon'">
      <BblScene></BblScene>
    </div>
    <div v-else>
      <button @click="chooseLibrary('three')">Three.js</button>
      <button @click="chooseLibrary('babylon')">Babylon.js</button>
    </div>
  </div>
</template>

<script>
import BblScene from "@/pages/BblScene.vue";
import ThreeScene from "@/pages/ThreeScene.vue";

export default {
  components: {ThreeScene, BblScene},
  data() {
    return {
      selectedLibrary: localStorage.getItem('chosenLibrary') || null,
    };
  },
  methods: {
    chooseLibrary(library) {
      this.selectedLibrary = library;
      localStorage.setItem('chosenLibrary', library);
    },
  },
};
</script>
