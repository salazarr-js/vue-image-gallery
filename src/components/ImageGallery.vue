<script setup lang="ts">
import type { PicsumAPIImage } from '@/composables/usePicsum';
import LoadingSkeleton from './LoadingSkeleton.vue';

const props = defineProps<{
  images?: Array<PicsumAPIImage> | null;
  skeleton: boolean;
}>();

</script>

<template>
  <div class="image-gallery grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <template v-if="skeleton">
        <LoadingSkeleton class="w-full aspect-[4/3]" v-for="n in 30" :key="n" />
      </template>

      <template v-else>
        <img
          v-for="image in images"
          :key="image.id"
          :src="image.download_url"
          loading="lazy"
          class="w-full aspect-[4/3] object-cover rounded-lg hover:shadow-xl hover:scale-105 transition-all"
        />
      </template>
  </div>
</template>

<style scoped>
.image-gallery {
  /* Image Gallery specific styles */
}
</style>
