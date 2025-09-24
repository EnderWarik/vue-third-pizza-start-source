<template>
  <div :class="$style.layout">
    <aside :class="$style.sidebar" :style="{ width: sidebarWidth + 'px' }">
      <RouterLink v-if="logo?.src" to="/" :class="$style.logo">
        <img
          :src="logo.src"
          :alt="logo.alt || 'Logo'"
          :width="logo.width ?? 90"
          :height="logo.height ?? 40"
        />
      </RouterLink>

      <nav :class="$style.nav">
        <RouterLink
          v-for="l in links"
          :key="l.href + l.label"
          :to="l.href"
          :class="[$style.link, currentPath === l.href && $style.active]"
        >
          {{ l.label }}
        </RouterLink>
      </nav>
    </aside>

    <div :class="$style.content">
      <div v-if="title" :class="$style.title">
        <TitleComponent tag="h1" size="big">
          {{ title }}
        </TitleComponent>
      </div>
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { RouterLink, useRoute } from "vue-router";
import TitleComponent from "@/common/components/TitleComponent.vue";

const route = useRoute();

const sidebarWidth = computed(() => (route.meta.sidebarWidth as number) ?? 180);
const title = computed(() => route.meta.title as string | undefined);
const logo = computed(
  () =>
    route.meta.logo as
      | { src: string; alt?: string; width?: number; height?: number }
      | undefined,
);
const links = computed(
  () => (route.meta.links as { label: string; href: string }[]) ?? [],
);
const currentPath = computed(() => route.path);
</script>
<style module lang="scss">
@use "@/assets/scss/ds-system/ds-colors";
@use "@/assets/scss/ds-system/ds-typography";

.layout {
  display: block;
}

.sidebar {
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  height: 100%;
  background-color: rgba(ds-colors.$green-500, 0.05);
}

.logo {
  display: block;
  margin-bottom: 30px;
  padding: 10px 0;
  background-color: ds-colors.$green-500;
  img {
    display: block;
    margin: 0 auto;
  }
}

.nav {
  display: grid;
}

.link {
  @include ds-typography.b-s14-h16;
  display: block;
  padding: 8px 14px;
  color: ds-colors.$black;
  text-decoration: none;
  transition: 0.3s;
  &:hover {
    background-color: rgba(ds-colors.$green-500, 0.2);
  }
  &:active {
    color: rgba(ds-colors.$black, 0.5);
  }
}
.active {
  background-color: rgba(ds-colors.$green-500, 0.1);
}

.content {
  padding-top: 22px;
  padding-right: 2.12%;
  padding-left: 200px;
}
.title {
  margin-bottom: 27px;
}
</style>
