<template>
  <ul :class="$style.list">
    <AdditionalListItem v-for="item in items" :key="item.id" :item="item" />
  </ul>
</template>
<script setup lang="ts">
import AdditionalListItem from "./AdditionalListItem.vue";

import { IAdditionalItem } from "@/modules/profile/types/IAdditionalItem";

defineProps<{
  items: IAdditionalItem[];
}>();
</script>
<style module lang="scss">
.list {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
