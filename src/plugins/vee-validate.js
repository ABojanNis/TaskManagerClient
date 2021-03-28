import Vue from "vue";
import { extend, ValidationObserver, ValidationProvider } from "vee-validate";
import {
  email,
  required,
  min,
  max,
  confirmed
} from "vee-validate/dist/rules";

extend("email", { ...email, message: "Please enter valid email!" });
extend("required", { ...required, message: e => e + " is required!" });
extend('min', {
  ...min,
  message: '{_field_} must be greater than {length} characters',
});
extend('max', {
  ...max,
  message: '{_field_} may not be greater than {length} characters',
});
extend("confirmed", {
  ...confirmed,
  message: e => e + " confirmation does not match!"
});

Vue.component("validation-provider", ValidationProvider);
Vue.component("validation-observer", ValidationObserver);
