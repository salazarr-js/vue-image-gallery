<script setup lang="ts">
import BaseContainer from './BaseContainer.vue';

const year = new Date().getFullYear()
</script>

<template>
  <BaseContainer as="footer" class="py-16 bg-base-200">
    <p class="text-lg font-medium text-center text-base-content">Vue Image Gallery</p>
    <p class="text-center text-base-content">Jose Salazar - {{ year }}</p>
  </BaseContainer>
</template>

<style scoped>
.app-footer {
  /* App Footer specific styles */
}
</style>
