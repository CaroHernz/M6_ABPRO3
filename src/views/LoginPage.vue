<template>
  <div class="login-page min-vh-100 d-flex align-items-center justify-content-center bg-light py-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-4 col-lg-6">
          <div class="card shadow-lg">
            <div class="card-header bg-primary text-white text-center py-4">
              <h2 class="mb-0">
                <i class="fas fa-lock me-2 text-white"></i>Iniciar Sesión
              </h2>
              <p class="mb-0 mt-2">Accede a tu cuenta de TecnoChile</p>
            </div>
            
            <div class="card-body p-4">
              <form @submit.prevent="handleLogin" novalidate :class="{ 'was-validated': formSubmitted }">

                <div class="mb-3">
                  <label for="nombre" class="form-label">Nombre Completo</label>
                  <input type="text" class="form-control" id="nombre" 
                         v-model="formData.nombre" required>
                  <div class="invalid-feedback">Por favor ingresa tu nombre</div>
                </div>

                <div class="mb-3">
                  <label for="correo" class="form-label">Correo Electrónico</label>
                  <input type="email" class="form-control" id="correo" 
                         v-model="formData.correo" required>
                  <div class="invalid-feedback">Por favor ingresa un correo válido</div>
                </div>

                <div class="mb-4">
                  <label for="contraseña" class="form-label">Contraseña</label>
                  <input type="password" class="form-control" id="contraseña" 
                         v-model="formData.contraseña" required minlength="6">
                  <div class="invalid-feedback">La contraseña debe tener al menos 6 caracteres</div>
                </div>

                <button type="submit" class="btn btn-primary w-100 py-2" :disabled="cargando">
                  <span v-if="cargando" class="spinner-border spinner-border-sm me-2"></span>
                  {{ cargando ? 'Iniciando sesión...' : 'Iniciar Sesión' }}
                </button>

                <div v-if="error" class="alert alert-danger mt-3 mb-0 text-center">
                  <i class="fas fa-exclamation-triangle me-2"></i>{{ error }}
                </div>
              </form>

              <div class="mt-4 p-3 bg-light rounded">
                <h6 class="text-muted">Datos de prueba:</h6>
                <small class="text-muted">
                  <strong>Nombre:</strong> tecnochile1<br>
                  <strong>Correo:</strong> usuario@tecnochile.cl<br>
                  <strong>Contraseña:</strong> tecnochile123
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const router = useRouter()

const formData = ref({
  nombre: '',
  correo: '',
  contraseña: ''
})

const cargando = ref(false)
const error = ref('')
const formSubmitted = ref(false)

const handleLogin = async () => {
  formSubmitted.value = true
  error.value = ''

  // Validación básica del formulario
  if (!formData.value.nombre || !formData.value.correo || !formData.value.contraseña) {
    error.value = 'Por favor completa todos los campos'
    return
  }

  if (formData.value.contraseña.length < 6) {
    error.value = 'La contraseña debe tener al menos 6 caracteres'
    return
  }

  cargando.value = true

  try {
    const resultado = await authStore.iniciarSesion(formData.value)
    
    if (resultado.exito) {
      // Redirigir al home después de login exitoso
      router.push('/')
    }
  } catch (err) {
    error.value = err.message
  } finally {
    cargando.value = false
  }
}
</script>

<style scoped>
.login-page {
  min-height: 80vh;
}

.card {
  border: none;
  border-radius: 15px;
}

.card-header {
  border-radius: 15px 15px 0 0 !important;
}

.form-control:focus {
  border-color: #0d6efd;
  box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
}

.btn-primary {
  background: linear-gradient(45deg, #0d6efd, #0dcaf0);
  border: none;
  border-radius: 25px;
  font-weight: 600;
}

.btn-primary:hover {
  transform: translateY(-2px);
  transition: all 0.3s ease;
}

.spinner-border-sm {
  width: 1rem;
  height: 1rem;
}
</style>