<template>
  <div class="container">
    <a-menu
      @click="handleClick"
      v-model:openKeys="state.openKeys"
      v-model:selectedKeys="state.selectedKeys"
      mode="inline"
      theme="dark"
      :inline-collapsed="state.collapsed"
      :items="items"
    ></a-menu>
  </div>
</template>

<script setup>
import { reactive, watch, h, ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import {
  PieChartOutlined,
  MailOutlined,
  DesktopOutlined,
  InboxOutlined,
  AppstoreOutlined,
} from "@ant-design/icons-vue";
const state = reactive({
  collapsed: false,
  selectedKeys: ["1"],
  openKeys: ["it.path"],
  preOpenKeys: ["it.path"],
});
// 获取路由数据
const router = useRouter();
const route = useRoute();

// //  控制只打开一个
// function onOpenChange(openKeys) {
//   // 将当前打开的父级菜单存入缓存中
//   localStorage.setItem("systemOpenKeys", JSON.stringify(openKeys));
//   const latestOpenKey = openKeys.find((key) => openKeys.indexOf(key) === -1);
//   if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
//     openKeys = openKeys;
//   } else {
//     openKeys = latestOpenKey ? [latestOpenKey] : [];
//   }
// }
// 点击菜单，路由跳转,注意的是当点击MenuItem才会触发此函数
const handleClick = ({ item, key, keyPath }) => {
  // 获取到当前的key,并且跳转
  router.push({
    path: key,
  });
};

onMounted(() => {
  console.log(route.matched);
});
const items = reactive([
  {
    label: "首页",
    title: "首页",
    key: "/home",
    icon: () => h(PieChartOutlined),
    children: [
      {
        label: "page1",
        title: "page1",
        key: "/page1",
        icon: () => h(PieChartOutlined),
      },
      {
        label: "page2",
        title: "page2",
        key: "/page2",
        icon: () => h(PieChartOutlined),
      },
      {
        label: "page3",
        title: "page3",
        key: "/page3",
        icon: () => h(PieChartOutlined),
      },
      {
        label: "page4",
        title: "page4",
        key: "/page4",
        icon: () => h(PieChartOutlined),
      },
      {
        label: "page5",
        title: "page5",
        key: "/page5",
        icon: () => h(PieChartOutlined),
      },
    ],
  },
  {
    label: "manage",
    title: "manage",
    key: "/manage",
    icon: () => h(PieChartOutlined),
  },
]);
const toggleCollapsed = () => {
  state.collapsed = !state.collapsed;
  state.openKeys = state.collapsed ? [] : state.preOpenKeys;
};
</script>

<style scoped>
.container {
}
</style>
