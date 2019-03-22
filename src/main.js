import './main.scss';
import Vue from 'vue';
import VueMq from 'vue-mq';
import VueShowSlide from 'v-show-slide';
import App from './App.vue';
import { sortByValue } from './lib/object';
import { breakpoints } from './config/layout';

Vue.config.productionTip = false;

Vue.use(VueMq, {
  // ensure lexical ordering of values, otherwise vue-mq breaks!
  breakpoints: sortByValue(breakpoints),
});
Vue.use(VueShowSlide);

console.log(`< ${process.env.VUE_APP_NAME} v${process.env.VUE_APP_VERSION} >`);

new Vue({
  render: h => h(App),
}).$mount('#app');
