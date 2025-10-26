<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
// Composables
import { useRoute, useRouter } from 'vue-router';
import { usePicsumAPI, type PicsumAPIImage } from '@/composables/usePicsum';
// Components
import BaseContainer from '@/components/BaseContainer.vue';
import ImageGallery from '@/components/ImageGallery.vue';
import AppDialog from '@/components/AppDialog.vue';
import LazyImage from '@/components/LazyImage.vue';

const router = useRouter()
const route = useRoute()
const picsumAPI = usePicsumAPI()

const fetchParams = ref({ limit: 100 })
const selectedImage = ref<PicsumAPIImage | null>(null)
const openDialog = ref(false)

const images = computed(() => data.value?.length ? data.value: [])

/** */
const { isFetching, data, error, execute } = picsumAPI.getList(fetchParams, { immediate: false })

onMounted(async () => {
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
    <BaseContainer class="pt-16 pb-12">
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

      <ImageGallery
        v-else
        :images
        :count="fetchParams.limit"
        :skeleton="isFetching"
        @image-open="openImageDetails"
      />

      <!-- TODO: Scroll foreground -->
    </BaseContainer>

    <AppDialog v-model="openDialog" @close="onDialogClose" >
      <div>
        <LazyImage
          class="h-full w-full aspect-[4/3] "
          :alt="selectedImage?.alt"
          :src="selectedImage?.download_url!"
          :class="[`aspect-[${selectedImage?.width}${selectedImage?.height}]`]"
        />

        <a
          target="_blank"
          class="absolute z-10 bottom-0 right-0 px-8 py-4 text-xl text-white bg-gray-900/50 rounded-tl-2xl hover:bg-gray-900 transition-all font-medium duration-300"
          :href="selectedImage?.url!"
        >
          {{ selectedImage?.author }}
        </a>
      </div>
    </AppDialog>
  </div>
</template>

<style scoped>
.home-view {
  /* Home View specific styles */
}
</style>
