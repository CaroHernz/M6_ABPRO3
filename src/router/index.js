import { createRouter, createWebHistory } from 'vue-router'
import Inicio from '../views/Inicio.vue'
import Catalogo from '../views/CatalogoPage.vue'
import Login from '../views/LoginPage.vue'

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
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      requiereNoAutenticacion: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const estaAutenticado = localStorage.getItem('estaAutenticado') === 'true'
  
  // Si la ruta requiere no estar autenticado y el usuario ya está autenticado
  if (to.meta.requiereNoAutenticacion && estaAutenticado) {
    next('/') // Redirigir al home
  } else {
    next() // Continuar
  }
})

export default router