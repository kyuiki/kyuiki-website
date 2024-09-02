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
          path: "privacy",
          component: () => import("../views/legal/PrivacyPolicyView.vue")
        },
        {
          path: "furry",
          component: () => import("../views/AboutView.vue")
        },
        {
          path: "p/:handle",
          component: () => import("../views/PostView.vue")
        },
        {
          path: "u/:username",
          component: () => import("../views/UserView.vue")
        }
      ]
    },

    // /@[id] with AtParamsView
    {
      path: "/@card",
      component: () => import("../layouts/AtParamLayout.vue"),
      children: [
        {
          path: "",
          component: () => import("../views/AtCardView.vue")
        }
      ]
    },
    {
      path: "/@fun",
      component: () => import("../layouts/AtParamLayout.vue"),
      children: [
        {
          path: "",
          component: () => import("../views/AtCardView.vue")
        },
        {
          path: "fluffychat",
          component: () => import("../views/Fun/FluffyChatView.vue")
        },
        {
          path: "plinko",
          component: () => import("../views/Fun/PlinkoView.vue")
        }
      ]
    },
    {
      path: "/@:id",
      component: () => import("../layouts/AtParamLayout.vue"),
      children: [
        {
          path: "",
          component: () => import("../views/AtParamsView.vue")
        }
      ]
    },
    import.meta.env.VITE_ISLOCAL === "1" && {
      path: "/private",
      component: () => import("../layouts/BlankLayout.vue"),
      children: [
        {
          path: "",
          component: () => import("../views/private/InvoiceView.vue")
        }
      ]
    }
  ]
});

export default router;
