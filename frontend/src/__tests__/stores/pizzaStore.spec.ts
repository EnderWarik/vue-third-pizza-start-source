import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { usePizzaStore } from "@/modules/pizza/pizzaStore";
import { pizzaApi } from "@/modules/pizza/pizzaApi";

vi.mock("@/modules/pizza/pizzaApi", () => {
  return {
    pizzaApi: {
      getDoughs: vi.fn(),
      getIngredients: vi.fn(),
      getSauces: vi.fn(),
      getSizes: vi.fn(),
    },
  };
});

vi.mock("@/helpers/mappers", () => {
  return {
    mapWithCount: <T extends object>(arr: T[]): (T & { count: number })[] =>
      arr.map((x) => ({ ...x, count: 0 })),
  };
});

const addPizzaItemMock = vi.fn();
vi.mock("@/modules/cart/cartStore", () => {
  return {
    useCartStore: () => ({
      addPizzaItem: addPizzaItemMock,
    }),
  };
});

vi.mock("uuid", () => ({
  v4: () => "fixed-uuid",
}));

describe("pizzaStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();

    vi.mocked(pizzaApi.getDoughs).mockResolvedValue([
      { id: 1, name: "Тонкое", image: "", description: "", price: 100 },
      { id: 2, name: "Толстое", image: "", description: "", price: 150 },
    ]);
    vi.mocked(pizzaApi.getIngredients).mockResolvedValue([
      { id: 10, name: "Сыр", image: "", price: 30, count: 0 },
      { id: 11, name: "Ветчина", image: "", price: 40, count: 0 },
    ]);
    vi.mocked(pizzaApi.getSauces).mockResolvedValue([
      { id: 3, name: "Сливочный", price: 20 },
    ]);
    vi.mocked(pizzaApi.getSizes).mockResolvedValue([
      { id: 4, name: "23 см", image: "", multiplier: 1.2 },
    ]);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("init(): подтягивает каталоги и ставит дефолтные выбранные ids, выключает isLoading", async () => {
    const store = usePizzaStore();
    await store.init();

    expect(pizzaApi.getDoughs).toHaveBeenCalledTimes(1);
    expect(pizzaApi.getIngredients).toHaveBeenCalledTimes(1);
    expect(pizzaApi.getSauces).toHaveBeenCalledTimes(1);
    expect(pizzaApi.getSizes).toHaveBeenCalledTimes(1);

    expect(store.pizzaDoughs).toHaveLength(2);
    expect(store.ingredients).toEqual([
      { id: 10, name: "Сыр", image: "", price: 30, count: 0 },
      { id: 11, name: "Ветчина", image: "", price: 40, count: 0 },
    ]);
    expect(store.sauces[0].id).toBe(3);
    expect(store.pizzaSizes[0].id).toBe(4);

    expect(store.selectedPizzaDoughId).toBe(1);
    expect(store.selectedPizzaSauceId).toBe(3);
    expect(store.selectedPizzaSizeId).toBe(4);

    expect(store.isLoading).toBe(false);
  });

  it("updateFillings(): увеличивает count конкретного ингредиента", async () => {
    const store = usePizzaStore();
    await store.init();

    expect(store.ingredients[0].count).toBe(0);

    store.updateFillings({
      id: 10,
      name: "Сыр",
      image: "",
      price: 30,
      count: 0,
    });
    expect(store.ingredients.find((i) => i.id === 10)?.count).toBe(1);

    store.updateFillings({
      id: 10,
      name: "Сыр",
      image: "",
      price: 30,
      count: 0,
    });
    expect(store.ingredients.find((i) => i.id === 10)?.count).toBe(2);
  });

  it("finalPrice: (doughPrice + saucePrice + ingredientsPrice) * sizeMultiplier", async () => {
    const store = usePizzaStore();
    await store.init();
    store.updateFillings({
      id: 10,
      name: "Сыр",
      image: "",
      price: 30,
      count: 0,
    });
    store.updateFillings({
      id: 10,
      name: "Сыр",
      image: "",
      price: 30,
      count: 0,
    });
    store.updateFillings({
      id: 11,
      name: "Ветчина",
      image: "",
      price: 40,
      count: 0,
    });

    expect(store.finalPrice).toBeCloseTo(264);
  });

  it("addToCart(): формирует позицию и зовёт cartStore.addPizzaItem()", async () => {
    const store = usePizzaStore();
    await store.init();

    store.updateFillings({
      id: 10,
      name: "Сыр",
      image: "",
      price: 30,
      count: 0,
    });

    store.pizzaName = "Моя пицца — тест";

    store.addToCart();

    expect(addPizzaItemMock).toHaveBeenCalledTimes(1);
    const [payload] = addPizzaItemMock.mock.calls[0];

    expect(payload).toMatchObject({
      id: "fixed-uuid",
      name: "Моя пицца — тест",
      count: 1,
      size: { id: 4, multiplier: 1.2 },
      dough: { id: 1, price: 100 },
      sauce: { id: 3, price: 20 },
      fillings: [{ id: 10, name: "Сыр", price: 30, count: 1 }],
    });
    expect(payload.price).toBe(store.finalPrice);
  });

  it("init(): устойчив к пустым справочникам (ставит selected ids в 0)", async () => {
    vi.mocked(pizzaApi.getDoughs).mockResolvedValueOnce([]);
    vi.mocked(pizzaApi.getIngredients).mockResolvedValueOnce([]);
    vi.mocked(pizzaApi.getSauces).mockResolvedValueOnce([]);
    vi.mocked(pizzaApi.getSizes).mockResolvedValueOnce([]);

    const store = usePizzaStore();
    await store.init();

    expect(store.selectedPizzaDoughId).toBe(0);
    expect(store.selectedPizzaSauceId).toBe(0);
    expect(store.selectedPizzaSizeId).toBe(0);
    expect(store.isLoading).toBe(false);
  });
});
