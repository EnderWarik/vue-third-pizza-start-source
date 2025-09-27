<template>
  <ul :class="$style.list">
    <OrderListItem v-for="p in items" :key="p.id" :product="p" />
  </ul>
</template>
<script setup lang="ts">
import OrderListItem from "./OrderListItem.vue";

import { IPizzaItem } from "@/modules/pizza/types/IPizzaItem";

defineProps<{
  items: IPizzaItem[];
}>();
</script>

<style module lang="scss">
@use "@/assets/scss/mixins/m_clear-list";
.list {
  @include m_clear-list.clear-list;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-top: 24px;
  padding: 0 10px;
}
</style>
