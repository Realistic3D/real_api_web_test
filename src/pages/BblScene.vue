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
import BblScene from "@/render_tools/bbl_tools/BblScene";
import BblRender from "@/render_tools/bbl_tools/BblRender";

export default {
  name: "BblScene",
  emits: ['resetSelection'],
  props: {
    icons: { type: IconsUI, required: true },
  },
  data() {
    return {
      scene: undefined,
    }
  },
  methods: {
    async start() {
      this.scene = new BblScene();
      const render = new BblRender(this.scene);
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
