import { createRouter, createWebHistory } from "vue-router";
// import { pendingRequest } from "@/api/request";

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
    label: "首页",
    title: "首页",
    component: () => import("@/views/home/index.vue"),
    meta: {
      roles: ["admin", "user"],
    },
    children: [
      {
        path: "/page1",
        name: "page1",
        title: "page1",
        meta: {
          roles: ["admin", "user"],
        },
        icon: () => h(PieChartOutlined),
        component: () => import("@/views/home/page1/index.vue"),
      },
      {
        path: "/page2",
        name: "page2",
        title: "page2",
        meta: {
          roles: ["admin", "user"],
        },
        icon: () => h(PieChartOutlined),
        component: () => import("@/views/home/page2/index.vue"),
      },
      {
        path: "/page3",
        name: "page3",
        title: "page3",
        meta: {
          roles: ["admin", "user"],
        },
        icon: () => h(PieChartOutlined),
        component: () => import("@/views/home/page3/index.vue"),
      },
      {
        path: "/page4",
        name: "page4",
        title: "page4",
        meta: {
          roles: ["admin", "user"],
        },
        icon: () => h(PieChartOutlined),
        component: () => import("@/views/home/page4/index.vue"),
      },
      {
        path: "/page5",
        name: "page5",
        title: "page5",
        meta: {
          roles: ["admin"],
        },
        icon: () => h(PieChartOutlined),
        component: () => import("@/views/home/page5/index.vue"),
      },
    ],
  },
  {
    path: "/manage",
    name: "manage",
    title: "管理",
    meta: {
      roles: ["user"],
    },
    icon: () => h(PieChartOutlined),
    component: () => import("@/views/manage/index.vue"),
  },
  {
    path: "/login",
    name: "login",
    meta: {
      roles: ["admin"],
    },
    icon: () => h(PieChartOutlined),
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

// 模拟异步操作的函数
function someAsyncOperation() {
  return new Promise((resolve) => {
    // 模拟异步操作，比如从服务器获取数据
    resolve();
  });
}
// 假设角色有两种：admin 和 user
// 这里是从后台获取的用户角色
const role = "user";
// 全局守卫：登录拦截 本地没有存token,请重新登录
router.beforeEach((to, from, next) => {
  //切换路由时，取消之前的请求
  // pendingRequest.forEach((item) => {
  //   item.routeChangeCancel && item.cancel();
  // });

  // 判断有没有登录
  if (!localStorage.getItem("token")) {
    if (to.name == "login") {
      next();
    } else {
      router.push("login");
    }
  } else {
    // 异步操作完成后再调用 next
    // 假设这里是异步的操作
    someAsyncOperation().then(() => {
      // 页面控制
      if (to.meta.roles && to.meta.roles.includes(role)) {
        next();
      } else if (to.path !== "/404") {
        next({ path: "/404" });
      } else {
        next();
      }
    });
  }
});
/**
 * 输出对象
 */
export default router;
