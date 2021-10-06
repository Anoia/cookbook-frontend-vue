<template>
  <section>
    <h1 class="title">Create new Recipe</h1>

    <div class="columns level">
      <div class="column level-item">
        <b-field label="Title">
          <b-input placeholder="e.g. Lasagna" v-model="title"></b-input>
        </b-field>

        <b-field label="Decription">
          <b-input
            size="is-small"
            maxlength="200"
            :has-counter="true"
            type="textarea"
            v-model="description"
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
                {{ unit.long_name }}
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
                {{ unit.long_name }}
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

    <section v-for="step in stepsWithIndex" v-bind:key="step.id">
      <b-field :label="'Step ' + step.id" label-position="on-border">
        <b-input
          maxlength="400"
          type="textarea"
          v-model="step.content"
          placeholder="Add instructions.."
          @blur="handleStepChanged"
          @input="handleStepChanged"
        ></b-input>
      </b-field>
    </section>

    <b-button type="is-primary" @click="save">Save</b-button>
  </section>
</template>

<script>
import gql from "graphql-tag";
import IngredientSelector from "../components/IngredientSelector.vue";

const CREATE_RECIPE = gql`
  mutation create_recipe(
    $description: String
    $name: String
    $steps: jsonb
    $data: [recipe_ingredients_insert_input!]!
  ) {
    insert_recipes_one(
      object: {
        description: $description
        name: $name
        steps: $steps
        recipe_ingredients: { data: $data }
      }
    ) {
      id
      description
      name
      steps
      recipe_ingredients {
        amount
        ingredient_id
        unit
      }
    }
  }
`;

export default {
  components: { IngredientSelector },
  name: "RecipeCreate",
  data() {
    return {
      title: "",
      description: "",
      bild: "",
      steps: [{ content: "" }],
      ingredients: [],
      nextIngredient: { amount: 1, unit: 1 },
      units: [],
    };
  },
  computed: {
    stepsWithIndex() {
      var i = 1;
      var newSteps = [];
      for (var step of this.steps) {
        step.id = i++;
        newSteps.push(step);
      }
      return newSteps;
    },
  },
  methods: {
    handleStepChanged() {
      if (this.steps[this.steps.length - 1].content.trim() != "") {
        this.steps.push({ content: "" });
      }
    },
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
    save() {
      console.log(this.ingredients);
      var updatedIngredients = [];
      for (var i of this.ingredients) {
        var newI = { amount: i.amount, unit: i.unit, ingredient_id: i.id };
        updatedIngredients.push(newI);
      }

      var variables = {
        description: this.description,
        name: this.title,
        steps: this.steps,
        data: updatedIngredients,
      };
      console.log(variables);
      this.$apollo.mutate({
        mutation: CREATE_RECIPE,
        variables: variables,
        update: (cache, { data: { insert_recipes_one } }) => {
          console.log(insert_recipes_one);
        },
      });
    },
  },
  apollo: {
    units: {
      query: gql`
        query get_units {
          units {
            id
            long_name
            short_name
          }
        }
      `,
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
