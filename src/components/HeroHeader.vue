<script setup lang="ts">
import BaseContainer from './BaseContainer.vue';


</script>

<template>
  <BaseContainer class="hero-header bg-gray-100 py-16">
    <h1 class="text-base-content font-black text-6xl mb-4">
       <slot name="title"></slot>
    </h1>

    <p class="font-medium text-lg">
      <slot name="text"></slot>
    </p>
  </BaseContainer>
</template>

<style scoped>
.hero-header {
  --hero-header-yp: 80px;

  margin-top: calc(var(--spacing-navbar-height) * -1); /* Negative margin for overlap */
  padding-block: calc(var(--spacing-navbar-height) + var(--hero-header-yp) / 2) var(--hero-header-yp);
}
</style>
