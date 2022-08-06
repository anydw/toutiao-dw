import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    // 实现页面懒加载
    component: () => import('@/views/login')
  },
  {
    path: '/',
    component: () => import('@/views/layout'),
    redirect: ' ',
    children: [
      {
        path: ' ',
        component: () => import('@/views/Home')
      },
      {
        path: 'qa',
        component: () => import('@/views/Qa')
      },
      {
        path: 'video',
        component: () => import('@/views/Video')
      },
      {
        path: 'my',
        component: () => import('@/views/My')
      }
    ]
  },
  {
    path: '/search',
    component: () => import('@/views/Search')
  },
  {
    path: '/user',
    component: () => import('@/views/User')
  }
]
const router = new VueRouter({
  routes
})

export default router
