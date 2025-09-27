<template>
  <div class="content__ingredients">
    <SheetComponent title="Выберите ингредиенты">
      <div class="sheet__content ingredients">
        <IngredientsSauce v-model="pizzaSauce" :sauces="sauces" />

        <IngredientsFilling v-model:ingredients="ingredients" />
      </div>
    </SheetComponent>
  </div>
</template>

<script setup lang="ts">
import SheetComponent from "@/common/components/SheetComponent.vue";
import IngredientsFilling from "@/modules/pizza/ingredient/components/IngredientsFilling.vue";
import IngredientsSauce from "@/modules/pizza/ingredient/components/IngredientsSauce.vue";

import { IPizzaSauce } from "@/modules/pizza/types/IPizzaSauce";
import { IPizzaIngredient } from "@/modules/pizza/types/IPizzaIngredient";

defineProps<{
  sauces: IPizzaSauce[];
}>();

const pizzaSauce = defineModel<string | number | null>("sauce", {
  default: null,
});
const ingredients = defineModel<IPizzaIngredient[]>("ingredients", {
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
