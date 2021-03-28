import Vue from "vue";
import { VueAuthenticate } from "vue-authenticate";
import $auth from "vue-authenticate";

var auth_options = {
  baseUrl: Vue.prototype.$http.defaults.baseURL + "/api",
  tokenName: "token",
  responseDataKey: "data",
  logoutUrl: "api/auth/logout",
  loginUrl: "/auth/login",
  // registerUrl: "/auth/signup",
  providers: {},

  bindResponseInterceptor: function($auth) {
    $auth.$http.interceptors.response.use(response => {
      $auth.setToken(response.data);
      return response;
    });
  },

  bindRequestInterceptor: function($auth) {
    const tokenHeader = $auth.options.tokenHeader;

    $auth.$http.interceptors.request.use(config => {
      if (Vue.prototype.$referral) {
        config.data.referral = Vue.prototype.$referral;
      }
      if ($auth.isAuthenticated()) {
        config.headers[tokenHeader] = [
          $auth.options.tokenType,
          $auth.getToken()
        ].join(" ");
      }
      return config;
    });
  }
};

const auth = new VueAuthenticate(Vue.prototype.$http, auth_options);

Vue.use($auth, auth_options);

window.auth = auth;
