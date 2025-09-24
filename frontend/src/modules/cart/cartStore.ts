import { defineStore } from "pinia";
import pizzaIcon from "@/assets/img/product.svg";
import colaIcon from "@/assets/img/cola.svg";
import sauceIcon from "@/assets/img/sauce.svg";
import potatoIcon from "@/assets/img/potato.svg";
import { IProductItem } from "@/modules/pizza/types/IProductItem";
import { IAdditionalItem } from "@/modules/pizza/types/IAdditionalItem";
import { ref } from "vue";

const cartStore = defineStore("cartStore", () => {
  const cartItems = ref<IProductItem>([
    {
      id: "1",
      name: "Капричоза",
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
      name: "Любимая пицца",
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
  ]);

  const extras = ref<IAdditionalItem>([
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
  ]);

  function updatePizzaCounts(pizzaId: number, pizzaCount: number) {}

  function addAdditionalItem(pizzaId: number, item: IAdditionalItem) {}

  function deleteAdditionalItem(pizzaId: number, item: IAdditionalItem) {}
});
