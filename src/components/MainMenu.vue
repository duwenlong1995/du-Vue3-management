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
import { reactive, watch, h, ref } from "vue";
import { useRouter } from "vue-router";
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
//点击菜单跳转路由
const handleClick = (e) => {
  router.push(e.key);
};
// const list = router.getRoutes().filter((v) => v.meta.isShow); // filter过滤出子路由中对页面渲染的结果
// console.log(list);
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
    ],
  },
  {
    label: "page1",
    title: "page1",
    key: "/page1",
    icon: () => h(PieChartOutlined),
  },
]);
watch(
  () => state.openKeys,
  (_val, oldVal) => {
    state.preOpenKeys = oldVal;
  }
);
const toggleCollapsed = () => {
  state.collapsed = !state.collapsed;
  state.openKeys = state.collapsed ? [] : state.preOpenKeys;
};
</script>

<style scoped>
.container {
}
</style>
