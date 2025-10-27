<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router';
// Components
import BaseContainer from '@/components/BaseContainer.vue';

onMounted(async () => {});
</script>

<template>
  <BaseContainer class="not-found-view pt-16 text-center">
    <h2 class="text-4xl font-black text-base-content">404</h2>
    <h3 class="text-2xl font-bold mb-4">Page Not Found</h3>

    <div class="h-1 bg-base-300 w-40 mx-auto rounded mb-8"></div>

    <p class="text-lg font-medium mb-8">Sorry, the page you're looking for doesn't exist</p>

    <RouterLink class="btn btn-outline btn-primary" to="/">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-6"
        aria-hidden="true"
        focusable="false"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
        />
      </svg>

      Go back home
    </RouterLink>
  </BaseContainer>
</template>

<style scoped>
.not-found-view {
  /* Not Found View specific styles */
}
</style>
