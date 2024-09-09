<template>
  <div class="flex items-center rounded-md">
    <button
        :class="setBG()"
        @click="onClick"
        :title="title"
        :disabled="disabled"
    >
      <img
          class="size-6 rounded-md border-none cursor-pointer"
          :src="img"
          :alt="title" />
    </button>
  </div>
</template>

<script>
export default {
  name: "MenuButton",
  emits: ['click'],
  props: {
    img: {type: String, required: true},
    title: {type: String, required: true},
    disabled: {type: Boolean, required: false, default: false},
    ignoreBG: {type: Boolean, required: false, default: false},
    ignoreHV: {type: Boolean, required: false, default: false},
    bg: {type: String, required: false, default: () => {return "bg-sc-dark2"}},
    hbg: {type: String, required: false, default: () => {return "bg-sc-dark2-l"}},
  },
  methods: {
    onClick() {
      this.$emit("click");
    },
    setBG() {
      const bg = this.bg;
      const hbg = this.hbg;
      if(this.ignoreBG) return '';
      if(this.ignoreHV) return 'size-9 rounded-md mode-btn flex items-center justify-center ' + bg;
      return `size-9 rounded-md mode-btn flex items-center justify-center ${bg} hover:${hbg}`;
    }
  }
}
</script>
