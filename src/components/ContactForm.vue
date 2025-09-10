<script setup>

</script>

<template>
   <section id="contacto" class="tecno__contact py-5 bg-light">
            <div class="container">
                <div class="row">
                    <div class="col-md-6">
                        <h2 class="tecno__section-title mb-4">¿Necesitas ayuda?</h2>
                        <p class="lead">Déjanos tus datos, envíanos tus consultas y nos pondremos en contacto contigo en
                            menos de 24 horas.</p>

                        <form class="tecno__contact-form">
                            <div class="mb-3">
                                <label for="nombre" class="form-label">Nombre Completo</label>
                                <input type="text" class="form-control" id="nombre" required>
                            </div>
                            <div class="mb-3">
                                <label for="email" class="form-label">Email</label>
                                <input type="email" class="form-control" id="email" required>
                            </div>
                            <div class="mb-3">
                                <label for="telefono" class="form-label">Teléfono</label>
                                <input type="tel" class="form-control" id="telefono">
                            </div>
                            <div class="mb-3">
                                <label for="mensaje" class="form-label">Escríbenos tus dudas o comentarios</label>
                                <textarea class="form-control" id="mensaje" rows="3"></textarea>
                            </div>
                            <button type="button" class="btn btn-primary btn-lg">Enviar</button>
                        </form>
                    </div>
                    <div class="col-md-6">
                        <div class="tecno__contact-info pt-5">
                            <div class="row text-center">
                                <div class="col-4 col-md-12">
                                    <div class="info-item pb-5 mt-3">
                                        <i class="fas fa-envelope fa-2x pb-2 d-block"></i>
                                        <h4><strong>Email</strong></h4>
                                        <p>contacto@tecnochile.com</p>
                                    </div>
                                </div>
                                <div class="col-4 col-md-12">
                                    <div class="info-item pb-5 my-3">
                                        <i class="fas fa-phone fa-2x pb-2 d-block"></i>
                                        <h4><strong>Teléfono</strong></h4>
                                        <p>+56 2 2345 6789</p>
                                    </div>
                                </div>
                                <div class="col-4 col-md-12">
                                    <div class="info-item pb-5">
                                        <i class="fas fa-map-marker-alt fa-2x pb-2 d-block"></i>
                                        <h4><strong>Oficina Central</strong></h4>
                                        <p>Av. Apoquindo 4500, Las Condes, Santiago</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
</template>