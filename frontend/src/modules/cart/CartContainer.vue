<template>
  <div class="container">
    <TitleComponent :class="$style.title" tag="h1"> Корзина </TitleComponent>

    <CartList :items="cartItems" />
    <!-- <div class="sheet cart__empty">
          <p>В корзине нет ни одного товара</p>
        </div> -->
    <AdditionalList :class="$style.additional" :items="extras" />

    <CartForm />
  </div>
</template>

<script setup lang="ts">
import TitleComponent from "@/common/components/TitleComponent.vue";
import pizzaIcon from "@/assets/img/product.svg";
import colaIcon from "@/assets/img/cola.svg";
import sauceIcon from "@/assets/img/sauce.svg";
import potatoIcon from "@/assets/img/potato.svg";
import CartForm from "@/modules/cart/components/CartForm.vue";
import CartList from "@/modules/cart/components/CartList.vue";
import AdditionalList from "@/modules/cart/components/AdditionalList.vue";

const cartItems = [
  {
    id: "1",
    title: "Капричоза",
    img: pizzaIcon,
    size: "30 см",
    dough: "тонком",
    sauce: "томатный",
    fillings: ["грибы", "лук", "ветчина", "пармезан", "ананас"],
    count: 1,
    price: 782,
  },
  {
    id: "2",
    title: "Любимая пицца",
    img: pizzaIcon,
    size: "30 см",
    dough: "тонком",
    sauce: "томатный",
    fillings: [
      "грибы",
      "лук",
      "ветчина",
      "пармезан",
      "ананас",
      "бекон",
      "блю чиз",
    ],
    count: 2,
    price: 782,
  },
];

const extras = [
  {
    id: "cola",
    img: colaIcon,
    title: "Coca-Cola 0,5 литра",
    price: 56,
    count: 2,
  },
  { id: "sauce", img: sauceIcon, title: "Острый соус", price: 30, count: 2 },
  {
    id: "potato",
    img: potatoIcon,
    title: "Картошка из печи",
    price: 56,
    count: 2,
  },
];
</script>

<style module lang="scss">
@use "@/assets/scss/mixins/m_clear-list";
@use "@/assets/scss/ds-system/ds-colors";
@use "@/assets/scss/ds-system/ds-typography";

.title {
  margin-bottom: 15px;
}

.additional {
  margin-top: 15px;
  margin-bottom: 25px;
}

.empty {
  padding: 20px 30px;
}
</style>
