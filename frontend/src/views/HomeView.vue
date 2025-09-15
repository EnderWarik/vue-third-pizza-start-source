<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <title-component size="big" tag="h1">Конструктор пиццы</title-component>
        <dough-selector v-model="selectedPizzaDoughId" />
        <size-selector v-model="selectedPizzaSizeId" />
        <ingredients-selector
          v-model:sauce="selectedPizzaSauceId"
          v-model:fillings="selectedFillings"
        />

        <content-pizza
          :fillings="selectedFillings"
          :selected-sauce="PizzaSauceEnum[selectedPizzaSauceId] as Sauce"
          :selected-size="PizzaDoughEnum[selectedPizzaDoughId] as Size"
        ></content-pizza>
      </div>
    </form>
  </main>
</template>

<script setup lang="ts">
import TitleComponent from "@/common/components/TitleComponent.vue";
import DoughSelector from "@/modules/constructor/dough/DoughSelector.vue";
import { ref } from "vue";
import SizeSelector from "@/modules/constructor/size/SizeSelector.vue";
import IngredientsSelector from "@/modules/constructor/ingredient/IngredientsSelector.vue";
import ContentPizza from "@/modules/constructor/content/ContentPizza.vue";
import { Sauce, Size } from "@/modules/constructor/content/types";
import { PizzaSauceEnum } from "@/types/enums/PizzaSauceEnum";
import { PizzaDoughEnum } from "@/types/enums/PizzaDoughEnum";

const selectedPizzaDoughId = ref<number>(1);
const selectedPizzaSizeId = ref<number>(2);
const selectedPizzaSauceId = ref<number>(1);
const selectedFillings = ref<Record<string, number>>({});
</script>

<style scoped lang="scss">
@use "@/assets/scss/ds-system/ds-typography";

.content {
  padding-top: 20px;
}

.content__wrapper {
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
