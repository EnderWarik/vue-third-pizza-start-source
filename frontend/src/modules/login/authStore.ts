import { defineStore } from "pinia";
import { ref } from "vue";

const authStore = defineStore("authStore", () => {
  const userEmail = ref<string>();
  const userPassword = ref<string>();

  function login(email: string, password: string) {}
  function logout(email: string, password: string) {}
  function whoAmI(email: string, password: string) {}
});
