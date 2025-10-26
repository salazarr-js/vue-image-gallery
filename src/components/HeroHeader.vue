<script setup lang="ts">
import BaseContainer from './BaseContainer.vue';


</script>

<template>
  <BaseContainer class="hero-header bg-base-200 py-16 relative">
    <div class="absolute z-[1] rounded-full bg-accent blur-[300px] size-60 sm:size-80 transform -translate-x-1/2 left-1/2 -translate-y-80"></div>

    <div class="relative z-10">
      <h1 class="text-base-content font-black text-6xl mb-4">
         <slot name="title"></slot>
      </h1>

      <p class="font-medium text-lg">
        <slot name="text"></slot>
      </p>
    </div>
  </BaseContainer>
</template>

<style scoped>
.hero-header {
  --hero-header-yp: 80px;

  margin-top: calc(var(--spacing-navbar-height) * -1); /* Negative margin for overlap */
  padding-block: calc(var(--spacing-navbar-height) + var(--hero-header-yp) / 2) var(--hero-header-yp);
}
</style>
