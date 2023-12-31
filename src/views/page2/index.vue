<template>
  <div class="name-container">
    <menuRight class="block" :menu="menuData" @select="choose">
      <div class="card">{{ choose1 }}</div>
    </menuRight>
  </div>
</template>

<script setup>
import { ref } from "vue";
import menuRight from "@/components/menuRight.vue";
const menuData = [
  { label: "添加", key: 0 },
  { label: "编辑", key: 1 },
  { label: "删除", key: 2 },
  { label: "查看", key: 3 },
  { label: "复制", key: 4 },
];
const choose1 = ref("");
function choose(val) {
  choose1.value = val.label;
}
</script>

<style lang="scss" scoped>
.name-container {
  .card {
    width: 80%;
    height: 50vh;
    background-color: red;
    margin: 10px;
  }
}
</style>
