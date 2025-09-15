<template>
  <div class="content__dough">
    <sheet-component title="Выберите тесто" title-size="small">
      <dough-option
        v-for="dough of pizzaDoughs"
        :key="dough.id"
        v-model="selectedPizzaDough"
        :title="dough.name"
        :modifier="PizzaDoughEnum[dough.id]"
        name="dough"
        :description="dough.description"
      />
    </sheet-component>
  </div>
</template>
<script setup lang="ts">
import { PizzaDoughEnum } from "@/types/enums/PizzaDoughEnum";
import { ref } from "vue";
import { IPizzaDough } from "@/types/interfaces/IPizzaDough";
import doughJson from "@/mocks/dough.json";
import DoughOption from "@/modules/pizzabuilder/DoughOption.vue";
import SheetComponent from "@/common/components/SheetComponent.vue";

const selectedPizzaDough = ref<string | null>(null);
const pizzaDoughs = ref<IPizzaDough[]>(doughJson);
</script>

<style scoped lang="scss"></style>
