<template>
  <form action="#" method="post">
    <div :class="$style.wrapper">
      <TitleComponent size="big" tag="h1">Конструктор пиццы</TitleComponent>
      <div v-if="pizzaStore.isLoading">Загрузка...</div>
      <DoughSelector
        v-model="pizzaStore.selectedPizzaDoughId"
        :pizza-doughs="pizzaStore.pizzaDoughs"
      />
      <SizeSelector
        v-model="pizzaStore.selectedPizzaSizeId"
        :pizza-sizes="pizzaStore.pizzaSizes"
      />
      <IngredientsSelector
        v-model:sauce="pizzaStore.selectedPizzaSauceId"
        v-model:ingredients="pizzaStore.ingredients"
        :sauces="pizzaStore.sauces"
      />

      <ContentPizza
        v-model:pizza-name="pizzaStore.pizzaName"
        :fillings="pizzaStore.pizzaFillings"
        :selected-sauce-id="pizzaStore.selectedPizzaSauceId"
        :selected-size-id="pizzaStore.selectedPizzaDoughId"
        :total-price="pizzaStore.finalPrice"
        @drop="pizzaStore.updateFillings"
        @submit="pizzaStore.addToCart"
      ></ContentPizza>
    </div>
  </form>
</template>

<script setup lang="ts">
import TitleComponent from "@/common/components/TitleComponent.vue";
import DoughSelector from "@/modules/pizza/dough/DoughSelector.vue";
import SizeSelector from "@/modules/pizza/size/SizeSelector.vue";
import IngredientsSelector from "@/modules/pizza/ingredient/IngredientsSelector.vue";
import { usePizzaStore } from "@/modules/pizza/pizzaStore";
import ContentPizza from "@/modules/pizza/content/ContentPizza.vue";

const pizzaStore = usePizzaStore();
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
