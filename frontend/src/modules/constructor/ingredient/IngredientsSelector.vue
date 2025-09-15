<template>
  <div class="content__ingredients">
    <sheet-component title="Выберите ингредиенты">
      <div class="sheet__content ingredients">
        <ingredients-sauce v-model="pizzaSauce" :sauces="sauces" />

        <ingredients-filling v-model="fillings" :ingredients="ingredients" />
      </div>
    </sheet-component>
  </div>
</template>

<script setup lang="ts">
import SheetComponent from "@/common/components/SheetComponent.vue";
import IngredientsFilling from "@/modules/constructor/ingredient/IngredientsFilling.vue";
import IngredientsSauce from "@/modules/constructor/ingredient/IngredientsSauce.vue";
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
