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
          path: "diary",
          component: () => import("../views/DiaryView.vue")
        },
        {
          path: "furry",
          component: () => import("../views/AboutView.vue")
        }
      ]
    },
    // /@[id] with AtParamsView
    {
      path: "/@:id",
      component: () => import("../layouts/AtParamLayout.vue"),
      children: [
        {
          path: "",
          component: () => import("../views/AtParamsView.vue")
        }
      ]
    }
  ]
});

export default router;
