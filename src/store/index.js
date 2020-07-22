import Vue from "vue";
import Vuex from "vuex";

import router from "../router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: [],
    room: {},
    user: null,
    signupError: null,
  },
  mutations: {
    socket_users(state, users) {
      if (state.user) {
        const user = users.find((us) => us.name === state.user.name);
        user.avatar = `https://avatars.dicebear.com/api/avataaars/${user.name}.svg`;
        state.user = user;
        if (user.is_playing && router.currentRoute !== "/play") {
          router.push("/play");
        }
      }
      state.users = users
        .filter((u) => (!state.user ? true : state.user.name !== u.name))
        .map((user) => ({
          ...user,
          avatar: `https://avatars.dicebear.com/api/avataaars/${user.name}.svg`,
        }));
    },
    socket_self(state, user) {
      state.user = {
        ...user,
        avatar: `https://avatars.dicebear.com/api/avataaars/${user.name}.svg`,
      };
    },
    socket_update_room(state, room) {
      state.room = room;
      state.user = { ...state.user, room };
    },
    setSignupError(state, error) {
      state.signupError = error;
    },
  },
  actions: {
    signup(app, { socket, name } = {}) {
      if (!name) return app.commit("setSignupError", "The name can't be blank");
      const userWithSameName = app.state.users.find(
        (user) => user.name === name
      );
      if (userWithSameName)
        return app.commit("setSignupError", "This name is already taken");

      app.commit("setSignupError", "");
      socket.emit("signup", name);
      app.commit("socket_self", { name });
      router.push("/find-player");
    },
    socket_request_to_play(app, request) {
      Vue.notify({
        group: "request",
        title: "L'oeuf",
        text: `${request.userName} wants to play with you`,
        duration: -1,
        data: {
          request,
        },
      });
    },
    socket_refuse_request_to_play(store, request) {
      Vue.notify({
        group: "request",
        title: "Request refused",
        text: `${request.userName} refused your request to play`,
        data: {
          hideButtons: true,
        },
      });
    },
  },
  modules: {},
});
