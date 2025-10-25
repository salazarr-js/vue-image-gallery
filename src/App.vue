<script setup lang="ts">
import AppHeader from './components/AppHeader.vue';
import HeroHeader from './components/HeroHeader.vue';
import AppFooter from '@/components/AppFooter.vue'

</script>

<template>
  <AppHeader />

  <main class="flex-1 bg-base-100">
    <HeroHeader>
      <template #title>Vue Image Gallery</template>
      <template #text>A simple and responsive image gallery built with Vue 3 and the Picsum API</template>
    </HeroHeader>

    <div class="relative z-10">
      <router-view v-slot="{ Component }">
        <transition name="fade-up">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </main>

  <AppFooter />
</template>

<style scoped></style>
