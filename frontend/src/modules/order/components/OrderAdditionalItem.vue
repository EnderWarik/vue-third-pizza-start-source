<template>
  <li :class="$style.item">
    <img
      :src="img"
      :width="imgWidth ?? 20"
      :height="imgHeight ?? 30"
      :alt="alt || title"
      :class="$style.img"
    />
    <p :class="$style.text">
      <span :class="$style.title">{{ title }}</span>
      <b :class="$style.price">{{ price }} ₽</b>
    </p>
  </li>
</template>
<script setup lang="ts">
import { AdditionalItem } from "@/types";

type Props = Omit<AdditionalItem, "id">;
defineProps<Props>();
</script>
<style module lang="scss">
@use "@/assets/scss/ds-system/ds-typography";

.item {
  width: 130px;
  margin-right: 24px;
  margin-bottom: 10px;
}

.img {
  float: left;
  margin-right: 7px;
  display: block;
}

.text {
  margin: 0;
}

.title {
  @include ds-typography.b-s11-h16;
  display: inline;
}

.price {
  display: block;
}
</style>
