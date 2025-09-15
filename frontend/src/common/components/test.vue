<script setup lang="ts">
const emit = defineEmits<{
  update: [update: string];
}>();

function onInput(e: Event) {
  const target = e.target
  if (target instanceof HTMLInputElement) {
    emit("update", target.value);
  }
}
</script>

<template>
  <input @input="onInput" />
</template>