import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import usmartFilterTable from '../dist/usmart-filter-table.js'
Vue.use(ElementUI);
Vue.use(usmartFilterTable);
new Vue({
  el: '#app',
  render: h => h(App)
})
