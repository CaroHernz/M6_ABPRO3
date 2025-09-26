import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
    const router = useRouter()
    const usuario = ref(JSON.parse(localStorage.getItem('usuario')) || null)
    const estaAutenticado = ref(localStorage.getItem('estaAutenticado') === 'true' || false)
    const datosUsuario = computed(()=> usuario.value)
    const isAuthenticated = computed(()=> estaAutenticado.value)

    const usuariosValidos = [
        {nombre: 'tecnochile1', correo: 'usuario@tecnochile.cl', contraseña: 'tecnochile123'},
        {nombre: 'admin', correo: 'admin@tecnochile.cl', contraseña: 'admin123'}
    ]

    const iniciarSesion = async(credenciales) => {
        const {correo,contraseña} = credenciales
        // Delay
        await new Promise(resolve => setTimeout(resolve,1000))
        // Validar credenciales
        const usuarioEncontrado = usuariosValidos.find(user=>user.correo === correo && user.contraseña === contraseña)
        if(usuarioEncontrado){
            usuario.value = {
                nombre: usuarioEncontrado.nombre,
                correo: usuarioEncontrado.correo
            }
            estaAutenticado.value = true

            localStorage.setItem('usuario', JSON.stringify(usuario.value))
            localStorage.setItem('estaAutenticado', 'true')

            return {exito:true,mensaje:'Inicio de sesión exitoso'}
        } else {
            throw new Error ('Credenciales incorrectas. Intente nuevamente.')
        }
    }
    const cerrarSesion = () => {
        usuario.value = null
        estaAutenticado.value = false
        localStorage.removeItem('usuario')
        localStorage.removeItem('estaAutenticado')
        router.push('/')
    }
    const verificarAutenticación = () => {
        return estaAutenticado.value
    }
    return{
        usuario:datosUsuario, isAuthenticated,iniciarSesion,cerrarSesion,verificarAutenticación
    }
})