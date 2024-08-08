import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/clients",
      name: "clients",
      component: () => import("../views/ClientsView.vue"),
    },
    {
      path: "/reports",
      name: "reports",
      component: () => import("../views/ReportsView.vue"),
    },
    {
      path: "/reports/:clientid",
      name: "clientreportpage",
      component: () => import("../views/SingleReportView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
  ],
});

router.beforeEach(async (to, from) => {
  const { useUserStore } = await import('@/stores/user')
  const { userAuthenticated } = useUserStore()

  if (!userAuthenticated && to.name !== 'login') {
    return { name: 'login' }
  }

  if (userAuthenticated && to.name === 'login') {
    return { name: 'home' }
  }
})

export default router;
