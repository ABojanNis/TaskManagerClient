import Vue from "vue";
import Vuex from "vuex";

import actions from "./actions";
import getters from "./getters";
import modules from "./modules";
import mutations from "./mutations";
import state from "./state";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const store = new Vuex.Store({
  actions,
  getters,
  modules,
  mutations,
  state,
  plugins: [createPersistedState()]
});

export default store;
