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
            <b-input
              v-bind:style="{
                width: '5em',
              }"
              class="level-item"
              v-model="ingredient.amount"
            ></b-input>

            <b-select class="level-item" v-model="ingredient.unit">
              <option v-for="unit in units" :value="unit.id" :key="unit.id">
                {{ unit.name }}
              </option>
            </b-select>

            <b-input
              class="level-item"
              custom-class="is-static"
              v-model="ingredient.name"
              readonly
            ></b-input>
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

      <a class="panel-block">
        <span class="level">
          <span class="level-left">
            <b-input
              class="level-item"
              v-bind:style="{ width: '5em' }"
              ref="nextAmount"
              v-model="nextIngredient.amount"
            ></b-input>

            <b-select class="level-item" v-model="nextIngredient.unit">
              <option v-for="unit in units" :value="unit.id" :key="unit.id">
                {{ unit.name }}
              </option>
            </b-select>
            <ingredient-selector
              class="level-item"
              v-bind:selectFunction="addNewIngredient"
            ></ingredient-selector>
          </span>
        </span>
      </a>
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
      nextIngredient: { amount: 1, unit: 1 },
      units: [
        { id: 1, name: "Gramm" },
        { id: 2, name: "Stück" },
        { id: 3, name: "Kilo" },
        { id: 4, name: "Teelöffel" },
      ],
    };
  },
  methods: {
    addNewIngredient(i) {
      if (i && !this.ingredients.includes(i)) {
        i.amount = this.nextIngredient.amount;
        i.unit = this.nextIngredient.unit;
        this.ingredients.push(i);
        this.nextIngredient = { amount: 1, unit: 1 };
        this.$refs.nextAmount.focus();
        this.$refs.nextAmount.$refs.input.select();
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
