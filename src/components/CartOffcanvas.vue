<template>
    <div class="offcanvas offcanvas-end bg-light" tabindex="-1" id="offcanvasCarrito"
        aria-labelledby="offcanvasRightLabel" ref="offcanvasElement">
        <div class="offcanvas-header border-bottom mt-3">
            <h4 id="offcanvasRightLabel">Carrito de Compras</h4>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body" v-if="!carritoVacio">
            <div id="carrito-items">
                <table class="table" id="tabla-carrito">
                    <thead>
                        <tr>
                            <th scope="col">id</th>
                            <th scope="col">Cantidad</th>
                            <th scope="col">Producto</th>
                            <th scope="col">Precio</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in carrito" :key="item.id">
                            <td>{{ item.id }}</td>
                            <td class="text-center">
                                <div class="d-flex justify-content-center align-items-center">
                                    <button class="btn btn-outline-secondary minus-btn" type="button"
                                        @click="modificarCantidad(item.id, -1)">-</button>
                                    <span class="mx-2 cantidad-item">{{ item.cantidad }}</span>
                                    <button class="btn btn-outline-secondary plus-btn" type="button"
                                        @click="modificarCantidad(item.id, 1)">+</button>
                                </div>
                            </td>
                            <td>{{ item.nombre }}</td>
                            <td>${{ (item.precio * item.cantidad).toLocaleString('es-CL') }}</td>
                            <td><button class="btn btn-danger" @click="eliminarDelCarrito(item.id)">
                                    <i class="fa-solid fa-trash text-white"></i>
                                </button></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="py-2 border-bottom">
                <h4>Resumen de compra</h4>
            </div>
            <div id="carrito-summary" class="mt-3">
                <p><strong>Valor Neto:</strong> ${{resumenCompra.neto.toLocaleString('es-CL')}}</p>
                <p><strong>IVA 19%:</strong> ${{resumenCompra.iva.toLocaleString('es-CL')}}</p>
                <p v-if="resumenCompra.despacho > 0"><strong>Despacho:</strong> ${{resumenCompra.despacho.toLocaleString('es-CL')}}</p>
                <p v-else><strong>Despacho: ¡Envío gratis!</strong></p>
                <p><strong>Valor Total:</strong> ${{resumenCompra.total.toLocaleString('es-CL')}}</p>

                <div class="d-flex justify-content-around">
                    <button type="button" class="btn btn-danger mb-5" @click="vaciarCarrito">Vaciar Carrito</button>
                    <button type="button" class="btn btn-success mb-5" data-bs-toggle="modal"
                        data-bs-target="#finalizarModal">Finalizar Compra</button>
                </div>
            </div>
        </div>

        <div v-else class="alert text-center">
            <i class="fas fa-shopping-cart fa-2x mb-2"></i>
            <h4>Tu carrito está vacío</h4>
            <p>Agrega productos para comenzar tu compra</p>
            <router-link to="/productos" class="btn btn-primary" @click="cerrarOffcanvas">Ver catálogo</router-link>
        </div>
    </div>
<!-- Modal de Finalizar Compra -->
    <div class="modal fade" id="finalizarModal" tabindex="-1" role="dialog"
        aria-labelledby="finalizarModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="finalizarModalLabel">Compra finalizada</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                    </button>
                </div>
                <div class="modal-body bg-light ">
                    ¡Tu compra ha finalizado con éxito!
                    <div class="mt-3" v-if="productosAgotados.length > 0">
                        <p class="text-warning"><strong>Productos agotados:</strong></p>
                        <ul>
                            <li v-for="producto in productosAgotados" :key="producto">{{ producto }}</li>
                        </ul>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-success" @click="confirmarCompra">Aceptar</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import {useCartStore} from '../stores/CartStore'
import {computed,ref,onMounted} from 'vue'
import {Offcanvas,Modal} from 'bootstrap'

const carritoStore = useCartStore()
const productosAgotados = ref([])
const offcanvasElement = ref(null)
let offcanvasInstance = null

const carrito = computed(()=> carritoStore.carrito)
const carritoVacio = computed(()=> carritoStore.carritoVacio)
const resumenCompra = computed(()=> carritoStore.resumenCompra)

onMounted(()=> {
    offcanvasInstance = new Offcanvas(offcanvasElement.value)
})

const modificarCantidad = (productoId,delta) => {
    try{
        carritoStore.modificarCantidad(productoId,delta)
    } catch (error){
        mostrarNotificacion(error.message)
    }
}

const eliminarDelCarrito = (productoId) => {
    carritoStore.eliminarDelCarrito(productoId)
    mostrarNotificacion('Producto eliminado del carrito')
}

const vaciarCarrito = ()=> {
    carritoStore.vaciarCarrito()
    mostrarNotificacion('Carrito vaciado')
}

const confirmarCompra=() => {
    productosAgotados.value = carritoStore.finalizarCompra()
    const modalElement = document.getElementById('finalizarModal')
    const modalInstance = Modal.getInstance(modalElement)
    modalInstance.hide()
    offcanvasInstance.hide()
    mostrarNotificacion('Compra finalizada con éxito')
}

const cerrarOffcanvas =() =>{
    offcanvasInstance.hide()
}

const mostrarNotificacion = (mensaje) => {
    console.log('Notificación:', mensaje)
}
</script>