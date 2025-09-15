<template>
  <div :class="$style.pizza">
    <text-input name="pizza_name" placeholder="Название пиццы">
      <template #label>
        <span class="visually-hidden">Название пиццы</span>
      </template>
    </text-input>

    <!--    <drop-component>-->
    <pizza-constructor
      :size="selectedSize"
      :layers="fillings"
      :sauce="selectedSauce"
    />
    <!--    </drop-component>-->

    <content-result :total="0" button-text="Готовьте!" />
  </div>
</template>
<script setup lang="ts">
import TextInput from "@/common/components/TextInput.vue";
import ContentResult from "@/modules/constructor/content/ContentResult.vue";
import PizzaConstructor from "@/modules/constructor/content/PizzaConstructor.vue";
import { Sauce, Size } from "@/modules/constructor/content/types";

defineProps<{
  selectedSauce: Sauce;
  selectedSize: Size;
  fillings: Record<string, number>;
}>();
</script>
<style module lang="scss">
.pizza {
  width: 373px;
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>
