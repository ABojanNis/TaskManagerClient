import Vue from "vue";
import _ from "lodash";

export const EventBus = new Vue({});

EventBus.$on("serverError", argument => {
  if (argument.error === undefined) {
    return;
  }
  let status = argument.error.status;
  if (argument.component.$auth) {
    if (status == 400 || status == 401) {
      argument.component.$auth
        .logout()
        .then(() => {
          argument.component.$router.push("/");
          Vue.prototype.$me = null;
        })
        .catch(() => {
          argument.component.$router.push("/");

          Vue.prototype.$me = null;
        });
    }
  }
  if (status == 422) {
    let errors = argument.error.data.errors;
    _.forEach(errors, error => {
      argument.component.$toast.error(error[0]);
    });
  } else if (status > 399 && status < 405) {
    argument.component.$toast.error(argument.error.data.message);
  }
});
