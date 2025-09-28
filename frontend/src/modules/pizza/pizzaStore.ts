import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { IPizzaSauce } from "@/modules/pizza/types/IPizzaSauce";
import { IPizzaSize } from "@/modules/pizza/types/IPizzaSize";
import { IPizzaDough } from "@/modules/pizza/types/IPizzaDough";
import { v4 as uuidv4 } from "uuid";
import { IPizzaItem } from "@/modules/pizza/types/IPizzaItem";
import { mapWithCount } from "@/helpers/mappers";
import { IPizzaIngredient } from "@/modules/pizza/types/IPizzaIngredient";
import { useCartStore } from "@/modules/cart/cartStore";
import { pizzaApi } from "@/modules/pizza/pizzaApi";

export const usePizzaStore = defineStore("pizzaStore", () => {
  const cartStore = useCartStore();

  const isLoading = ref<boolean>(false);

  const ingredients = ref<(IPizzaIngredient & { count: number })[]>([]);
  const sauces = ref<IPizzaSauce[]>([]);
  const pizzaSizes = ref<IPizzaSize[]>([]);
  const pizzaDoughs = ref<IPizzaDough[]>([]);

  const selectedPizzaDoughId = ref<number>(0);
  const selectedPizzaSizeId = ref<number>(0);
  const selectedPizzaSauceId = ref<number>(0);

  const pizzaName = ref<string>("Моя пицца");

  async function init(): Promise<void> {
    try {
      isLoading.value = true;
      const [doughs, ingredientsResp, saucesResp, sizesResp] = await Promise.all([
        pizzaApi.getDoughs(),
        pizzaApi.getIngredients(),
        pizzaApi.getSauces(),
        pizzaApi.getSizes(),
      ]);

      pizzaDoughs.value = doughs;
      ingredients.value = mapWithCount(ingredientsResp);
      sauces.value = saucesResp;
      pizzaSizes.value = sizesResp;

      selectedPizzaDoughId.value = doughs[0]?.id ?? 0;
      selectedPizzaSizeId.value = sizesResp[0]?.id ?? 0;
      selectedPizzaSauceId.value = saucesResp[0]?.id ?? 0;
    } finally {
      isLoading.value = false;
    }
  }

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
    isLoading,
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
    init,
  };
});
