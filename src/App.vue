<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <br />
    <button class="button is-primary">TEST klick me</button>
    <button class="button is-danger">TEST klick me</button>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <test-component />
  </div>
</template>

<script>
import TestComponent from "./components/testcomponent.vue";

export default {
  name: "App",
  components: {
    TestComponent,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
