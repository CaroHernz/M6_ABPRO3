<template>
    <section id="novedades" class="tecno__productos pt-3 bg-light">
            <div class="container text-center p-3 tecno__section-title">
                <h2 class="text-center mb-1 tecno__section-title">Novedades</h2>
                <div id="novedades_productos" class="row cards d-flex my-3 py-3 justify-content-evenly"></div>
            </div>
        </section>
</template>
<script setup>
    const productos = [
        {
            "id": 1,
            "imagen": "./public/product1.jpeg",
            "nombre": "Robot Aspirador X300",
            "descripcion": "Aspiradora inteligente con mapeo láser y app control. Ideal para pisos de hasta 120m².",
            "precio": 249990,
            "stock": 5,
            "categoria": "Electrohogar",
            "etiquetas": ["smart", "limpieza", "automático"]
        },
        {
            "id": 2,
            "imagen": "./public/product2.jpeg",
            "nombre": "Airfryer Digital 5L",
            "descripcion": "Freidora de aire con 8 programas preestablecidos y tecnología 360° para cocción uniforme.",
            "precio": 89990,
            "stock": 7,
            "categoria": "Electrohogar",
            "etiquetas": ["cocina", "saludable", "digital"]
        },
        {
            "id": 3,
            "imagen": "./public/product3.jpeg",
            "nombre": "Smartwatch Deportivo Pro",
            "descripcion": "Monitor de ritmo cardíaco, GPS integrado y resistencia al agua 50m. Batería de 7 días.",
            "precio": 129990,
            "stock": 15,
            "categoria": "Tecnología",
            "etiquetas": ["deporte", "smart", "salud"]
        }
    ]
function novedadesProductos(productos) {
  const novProductos = document.getElementById('novedades_productos');
  if (!novProductos) {
    console.error('No se encontró #novedades_productos');
    return;
  }
  novProductos.innerHTML = '';
    productos.forEach(producto => {
    const col = document.createElement('div');
    col.className = 'col-sm-12 col-md-4 mb-4';
    col.innerHTML = `
      <div class="card h-100">
        <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
        <div class="card-body">
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="card-text">${producto.descripcion}</p>
        </div>
        <div class="card-footer bg-white border-0">
          <h4 class="text-primary mt-3">$${producto.precio.toLocaleString('es-CL')}</h4>
          <div class="d-flex justify-content-end align-items-center">
            <a href="productos.html?id=${producto.id}" class="btn btn-outline-primary">
              Ver más...
            </a>
          </div>
        </div>
      </div>
    `;
    novProductos.appendChild(col);
  });
}
document.addEventListener('DOMContentLoaded', function() {
    novedadesProductos(productos);    
});
</script>