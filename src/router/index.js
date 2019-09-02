import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

import Login from '@/views/login'
import Home from '@/views/home'

// 二级子路由
import Welcome from '@/views/welcome'
import Article from '@/views/article'
import Image from '@/views/image'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', name: 'login', component: Login },
    {
      path: '/',
      component: Home,
      children: [
        { path: '/', name: 'welcome', component: Welcome },
        { path: '/article', name: 'article', component: Article },
        { path: '/image', name: 'image', component: Image }
      ]
    }
  ]
})

// 前置路由守卫
router.beforeEach((to, from, next) => {
  if (to.path !== '/login' && !store.getUser().token) {
    return next('/login')
  }
  next()
})

export default router
