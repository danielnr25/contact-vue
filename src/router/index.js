import { createRouter, createWebHistory } from 'vue-router'
import Contacts from '@/views/Contacts.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name:'Contacts',
      component:Contacts
    },
    
  ]
})

export default router
