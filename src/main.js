import Vue from 'vue'
import App from './App.vue'
import { store } from './store/store';

const app = new Vue({
  store,
  el: '#app',
  render: h => h(App),
  components: { App },
})
