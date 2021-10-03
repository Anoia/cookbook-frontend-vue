<template>
  <div>
    <b-autocomplete
      v-model="name"
      ref="autocomplete"
      :data="filteredDataArray"
      field="name"
      placeholder="e.g. Zuccini"
      icon="fas fa-cart-plus"
      clearable
      clear-on-select
      keep-first
      @select="onSelect"
    >
      <template #footer>
        <a @click="showAddIngredient">
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
  props: {
    selectFunction: Function,
  },
  data() {
    return {
      ingredients: [],
      name: "",
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
    onSelect(s) {
      this.selectFunction(s);
      this.name = "";
    },
    showAddIngredient() {
      this.$buefy.dialog.prompt({
        title: "New Ingredient",
        inputAttrs: {
          placeholder: "e.g. Watermelon",
          maxlength: 20,
          value: this.name,
        },
        confirmText: "Add",
        onConfirm: (value) => {
          this.addIngredientToBackend(value);
        },
      });
    },
    addIngredientToBackend(ingredientName) {
      this.$apollo.mutate({
        mutation: ADD_INGREDIENT,
        variables: {
          name: ingredientName,
        },
        refetchQueries: ["get_ingredients"],
        update: (cache, { data: { insert_ingredients_one } }) => {
          this.$refs.autocomplete.setSelected(insert_ingredients_one);
        },
      });
    },
  },
  apollo: {
    // Simple query that will update the 'ingredients' vue property
    ingredients: {
      query: gql`
        query get_ingredients {
          ingredients {
            name
            id
          }
        }
      `,
    },
  },
};
</script>
