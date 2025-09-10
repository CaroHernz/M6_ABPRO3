<template>
    <v-app-bar app color="primary" class="navbar navbar-expand-md sticky-top navbar-dark bg-dark">
            <v-container class="container-fluid">
                <a href="#" class="navbar-brand">
                    <i class="fas fa-laptop-code me-2"></i>
                    <span class="ms-1">Tecno Chile</span>
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="mainNav">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a href="#" class="nav-link active">Inicio</a>
                        </li>
                        <li class="nav-item">
                            <a href="#servicios" class="nav-link">Servicios</a>
                        </li>
                        <li class="nav-item">
                            <a href="productos.html" class="nav-link">Productos</a>
                        </li>
                        <li class="nav-item">
                            <a href="#contacto" class="nav-link">Contacto</a>
                        </li>
                        <li class="nav-item">
                            <a href="admin.html" class="nav-link">Admin</a>
                        </li>
                    </ul>
                    <div id="bienvenida" class="navbar-text ms-auto"></div>
                    <div>
                        <a href="#" id="btnCarrito" class="position-relative text-secondary">
                            <i class="fa-solid fa-cart-shopping fa-2x ms-3 me-2">
                                
                            </i>
                            <span id="contador-carrito" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                              <span>0</span>
                              <span class="visually-hidden">Productos en carrito</span>
                            </span>
                        </a>                      
                    </div>
                </div>
            </v-container>
        </v-app-bar>
</template>
<script setup>

</script>