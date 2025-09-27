<template>
  <li :class="$style.item">
    <DragComponent :transfer-data="ingredient">
      <span :class="[$style.filling, $style[modifier]]">
        {{ ingredient.name }}
      </span>
    </DragComponent>
    <CounterComponent v-model="modelValue" :class="$style.counter" />
  </li>
</template>

<script setup lang="ts">
import { IPizzaIngredient } from "@/modules/pizza/types/IPizzaIngredient";
import CounterComponent from "@/common/components/CounterComponent.vue";
import DragComponent from "@/common/components/DragComponent.vue";

defineProps<{
  ingredient: IPizzaIngredient;
  modifier: string;
}>();
const modelValue = defineModel<number | undefined>({ default: 0 });
</script>

<style module lang="scss">
@use "@/assets/scss/ds-system/ds-colors";
@use "@/assets/scss/ds-system/ds-typography";
@use "@/assets/scss/mixins/m_center";

.counter {
  width: 54px;
  margin-top: 10px;
  margin-left: 36px;
}

.filling {
  @include ds-typography.r-s14-h16;

  position: relative;
  display: block;
  padding-left: 36px;

  &::before {
    @include m_center.p_center-v;

    display: block;
    width: 32px;
    height: 32px;

    content: "";
    border-radius: 50%;
    background-color: ds-colors.$white;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 80% 80%;
  }
}

.tomatoes::before {
  background-image: url("@/assets/img/filling/tomatoes.svg");
}
.ananas::before {
  background-image: url("@/assets/img/filling/ananas.svg");
}
.bacon::before {
  background-image: url("@/assets/img/filling/bacon.svg");
}
.blue_cheese::before {
  background-image: url("@/assets/img/filling/blue_cheese.svg");
}
.cheddar::before {
  background-image: url("@/assets/img/filling/cheddar.svg");
}
.chile::before {
  background-image: url("@/assets/img/filling/chile.svg");
}
.ham::before {
  background-image: url("@/assets/img/filling/ham.svg");
}
.jalapeno::before {
  background-image: url("@/assets/img/filling/jalapeno.svg");
}
.mozzarella::before {
  background-image: url("@/assets/img/filling/mozzarella.svg");
}
.mushrooms::before {
  background-image: url("@/assets/img/filling/mushrooms.svg");
}
.olives::before {
  background-image: url("@/assets/img/filling/olives.svg");
}
.onion::before {
  background-image: url("@/assets/img/filling/onion.svg");
}
.parmesan::before {
  background-image: url("@/assets/img/filling/parmesan.svg");
}
.salami::before {
  background-image: url("@/assets/img/filling/salami.svg");
}
.salmon::before {
  background-image: url("@/assets/img/filling/salmon.svg");
}
</style>
