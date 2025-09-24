<script setup lang="ts">
import HeaderLogo from "@/modules/header/components/HeaderLogo.vue";
import HeaderUser from "@/modules/header/components/HeaderUser.vue";
import HeaderCart from "@/modules/header/components/HeaderCart.vue";
</script>

<template>
  <header :class="$style.header">
    <HeaderLogo />
    <HeaderCart :total-price="0" />
    <HeaderUser />
  </header>
  <slot />
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
