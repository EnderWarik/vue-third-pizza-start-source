<template>
  <div class="content__ingredients">
    <SheetComponent title="Выберите ингредиенты">
      <div class="sheet__content ingredients">
        <IngredientsSauce v-model="pizzaSauce" :sauces="sauces" />

        <IngredientsFilling v-model="fillings" :ingredients="ingredients" />
      </div>
    </SheetComponent>
  </div>
</template>

<script setup lang="ts">
import SheetComponent from "@/common/components/SheetComponent.vue";
import IngredientsFilling from "@/modules/home/ingredient/components/IngredientsFilling.vue";
import IngredientsSauce from "@/modules/home/ingredient/components/IngredientsSauce.vue";
import { IPizzaIngredient } from "@/types/interfaces/IPizzaIngredient";

import { IPizzaSauce } from "@/types/interfaces/IPizzaSauce";

defineProps<{
  sauces: IPizzaSauce[];
  ingredients: IPizzaIngredient[];
}>();

const pizzaSauce = defineModel<string | number | null>("sauce", {
  default: null,
});
const fillings = defineModel<Record<string, number>>("fillings", {
  default: {},
});
</script>
<style scoped lang="scss">
.content__ingredients {
  width: 527px;
  margin-top: 15px;
  margin-right: auto;
  margin-bottom: 15px;
}
</style>
