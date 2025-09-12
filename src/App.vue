<script setup>
import Navbar from './components/AppNavBar.vue'
import Hero from './components/HeroSection.vue'
import Footer from './components/AppFooter.vue'
import Inicio from './views/Inicio.vue'
import CatalogoPage from './views/CatalogoPage.vue'
</script>

<template>
  <div id="app">
    <Navbar />
    <Hero />
  <div class="app-container">
    <router-view v-slot="{Component}">
      <transition name="page-flip" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
  <Footer />
  </div>
</template>

<style scoped>
.page-flip-enter-active,
.page-flip-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.page-flip-enter-from,
.page-flip-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>