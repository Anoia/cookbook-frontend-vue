import Vue from "vue";
import App from "./App.vue";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import "bulmaswatch/flatly/bulmaswatch.min.css";
import router from "./router";
import { domain, clientId, audience } from "../auth_config.json";
import { Auth0Plugin } from "./auth";
import { createProvider } from "./vue-apollo";

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
  apolloProvider: createProvider(),
  render: (h) => h(App),
}).$mount("#app");
