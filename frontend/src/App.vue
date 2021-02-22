<template>
  <HelloWorld :msg="`Hello Vue 3 + Vite fom ${msg}`">
    <slot></slot>
  </HelloWorld>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  props: {
    msg: String,
  },
  components: { HelloWorld },
};
</script>
