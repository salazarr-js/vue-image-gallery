<script setup lang="ts">
import type { PropType } from 'vue';

type HTMLTagName = keyof HTMLElementTagNameMap

const props = defineProps({
  as: {
    type: String as PropType<HTMLTagName>,
    default: 'div',
  }
})
</script>

<template>
  <component :is="props.as || 'div'" class="base-container px-4 md:px-8 lg:px-12">

    <div class="max-w-6xl w-full mx-auto">
      <slot></slot>
    </div>
  </component>
</template>


<style scoped>
.hero-header {
  /* Hero Header specific styles */
}
</style>
