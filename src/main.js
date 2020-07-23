import Vue from "vue";
import App from "./App.vue";
import router from "./router";

const PROD = true

Vue.config.productionTip = PROD;

import Notifications from "vue-notification";

Vue.use(Notifications);

import store from "./store";

import VueSocketIO from "vue-socket.io";
import SocketIO from "socket.io-client";

Vue.use(
  new VueSocketIO({
    debug: !PROD,
    connection: PROD ? "https://trd-tic-tac-toe.herokuapp.com" : "http://localhost:3000",
    vuex: {
      store,
      actionPrefix: "socket_",
      mutationPrefix: "socket_",
    },
  })
);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
