import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard'),
        name: 'dashboard'
      },
      {
        path: 'configuration',
        component: () => import('@/views/configuration'),
        name: 'configuration'
      },
      {
        path: 'tasks',
        component: () => import('@/views/tasks'),
        name: 'tasks'
      },
      {
        path: 'blocks',
        component: () => import('@/views/blocks'),
        name: 'blocks'
      },
      {
        path: 'tools',
        component: () => import('@/views/tools'),
        name: 'tools'
      }
    ]
  }

]

const router = new VueRouter({
  routes
})

export default router
