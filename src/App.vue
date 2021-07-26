<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->

    <section class="hero is-primary is-bold">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Hello</h1>
          <h2 class="subtitle">Create awesome recipes bla bla</h2>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <recipe-create />
      </div>
    </section>
  </div>
</template>

<script>
import RecipeCreate from "./components/RecipeCreate.vue";

export default {
  name: "App",
  components: {
    RecipeCreate,
  },
  data() {
    return {
      recipes: [],
      name: "",
      selected: null,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
