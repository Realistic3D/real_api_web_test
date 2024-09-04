<template>
  <div></div>
</template>
<script>

import ThreeScene from "@/render_tools/three_tools/ThreeScene";

export default {
  name: "ThreeScene",
  data() {
    return {
      scene: undefined,
    }
  },
  methods: {
    async start() {
      this.scene = new ThreeScene();
    }
  },
  async mounted() {
    await this.start();
  },
};
</script>
<script setup>
</script>
