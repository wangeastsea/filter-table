import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 打包后验证
// import usmartFilterTable from '../dist/usmart-filter-table.js'
// 本地调试使用
import usmartFilterTable from '@/components'
Vue.use(ElementUI)
Vue.use(usmartFilterTable)
new Vue({
el: '#app',
    render: h => h(App)
})
