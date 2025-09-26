import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('carrito', ()=> {
    const carrito = ref(JSON.parse(localStorage.getItem('carrito')) || [])
    const arrProductos = ref([])

    const itemsCarrito = computed(()=> carrito.value)
    const totalItems = computed(()=> carrito.value.reduce((sum,item)=> sum+item.cantidad,0))
    const carritoVacio = computed(()=> carrito.value.length === 0)
    const resumenCompra = computed(()=> {
        const neto = carrito.value.reduce((sum,item)=> sum+item.cantidad * item.precio, 0)
        const iva = Math.trunc(neto*0.19)
        const despacho = neto <100000 ? Math.trunc(neto*0.05) : 0
        const total = neto + iva + despacho
        
        return {neto,iva,despacho,total}
    })

    const agregarAlCarrito = (producto,cantidad) => {
        if (cantidad < 1 || !Number.isInteger(cantidad)) {
            throw new Error ('La cantidad debe ser un número entero mayor que 0')
        }
        if (cantidad > producto.stock) {
            throw new Error (`Solo hay ${producto.stock} disponible(s)`)
        }
        const itemExistente = carrito.value.find(item=>String(item.id) === String(producto.id))

        if(itemExistente) {
            const nuevaCantidadTotal = itemExistente.cantidad + cantidad
            if(nuevaCantidadTotal > producto.stock) {
                throw new Error(`No hay suficiente stock. Máximo disponible: ${producto.stock}`)
            }
            itemExistente.cantidad = nuevaCantidadTotal
        } else {
            carrito.value.push({
                ...producto, cantidad: cantidad
            })
        }
        guardarEnLocalStorage()
    }

    const modificarCantidad = (productoId,delta) => {
        const productoEnCarrito = carrito.value.find(item=>String(item.id)===String(productoId))
        if(!productoEnCarrito){
            throw new Error('Producto no encontrado en el carrito')
        }
        const productoOriginal = arrProductos.value.find(p=>String(p.id)=== String(productoId))
        if(!productoOriginal){
            throw new Error('Producto no encontrado')
        }
        const nuevaCantidad = productoEnCarrito.cantidad + delta
        if(nuevaCantidad < 1){
            eliminarDelCarrito(productoId)
            return
        }
        if(nuevaCantidad > productoOriginal.stock){
            throw new Error(`No hay suficiente stock. Máximo disponible: ${productoOriginal.stock}`)
        }
        productoEnCarrito.cantidad = nuevaCantidad
        guardarEnLocalStorage()
    }

    const eliminarDelCarrito = (productoId) => {
        carrito.value = carrito.value.filter(item => String(item.id) !== String(productoId))
        guardarEnLocalStorage()
    }

    const vaciarCarrito = () => {
        carrito.value = []
        localStorage.removeItem('carrito')
    }

    const finalizarCompra = () => {
        const productosAgotados = []
        carrito.value.forEach(citem => {
            const producto = arrProductos.value.find(p=>String(p.id)===String(citem.id))
            if(producto) {
                producto.stock -= citem.cantidad
                if(producto.stock === 0){
                    productosAgotados.push(producto.nombre)
                }
            }
        })
        const stockActualizados = {}
        arrProductos.value.forEach(producto => {
            stockActualizados[producto.id] = producto.stock
        })
        localStorage.setItem('stocks', JSON.stringify(stockActualizados))
        vaciarCarrito()
        return productosAgotados
    }

    const guardarEnLocalStorage = () => {
        localStorage.setItem('carrito', JSON.stringify(carrito.value))
    }

    const setProductos = (productos) => {
        arrProductos.value = productos
    }

    const cargarStocks = () => {
        const stockGuardados = localStorage.getItem('stocks')
        if(stockGuardados && arrProductos.value.length > 0) {
            const stocks = JSON.parse(stockGuardados)
            arrProductos.value.forEach(producto => {
                if(stocks[producto.id] !== undefined) {
                    producto.stock = stocks[producto.id]
                }
            })
        }
    }

    return{
        carrito: itemsCarrito, totalItems, carritoVacio,resumenCompra,
        agregarAlCarrito,eliminarDelCarrito,modificarCantidad,
        vaciarCarrito,finalizarCompra,setProductos, cargarStocks
    }
})