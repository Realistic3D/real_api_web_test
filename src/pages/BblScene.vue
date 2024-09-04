<template>
  <div></div>
</template>
<script>
import BblScene from "@/render_tools/bbl_tools/BblScene";
import BblRender from "@/render_tools/bbl_tools/BblRender";

export default {
  name: "BblScene",
  data() {
    return {
      scene: undefined,
      render: undefined,
    }
  },
  methods: {
    async start() {
      this.scene = new BblScene();
      this.render = new BblRender(this.scene);
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
