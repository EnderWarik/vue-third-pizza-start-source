import { createRouter, createWebHistory } from "vue-router";
import HeaderLayout from "@/layouts/HeaderLayout.vue";
import SidebarLayout from "@/layouts/SidebarLayout.vue";

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
    {
      path: "/orders",
      name: "orders",
      component: () => import("@/views/OrdersView.vue"),
      meta: {
        layout: SidebarLayout,
        title: "История заказов",
        logo: { src: "./src/assets/img/logo.svg", alt: "V!U!E! Pizza" },
        links: [
          { label: "История заказов", href: "/orders" },
          { label: "Мои данные", href: "/profile" },
        ],
      },
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("@/views/ProfileView.vue"),
      meta: {
        layout: SidebarLayout,
        title: "Мои данные",
        logo: { src: "./src/assets/img/logo.svg", alt: "V!U!E! Pizza" },
        links: [
          { label: "История заказов", href: "/orders" },
          { label: "Мои данные", href: "/profile" },
        ],
      },
    },
  ],
});

export default router;
