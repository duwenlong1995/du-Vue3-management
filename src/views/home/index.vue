<template>
  <div class="name-container">
    <a-layout>
      <a-layout-sider class="siderStyle"><MainMenu /></a-layout-sider>
      <a-layout>
        <a-layout-header class="headerStyle">
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
        <a-layout-content class="contentStyle">
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
  min-height: 100vh;
  :where(
      .css-dev-only-do-not-override-1qb1s0s
    ).ant-layout.ant-layout-has-sider {
    min-height: 100vh;
  }
  .headerStyle {
    text-align: center;
    color: #fff;
    height: 64;
    padding-inline: 10;
    background-color: #7dbcea;
    display: flex;
    align-items: center;
  }
  .contentStyle {
    text-align: center;
    min-height: 120;
    line-height: 120px;
    color: #fff;
    background-color: #108ee9;
  }
  .siderStyle {
    text-align: center;
    line-height: 120px;
    color: #fff;
    background-color: #3ba0e9;
  }
  .footerStyle {
    text-align: center;
    color: #fff;
    background-color: #7dbcea;
  }
}
</style>
