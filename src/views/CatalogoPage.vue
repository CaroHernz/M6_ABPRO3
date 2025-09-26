<template>
    <div>
        <section class="product-section py-5">
        <div class="container">
            <h2 class="text-center mb-5">Catálogo de Productos</h2>

            <div class="alert alert-info d-flex align-items-center" v-if="cargando">
                <div class="loading-spinner me-2"></div>
                <div>Cargando productos...</div>
            </div>
                        
            <div class="alert alert-warning" v-if="error">
                <i class="fas fa-exclamation-triangle me-2"></i> 
                {{ error }}
                <button class="btn btn-sm btn-outline-warning ms-2" @click="cargarProductos">Reintentar</button>
            </div>

            <div class="row mb-4" v-if="!cargando && !error">
                <div class="col-md-6">
                    <div class="input-group">
                        <span class="input-group-text">
                            <i class="fas fa-search"></i>
                        </span>
                        <input type="text"
                        class="form-control"
                        placeholder="Buscar productos..."
                        v-model="busqueda">
                    </div>
                </div>
                <div class="col-md-6">
                    <select class="form-select" v-model="categoriaFiltro">
                        <option value="">Todas las categorías</option>
                        <option v-for="categoria in categoriasUnicas" :key="categoria" :value="categoria">{{ categoria }}</option>
                    </select>
                </div>
            </div>
            <div class="row" v-if="!cargando && !error">
                <div class="col-md-6 col-lg-4 mb-4" v-for="producto in productosFiltrados" :key="producto.id">
                    <CardProduct :producto="producto" @agregar-al-carrito="agregarCarrito" />
                </div>
            </div>
            <div class="text-center py-5" v-if="!cargando && productosFiltrados.length ===0">
                <i class="fas fa-search fa-3x text-muted mb-3"></i>
                <h4 class="text-muted">No se encontraron productos</h4>
                <p class="text-muted">Intenta con otros términos de búsqueda</p>
            </div>
        </div>
    </section>
    <div class="toast-container position-fixed top-0 end-0 p-3">
        <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true" ref="toastElement">
            <div class="toast-header">
                <i class="fas fa-check-circle text-success me-2"></i>
                <strong class="me-auto">Carrito</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                {{ mensajeToast }}
            </div>
        </div>
    </div>
    </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCartStore } from '../stores/CartStore'
import CardProduct from '../components/CardProduct.vue'
import { Toast } from 'bootstrap'

const cartStore = useCartStore()

const busqueda = ref('')
const categoriaFiltro = ref('')
const productos = ref([])
const cargando = ref(true)
const error = ref(null)
const mensajeToast = ref('')
const toastElement = ref(null)
let toastInstance = null

const apiUrl = 'http://localhost:3000/api/productos'

const categoriasUnicas = computed(() => {
    return [...new Set(productos.value.map(p => p.categoria))]
})

const productosFiltrados = computed(() => {
    let filtrados = productos.value
    
    if (busqueda.value) {
        const busquedaLower = busqueda.value.toLowerCase()
        filtrados = filtrados.filter(producto => 
            producto.nombre.toLowerCase().includes(busquedaLower) || 
            producto.descripcion.toLowerCase().includes(busquedaLower)
        )
    }
    
    if (categoriaFiltro.value) {
        filtrados = filtrados.filter(producto => producto.categoria === categoriaFiltro.value)
    }
    
    return filtrados
})

const cargarProductos = async () => {
    cargando.value = true
    error.value = null
    
    try {
        const response = await fetch(apiUrl)
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`)
        }
        const data = await response.json()
        productos.value = data
        cartStore.setProductos(data)
        cartStore.cargarStocks() 
    } catch (err) {
        console.error("Error fetching products:", err)
        error.value = err.message
    } finally {
        cargando.value = false
    }
}

const manejarAgregarCarrito = async (evento) => {
    try {
        const { producto, cantidad } = evento
        await cartStore.agregarAlCarrito(producto, cantidad)
        mostrarNotificacion(`¡${cantidad} ${producto.nombre} agregado(s) al carrito!`)
        
    } catch (error) {
        mostrarNotificacion(error.message, 'error')
    }
}

const mostrarNotificacion = (mensaje, tipo = 'success') => {
    mensajeToast.value = mensaje
    const toast = toastElement.value
    if (toast) {
        const headerIcon = toast.querySelector('.toast-header i')
        if (tipo === 'error') {
            headerIcon.className = 'fas fa-exclamation-circle text-danger me-2'
        } else {
            headerIcon.className = 'fas fa-check-circle text-success me-2'
        }
        
        if (!toastInstance) {
            toastInstance = new Toast(toast)
        }
        toastInstance.show()
    }
}

onMounted(() => {
    cargarProductos()
        if (toastElement.value) {
        toastInstance = new Toast(toastElement.value)
    }
})
</script>