import Vue from "vue";
import VueIziToast from "vue-izitoast";

import "izitoast/dist/css/iziToast.css";

Vue.use(VueIziToast, {
  timeout: 5000,
  theme: "dark",
  position: "topRight",
  progressBarColor: "#d5e1df"
});
