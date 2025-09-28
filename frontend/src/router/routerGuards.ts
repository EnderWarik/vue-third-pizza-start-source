import type { RouteLocationNormalized, Router } from "vue-router";

import { useAuthStore } from "@/modules/auth/authStore";

function isPublicRoute(to: RouteLocationNormalized): boolean {
  return Boolean(to.meta?.public);
}

export function setupAuthGuard(router: Router) {
  router.beforeEach((to) => {
    const auth = useAuthStore();
    if (to.path === "/login" && auth.isAuthenticated) {
      return { name: "home" };
    }

    if (!isPublicRoute(to) && !auth.isAuthenticated) {
      return { path: "/login", query: { redirect: to.fullPath } };
    }

    return true;
  });
}
