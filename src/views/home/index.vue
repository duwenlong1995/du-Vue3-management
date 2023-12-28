<template>
  <div class="name-container">
    <a-layout class="site-layout">
      <a-layout-sider>
        <div class="logo"></div>
        <MainMenu />
      </a-layout-sider>
      <a-layout>
        <a-layout-header
          class="site-layout-background"
          style="margin: 6px 6px 0 6px"
        >
          <a-breadcrumb>
            <a-breadcrumb-item>Home</a-breadcrumb-item>
            <a-breadcrumb-item
              ><a href="">Application Center</a></a-breadcrumb-item
            >
            <a-breadcrumb-item
              ><a href="">Application List</a></a-breadcrumb-item
            >
            <a-breadcrumb-item>An Application</a-breadcrumb-item>
          </a-breadcrumb>
        </a-layout-header>
        <a-layout-content
          class="site-layout-background"
          style="margin: 6px 6px 0"
        >
          <router-view></router-view>
        </a-layout-content>
        <a-layout-footer class="footerStyle">
          Ant Design ©2018 Created by Ant UED</a-layout-footer
        >
      </a-layout>
    </a-layout>
  </div>
</template>

<script setup>
import MainMenu from "@/components/MainMenu.vue";
</script>

<style lang="scss" scoped>
.name-container {
  // min-height: calc(100vh - 100px);
  // min-height: 100vh;
  :where(
      .css-dev-only-do-not-override-1qb1s0s
    ).ant-layout.ant-layout-has-sider {
    // min-height: 100vh;
  }
  .footerStyle {
    padding: 0;
    text-align: center;
    line-height: 48px;
  }
  .site-layout {
    min-height: 100vh;
  }
}
</style>
