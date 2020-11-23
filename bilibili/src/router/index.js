import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import register from '@/views/register.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/register',
    component: register
  }
]


const router = new VueRouter({
  routes,
  mode: 'history'

})

export default router
