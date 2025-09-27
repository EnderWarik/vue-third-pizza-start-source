import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { IPizzaSauce } from "@/modules/pizza/types/IPizzaSauce";
import { IPizzaSize } from "@/modules/pizza/types/IPizzaSize";
import { IPizzaDough } from "@/types/interfaces/IPizzaDough";
import { v4 as uuidv4 } from "uuid";
import { IPizzaItem } from "@/modules/pizza/types/IPizzaItem";
import { mapWithCount } from "@/helpers/mappers";
import { IPizzaIngredient } from "@/modules/pizza/types/IPizzaIngredient";
import { useCartStore } from "@/modules/cart/cartStore";

export const usePizzaStore = defineStore("pizzaStore", () => {
  const cartStore = useCartStore();

  const ingredients = ref<IPizzaIngredient[]>(
    mapWithCount([
      { id: 1, name: "Грибы", image: "filling/mushrooms.svg", price: 33 },
      { id: 2, name: "Чеддер", image: "filling/cheddar.svg", price: 42 },
      { id: 3, name: "Салями", image: "filling/salami.svg", price: 42 },
      { id: 4, name: "Ветчина", image: "filling/ham.svg", price: 42 },
      { id: 5, name: "Ананас", image: "filling/ananas.svg", price: 25 },
      { id: 6, name: "Бекон", image: "filling/bacon.svg", price: 42 },
      { id: 7, name: "Лук", image: "filling/onion.svg", price: 21 },
      { id: 8, name: "Чили", image: "filling/chile.svg", price: 21 },
      { id: 9, name: "Халапеньо", image: "filling/jalapeno.svg", price: 25 },
      { id: 10, name: "Маслины", image: "filling/olives.svg", price: 25 },
      { id: 11, name: "Томаты", image: "filling/tomatoes.svg", price: 35 },
      { id: 12, name: "Лосось", image: "filling/salmon.svg", price: 50 },
      { id: 13, name: "Моцарелла", image: "filling/mozzarella.svg", price: 35 },
      { id: 14, name: "Пармезан", image: "filling/parmesan.svg", price: 35 },
      { id: 15, name: "Блю чиз", image: "filling/blue_cheese.svg", price: 50 },
    ]),
  );

  const sauces = ref<IPizzaSauce[]>([
    {
      id: 1,
      name: "Томатный",
      price: 50,
    },
    {
      id: 2,
      name: "Сливочный",
      price: 50,
    },
  ]);

  const pizzaSizes = ref<IPizzaSize[]>([
    {
      id: 1,
      name: "23 см",
      image: "diameter.svg",
      multiplier: 1,
    },
    {
      id: 2,
      name: "32 см",
      image: "diameter.svg",
      multiplier: 2,
    },
    {
      id: 3,
      name: "45 см",
      image: "diameter.svg",
      multiplier: 3,
    },
  ]);

  const pizzaDoughs = ref<IPizzaDough[]>([
    {
      id: 1,
      name: "Тонкое",
      image: "dough-light.svg",
      description: "Из твердых сортов пшеницы",
      price: 300,
    },
    {
      id: 2,
      name: "Толстое",
      image: "dough-large.svg",
      description: "Из твердых сортов пшеницы",
      price: 300,
    },
  ]);

  const selectedPizzaDoughId = ref<number>(1);
  const selectedPizzaSizeId = ref<number>(2);
  const selectedPizzaSauceId = ref<number>(1);

  const pizzaName = ref<string>("Моя пицца");

  const currentDough = computed<IPizzaDough | null>(() => {
    return (
      pizzaDoughs.value.find(
        (item) => item.id === selectedPizzaDoughId.value,
      ) || null
    );
  });

  const doughPrice = computed(() => {
    return currentDough.value?.price || 0;
  });

  const currentSize = computed<IPizzaSize | null>(() => {
    return (
      pizzaSizes.value.find((item) => item.id === selectedPizzaSizeId.value) ||
      null
    );
  });
  const sizePrice = computed(() => {
    return currentSize.value?.multiplier || 0;
  });

  const currentSauce = computed<IPizzaSauce | null>(() => {
    return (
      sauces.value.find((item) => item.id === selectedPizzaSauceId.value) ||
      null
    );
  });
  const saucePrice = computed(() => {
    return currentSauce.value?.price || 0;
  });

  const ingredientsPrice = computed(() => {
    let result = 0;
    for (const ingredient of ingredients.value) {
      const count = ingredient.count;
      if (count <= 0) continue;

      result += ingredient.price * count;
    }
    return result;
  });

  const finalPrice = computed(() => {
    return (
      (doughPrice.value + saucePrice.value + ingredientsPrice.value) *
      sizePrice.value
    );
  });

  const pizzaFillings = computed(() => {
    return ingredients.value.filter((item) => item.count > 0) || [];
  });

  function updateFillings(ingredient: IPizzaIngredient) {
    const currentIngredient = ingredients.value.find(
      (item) => item.id === ingredient.id,
    );
    if (!currentIngredient) return;
    currentIngredient.count = currentIngredient.count + 1;
  }

  function addToCart(): void {
    const pizza: IPizzaItem = {
      id: uuidv4(),
      name: pizzaName.value,
      size: currentSize.value,
      dough: currentDough.value,
      sauce: currentSauce.value,
      fillings: pizzaFillings.value,
      count: 1,
      price: finalPrice.value,
    };
    cartStore.addPizzaItem(pizza);
  }

  return {
    ingredients,
    sauces,
    pizzaSizes,
    pizzaDoughs,
    pizzaName,
    selectedPizzaDoughId,
    selectedPizzaSizeId,
    selectedPizzaSauceId,
    finalPrice,
    pizzaFillings,
    updateFillings,
    addToCart,
  };
});
