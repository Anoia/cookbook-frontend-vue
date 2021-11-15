import Vue from "vue";
import App from "./App.vue";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import "bulmaswatch/flatly/bulmaswatch.min.css";
import router from "./router";
import { Auth0Plugin } from "./auth";
// import { createProvider } from "./vue-apollo";

import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

console.log('TEST THE ENV VAR', process.env.VUE_APP_GRAPHQL_HTTP)

const getHeaders = () => {
  const headers = {};
  const token = window.localStorage.getItem('apollo-token');
  if (token) {
    headers.authorization = `Bearer ${token}`;
  }
  return headers;
};



// HTTP connection to the API
const httpLink = new HttpLink({
  uri: process.env.VUE_APP_GRAPHQL_HTTP,
  fetch,
  headers: getHeaders()
});

// Cache implementation
const cache = new InMemoryCache({ addTypename: true })

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
  uri: process.env.VUE_APP_GRAPHQL_HTTP,
})

console.log('appollo client test', apolloClient)

import VueApollo from 'vue-apollo'

Vue.use(VueApollo)

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})


var domain = process.env.VUE_APP_AUTH_DOMAIN;
var clientId = process.env.VUE_APP_AUTH_CLIENT_ID;
var audience = process.env.VUE_APP_AUTH_AUDIENCE;

Vue.config.productionTip = false;

Vue.use(Auth0Plugin, {
  domain,
  clientId,
  audience,
  cacheLocation: "localstorage",
  onRedirectCallback: (appState) => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  },
});

Vue.config.productionTip = false;

Vue.use(Buefy, {
  defaultIconPack: "fas",
});

new Vue({
  router,
  apolloProvider: apolloProvider,
  render: (h) => h(App),
}).$mount("#app");
