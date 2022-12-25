import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/auth/Login.vue"),
  },
  {
    path: "/customers",
    name: "customers",
    component: () => import("../views/cutomers/Index.vue"),
  },
  {
    path: "/customers/:id",
    name: "customer",
    component: () => import("../views/cutomers/Show.vue"),
  },
  {
    path: "*",
    name: "not-found",
    component: () => import("../views/Home.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/login"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = !!localStorage.getItem("authorization");

  if (authRequired && !loggedIn) {
    return next("/login");
  } else {
    next();
  }
});

export default router;
