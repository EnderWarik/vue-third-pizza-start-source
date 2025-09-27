<template>
  <main :class="$style.content">
    <HomeContainer />
  </main>
</template>

<script setup lang="ts">
import HomeContainer from "@/modules/pizza/PizzaContainer.vue";
</script>

<style module lang="scss">
@use "@/assets/scss/ds-system/ds-typography";

.content {
  padding-top: 20px;
}
</style>
