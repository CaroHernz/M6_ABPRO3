<template>
    <section class="product-section py-5">
        <div class="container">
            <h2 class="text-center mb-5">Catálogo de Productos</h2>
            <div class="row mb-4">
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
            <div class="row">
                <div class="col-md-6 col-lg-4 mb-4" v-for="producto in productosFiltrados" :key="producto.id">
                    <CardProduct :producto="producto" @agregar-al-carrito="agregarCarrito" />
                </div>
            </div>
            <div class="text-center py-5" v-if="productosFiltrados.length ===0">
                <i class="fas fa-search fa-3x text-muted mb-3"></i>
                <h4 class="text-muted">No se encontraron productos</h4>
                <p class="text-muted">Intenta con otros términos de búsqueda</p>
            </div>
        </div>
    </section>
</template>
<script>
import CardProduct from './CardProduct.vue';
export default {
    name:'ProductPage',
    components: {
        CardProduct
    },
    data() {
        return {
            busqueda:'',
            categoriaFiltro:'',
            productos: [
               {
            id: 1,
            imagen: "./public/product1.jpeg",
            nombre: "Robot Aspirador X300",
            descripcion: "Aspiradora inteligente con mapeo láser y app control. Ideal para pisos de hasta 120m².",
            precio: 249990,
            stock: 5,
            categoria: "Electrohogar"
        },
        {
            id: 2,
            imagen: "./public/product2.jpeg",
            nombre: "Airfryer Digital 5L",
            descripcion: "Freidora de aire con 8 programas preestablecidos y tecnología 360° para cocción uniforme.",
            precio: 89990,
            stock: 7,
            categoria: "Electrohogar"        
        },
        {
            id: 3,
            imagen: "./public/product3.jpeg",
            nombre: "Smartwatch Deportivo Pro",
            descripcion: "Monitor de ritmo cardíaco, GPS integrado y resistencia al agua 50m. Batería de 7 días.",
            precio: 129990,
            stock: 15,
            categoria: "Tecnología"
        } 
            ]
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
        agregarCarrito(item) {
            console.log('producto agregado: ', item);
            this.$emit('agregar-al-carrito',item)
            alert(`¡${item.cantidad} ${item.producto.nombre} agregado(s) al carrito!`)
        }
    }
}
</script>