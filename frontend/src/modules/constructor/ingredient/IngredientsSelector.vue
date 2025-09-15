<template>
  <div class="content__ingredients">
    <sheet-component title="Выберите ингредиенты">
      <div class="sheet__content ingredients">
        <ingredients-sauce v-model="selectedPizzaSauce" :sauces="sauces" />

        <ingredients-filling
          v-model="selectedFillings"
          :ingredients="ingredients"
        />
      </div>
    </sheet-component>
  </div>
</template>

<script setup lang="ts">
import SheetComponent from "@/common/components/SheetComponent.vue";
import IngredientsFilling from "@/modules/constructor/ingredient/IngredientsFilling.vue";
import IngredientsSauce from "@/modules/constructor/ingredient/IngredientsSauce.vue";
import { ref } from "vue";
import { IPizzaIngredient } from "@/types/interfaces/IPizzaIngredient";
import ingredientsJson from "@/mocks/ingredients.json";
import { IPizzaSauce } from "@/types/interfaces/IPizzaSauce";
import saucesJson from "@/mocks/sauces.json";

const ingredients = ref<IPizzaIngredient[]>(ingredientsJson);

const sauces = ref<IPizzaSauce[]>(saucesJson);

const selectedPizzaSauce = ref<string | null>(null);
const selectedFillings = ref<Record<string, number>>();
</script>
<style scoped lang="scss">
.content__ingredients {
  width: 527px;
  margin-top: 15px;
  margin-right: auto;
  margin-bottom: 15px;
}
</style>
