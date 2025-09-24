import { defineStore } from "pinia";
import { ref } from "vue";
import { IUserAddress } from "@/modules/profile/types/IUserAddress";

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
  ]);

  function addAddress(address: Omit<IUserAddress, "id">) {}

  function updateAddress(id: number, updated: Partial<IUserAddress>) {}

  function removeAddress(id: number) {}

  function getAddressById(id: number) {}

  return {
    addresses,
  };
});
