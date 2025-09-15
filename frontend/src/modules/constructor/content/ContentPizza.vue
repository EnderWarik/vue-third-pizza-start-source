<template>
  <div :class="$style.pizza">
    <text-input name="pizza_name" placeholder="Название пиццы">
      <template #label>
        <span class="visually-hidden">Название пиццы</span>
      </template>
    </text-input>

    <!--    <drop-component>-->
    <pizza-constructor
      :size="PizzaSizeEnum[selectedSize] as Size"
      :layers="fillings"
      :sauce="PizzaSauceEnum[selectedSauce] as Sauce"
    />
    <!--    </drop-component>-->

    <content-result :total="0" button-text="Готовьте!" />
  </div>
</template>
<script setup lang="ts">
import TextInput from "@/common/components/TextInput.vue";
import ContentResult from "@/modules/constructor/content/ContentResult.vue";
import PizzaConstructor from "@/modules/constructor/content/PizzaConstructor.vue";
import { PizzaSizeEnum } from "@/types/enums/PizzaSizeEnum";
import { Sauce, Size } from "@/modules/constructor/content/types";
import { PizzaSauceEnum } from "@/types/enums/PizzaSauceEnum";

defineProps<{
  selectedSauce: number;
  selectedSize: number;
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
