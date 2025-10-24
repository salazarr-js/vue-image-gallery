<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
// Composables
import { useRoute, useRouter } from 'vue-router';
import { usePicsumAPI, type PicsumAPIImage } from '@/composables/usePicsum';
// Components
import BaseContainer from '@/components/BaseContainer.vue';
import ImageGallery from '@/components/ImageGallery.vue';
import AppDialog from '@/components/AppDialog.vue';

const router = useRouter()
const route = useRoute()

const picsumAPI = usePicsumAPI()
const { isFetching, data, error, execute } = picsumAPI.getList({ limit: 5 }, { immediate: false })

const selectedImage = ref<PicsumAPIImage | null>(null)
const openDialog = ref(false)

const mappedImages = computed(() => {
  return data.value?.map(img => ({
    ...img,
    alt: `Image by ${img.author} (ID: ${img.id})`
  })) || null
})

onMounted(async () => {
  console.warn('HomeView:mounted')
  await execute()

  if (!error.value) {
    const imageDetails = getImageDetailsFromRoute()
    if (imageDetails) openImageDetails(imageDetails)
  }
});

/** */
function getImageDetailsFromRoute() {
  const id = route.params.id as string | undefined

  if (id) {
    const image = data.value?.find(img => img.id === id)
    if (image) return image
    else router.push({ name: 'not-found' }) // Back to root if no image found
  }

  return null
}

/** */
function openImageDetails(image: PicsumAPIImage) {
  console.warn('openImageDetails', image)
  selectedImage.value = image;
  openDialog.value = true;

  router.push({ name: 'image-home', params: { id: image.id } })
}

/** */
function onDialogClose() {
  selectedImage.value = null;

  router.push({ name: 'image-home' })
}
</script>

<template>
  <div class="home-view">
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

      <ImageGallery v-else :images="mappedImages" :skeleton="isFetching" @image-open="openImageDetails"/>

      <!-- TODO: Scroll foreground -->
    </BaseContainer>

    <AppDialog v-model="openDialog" @close="onDialogClose" >
      <div>
        <img
          :src="selectedImage?.download_url"

          loading="lazy"
          decoding="async"
          fetchpriority="low"
          class="h-25  object-cover rounded-lg"
        />

        <p>{{ selectedImage?.author }}</p>
      </div>
    </AppDialog>
  </div>
</template>

<style scoped>
.home-view {
  /* Home View specific styles */
}
</style>
