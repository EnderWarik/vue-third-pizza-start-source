<template>
  <div :class="[$style.row, small && $style.small]">
    <TextInput v-model="modelValue" :name="name">
      <span>{{ label }}</span>
    </TextInput>
  </div>
</template>

<script setup lang="ts">
import TextInput from "@/common/components/TextInput.vue";

const modelValue = defineModel<string>({ default: "" });

defineProps<{
  name: string;
  label: string;
  small?: boolean;
}>();
</script>

<style module lang="scss">
.row {
  flex-grow: 1;
  margin-bottom: 20px;
}
.small {
  max-width: 120px;
}
</style>
