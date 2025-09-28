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

const authStore = useAuthStore();
const profileStore = useProfileStore();
onMounted(() => {
  if (authStore.isAuthenticated) {
    profileStore.fetchUser();
  }
});
</script>
<style lang="scss">
@use "@/assets/scss/app" as *;
</style>
