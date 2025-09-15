<template>
  <div :class="$style.filling">
    <p>Начинка:</p>

    <ul :class="$style.list">
      <!--      <drag-component transfer-data="testData">-->
      <ingredient-item
        v-for="ingredient of ingredients"
        :key="ingredient.id"
        :class="$style.item"
        :modifier="PizzaIngredientEnum[ingredient.id]"
        :ingredient="ingredient"
        @update:model-value="
          updateFilling(PizzaIngredientEnum[ingredient.id], $event)
        "
      />
      <!--      </drag-component>-->
    </ul>
  </div>
</template>
<script setup lang="ts">
import IngredientItem from "./IngredientItem.vue";
import { IPizzaIngredient } from "@/types/interfaces/IPizzaIngredient";
import { PizzaIngredientEnum } from "@/types/enums/PizzaIngredientEnum";

defineProps<{ ingredients: IPizzaIngredient[] }>();
const modelValue = defineModel<Record<string, number>>({ default: {} });

const emits = defineEmits<{
  "update:model-value": [value: Record<string, number>];
}>();
function updateFilling(name: string, event: number) {
  const next = { ...modelValue.value };

  if (event > 0) {
    next[name] = event;
  } else {
    delete next[name];
  }
  emits("update:model-value", next);
}
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
