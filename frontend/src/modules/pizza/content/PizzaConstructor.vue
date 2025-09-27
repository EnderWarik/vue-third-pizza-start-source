<template>
  <div :class="$style.container">
    <div
      :class="[
        $style.pizza,
        $style[
          `foundation_${PizzaDoughEnum[sizeId]}_${PizzaSauceEnum[sauceId]}`
        ],
      ]"
    >
      <div :class="$style.wrapper">
        <div
          v-for="layer in layers"
          :key="PizzaIngredientEnum[layer.id]"
          :class="[
            $style.layer,
            layer.count >= 1 && $style[PizzaIngredientEnum[layer.id]],
            layer.count === 2 && $style['second'],
            layer.count >= 3 && $style['third'],
          ]"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PizzaSauceEnum } from "@/types/enums/PizzaSauceEnum";
import { PizzaDoughEnum } from "@/types/enums/PizzaDoughEnum";
import { IPizzaIngredient } from "@/modules/pizza/types/IPizzaIngredient";
import { PizzaIngredientEnum } from "@/types/enums/PizzaIngredientEnum";

const props = defineProps<{
  sizeId: number;
  sauceId: number;
  layers: IPizzaIngredient[];
}>();
</script>

<style module lang="scss">
@use "@/assets/scss/ds-system/ds-colors";
@use "@/assets/scss/ds-system/ds-typography";
@use "@/assets/scss/mixins/m_center";

.container {
  width: 315px;
  margin-top: 25px;
  margin-right: auto;
  margin-left: auto;
}

.pizza {
  position: relative;
  display: block;

  box-sizing: border-box;
  width: 100%;

  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
}

.foundation_big_creamy {
  background-image: url("@/assets/img/foundation/big-creamy.svg");
}
.foundation_big_tomato {
  background-image: url("@/assets/img/foundation/big-tomato.svg");
}
.foundation_small_creamy {
  background-image: url("@/assets/img/foundation/small-creamy.svg");
}
.foundation_small_tomato {
  background-image: url("@/assets/img/foundation/small-tomato.svg");
}

.wrapper {
  width: 100%;
  padding-bottom: 100%;
}

.layer {
  position: absolute;
  top: 0;
  left: 0;

  display: block;

  width: 100%;
  height: 100%;

  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;

  &::before,
  &::after {
    display: none;

    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    content: "";
    background-image: inherit;
    background-repeat: inherit;
    background-position: inherit;
    background-size: inherit;
  }
}

.second::before {
  display: block;
  transform: rotate(45deg);
}

.third::before {
  display: block;
  transform: rotate(45deg);
}
.third::after {
  display: block;
  transform: rotate(-45deg);
}

.ananas {
  background-image: url("@/assets/img/filling-big/ananas.svg");
}
.bacon {
  background-image: url("@/assets/img/filling-big/bacon.svg");
}
.blue_cheese {
  background-image: url("@/assets/img/filling-big/blue_cheese.svg");
}
.cheddar {
  background-image: url("@/assets/img/filling-big/cheddar.svg");
}
.chile {
  background-image: url("@/assets/img/filling-big/chile.svg");
}
.ham {
  background-image: url("@/assets/img/filling-big/ham.svg");
}
.jalapeno {
  background-image: url("@/assets/img/filling-big/jalapeno.svg");
}
.mozzarella {
  background-image: url("@/assets/img/filling-big/mozzarella.svg");
}
.mushrooms {
  background-image: url("@/assets/img/filling-big/mushrooms.svg");
}
.olives {
  background-image: url("@/assets/img/filling-big/olives.svg");
}
.onion {
  background-image: url("@/assets/img/filling-big/onion.svg");
}
.parmesan {
  background-image: url("@/assets/img/filling-big/parmesan.svg");
}
.salami {
  background-image: url("@/assets/img/filling-big/salami.svg");
}
.salmon {
  background-image: url("@/assets/img/filling-big/salmon.svg");
}
.tomatoes {
  background-image: url("@/assets/img/filling-big/tomatoes.svg");
}
</style>
