<template>
    <section class="tecno__hero">
            <div class="container-fluid px-0">
                <div class="carousel slide" id="mainCarousel" data-bs-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img src="https://cdn.businessinsider.es/sites/navi.axelspringer.es/public/media/image/2022/01/ces-2022-2582123.jpg"
                                class="d-block w-100" alt="Tecno Chile">
                            <div class="carousel-caption d-none d-md-block"></div>
                        </div>
                        <div class="carousel-item">
                            <img src="https://es.gizmodo.com/app/uploads/2024/12/Diseno-sin-titulo-44-13.jpg"
                                class="d-block w-100" alt="Tecno Chile">
                            <div class="carousel-caption d-none d-md-block"></div>
                        </div>
                        <div class="carousel-item">
                            <img src="https://academia.nubimetrics.com/hs-fs/hubfs/productos-tecnologicos.jpg?width=4088&height=2728&name=productos-tecnologicos.jpg"
                                class="d-block w-100" alt="Tecno Chile">
                            <div class="carousel-caption d-none d-md-block"></div>
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#mainCarousel"
                            data-bs-slide="prev">
                            <span class="carousel-control-prev-icon"></span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#mainCarousel"
                            data-bs-slide="next">
                            <span class="carousel-control-next-icon"></span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
</template>
<style>
.carousel-item img {
  height: 400px;
  object-fit: cover;
  object-position: center;
}
</style>