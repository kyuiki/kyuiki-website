import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("../layouts/DefaultLayout.vue"),
      children: [
        {
          path: "",
          component: HomeView
        },
        {
          path: "furry",
          component: () => import("../views/AboutView.vue")
        }
      ]
    }
  ]
});

export default router;
