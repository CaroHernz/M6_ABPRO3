<script setup>
  import AppNavBar from './components/AppNavBar.vue'
  import AppFooter from './components/AppFooter.vue'
  import HeroSection from './components/HeroSection.vue'
  import ServiceSection from './components/ServiceSection.vue'
  import ProductPage from './components/ProductPage.vue'
  import ProductSection from './components/ProductSection.vue'
  import ContactForm from './components/ContactForm.vue'
  import SuscriptionSection from './components/SuscriptionSection.vue'


</script>

<template>
  <v-app>
  <AppNavBar />
  <v-main>
    <HeroSection />
    <ProductSection/>
    <ProductPage />
    <ServiceSection/>
    <ContactForm />
    <SuscriptionSection/>
  </v-main>
  <AppFooter />
</v-app>
</template>

<style scoped>

</style>
