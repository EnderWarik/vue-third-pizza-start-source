<template>
  <div :class="$style.form">
    <label :class="$style.selectRow">
      <span :class="$style.label">Получение заказа:</span>
      <DropdownComponent
        v-model="delivery"
        name="delivery"
        :options="[
          { value: BaseDeliveryEnum.self, text: 'Заберу сам' },
          { value: BaseDeliveryEnum.new, text: 'Новый адрес' },
          ...additionalAddresses,
        ]"
      />
    </label>

    <TextInput
      v-model="phone"
      name="tel"
      placeholder="+7 999-999-99-99"
      :class="$style.input"
    >
      <span>Контактный телефон:</span>
    </TextInput>

    <div v-if="delivery === 'new'" :class="$style.address">
      <span :class="$style.label">Новый адрес:</span>

      <FormLine v-model="street" name="street" label="Улица*" />
      <FormLine v-model="house" name="house" label="Дом*" small />
      <FormLine v-model="apartment" name="apartment" label="Квартира" small />
    </div>
  </div>
</template>

<script setup lang="ts">
import TextInput from "@/common/components/TextInput.vue";
import DropdownComponent from "@/common/components/DropdownComponent.vue";
import FormLine from "@/modules/cart/components/FormLine.vue";
import { IUserAddress } from "@/modules/profile/types/IUserAddress";
import { computed } from "vue";
import { BaseDeliveryEnum } from "@/modules/cart/types/BaseDeliveryEnum";

const delivery = defineModel<string>("delivery");
const phone = defineModel<string>("phone");

const additionalAddresses = computed(() => {
  return props.addresses.map((address) => {
    return { value: address.id.toString(), text: address.name };
  });
});

const street = defineModel<string>("street", { default: "" });
const house = defineModel<string>("house", { default: "" });
const apartment = defineModel<string>("apartment", { default: "" });

const props = defineProps<{
  addresses: IUserAddress[];
}>();
</script>

<style module lang="scss">
@use "@/assets/scss/ds-system/ds-typography";
@use "@/assets/scss/ds-system/ds-colors";

.form {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}
.selectRow {
  display: flex;
  align-items: center;
  margin-right: auto;
  gap: 16px;
}
.label {
  @include ds-typography.b-s16-h19;
  white-space: nowrap;
}
.select {
  padding: 8px 12px;
  border: 1px solid rgba(ds-colors.$green-500, 0.2);
  border-radius: 8px;
  outline: none;
}
.input {
}
.address {
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 20px;
  gap: 16px;
  flex-wrap: wrap;
}
.inputRow {
  flex-grow: 1;
  margin-bottom: 20px;
}
.small {
  max-width: 120px;
}
</style>
