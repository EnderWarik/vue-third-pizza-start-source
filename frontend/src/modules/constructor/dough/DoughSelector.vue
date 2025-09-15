<template>
  <div :class="$style.dough">
    <sheet-component title="Выберите тесто" title-size="small">
      <dough-option
        v-for="dough of pizzaDoughs"
        :key="dough.id"
        v-model="modelValue"
        :title="dough.name"
        :value="dough.id"
        :modifier="PizzaDoughEnum[dough.id]"
        name="dough"
        :description="dough.description"
      />
    </sheet-component>
  </div>
</template>
<script setup lang="ts">
import { PizzaDoughEnum } from "@/types/enums/PizzaDoughEnum";
import { IPizzaDough } from "@/types/interfaces/IPizzaDough";
import DoughOption from "@/modules/constructor/dough/components/DoughOption.vue";
import SheetComponent from "@/common/components/SheetComponent.vue";

const modelValue = defineModel<number | null>();

defineProps<{
  pizzaDoughs: IPizzaDough[];
}>();
</script>

<style module lang="scss">
.dough {
  width: 527px;
  margin-top: 15px;
  margin-right: auto;
  margin-bottom: 15px;
}
</style>
