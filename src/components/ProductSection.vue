<template>
  <section id="novedades" class="tecno__productos p-5 bg-light">
    <div class="container text-center p-3 tecno__section-title">
        <h2 class="text-center mb-1 tecno__section-title">Novedades</h2>
    </div>

    <div v-if="cargando" class="py-5" >
      <div class="loading-spinner"></div>
        <p class="mt-2">Cargando novedades...</p>
        </div>
    <div v-else-if="error" class="alert alert-warning">
        <i class="fas fa-exclamation-triangle me-2"></i>
        {{ error }}
        <button @click="cargarProductos" class="btn btn-sm btn-outline-warning ms-2">
            Reintentar
        </button>
    </div>
    <div v-else id="novedades_productos" class="row cards d-flex my-3 pt-3 justify-content-evenly">
      <div v-for="producto in productos" :key="producto.id" class="col-4 mb-4">
        <div class="card h-100 product-card">
        <img :src="obtenerImagen(producto)" class="card-img-top" :alt="producto.nombre">
        <div class="card-body">
          <h5 class="card-title">{{producto.nombre}}</h5>
          <p class="card-text">{{producto.descripcion}}</p>
        </div>
        <div class="card-footer bg-white border-0">
          <h4 class="text-primary mt-3">{{producto.precio.toLocaleString('es-CL')}}</h4>
          <div class="d-flex justify-content-end align-items-center">
            <a :href="'/productos#' + producto.id" class="btn btn-outline-primary">
              Ver más...
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="!cargando && !error" class="mt-4 text-center">
      <a href="/productos" class="btn btn-outline-primary btn-lg">
          Ver todos los productos <i class="fas fa-arrow-right ms-2"></i>
      </a>
  </div>
  </section>
</template>
<script>
export default {
    name:'NovedadesSection',
    data() {
        return {
            productos: [],
            cargando: true,
            error:null,
        }
    },
    methods: {
      obtenerImagen(producto) {
        const corregirRutaImagen = (rutaOriginal) => {
            if(rutaOriginal.startsWith('http://') || rutaOriginal.startsWith('https://')) {
                return rutaOriginal;
            }
            if (rutaOriginal.includes('assets/')) {
                return rutaOriginal.replace('assets/images/', '');
            }
            if(rutaOriginal.startsWith('./')) {
                return rutaOriginal.replace('./assets/images/', '')
            }
            return rutaOriginal
        }
        return corregirRutaImagen(producto.imagen)
        },
      async cargarProductos(){
        this.cargando = true;
        this.error = null;
          try {
            const response = await fetch('http://localhost:3000/api/productos');
            if (!response.ok) {
              throw new Error('Error al cargar productos: ' + response.status);
            }
            const data = await response.json();
            this.productos = data.slice(0,3)
            } catch (err) {
                console.error("Error fetching products:", err);
                this.error.value = "No se pudieron cargar los productos" + err.message
            } finally {
                this.cargando = false
            }
        },
        formatPrecio(precio) {
            return precio.toLocaleString('es-CL');
        }
    },
    mounted() {
        this.cargarProductos();
    }
}
</script>
<style scoped>
.product-card {
    transition: transform 0.3s, box-shadow 0.3s;
    border: none;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
    height: 100%;
}
.product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}
.loading-spinner {
    display: inline-block;
    width: 2rem;
    height: 2rem;
    vertical-align: text-bottom;
    border: 0.25em solid currentColor;
    border-right-color: transparent;
    border-radius: 50%;
    animation: spinner-border 0.75s linear infinite;
    color: #4e73df;
}
@keyframes spinner-border {
    to { transform: rotate(360deg); }
}
</style>