import { defineStore } from "pinia";
import { ref } from "vue";
import { IUserAddress } from "@/modules/profile/types/IUserAddress";
import { AddressDraftType } from "@/modules/profile/types/AddressDraftType";
import { makeAvatar } from "@/modules/profile/helpers/imgHelpers";

export const useProfileStore = defineStore("profileStore", () => {
  const addresses = ref<IUserAddress[]>([
    {
      id: 1,
      name: "Адрес №1. Тест",
      street: "Невский пр",
      building: "22",
      flat: "46",
      comment: "Позвоните, пожалуйста, от проходной",
      userId: "1",
    },
    {
      id: 2,
      name: "Адрес №2. Тест",
      street: "2 Невский пр",
      building: "33",
      flat: "466",
      comment: "Позвоните, пожалуйста, от проходной",
      userId: "1",
    },
  ]);

  const user = {
    name: "Василий Ложкин",
    phone: "+7 999-999-99-99",
    avatar: makeAvatar("user5"),
  };

  const addressForm = ref<AddressDraftType>({
    name: "",
    street: "",
    building: "",
    flat: "",
    comment: "",
  });

  function clearAddressForm() {
    addressForm.value = {
      name: "",
      street: "",
      building: "",
      flat: "",
      comment: "",
    };
  }
  function updateAddress() {}
  function removeAddress() {}
  function saveAddressFromForm(): IUserAddress {
    if (!addressForm.value.name) {
      addressForm.value.name = `${addressForm.value.street} ${addressForm.value.building} ${addressForm.value.flat}`;
    }

    const correctAddress = { ...addressForm.value, id: 1, userId: "1" };
    addresses.value.push(correctAddress);
    return correctAddress;
  }
  return {
    addresses,
    saveAddressFromForm,
    addressForm,
    clearAddressForm,
    user,
  };
});
