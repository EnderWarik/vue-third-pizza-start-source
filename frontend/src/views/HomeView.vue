<template>
  <main class="content">
    <form action="#" method="post">

      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <div class="content__dough">

          <div class="sheet">
            <h2 class="title title--small sheet__title">
              Выберите тесто
            </h2>
            <div class="sheet__content dough">
              <label
                  v-for="dough of pizzaDoughs"
                  :key="dough.id"
                  :class="[
                 'dough__input',
                 `dough__input--${PizzaDoughEnum[dough.id]}`
                 ]"
              >
                <input
                    type="radio"
                    name="dought"
                    :value="dough.name"
                    v-model="selectedPizzaDough"
                >
                <b>{{ dough.name }}</b>
                <span>{{ dough.description }}</span>
              </label>
            </div>
          </div>
        </div>

        <div class="content__diameter">
          <div class="sheet">
            <h2 class="title title--small sheet__title">
              Выберите размер
            </h2>
            <div class="sheet__content diameter">
              <label
                  v-for="size of pizzaSizes"
                  :key="size.id"
                  :class="['diameter__input', `diameter__input--${PizzaSizeEnum[size.id]}`]"
              >
                <input
                    type="radio"
                    name="diameter"
                    :value="size.name"
                    v-model="selectedPizzaSize"
                  >
                <span>{{ size.name }}</span>
              </label>
            </div>
          </div>
        </div>

        <div class="content__ingredients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

            <div class="sheet__content ingredients">

              <div class="ingredients__sauce">
                <p>Основной соус:</p>

                <label
                    v-for="sauce of sauces"
                    :key="sauce.id"
                    class="radio ingredients__input">

                  <input
                      type="radio"
                      name="sauce"
                      :value="sauce.name"
                      v-model="selectedPizzaSauce"
                  >
                  <span>{{ sauce.name }}</span>
                </label>
              </div>

              <div class="ingredients__filling">
                <p>Начинка:</p>

                <ul class="ingredients__list">
                  <li
                      v-for="ingredient of ingredients"
                      class="ingredients__item"
                      :key="ingredient.id"
                  >
                    <span
                        :class="[
                            'filling',
                            `filling--${PizzaIngredientEnum[ingredient.id]}`
                            ]">
                     {{ ingredient.name }}
                    </span>
                    <div class="counter counter--orange ingredients__counter">
                      <button type="button" class="counter__button counter__button--minus" disabled>
                        <span class="visually-hidden">Меньше</span>
                      </button>
                      <input type="text" name="counter" class="counter__input" value="0">
                      <button type="button" class="counter__button counter__button--plus">
                        <span class="visually-hidden">Больше</span>
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="content__pizza">
          <label class="input">
            <span class="visually-hidden">Название пиццы</span>
            <input type="text" name="pizza_name" placeholder="Введите название пиццы">
          </label>

          <div class="content__constructor">
            <div class="pizza pizza--foundation--big-tomato">
              <div class="pizza__wrapper">
                <div class="pizza__filling pizza__filling--ananas"></div>
                <div class="pizza__filling pizza__filling--bacon"></div>
                <div class="pizza__filling pizza__filling--cheddar"></div>
              </div>
            </div>
          </div>

          <div class="content__result">
            <p>Итого: 0 ₽</p>
            <button type="button" class="button" disabled>Готовьте!</button>
          </div>
        </div>

      </div>

    </form>
  </main>
</template>

<script setup lang="ts">
import doughJson from "@/mocks/dough.json"
import ingredientsJson from "@/mocks/ingredients.json"
import saucesJson from "@/mocks/sauces.json"
import sizesJson from "@/mocks/sizes.json"
import {ref} from "vue";
import {IPizzaDough} from "@/types/interfaces/IPizzaDough";
import {IPizzaSauce} from "@/types/interfaces/IPizzaSauce";
import {IPizzaSize} from "@/types/interfaces/IPizzaSize";
import {PizzaDoughEnum} from "@/types/enums/PizzaDoughEnum";
import {PizzaSizeEnum} from "@/types/enums/PizzaSizeEnum";
import {IPizzaIngredient} from "@/types/interfaces/IPizzaIngredient";
import {PizzaIngredientEnum} from "@/types/enums/PizzaIngredientEnum";

const pizzaDoughs = ref<IPizzaDough[]>(doughJson)
const ingredients = ref<IPizzaIngredient[]>(ingredientsJson)

const sauces = ref<IPizzaSauce[]>(saucesJson)
const pizzaSizes = ref<IPizzaSize[]>(sizesJson)

const selectedPizzaDough = ref<string | null>(null)
const selectedPizzaSize= ref<string | null>(null)
const selectedPizzaSauce = ref<string | null>(null)
</script>

<style scoped lang="scss">

</style>