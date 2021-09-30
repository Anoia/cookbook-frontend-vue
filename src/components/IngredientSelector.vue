<template>
  <div>
    <p class="content"><b>Selected:</b> {{ selected }}</p>
    <p>{{ ingredients }}</p>
    <b-autocomplete
      rounded
      v-model="name"
      ref="autocomplete"
      :data="filteredDataArray"
      field="name"
      placeholder="e.g. Zuccini"
      icon="fas fa-pen"
      clearable
      @select="(option) => (selected = option)"
    >
      <template #footer>
        <a @click="showAddFruit">
          <span v-if="showAddNew"> Add new... </span>
        </a>
      </template>
      <template #empty>No results for {{ name }}</template>
    </b-autocomplete>
  </div>
</template>

<script>
import gql from "graphql-tag";
const ADD_INGREDIENT = gql`
  mutation insert_ingredient($name: String!) {
    insert_ingredients_one(object: { name: $name }) {
      id
      name
    }
  }
`;
export default {
  name: "IngredientSelector",
  data() {
    return {
      ingredients: [],
      name: "",
      selected: null,
    };
  },
  computed: {
    showAddNew() {
      return this.filteredDataArray.length == 0;
    },
    filteredDataArray() {
      return this.ingredients.filter((option) => {
        return (
          option.name
            .toString()
            .toLowerCase()
            .indexOf(this.name.toLowerCase()) >= 0
        );
      });
    },
  },
  methods: {
    showAddFruit() {
      this.$buefy.dialog.prompt({
        message: `Ingredient`,
        inputAttrs: {
          placeholder: "e.g. Watermelon",
          maxlength: 20,
          value: this.name,
        },
        confirmText: "Add",
        onConfirm: (value) => {
          this.addIngredientToBackend(value);
          this.$refs.autocomplete.setSelected(value);
        },
      });
    },
    addIngredientToBackend(ingredientName) {
      this.$apollo.mutate({
        mutation: ADD_INGREDIENT,
        variables: {
          name: ingredientName,
        },
        update: (cache, { data: { insert_ingredients_one } }) => {
          // Read the data from our cache for this query.

          // eslint-disable-next-line
          console.log("insert_ingredient");
          console.log(insert_ingredients_one);
        },
      });
    },
  },
  apollo: {
    // Simple query that will update the 'ingredients' vue property
    ingredients: {
      query: gql`
        query get_ingredients($_ilike: String) {
          ingredients(where: { name: { _ilike: $_ilike } }, limit: 20) {
            name
            id
          }
        }
      `,
      variables() {
        // Use vue reactive properties here
        return {
          _ilike: "%" + this.name + "%",
        };
      },
    },
  },
};
</script>
