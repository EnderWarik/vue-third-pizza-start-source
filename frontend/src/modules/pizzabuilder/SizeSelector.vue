<template>
  <div :class="$style.diameter">
    <sheet-component title="Выберите размер" :content-class="'diameter'">
      <size-option
        v-for="size of pizzaSizes"
        :key="size.id"
        v-model="selectedPizzaSize"
        :title="size.name"
        :modifier="PizzaSizeEnum[size.id]"
        name="diameter"
      />
    </sheet-component>
  </div>
</template>
<script setup lang="ts">
import sizesJson from "@/mocks/sizes.json";
import SheetComponent from "@/common/components/SheetComponent.vue";
import { ref } from "vue";
import { IPizzaSize } from "@/types/interfaces/IPizzaSize";
import SizeOption from "@/modules/pizzabuilder/SizeOption.vue";
import { PizzaSizeEnum } from "@/types/enums/PizzaSizeEnum";

const pizzaSizes = ref<IPizzaSize[]>(sizesJson);

const selectedPizzaSize = ref<string | null>(null);
</script>

<style module lang="scss">
.diameter {
  width: 373px;
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>
