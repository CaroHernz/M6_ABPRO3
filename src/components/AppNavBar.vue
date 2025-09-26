<template>
    <v-app-bar app color="primary" class="navbar navbar-expand-md sticky-top navbar-dark bg-dark">
            <v-container class="container-fluid">
                <router-link to="/" class="navbar-brand">
                <i class="fas fa-laptop-code me-2"></i>
                <span class="ms-1">Tecno Chile</span>
                </router-link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="mainNav">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <router-link to="/" class="nav-link" active-class="active" exact-active-class="active">Inicio</router-link>                        </li>
                        <li class="nav-item">
                            <router-link to="#servicios" class="nav-link" active-class="active">Servicios</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/productos" class="nav-link" active-class="active">Productos</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="#contacto" class="nav-link" active-class="active">Contacto</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="#admin" class="nav-link" active-class="active">Admin</router-link>                        
                        </li>
                    </ul>
                    <div id="bienvenida" class="navbar-text ms-auto"></div>
                    <div class="d-flex align-items-center">
                        <a type="button" @click="abrirCarrito" id="btnCarrito" class="position-relative text-secondary">
                            <i class="fa-solid fa-cart-shopping fa-2x ms-3 me-2"></i>
                            <span v-if="totalItems > 0"
                            class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            {{ totalItems > 99 ? '99+' : totalItems }}
                            </span>
                        </a>                      
                    </div>
                </div>
            </v-container>
        </v-app-bar>
        <CartOffcanvas ref="cartOffcanvas"/>
</template>
<script setup>
import { ref, computed } from 'vue'
import { useCartStore } from '../stores/CartStore';
import CartOffcanvas from './CartOffcanvas.vue'
import { Offcanvas } from 'bootstrap'

const carritoStore = useCartStore()
const cartOffcanvas = ref(null)
const totalItems = computed(()=> carritoStore.totalItems)

const abrirCarrito=() => {
    const offcanvasElement = document.getElementById('offcanvasCarrito')
    const offcanvas = new Offcanvas(offcanvasElement)
    offcanvas.show()
}   
</script>