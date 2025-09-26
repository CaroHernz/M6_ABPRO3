<template>
    <div class="card h-100">
    <img :src="obtenerImagen(producto)" class="card-img-top" :alt="producto.nombre">

    <div class="card-body">
        <h5 class="card-title">{{producto.nombre}}</h5>
        <p class="card-text">{{producto.descripcion}}</p>
    </div>
    <div class="card-footer bg-white border-0">
        <h4 class="text-primary mt-3">${{formatPrecio(producto.precio)}}</h4>
        <div id="'stock-indicator-' + producto.id" class="mt-2">
            <span :class="{'text-danger': producto.stock===0, 'text-success': producto.stock >0}">
                {{ producto.stock===0?'Agotado':producto.stock + ' disponibles' }}
            </span>
        </div>
        <div class="d-flex justify-content-between align-items-center mt-3">
        <div class="input-group" style="width: 9.7rem;">
            <button class="btn btn-outline-secondary minus-btn" type="button" @click="cambiarCantidad(-1)" :disabled="cantidad <=0 || producto.stock === 0">-</button>
            <input type="number" class="form-control text-center quantity-input" v-model.number="cantidad" :min="0" :max="producto.stock" step="1" :disabled="producto.stock === 0" @change="validarCantidad">
            <button class="btn btn-outline-secondary plus-btn" type="button" @click="cambiarCantidad(1)" :disabled="cantidad >= producto.stock || producto.stock  === 0">+</button>
        </div>
        <button type="button" class="btn btn-primary" @click="agregarAlCarrito" :disabled="cantidad < 1 || cantidad > producto.stock || producto.stock === 0">
            Agregar
        </button>
        </div>
    </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCartStore } from '../stores/CartStore'

const props = defineProps({
        producto: {
            type: Object,
            required: true
        }
})
const cartStore = useCartStore()
const cantidad = ref(0)

const formatPrecio = (precio) => {
    return precio.toLocaleString('es-CL');
}

const cambiarCantidad = (delta) => {
    const nuevaCantidad = cantidad.value + delta;
    if(nuevaCantidad < 0) {
        cantidad.value = 0;
    } else if (nuevaCantidad > props.producto.stock) {
        cantidad.value = props.producto.stock;
    } else {
        cantidad.value = nuevaCantidad
    }
}
const validarCantidad = ()=> {
    if(cantidad.value < 0) {
        cantidad.value = 0
    } else if (cantidad.value > props.producto.stock) {
        cantidad.value = props.producto.stock
    }
}

const agregarAlCarrito = async () => {
  try {
    await cartStore.agregarAlCarrito(props.producto, cantidad.value)
    mostrarNotificacion(`¡${cantidad.value} ${props.producto.nombre} agregado(s) al carrito!`)
    cantidad.value = 0
  } catch (error) {
    mostrarNotificacion(error.message)
  }
}

const mostrarNotificacion = (mensaje) => {
  console.log('Notificación:', mensaje)
}

const obtenerImagen = (producto) => {
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
}
    

</script>
