import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 引入vant插件
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)

//引入axios
import http from '../http.js'
Vue.prototype.$http = http

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
