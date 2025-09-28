import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { TokenStorage } from "@/modules/auth/utils/TokenStorage";
import { authApi } from "@/modules/auth/authApi";

export const useAuthStore = defineStore("authStore", () => {
  const token = ref(TokenStorage.get());

  const isAuthenticated = computed(() => !!token.value);

  async function login(email: string, password: string) {
    const loginResponse = await authApi.login({ email, password });
    token.value = loginResponse.token;
    TokenStorage.set(loginResponse.token);
    return true;
  }
  async function logout() {
    await authApi.logout();
    token.value = null;
    TokenStorage.clear();
  }
  return {
    isAuthenticated,
    login,
    logout,
  };
});
