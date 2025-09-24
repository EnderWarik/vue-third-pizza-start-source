<template>
  <form action="#" method="post">
    <div :class="$style.wrapper">
      <TitleComponent size="big" tag="h1">Конструктор пиццы</TitleComponent>
      <DoughSelector
        v-model="selectedPizzaDoughId"
        :pizza-doughs="pizzaDoughs"
      />
      <SizeSelector v-model="selectedPizzaSizeId" :pizza-sizes="pizzaSizes" />
      <IngredientsSelector
        v-model:sauce="selectedPizzaSauceId"
        v-model:fillings="selectedFillings"
        :sauces="sauces"
        :ingredients="ingredients"
      />

      <ContentPizza
        :fillings="selectedFillings"
        :selected-sauce="PizzaSauceEnum[selectedPizzaSauceId] as Sauce"
        :selected-size="PizzaDoughEnum[selectedPizzaDoughId] as Size"
        :total-price="finalPrice"
        @drop="updateFillings"
      ></ContentPizza>
    </div>
  </form>
</template>

<script setup lang="ts">
import TitleComponent from "@/common/components/TitleComponent.vue";
import DoughSelector from "@/modules/home/dough/DoughSelector.vue";
import { computed, ref } from "vue";
import SizeSelector from "@/modules/home/size/SizeSelector.vue";
import IngredientsSelector from "@/modules/home/ingredient/IngredientsSelector.vue";
import ContentPizza from "@/modules/home/content/ContentPizza.vue";
import { Sauce, Size } from "@/modules/home/content/types";
import { PizzaSauceEnum } from "@/types/enums/PizzaSauceEnum";
import { PizzaDoughEnum } from "@/types/enums/PizzaDoughEnum";
import { IPizzaDough } from "@/types/interfaces/IPizzaDough";
import doughJson from "@/mocks/dough.json";
import { IPizzaSauce } from "@/types/interfaces/IPizzaSauce";
import saucesJson from "@/mocks/sauces.json";
import sizesJson from "@/mocks/sizes.json";
import { IPizzaSize } from "@/types/interfaces/IPizzaSize";
import ingredientsJson from "@/mocks/ingredients.json";
import { IPizzaIngredient } from "@/types/interfaces/IPizzaIngredient";
import { PizzaIngredientEnum } from "@/types/enums/PizzaIngredientEnum";

const selectedPizzaDoughId = ref<number>(1);
const selectedPizzaSizeId = ref<number>(2);
const selectedPizzaSauceId = ref<number>(1);
const selectedFillings = ref<Record<string, number>>({});

function updateFillings(name: string) {
  const value = selectedFillings.value[name];
  if (value) selectedFillings.value[name] = value + 1;
  else selectedFillings.value[name] = 1;
}

const pizzaDoughs = ref<IPizzaDough[]>(doughJson);
const pizzaSizes = ref<IPizzaSize[]>(sizesJson);
const sauces = ref<IPizzaSauce[]>(saucesJson);
const ingredients = ref<IPizzaIngredient[]>(ingredientsJson);

const doughPrice = computed(() => {
  return (
    pizzaDoughs.value.find((item) => item.id === selectedPizzaDoughId.value)
      ?.price || 0
  );
});

const sizePrice = computed(() => {
  return (
    pizzaSizes.value.find((item) => item.id === selectedPizzaSizeId.value)
      ?.multiplier || 0
  );
});

const saucePrice = computed(() => {
  return (
    sauces.value.find((item) => item.id === selectedPizzaSauceId.value)
      ?.price || 0
  );
});

const ingredientsPrice = computed(() => {
  let result = 0;
  for (const filling in selectedFillings.value) {
    const count = selectedFillings.value[filling];
    const id = PizzaIngredientEnum[filling as keyof typeof PizzaIngredientEnum];
    const price = ingredients.value.find((item) => item.id === id)?.price || 0;
    result += price * count;
  }
  return result;
});

const finalPrice = computed(() => {
  return (
    (doughPrice.value + saucePrice.value + ingredientsPrice.value) *
    sizePrice.value
  );
});
</script>

<style module lang="scss">
@use "@/assets/scss/ds-system/ds-typography";

.wrapper {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  width: 920px;
  margin: 0 auto;
  padding-right: 2.12%;
  padding-bottom: 30px;
  padding-left: 2.12%;
}
</style>
