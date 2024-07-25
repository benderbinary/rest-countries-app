import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", name: "home", component: Home },
    {
      path: "/country/:code",
      name: "CountryView",
      component: () => import("../views/CountryView.vue"),
    },
  ],
});

export default router;
