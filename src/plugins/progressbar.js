import Vue from "vue";
import VueProgressBar from "vue-progressbar";

Vue.use(VueProgressBar, {
  color: "#4caf50",
  failedColor: "#f55a4e",
  thickness: "4px",
  autoRevert: true,
  location: "top",
  inverse: false
});
