import { createRouter, createWebHistory } from 'vue-router'
import Contacts from '@/views/Contacts.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name:'contacts',
      component:Contacts
    },
    {
      path: '/nuevo',
      name:'nuevo',
      component: () => import('@/views/admin/Create.vue')
    },
    {
      path: '/editar/:id',
      name:'editar',
      component: () => import('@/views/admin/Edit.vue')
    },
  ]
})

export default router
