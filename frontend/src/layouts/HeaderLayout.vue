<script setup lang="ts">
import HeaderLogo from "@/modules/header/HeaderLogo.vue";
import HeaderUser from "@/modules/header/HeaderUser.vue";
import HeaderCart from "@/modules/header/HeaderCart.vue";
</script>

<template>
  <header :class="$style.header">
    <header-logo />
    <header-cart :total-price="0" />
    <header-user />
  </header>
</template>

<style module lang="scss">
@use "@/assets/scss/ds-system/ds-colors";
@use "@/assets/scss/ds-system/ds-shadows";

.header {
  position: relative;
  z-index: 2;

  display: flex;

  padding: 0 2.12%;

  background-color: ds-colors.$green-500;
  box-shadow: ds-shadows.$shadow-light;
}
</style>
