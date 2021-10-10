<template>
  <div class="recipe">
    <!-- <h1>Some day there will be a recipe here, hopefully recipe {{ id }}</h1>
    <p>test: {{ recipes_by_pk }}</p> -->
    <div class="box">
      <h1 class="title">{{ recipes_by_pk.name }}</h1>
    </div>

    <div class="columns">
      <div class="column is-one-third">
        <b-image
          class="block"
          src="https://picsum.photos/600/400"
          alt="A random image"
          ratio="6by4"
          :rounded="True"
        ></b-image>
        <nav class="panel is-primary block">
          <p class="panel-heading">Ingredients</p>
          <a
            class="panel-block"
            v-for="i in recipes_by_pk.recipe_ingredients"
            v-bind:key="i.ingredient.id"
          >
            {{ i.amount }} {{ i.unitByUnit.short_name }} {{ i.ingredient.name }}
          </a>
        </nav>
      </div>
      <div class="column">
        <div class="tile is-ancestor">
          <div class="tile is-vertical is-parent">
            <div
              class="tile is-child"
              v-for="s in recipes_by_pk.steps"
              v-bind:key="s.id"
            >
              <p class="subtitle is-4">Step {{ s.id }}</p>
              <p>
                {{ s.content }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
export default {
  name: "ViewRecipe",
  props: {
    id: String,
  },
  data() {
    return {
      recipes_by_pk: {},
    };
  },
  apollo: {
    // Simple query that will update the 'ingredients' vue property
    recipes_by_pk: {
      query: gql`
        query get_recipe($id: Int!) {
          recipes_by_pk(id: $id) {
            id
            name
            description
            steps
            user {
              name
            }
            recipe_ingredients {
              amount
              ingredient {
                id
                name
              }
              unitByUnit {
                long_name
                short_name
              }
            }
          }
        }
      `,
      variables() {
        return { id: this.id };
      },
    },
  },
};
</script>
