import Vue from 'vue';
import App from './App.vue';
import { store } from './store/index.js';
import './api/mockApi.js';
import './assets/style/default.css';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: store,
  components: { App },
  template: '<App/>',
});
