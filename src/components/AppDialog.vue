<script setup lang="ts">
import { onMounted, useTemplateRef, watch } from 'vue';
import BaseContainer from './BaseContainer.vue';

const openDialog = defineModel<boolean>()
const emits = defineEmits<{
  (e: 'close'): void
}>()

const dialogRef = useTemplateRef('dialog-ref');

watch(openDialog, (newVal) => {
  console.warn('AppDialog:openDialog changed', newVal);

  if (newVal) {
    dialogRef.value?.showModal();
  } else {
    dialogRef.value?.close();
  }
})

onMounted(() => {
  console.warn('AppDialog:mounted', openDialog.value);

  /** */
  dialogRef.value?.addEventListener('close', () => {
    console.warn('Dialog closed');
    openDialog.value = false;

    emits('close');
  });
})

</script>

<template>
  <h1>{{ openDialog }}</h1>

  <dialog id="app-dialog" ref="dialog-ref" class="app-dialog" >
    <div class="dialog-backlog"></div>

    <BaseContainer>
      <slot></slot>

      <button @click="dialogRef?.close()">Close Dialog</button>
    </BaseContainer>
  </dialog>
</template>

<style scoped>
.app-dialog {
  position: fixed;
  top:50%;
  height: 50%;
  width: 100vw;
  z-index: 9999;

  /* background-color: coral; */

}

dialog::backdrop {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
