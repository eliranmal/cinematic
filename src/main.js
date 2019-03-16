import './main.scss';
import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

console.log(`< ${process.env.VUE_APP_NAME} v${process.env.VUE_APP_VERSION} >`);

new Vue({
  render: h => h(App),
}).$mount('#app');
