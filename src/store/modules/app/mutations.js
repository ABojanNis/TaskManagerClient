import { set } from "@/utils/vuex-helper";

export default {
  setMe: set("me"),
  setName(state, payload) {
    state.me.name = payload;
  },
  setSurname(state, payload) {
    state.me.surname = payload;
  },
  setFetchLoading: set("fetchLoading"),
  setLoading: set("loading")
};
