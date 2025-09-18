import { createRouter, createWebHistory } from "vue-router";
import HeaderLayout from "@/layouts/HeaderLayout.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/HomeView.vue"),
      meta: {
        layout: HeaderLayout,
      },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/LoginView.vue"),
    },
    {
      path: "/cart",
      name: "cart",
      component: () => import("@/views/CartView.vue"),
      meta: {
        layout: HeaderLayout,
      },
    },
  ],
});

export default router;
