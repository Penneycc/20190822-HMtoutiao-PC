import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/login'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: Login },
    { path: '/login', name: 'login', component: Login }
  ]
})

export default router
