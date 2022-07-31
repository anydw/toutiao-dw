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
    path: '/layout',
    component: () => import('@/views/layout'),
    redirect: '/layout/ ',
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
  }
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
