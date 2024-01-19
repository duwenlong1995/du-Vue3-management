<template>
  <div class="name-container">
    <div :style="{ marginBottom: '16px' }">
      <a-input v-model:value="userName" placeholder="请添加好友" />
      <a-button @click="add">ADD</a-button>
    </div>
    <a-tabs v-model:activeKey="activeKey" hide-add type="editable-card">
      <a-tab-pane
        v-for="pane in panes"
        :key="pane.key"
        :tab="pane.title"
        :closable="pane.closable"
      >
        <sendMessageForm />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup>
import sendMessageForm from "@/components/sendMessageForm.vue";
import { reactive, ref, onMounted } from "vue";
// 添加用户
const userName = ref("");
//  标签页
const panes = ref([
  {
    title: "用户1",
    content: "Content of Tab 1",
    key: "1",
  },
]);
const activeKey = ref(panes.value[0].key);
const newTabIndex = ref(0);
const add = () => {
  activeKey.value = newTabIndex.value++;
  panes.value.push({
    title: userName.value,
    content: `Content of new Tab ${activeKey.value}`,
    key: activeKey.value,
  });
  userName.value = "";
};

// const remove = (targetKey) => {
//   let lastIndex = 0;
//   panes.value.forEach((pane, i) => {
//     if (pane.key === targetKey) {
//       lastIndex = i - 1;
//     }
//   });
//   panes.value = panes.value.filter((pane) => pane.key !== targetKey);
//   if (panes.value.length && activeKey.value === targetKey) {
//     if (lastIndex >= 0) {
//       activeKey.value = panes.value[lastIndex].key;
//     } else {
//       activeKey.value = panes.value[0].key;
//     }
//   }
// };
</script>

<style lang="scss" scoped>
.name-container {
}
</style>
