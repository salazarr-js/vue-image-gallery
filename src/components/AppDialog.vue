<script setup lang="ts">
import { onMounted, useTemplateRef, watch } from 'vue';

const openDialog = defineModel<boolean>()
const emits = defineEmits<{
  (e: 'close'): void
}>()

const dialogRef = useTemplateRef('dialog-ref');

watch(openDialog, (value) => toggleDialog(value!))

onMounted(() => {})

/** */
function toggleDialog(open: boolean) {
  if (open) {
    dialogRef.value?.showModal();
    document.body.classList.add('overflow-hidden')
  } else {
    dialogRef.value?.close();

    // Let animation finish
    setTimeout(() => {
      document.body.classList.remove('overflow-hidden')
      emits('close')
    }, 300);
  }
}

/** */
function onDialogClick(ev: PointerEvent) {
  const target = ev.target as HTMLElement
   if (target.nodeName === 'DIALOG') dialogRef.value?.close()
}
</script>

<template>
  <dialog
    ref="dialog-ref"
    modal-mode="mega"
    class="app-dialog max-w-6xl rounded-2xl shadow-xl shadow-gray-800 backdrop:bg-gray-800/50"
    @click="onDialogClick"
    @close="openDialog= false"
   >
    <div class="absolute top-4 right-4 z-40">
      <button class="btn btn-neutral btn-circle transition-all" @click="dialogRef?.close()">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <slot></slot>
  </dialog>
</template>

<style scoped>
dialog.app-dialog {
  inset: 0;
  width: 100%;
  margin: auto;
  border: 0;
  padding: 0;
  overflow: hidden;
  position: fixed;
  background-color: transparent;

  opacity: 0;
  transform: translateY(3rem) scale(.75);

  transition: opacity .3s ease-in-out,
    transform .3s ease-in-out,
    overlay .3s ease-in-out allow-discrete,
    display .3s ease-in-out allow-discrete;

  /* &:not([open]) { } */

  &[open]{
    opacity: 1;
    transform: translateY(0);

    @starting-style {
      opacity: 0;
      transform: translateY(3rem) scale(.75);
    }

    &::backdrop {
      opacity: 1;
      backdrop-filter: blur(10px);

      @starting-style {
        opacity: 0;
        backdrop-filter: blur(0);
      }
    }
  }

  &::backdrop {
    opacity: 0;
    backdrop-filter: blur(0);

    transition: opacity .3s ease-in-out,
      backdrop-filter .3s ease-in-out,
      overlay .3s ease-in-out allow-discrete,
      display .3s ease-in-out allow-discrete;
  }
}
</style>
