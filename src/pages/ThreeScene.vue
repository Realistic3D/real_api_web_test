<template>
  <div class="grid grid-cols-3 mt-2">
    <div class="flex justify-start ml-2 space-x-2">
      <MenuButton title="Back" :img="icons.backIcon" @click="backClick" />
    </div>
    <div class="flex justify-end space-x-2 mr-2"></div>
  </div>
</template>
<script>

import {IconsUI} from "@/utils/IconsUI";
import ThreeScene from "@/render_tools/three_tools/ThreeScene";
import ThreeRender from "@/render_tools/three_tools/ThreeRender";
import CacheManager from "@/render_tools/common_tools/CacheManager";
import {RequestManager} from "@/render_tools/common_tools/RequestManager";

export default {
  name: "ThreeScene",
  emits: ['resetSelection'],
  props: {
    icons: { type: IconsUI, required: true },
    cache: { type: CacheManager, required: true },
    request: { type: RequestManager, required: true },
  },
  data() {
    return {
      scene: undefined,
    }
  },
  methods: {
    async start() {
      this.scene = new ThreeScene();
      const render = new ThreeRender(this.scene);
      await render.start();
    },
    backClick() {
      this.$emit('resetSelection');
    },
  },
  async mounted() {
    await this.start();
  },
};
</script>
<script setup>
import MenuButton from "@/components/MenuButton.vue";
</script>
