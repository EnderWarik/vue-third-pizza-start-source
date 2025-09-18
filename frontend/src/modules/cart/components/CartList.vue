<template>
  <sheet-component>
    <ul :class="[$style.list, $style.sheet]">
      <CartListItem
        v-for="item in items"
        :key="item.id"
        :item="item"
        @edit="() => emit('edit', item.id)"
      />
    </ul>
  </sheet-component>
</template>
<script setup lang="ts">
import CartListItem from "./CartListItem.vue";
import { ProductItem } from "@/types";
import SheetComponent from "@/common/components/SheetComponent.vue";

defineProps<{
  items: ProductItem[];
}>();

const emit = defineEmits<{
  edit: [id: string];
}>();
</script>
<style module lang="scss">
.list {
  margin: 0;
  padding: 15px 0;
  list-style: none;
}
</style>
