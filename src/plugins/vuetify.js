import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import "@/sass/overrides.sass";
import DatetimePicker from 'vuetify-datetime-picker';
 
Vue.use(DatetimePicker);
Vue.use(Vuetify);

export default new Vuetify({
});
