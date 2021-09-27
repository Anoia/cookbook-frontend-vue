<template>
  <div class="new">
    <h1>create new</h1>
    <div class="container">
      <recipe-create />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import RecipeCreate from "@/components/RecipeCreate.vue";

export default {
  name: "New",
  components: {
    RecipeCreate,
  },
};
</script>
