<template>
    <div class="card h-100">
    <img :src="producto.imagen" class="card-img-top" :alt="producto.nombre">
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
            <input type="number" class="form-control text-center quantity-input" v-model.number="cantidad" :min="0" :max="producto.stock" step="1" :disabled="producto.stock === 0">
            <button class="btn btn-outline-secondary plus-btn" type="button" @click="cambiarCantidad(1)" :disabled="cantidad >= producto.stock || producto.stock  === 0">+</button>
        </div>
        <button type="button" class="btn btn-primary" @click="agregaCarrito" :disabled="cantidad ===0 || producto.stock ===0">
            Agregar
        </button>
        </div>
    </div>
    </div>
</template>

<script>
export default {
    name: 'CardProduct',
    props: {
        producto: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            cantidad:0
        }
    },
    methods: {
        formatPrecio(precio) {
            return precio.toLocaleString('es-CL');
        },
        cambiarCantidad(delta) {
            const nuevaCantidad = this.cantidad + delta;
            if(nuevaCantidad < 0) {
                this.cantidad = 0;
            } else if (nuevaCantidad > this.producto.stock) {
                this.cantidad = this.producto.stock;
            } else {
                this.cantidad = nuevaCantidad
            }
        },
        agregaCarrito() {
            if(this.cantidad >0) {
                this.$emit('agregar-al-carrito', {
                    id: this.producto.id,
                    cantidad: this.cantidad,
                    producto: this.producto
                });
                this.cantidad = 0;
            }
        }
    }
}
</script>
