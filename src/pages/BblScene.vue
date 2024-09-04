<template>
  <div></div>
</template>
<script>
import BblScene from "@/render_tools/bbl_tools/BblScene";

export default {
  name: "BblScene",
  data() {
    return {
      scene: undefined,
    }
  },
  methods: {
    async start() {
      this.scene = new BblScene();
    }
  },
  async mounted() {
    await this.start();
  },
};
</script>
<script setup>
</script>
