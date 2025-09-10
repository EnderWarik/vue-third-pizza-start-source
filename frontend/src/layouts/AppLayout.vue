<template>
  <div class="app_layout">
    <app-header/>
    <slot/>
  </div>
</template>

<script setup lang="ts">
import AppHeader from "@/layouts/AppHeader.vue";
</script>

<style scoped lang="scss">

</style>