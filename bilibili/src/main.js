import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 引入vant插件
import Vant, { Toast } from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)
Vue.prototype.$msg = Toast

//引入axios
import http from '../http.js'
Vue.prototype.$http = http

// 引入字体文件
import './assets/style.css'


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
