<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />

    <h3>recipe list test</h3>
    <router-link v-for="r in recipes" :key="r.id" :to="'/recipe/' + r.id"
      >{{ r.id }} - {{ r.name }}: {{ r.description }} <br
    /></router-link>

    <!-- Check that the SDK client is not currently loading before accessing it's methods -->
    <div v-if="!$auth.loading">
      <p>auth loaded</p>
      <!-- show login when not authenticated -->
      <button v-if="!$auth.isAuthenticated" @click="login">Log in</button>
      <!-- show logout when authenticated -->
      <button v-if="$auth.isAuthenticated" @click="logout">Log out</button>
    </div>
    <div v-if="$auth.isAuthenticated">
      <button @click="getTheToken">getToken</button>
      <p>the value is {{ test }}</p>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import { onLogin, onLogout } from "../vue-apollo";

export default {
  name: "Home",
  data() {
    return {
      test: "nothing",
      selected: null,
    };
  },
  methods: {
    async getTheToken() {
      const token = await this.$auth.getTokenSilently();
      //  localStorage.setItem("apollon-token", token);
      this.test = token;
    },
    // Log the user in
    login() {
      this.$auth.loginWithRedirect();
    },
    // Log the user out
    logout() {
      onLogout(this.$apolloProvider.defaultClient);
      this.$auth.logout({
        returnTo: window.location.origin,
      });
    },
  },
  apollo: {
    // Simple query that will update the 'ingredients' vue property
    recipes: gql`
      query {
        recipes {
          description
          id
          name
        }
      }
    `,
  },
  mounted: function () {
    this.$auth.$watch("isAuthenticated", async (authenticated) => {
      if (authenticated === true) {
        onLogin(
          this.$apolloProvider.defaultClient,
          await this.$auth.getTokenSilently()
        );
      }
    });
  },
};
</script>
