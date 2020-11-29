import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import userinfo from '../views/userinfo.vue'

import register from '@/views/register.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/register',
    component: register
  },{
    path: '/Login',
    component: Login
  },{
    path: '/userinfo',
    component: userinfo
  }
]


const router = new VueRouter({
  routes,
  mode: 'history'

})

export default router
