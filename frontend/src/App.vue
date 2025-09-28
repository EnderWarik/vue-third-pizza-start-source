<template>
  <RouterView v-slot="{ Component, route }">
    <component :is="route.meta.layout || 'div'">
      <component :is="Component" />
    </component>
  </RouterView>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useAuthStore } from "@/modules/auth/authStore";
import { useProfileStore } from "@/modules/profile/profileStore";
import { usePizzaStore } from "@/modules/pizza/pizzaStore";
import { useCartStore } from "@/modules/cart/cartStore";

const authStore = useAuthStore();
const profileStore = useProfileStore();
const pizzaStore = usePizzaStore();
const cartStore = useCartStore();
onMounted(async () => {
  if (authStore.isAuthenticated) {
    await profileStore.fetchUser();
  }
  await pizzaStore.init();
  await cartStore.init();
});
</script>
<style lang="scss">
@use "@/assets/scss/app" as *;
</style>
