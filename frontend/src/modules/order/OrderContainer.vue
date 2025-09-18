<template>
  <order-card
    :order-number="11199929"
    :total="1564"
    :products="products"
    :additionals="additionals"
    address="Адрес доставки: Тест (или если адрес новый - писать целиком)"
  />
  <order-card
    :order-number="11199930"
    :total="1564"
    :products="products"
    :additionals="additionals"
    address="Адрес доставки: Тест (или если адрес новый - писать целиком)"
  />
</template>
<script setup lang="ts">
import OrderCard from "@/modules/order/components/OrderCard.vue";
import PizzaIcon from "@/assets/img/product.svg";
import ColaIcon from "@/assets/img/cola.svg";
import SauceIcon from "@/assets/img/sauce.svg";
import PotatoIcon from "@/assets/img/potato.svg";

const products = [
  {
    id: "1",
    title: "Капричоза",
    img: PizzaIcon,
    size: "30 см",
    dough: "тонком",
    sauce: "томатный",
    fillings: ["грибы", "лук", "ветчина", "пармезан", "ананас"],
    count: 1,
    price: 782,
  },
  {
    id: "2",
    title: "Моя любимая",
    img: PizzaIcon,
    size: "30 см",
    dough: "тонком",
    sauce: "томатный",
    fillings: ["грибы", "лук", "ветчина", "пармезан", "ананас"],
    count: 2,
    price: 782,
  },
];
const additionals = [
  { id: "cola", img: ColaIcon, title: "Coca-Cola 0,5 литра", price: 56 },
  { id: "sauce", img: SauceIcon, title: "Острый соус", price: 30 },
  { id: "potato", img: PotatoIcon, title: "Картошка из печи", price: 170 },
];
</script>
<style scoped lang="scss">
@use "@/assets/scss/ds-system/ds-colors";
@use "@/assets/scss/ds-system/ds-typography";

@use "@/assets/scss/mixins/m_clear-list";

.layout__sidebar {
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;

  width: 180px;
  height: 100%;

  background-color: rgba(ds-colors.$green-500, 0.05);
}

.layout__logo {
  display: block;

  margin-bottom: 30px;
  padding-top: 10px;
  padding-bottom: 10px;

  background-color: ds-colors.$green-500;

  img {
    display: block;

    margin: 0 auto;
  }
}

.layout__link {
  @include ds-typography.b-s14-h16;

  display: block;

  padding: 8px 14px;

  transition: 0.3s;

  color: ds-colors.$black;

  &--active {
    background-color: rgba(ds-colors.$green-500, 0.1);
  }

  &:hover {
    background-color: rgba(ds-colors.$green-500, 0.2);
  }

  &:active {
    color: rgba(ds-colors.$black, 0.5);
  }
}

.layout__content {
  padding-top: 22px;
  padding-right: 2.12%;
  padding-left: 200px;
}

.layout__title {
  margin-bottom: 27px;
}

.layout__button {
  margin-top: 40px;

  button {
    padding: 12px 23px;
  }
}

.layout__address {
  margin-top: 16px;
}

.order {
  margin-bottom: 32px;
  padding-top: 0;
}

.order__list {
  @include m_clear-list.clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  margin-top: 24px;
  padding-right: 10px;
  padding-left: 10px;
}

.order__additional {
  @include m_clear-list.clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  margin-bottom: 5px;
  padding-left: 80px;
}

.order__address {
  @include ds-typography.l-s11-h13;

  margin: 0;
  padding: 16px 10px;

  border-top: 1px solid rgba(ds-colors.$green-500, 0.1);
}
</style>
