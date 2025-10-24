<script setup lang="ts">
import BaseContainer from './BaseContainer.vue';
import ToggleThemeButton from './ToggleThemeButton.vue';
</script>

<template>
  <BaseContainer as="header" class="app-header relative z-50 h-navbar-height flex-center">
    <nav class="flex gap-4">

      <ToggleThemeButton class="ml-auto" />
    </nav>
  </BaseContainer>
</template>

<style scoped>
.app-header {
  /* App Header specific styles */
}
</style>

