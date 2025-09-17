<template>
  <router-view v-slot="{ Component, route }">
    <component :is="route.meta.layout" v-if="route.meta.layout">
      <component :is="Component" />
    </component>
  </router-view>
</template>

<script setup lang="ts"></script>
<style lang="scss">
@use "@/assets/scss/app" as *;
</style>
