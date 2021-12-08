import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login'),
  },
  {
    path: '/',
    component: () => import('@/views/Layout'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Home')
      },
      {
        path: 'qa',
        name: 'Qa',
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
  routes
})

export default router
