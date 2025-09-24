<template>
  <SheetComponent>
    <ul :class="[$style.list, $style.sheet]">
      <CartListItem
        v-for="item in items"
        :key="item.id"
        :item="item"
        @edit="() => emit('edit', item.id)"
      />
    </ul>
  </SheetComponent>
</template>
<script setup lang="ts">
import CartListItem from "./CartListItem.vue";
import SheetComponent from "@/common/components/SheetComponent.vue";
import { IProductItem } from "@/modules/profile/types/IProductItem";

defineProps<{
  items: IProductItem[];
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
