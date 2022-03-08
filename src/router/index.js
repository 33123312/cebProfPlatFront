import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Nav",
    component: () => import("../views/login.vue"),
  },
  {
    path: "/logged",
    name: "Logged",
    component: () =>
      import("../views/logged.vue"),
    children:[
      {
        path: "/uploadCalif",
        name: "UploadCalif",
        component: () =>
          import("../views/UploadCalif.vue"),
      }
      ]
    }
  ];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
