<template>
  <RouterView v-slot="{ Component, route }">
    <component :is="route.meta.layout || 'div'">
      <Transition name="slide" mode="out-in">
        <component :is="Component" :key="route.fullPath" />
      </Transition>
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
onMounted(() => {
  if (authStore.isAuthenticated) {
    profileStore.init();
  }

  pizzaStore.init();
  cartStore.init();
});
</script>
<style lang="scss">
@use "@/assets/scss/app" as *;
</style>

<style scoped lang="scss">
.slide-enter-active,
.slide-leave-active {
  transition:
    transform 0.25s ease,
    opacity 0.25s ease;
}
.slide-enter-from {
  opacity: 0;
  transform: translateX(10px);
}
.slide-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}
</style>
