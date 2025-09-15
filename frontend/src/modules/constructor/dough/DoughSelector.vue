<template>
  <div :class="$style.dough">
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
import DoughOption from "@/modules/constructor/dough/components/DoughOption.vue";
import SheetComponent from "@/common/components/SheetComponent.vue";

const selectedPizzaDough = ref<string | null>(null);
const pizzaDoughs = ref<IPizzaDough[]>(doughJson);
</script>

<style module lang="scss">
.dough {
  width: 527px;
  margin-top: 15px;
  margin-right: auto;
  margin-bottom: 15px;
}
</style>
