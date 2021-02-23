<template>
  <h1 class="font-bold text-2xl">{{ msg }}</h1>
  <slot></slot>
  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank"
      >Vite Documentation</a
    >
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
  </p>

  <p class="my-2">
    <button
      class="bg-green-500 px-4 py-2 rounded text-white outline-none focus:outline-none focus:ring-0"
      @click="count++"
    >
      count is: {{ count }}
    </button>
  </p>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      count: 0,
    };
  },
};
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
