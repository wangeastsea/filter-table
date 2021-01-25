import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import filterTable from '../dist/filterTable'
Vue.use(ElementUI);
Vue.use(filterTable);
new Vue({
  el: '#app',
  render: h => h(App)
})
