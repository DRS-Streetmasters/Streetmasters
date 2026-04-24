<script setup>
import BookingSection from '../components/home/BookingSection.vue'
import HeroSection from '../components/home/HeroSection.vue'
import MobileBottomNav from '../components/home/MobileBottomNav.vue'
import ServicesSection from '../components/home/ServicesSection.vue'
import ShowcaseSection from '../components/home/ShowcaseSection.vue'
import SiteFooter from '../components/home/SiteFooter.vue'
import TestimonialsSection from '../components/home/TestimonialsSection.vue'
import MainHeader from '../components/layout/MainHeader.vue'
import { aboutCards, serviceTypes, services } from '../data/content'
</script>

<template>
  <div class="bg-surface text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container">
    <MainHeader />

    <main>
      <HeroSection />
      <ServicesSection :services="services" />
      <ShowcaseSection />
      <TestimonialsSection :testimonials="aboutCards" />
      <BookingSection :service-types="serviceTypes" />
    </main>

    <SiteFooter />
    <MobileBottomNav />
  </div>
</template>
