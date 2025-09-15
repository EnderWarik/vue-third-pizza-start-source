<template>
  <input v-model="modelValue" type="number" :name="name" readonly />
</template>
<script setup lang="ts">
const modelValue = defineModel<number>({ default: 0 });

defineProps<{
  name: string;
}>();
</script>
