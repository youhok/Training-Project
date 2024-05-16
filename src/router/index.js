import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const route = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/employee',
    name: 'employee',
    component: () => import('../views/employee.vue')
  },
  {
    path: '/customer',
    name: 'customer',
    component: () => import('../views/customer.vue')
  }
];



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: route,
})

export default router
