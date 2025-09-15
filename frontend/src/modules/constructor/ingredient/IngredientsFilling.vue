<template>
  <div :class="$style.filling">
    <p>Начинка:</p>

    <ul :class="$style.list">
      <ingredient-item
        v-for="ingredient of ingredients"
        :key="ingredient.id"
        :class="$style.item"
        :modifier="PizzaIngredientEnum[ingredient.id]"
        :ingredient="ingredient"
      />
    </ul>
  </div>
</template>
<script setup lang="ts">
import IngredientItem from "./IngredientItem.vue";
import { IPizzaIngredient } from "@/types/interfaces/IPizzaIngredient";
import { PizzaIngredientEnum } from "@/types/enums/PizzaIngredientEnum";

defineProps<{ ingredients: IPizzaIngredient[] }>();
const modelValue = defineModel<Record<string, number>>({ default: {} });
</script>
<style module lang="scss">
@use "@/assets/scss/ds-system/ds-typography";
@use "@/assets/scss/mixins/m_clear-list";

.item {
  width: 100px;
  min-height: 40px;
  margin-right: 17px;
  margin-bottom: 35px;
}
.filling {
  width: 100%;

  p {
    @include ds-typography.r-s16-h19;

    margin-top: 0;
    margin-bottom: 16px;
  }
}

.list {
  @include m_clear-list.clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}
</style>
