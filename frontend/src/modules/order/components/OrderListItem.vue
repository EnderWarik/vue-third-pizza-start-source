<template>
  <li :class="$style.item">
    <order-product
      :title="product.title"
      :img="product.img"
      :size="product.size"
      :count="product.count"
      :sauce="product.sauce"
      :dough="product.dough"
      :img-height="product.imgHeight"
      :img-width="product.imgWidth"
      :alt="product.alt"
      :fillings="product.fillings"
    >
    </order-product>
    <p :class="$style.price">
      <template v-if="product.count > 1">
        {{ product.count }} × {{ product.price.toLocaleString() }} ₽ =
      </template>
      {{ totalPrice.toLocaleString() }} ₽
    </p>
  </li>
</template>
<script setup lang="ts">
import OrderProduct from "./OrderProduct.vue";
import type { ProductItem } from "@/types";
import { computed } from "vue";

const props = defineProps<{
  product: ProductItem;
}>();

const totalPrice = computed(() => props.product.price * props.product.count);
</script>
<style module lang="scss">
@use "@/assets/scss/ds-system/ds-typography";

.item {
  display: flex;
  margin-right: 33px;
  margin-bottom: 32px;
}

.price {
  @include ds-typography.b-s16-h19;
  margin-left: auto;
  white-space: nowrap;
}
</style>
