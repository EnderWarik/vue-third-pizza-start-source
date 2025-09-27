import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("authStore", () => {
  const userEmail = ref<string>("test");
  const userPassword = ref<string>("test");

  function login(email: string, password: string) {
    if (email === userEmail.value && password === userPassword.value)
      return true;
    return false;
  }
  function logout(email: string, password: string) {}
  function whoAmI(email: string, password: string) {}


  return {
    login
  }
});
