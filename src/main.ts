import Vue from 'vue';
import App from './App.vue';
import { store } from './store';
import './api/mockApi';
import './assets/style/default.css';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: store,
  components: { App },
  template: '<App/>',
});
