<script setup lang="ts">
import { computed, type PropType } from 'vue';
// Composables
import type { PicsumAPIImage } from '@/composables/usePicsum';
// Components
import LazyImage from '@/components/LazyImage.vue';

const props = defineProps({
  images: Array as PropType<PicsumAPIImage[]>,
  skeleton: Boolean,
  count: { type: Number, default: () => 30 }
});

/**  */
const mappedImages = computed<PicsumAPIImage[]>(() => props.images?.length
  ? props.images
  : Array(props.count).fill(0).map((_, index) => ({
    id: `${index}-skeleton-id`,
    author: `${index}-skeleton-alt`,
    width: 0,
    height: 0,
    url: null,
    download_url: null,
    alt: `${index}-skeleton-alt`,
    thumbnail: null,
  }))
)

const emit = defineEmits<{
  (e: 'imageOpen', image: PicsumAPIImage): void
}>();

</script>

<template>
  <div class="image-gallery grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
    <button
      v-for="(image, index) in mappedImages"
      :key="image.id"
      @click="emit('imageOpen', image)"
      class="cursor-pointer"
    >
      <LazyImage
        :src="image.thumbnail!"
        :alt="image.alt"
        :priority="index < 20 ? 'hight' : 'auto'"

        class="w-full aspect-[4/3] object-cover rounded-lg hover:shadow-xl hover:scale-105 hover:z-10 transition-all"
      />
    </button>
  </div>
</template>

<style scoped>
.image-gallery {
  /* Image Gallery specific styles */
}
</style>
