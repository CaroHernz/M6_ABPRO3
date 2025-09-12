import { createRouter, createWebHistory } from 'vue-router'
import Inicio from '../views/Inicio.vue'
import Catalogo from '../views/CatalogoPage.vue'


const routes = [
  {
    path: '/',
    name: 'Inicio',
    component: Inicio
  },
  {
    path: '/home',
    redirect: '/' 
  },
  {
    path: '/productos',
    name: 'Catálogo',
    component: Catalogo
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router