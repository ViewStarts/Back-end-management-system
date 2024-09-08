import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '../pages/Layout.vue'
import NotFound from '../pages/view/NotFoundComponent.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('../pages/view/HomePage.vue')
        },
        {
          path: '/product',
          name: 'product',
          component: () => import('../pages/view/ProductMannger.vue')
        },
        {
          path: '/user',
          name: 'user',
          component: () => import('../pages/view/UserMannger.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../pages/LoginPage.vue')
    },
    {
      path: '/reg',
      name: 'reg',
      component: () => import('../pages/RegisterPage.vue')
    },
    {
      path: '/:pathMatch(.*)',
      name: 'NotFound',
      component: NotFound
    }
  ]
})

export default router
