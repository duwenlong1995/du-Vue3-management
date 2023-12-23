import { createRouter, createWebHistory } from "vue-router";

/**
 * 定义路由数组
 */
const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "home",
    title: "首页",
    component: () => import("@/views/home/index.vue"),
    children: [
      {
        path: "/page1",
        name: "page1",
        title: "page1",
        component: () => import("@/views/page1/index.vue"),
      },
      {
        path: "/page2",
        name: "page2",
        title: "page2",
        component: () => import("@/views/page2/index.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue"),
  },
  {
    // 404路由
    path: "/404",
    name: "404",
    component: () => import("@/views/404/index.vue"),
  },
];

/**
 * 创建路由
 */
const router = createRouter({
  history: createWebHistory("/"),
  routes,
});
// 全局守卫：登录拦截 本地没有存token,请重新登录
router.beforeEach((to, from, next) => {
  // 判断有没有登录
  if (!localStorage.getItem("token")) {
    if (to.name == "login") {
      next();
    } else {
      router.push("login");
    }
  } else {
    next();
  }
});

/**
 * 输出对象
 */
export default router;
