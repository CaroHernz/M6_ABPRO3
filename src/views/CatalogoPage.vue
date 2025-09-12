<template>
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
</template>
<script>
import CardProduct from '../components/CardProduct.vue'

export default {
    name:'ProductPage',
    components: {
        CardProduct
    },
    data() {
        return {
            busqueda:'',
            categoriaFiltro:'',
            productos: [],
            cargando: true,
            error:null,
            apiUrl: 'http://localhost:3000/api/productos'
        }
    },
    computed: {
        categoriasUnicas(){
            return [...new Set(this.productos.map(p=>p.categoria))]
        },
        productosFiltrados() {
            let filtrados = this.productos;
            if (this.busqueda) {
                const busquedaLower = this.busqueda.toLowerCase();
                filtrados = filtrados.filter(producto => 
                    producto.nombre.toLowerCase().includes(busquedaLower) || producto.descripcion.toLowerCase().includes(busquedaLower)
                )
            }
            if (this.categoriaFiltro) {
                filtrados = filtrados.filter(producto => producto.categoria === this.categoriaFiltro)
            }
            return filtrados
        }
    },
    methods: {
        async cargarProductos(){
            this.cargando = true;
            this.error = null;
            this.apiStatus = "Conectando con la API..."

            try {
                const response = await fetch(this.apiUrl);
                if(!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }
                const data = await response.json();
                this.productos = data;                
            } catch (err) {
                console.error("Error fetching products:", err);
                this.error = err.message;
                this.apiStatus = "Error de conexión. Mostrando datos de demostración.";            
            } finally {
                this.cargando = false
            }
        },
        agregarCarrito(item) {
            console.log('producto agregado: ', item);
            this.$emit('agregar-al-carrito',item);

            const alertDiv = document.createElement('div');
            alertDiv.className='alert alert-success position-fixed top-0 end-0 m-3';
            alertDiv.style.zIndex = '1050';
            alertDiv.innerHTML = `
                <i class="fas fa-check-circle me-2"></i>
                <strong>¡${item.cantidad} ${item.producto.nombre} agregado(s) al carrito!</strong>
            `;
            document.body.appendChild(alertDiv);

            setTimeout(() => {
                alertDiv.remove()
            }, 3000)
        }
    },
    mounted() {
        this.cargarProductos();
    }
}
</script>