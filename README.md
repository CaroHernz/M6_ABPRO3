<h1 align= "center"> Tecno Chile </h1>
<h2 align= "center"> Adaptación a Vue.js </h2>

## Contexto
La empresa **Tecno Chile** es una empresa que busca vender sus productos en línea, por lo cual se diseña un prototipo funcional como primera solución.
Se desarrolla una solución tecnológica que cubre los procesos del negocio.

Este proyecto consiste en la adaptación de una aplicación web tradicional (HTML, CSS y JavaScript) al framework Vue.js, aprovechando sus ventajas en cuanto a componentización, reactividad y organización del código.
	
### 🚀 Características del Proyecto
- **Componentización:** La interfaz se ha dividido en componentes Vue reutilizables
- **Reactividad:** Implementación del sistema reactivo de Vue para una UI dinámica
- **Vue Router:** Navegación entre vistas mediante rutas definidas
- **Composition API:** Uso de la API de composición para una mejor organización del código
- **Estado centralizado:** Gestión del estado de la aplicación mediante Pinia

### 📌 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── ProductSection.vue  # Sección de novedades
│   ├── CardProduct.vue     # Card de producto
│   ├── AppNavBar.vue       # Barra de navegación
│   └── AppFooter.vue       # Pie de página
├── views/               # Vistas/páginas
│   ├── HomeView.vue     # Página principal
│   └── ProductPage.vue  # Catálogo de productos
├── router/              # Configuración de rutas
│   └── index.js         # Definición de rutas
└── App.vue              # Componente principal
```

### 🔧 Instalación y Configuración
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

### 🛠️ Tecnologías Utilizadas
- **Frontend:** HTML5, CSS, JavaScript (ES Modules)
- **Control de Versiones:** Git & GitHub
- **Framework CSS:** Bootstrap 5.3.7
- Vue 3 - Framework principal
- Vue Router - Enrutamiento
- Font Awesome - Iconografía
  
### ⚡ Funcionalidades Implementadas
1. Visualización de productos - Listado y detalle
2. Filtrado por categoría - Interfaz para filtrar productos
3. Conversión de moneda - Precios en CLP y USD
4. Diseño responsive - Adaptable a diferentes dispositivos
5. Navegación SPA - Sin recarga de página entre vistas
   
### Responsables
<h4 align="center"> 
  <a href="https://github.com/CaroHernz">Carolina Hernández</a> | 
	<a href="https://github.com/gurrutia15">Gonzalo Urrutia</a> | 
	<a href="https://github.com/jlmansilla">Juan Luis Mansilla</a> | 
	<a href="https://github.com/lcarrilloq">Luis Carrillo</a> | 
</h4>

