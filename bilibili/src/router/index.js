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
    component: userinfo,
    meta:{
      istoken: true
    }
  }
]


const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  if (!localStorage.getItem('token') && !localStorage.getItem('id') && to.meta.istoken == true) {
    router.push('/login')
    Vue.prototype.$msg.fail('请重新登录')
    return
  }
  next()
})

export default router
