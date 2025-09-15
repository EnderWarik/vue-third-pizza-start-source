<template>
  <div :class="$style.pizza">
    <text-input name="pizza_name" placeholder="Название пиццы">
      <template #label>
        <span class="visually-hidden">Название пиццы</span>
      </template>
    </text-input>

    <pizza-constructor
      :size="selectedSize"
      :layers="fillings"
      :sauce="selectedSauce"
    />
    <content-result :total="0" button-text="Готовьте!" />
  </div>
</template>
<script setup lang="ts">
import TextInput from "@/common/components/TextInput.vue";
import ContentResult from "@/modules/constructor/content/ContentResult.vue";
import { Sauce, Size } from "@/modules/constructor/content/types";
import PizzaConstructor from "@/modules/constructor/content/PizzaConstructor.vue";

defineProps<{
  selectedSauce: Sauce;
  selectedSize: Size;
  fillings: Array<{ kind: string; count: number }>;
}>();
</script>
<style module lang="scss">
.pizza {
  width: 373px;
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>
