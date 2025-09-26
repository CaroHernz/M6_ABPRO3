<h1 align= "center"> Tecno Chile </h1>
<h2 align= "center"> Adaptación a Vue.js </h2>

## Descripción
La empresa **Tecno Chile** es una plataforma de e-commerce moderna desarrollada con Vue.js que permite la venta en línea de productos tecnológicos. Este proyecto representa la migración exitosa de una aplicación web tradicional (HTML, CSS y JavaScript) hacia una arquitectura moderna basada en componentes Vue.js, aprovechando las ventajas de la reactividad, componentización y gestión de estado centralizado.
	
### 🚀 Características del Proyecto
- **Sistema de Compras**
	- Catálogo de productos con filtrado por categorías y búsqueda
	- Carrito de compras persistente con offcanvas
	- Gestión de cantidades (incrementar/decrementar/eliminar)
	- Cálculo automático de IVA, despacho y totales
	- Validación de stock en tiempo real
	- Proceso de checkout simulado

- **Sistema de Autenticación**
	- Registro e inicio de sesión de usuarios
	- Persistencia de sesión con localStorage
	- Interfaz adaptativa (Login/Logout en navbar)
	- Protección de rutas básica
	- Datos de usuario en sesión

- **Experiencia de Usuario**
	- Interfaz responsive con Bootstrap 5.3.7
	- Iconografía con Font Awesome
	- Transiciones suaves entre vistas
	- Notificaciones toast para acciones del usuario
	- Estados de carga y manejo de errores

### 📌 Estructura del Proyecto

```
src/
├── components/              	# Componentes reutilizables
│   ├── CardProduct.vue      	# Tarjeta de producto individual
│   ├── CartOffcanvas.vue 		# Carrito de compras deslizable
│   ├── AppNavBar.vue          	# Barra de navegación con autenticación
│   ├── HeroSection.vue     	# Sección hero de la página principal
│   ├── ProductSection.vue  	# Sección de productos destacados
│   ├── ServiceSection.vue  	# Sección de servicios
│   ├── ContactForm.vue     	# Formulario de contacto
│   ├── SuscriptionSection.vue 	# Sección de suscripción
│   └── AppFooter.vue       	# Pie de página
├── views/                  	# Vistas/páginas principales
│   ├── Inicio.vue        		# Página de inicio
│   ├── CatalogoPage.vue    	# Catálogo completo de productos
│   └── LoginPage.vue       	# Página de autenticación
├── stores/                 	# Gestión de estado con Pinia
│   ├── CartStore.js        	# Estado del carrito de compras
│   └── authStore.js        	# Estado de autenticación
├── router/                 	# Configuración de rutas
│   └── index.js           		# Definición de rutas y navegación
└── App.vue                		# Componente raíz de la aplicación
```

### 🛠️ Tecnologías Utilizadas
- **Frontend:** HTML5, CSS, JavaScript (ES Modules)
- **Control de Versiones:** Git & GitHub
- **Framework Frontend:** Vue.js 3
- **Framework CSS:** Bootstrap 5.3.7
- **Enrutamiento:** Vue Router 4
- **Gestión de Estado:** Pinia
- Font Awesome - Iconografía

### 🔧 Instalación y Configuración

#### Prerequisitos: API de Productos 
El proyecto requiere una API local para obtener los productos:

`````
git clone https://github.com/jlmansilla/proxy-server
cd proxy-superhero
npm install
npm start #El servidor correrá en: http://localhost:3000
`````
#### Instalación del Proyecto

1. Clonar repositorio
   
```
git clone https://github.com/CaroHernz/M6_ABPRO3
cd M6AE3-ABPRO3
```

2. Instalar dependencias

```
npm install
```

3. Ejecutar en modo desarrollo

```
npm run dev
```

### ⚡ Funcionalidades Implementadas
**🔐 Autenticación de Usuarios**
* Formulario de login con validación
* Persistencia de sesión entre recargas
* Logout seguro con limpieza de datos
* Estado visual en navbar según autenticación

**🛒 Sistema de Carrito de Compras**
* Agregar productos con selección de cantidad
* Modificar cantidades directamente en el carrito
* Eliminar productos individualmente
* Vaciar carrito completamente
* Cálculo automático de: valor neto, IVA (19%), costo de despacho (5% o gratis sobre $100.000) y Total

**📦 Gestión de Productos**
* Catálogo dinámico desde API REST
* Búsqueda en tiempo real por nombre/descripción
* Filtrado por categorías
* Indicadores de stock (disponible/agotado)
* Validación de cantidades según stock disponible

**🎨 Experiencia de Usuario**
* Interfaz responsive adaptada a móviles y desktop
* Notificaciones toast para acciones importantes
* Estados de carga durante peticiones HTTP
* Manejo de errores con mensajes descriptivos
* Transiciones suaves entre vistas

#### 👥 Datos de Prueba**

**Credenciales de Acceso**

```
Correo: usuario@tecnochile.cl
Contraseña: tecnochile123
```

**🚦 Flujo de Uso Típico**
* Navegación inicial: El usuario accede a la página de inicio
* Autenticación: Click en "Iniciar Sesión" en el navbar
* Exploración: Navegación al catálogo de productos
* Selección: Agregar productos al carrito con cantidades específicas
* Revisión: Visualización del carrito con resumen de compra
* Finalización: Proceso de checkout simulado

## 🔧 Personalización y Extensión
El proyecto está estructurado para facilitar extensiones futuras:

* Nuevas vistas: Agregar en /views/ y configurar rutas
* Componentes: Crear en /components/ para reutilización
* Store modules: Extender Pinia stores para nueva funcionalidad
* API integration: Modificar servicios en /services/


## 🎯 Objetivos Cumplidos
	✅ Migración completa a Vue.js 3 con Composition API
	✅ Sistema de autenticación de usuarios integrado
	✅ Carrito de compras funcional con persistencia
	✅ Gestión de estado centralizada con Pinia
	✅ Routing con Vue Router para SPA
	✅ Diseño responsive con Bootstrap 5
	✅ Experiencia de usuario mejorada con transiciones


### Responsables
<h4 align="center"> 
  <a href="https://github.com/CaroHernz">Carolina Hernández</a> | 
	<a href="https://github.com/gurrutia15">Gonzalo Urrutia</a> | 
	<a href="https://github.com/jlmansilla">Juan Luis Mansilla</a> | 
	<a href="https://github.com/lcarrilloq">Luis Carrillo</a> | 
</h4>

