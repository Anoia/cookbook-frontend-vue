<template>
  <section>
    <h1 class="title">Create new Recipe</h1>

    <div class="columns level">
      <div class="column level-item">
        <b-field label="Title">
          <b-input placeholder="test"></b-input>
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
            <span class="level-item">{{ ingredient.name }}</span>
          </span>
          <span class="level-right">
            <span class="level-item">
              <span class="panel-icon">
                <i class="fas fa-pen" aria-hidden="true"></i>
              </span>
            </span>
          </span>
        </span>
      </a>

      <div class="panel-block">
        <b-field>
          <b-input
            placeholder="Add new ingredient"
            v-model="newIngredient"
            @keyup.native.enter="addIngredient"
          ></b-input>
        </b-field>
      </div>
    </nav>

    <button class="button">Primary</button>
  </section>
</template>

<script>
export default {
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
    addIngredient() {
      var value = this.newIngredient && this.newIngredient.trim();
      if (!value) {
        return;
      }
      this.ingredients.push({
        name: value,
        id: this.nextIngredientId++,
      });
      this.newIngredient = "";
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
