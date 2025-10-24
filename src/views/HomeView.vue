<script setup lang="ts">
import { usePicsumAPI } from '@/composables/usePicsum';
import { onMounted } from 'vue'

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
    <header>
      <h1>Titulo</h1>


    </header>

      <p>{{ isFetching }}</p>
      <p>{{ data }}</p>
      <p>{{ error }}</p>
  </div>
</template>
