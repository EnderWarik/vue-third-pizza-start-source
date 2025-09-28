<template>
  <header :class="$style.header">
    <HeaderLogo />
    <HeaderCart :total-price="cartStore.totalPrice" />
    <HeaderUser :user="profileStore.user" />
  </header>
  <slot />
</template>
<script setup lang="ts">
import HeaderLogo from "@/modules/header/components/HeaderLogo.vue";
import HeaderUser from "@/modules/header/components/HeaderUser.vue";
import HeaderCart from "@/modules/header/components/HeaderCart.vue";
import { useCartStore } from "@/modules/cart/cartStore";
import { useProfileStore } from "@/modules/profile/profileStore";

const cartStore = useCartStore();
const profileStore = useProfileStore();
</script>

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
