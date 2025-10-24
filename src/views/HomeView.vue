<script setup lang="ts">
import { onMounted } from 'vue'
// Composables
import { usePicsumAPI } from '@/composables/usePicsum';
// Components
import HeroHeader from '@/components/HeroHeader.vue';
import BaseContainer from '@/components/BaseContainer.vue';
import ImageGallery from '@/components/ImageGallery.vue';

const picsumAPI = usePicsumAPI()
const { isFetching, data, error, execute } = picsumAPI.getList({ limit: 100 }, { immediate: false })

onMounted(async () => {
  console.warn('HomeView: mounted')

  await execute()
  console.warn({ isFetching, data, error })
});
</script>

<template>
  <div class="home-view">
    <HeroHeader>
      <template #title>Vue Image Gallery</template>
      <template #text>A simple and responsive image gallery built with Vue 3 and the Picsum API</template>
    </HeroHeader>

    <BaseContainer class="pt-16 pb-8">
      <template v-if="error">
        <p class="text-red-500"></p>

        <div role="alert" class="alert alert-error alert-soft">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>

          <div>
            <h3 class="font-bold">Error loading images!</h3>
            <p class="text-xs">{{ error.message }}</p>
          </div>
        </div>
      </template>

      <ImageGallery v-else :images="data" :skeleton="isFetching"/>

      <!-- TODO: Scroll foreground -->
    </BaseContainer>
  </div>
</template>

<style scoped>
.home-view {
  /* Home View specific styles */
}
</style>
