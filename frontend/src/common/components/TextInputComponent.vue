<script setup lang="ts">
const modelValue = defineModel<number>({ default: 0 });

defineProps<{
  name: string;
}>();
</script>

<template>
  <!--  <label :class="$style.input">-->
  <!--    <span v-if="$slots.label"><slot name="label" /></span>-->
  <input v-model="modelValue" type="number" :name="name" readonly />
  <!--  </label>-->
</template>

<style module lang="scss">
//@use "@/assets/scss/ds-system/ds-colors";
//@use "@/assets/scss/ds-system/ds-typography";
//
//.input {
//  display: block;
//
//  span {
//    @include ds-typography.r-s14-h16;
//    display: block;
//    margin-bottom: 4px;
//  }
//
//  input {
//    @include ds-typography.r-s16-h19;
//    display: block;
//    box-sizing: border-box;
//    width: 100%;
//    margin: 0;
//    padding: 8px 16px;
//
//    transition: 0.3s;
//
//    color: ds-colors.$black;
//    border: 1px solid ds-colors.$purple-400;
//    border-radius: 8px;
//    outline: none;
//    background-color: ds-colors.$white;
//    font-family: inherit;
//
//    &:focus {
//      border-color: ds-colors.$green-500;
//    }
//  }
//
//  &:hover input {
//    border-color: ds-colors.$black;
//  }
//}
//
//.bigLabel {
//  display: flex;
//  align-items: center;
//
//  span {
//    @include ds-typography.b-s16-h19;
//    margin-right: 16px;
//    white-space: nowrap;
//  }
//}
</style>
