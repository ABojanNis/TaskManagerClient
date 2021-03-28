import { get } from "@/utils/vuex-helper";

export default {
  me: get("me"),
  fetchLoading: get("fetchLoading"),
  loading: get("loading")
};
