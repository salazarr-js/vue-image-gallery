<script setup lang="ts">
import { onMounted, ref, type PropType } from 'vue';
import LoadingSkeleton from '@/components/LoadingSkeleton.vue';

const { alt, src, skeleton } = defineProps({
  alt: String,
  src: String,
  skeleton: Boolean,

  priority: {
    type: String as PropType<'hight' | 'auto' | 'low'>,
    default: () => 'auto',
  }
})

const loaded = ref(false)

onMounted(() => {})

function onImgLoaded() {
  loaded.value = true
}
</script>

<template>
  <div class="lazy-image relative">
    <Transition name="fade">
      <LoadingSkeleton
        v-if="skeleton || !loaded"
        class="w-full h-full absolute"
      />
    </Transition>

    <img
      @load="onImgLoaded"
      :alt
      :src
      :fetchpriority="priority"
      ref="img-ref"
      loading="lazy"
      class="w-full h-full object-cover rounded-lg"
      decoding="auto"
    />
  </div>
</template>

<style scoped>
.lazy-image {
  /* Lazy Image specific styles */
}
</style>
