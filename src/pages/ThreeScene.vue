<template>
  <div></div>
</template>
<script>

import ThreeScene from "@/render_tools/three_tools/ThreeScene";
import ThreeRender from "@/render_tools/three_tools/ThreeRender";

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
      this.render = new ThreeRender(this.scene);
      await this.render.start();
    }
  },
  async mounted() {
    await this.start();
  },
};
</script>
<script setup>
</script>
