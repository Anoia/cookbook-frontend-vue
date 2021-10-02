<template>
  <section>
    <h1 class="title">Create new Recipe</h1>

    <div class="columns level">
      <div class="column level-item">
        <b-field label="Title">
          <b-input placeholder="e.g. Lasagna"></b-input>
        </b-field>

        <b-field label="Decription">
          <b-input
            size="is-small"
            maxlength="200"
            :has-counter="true"
            type="textarea"
          ></b-input>
        </b-field>
      </div>
      <div class="column level-item">
        <b-field>
          <b-upload multiple drag-drop>
            <section class="section">
              <div class="content has-text-centered">
                <p>
                  <b-icon icon="upload" size="is-large"> </b-icon>
                </p>
                <p>Drop your files here or click to upload</p>
              </div>
            </section>
          </b-upload>
        </b-field>
      </div>
    </div>

    <nav class="panel is-primary">
      <p class="panel-heading">Ingredients</p>
      <a
        class="panel-block is-block"
        v-for="ingredient in ingredients"
        v-bind:key="ingredient.id"
      >
        <span class="level">
          <span class="level-left">
            <b-numberinput
              v-bind:style="{ marginBottom: 0, width: '10em' }"
              class="level-item"
              controls-position="compact"
              controls-alignment="left"
              min="0"
              native-size="10"
              v-model="ingredient.amount"
            ></b-numberinput>

            <span class="level-item">{{ ingredient.name }}</span>
          </span>
          <span class="level-right">
            <span class="level-item">
              <span
                class="panel-icon"
                v-on:click="removeIngredient(ingredient)"
              >
                <i class="fas fa-times" aria-hidden="true"></i>
              </span>
            </span>
          </span>
        </span>
      </a>

      <div class="panel-block">
        <ingredient-selector
          v-bind:selectFunction="addNewIngredient"
        ></ingredient-selector>
      </div>
    </nav>

    <button class="button">Primary</button>
  </section>
</template>

<script>
import IngredientSelector from "../components/IngredientSelector.vue";
export default {
  components: { IngredientSelector },
  name: "RecipeCreate",
  data() {
    return {
      title: "",
      description: "",
      bild: "",
      ingredients: [],
      newIngredient: "",
      nextIngredientId: 1,
    };
  },
  methods: {
    addNewIngredient(i) {
      if (i && !this.ingredients.includes(i)) {
        i.amount = 1;
        this.ingredients.push(i);
      }
    },
    removeIngredient(i) {
      if (i && this.ingredients.includes(i)) {
        this.ingredients.splice(this.ingredients.indexOf(i), 1);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  list-style-type: none;
}
</style>
