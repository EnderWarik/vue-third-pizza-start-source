<template>
  <div :class="$style.product">
    <img
      :src="img"
      :alt="alt || title"
      :width="imgWidth"
      :height="imgHeight"
      :class="$style.img"
    />
    <div :class="$style.text">
      <h2 :class="$style.title">{{ title }}</h2>
      <ul :class="$style.meta">
        <li>{{ size }}, на {{ dough }} тесте</li>
        <li>Соус: {{ sauce }}</li>
        <li v-if="fillings?.length">Начинка: {{ fillings.join(", ") }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IProductItem } from "@/modules/profile/types/IProductItem";

defineProps<Omit<IProductItem, "id" | "price">>();
</script>

<style module lang="scss">
@use "@/assets/scss/ds-system/ds-typography";

.product {
  display: flex;
  align-items: center;
}
.img {
  border-radius: 8px;
}
.text {
  margin-left: 15px;
}
.title {
  @include ds-typography.b-s18-h21;
  margin: 0 0 10px;
}
.meta {
  @include ds-typography.l-s11-h13;
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
