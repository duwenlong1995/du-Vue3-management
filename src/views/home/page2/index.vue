<template>
  <div class="name-container">
    <menuRight class="block" :menu="menuData" @select="choose">
      <dTable
        class="card"
        :columns="columns"
        :tableData="tableData"
        :width="unitWidth"
        @selectRow="checkedRowData"
        type
      >
      </dTable>
    </menuRight>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import menuRight from "@/components/menuRight.vue";
import dTable from "@/components/table/table.vue";
import { listDataApi } from "@/api/tableDataApi.js";
import { message } from "ant-design-vue";
import useRequestTable from "@/hooks/useRequestTable.js";

const menuData = [
  { label: "添加", key: 0 },
  { label: "编辑", key: 1 },
  { label: "删除", key: 2 },
  { label: "查看", key: 3 },
  { label: "复制", key: 4 },
];
// 表格数据
const unitWidth = reactive([30, 30, 30]);
const columns = reactive(["name", "age", "gender"]);

const params = {
  page: 1,
  pageSize: 10,
  name: "admin",
};
const { data, error, loading, fetchData } = useRequestTable();
fetchData(listDataApi, params);
if (data.value) {
  console.log(data.value);
} else {
  console.log("Data is still loading...");
}

const tableData = reactive([
  { name: "张三", age: 28, gender: "男", type: "input", key: 0 },
  { name: "李四", age: 32, gender: "男", type: "select", key: 1 },
  { name: "王五", age: 22, gender: "女", type: "input", key: 2 },
]);
let rowData = reactive({});
onMounted(() => {});
function choose(val) {
  if (val.key === 0) {
    // 添加
    tableData.push({});
  } else if (val.key === 1) {
    // 编辑
  } else if (val.key === 2) {
    // 删除
  } else if (val.key === 3) {
    // 查看
  } else if (val.key === 4) {
    // 复制
  }
}
const checkedRowData = (value) => {
  rowData = value;
};
</script>

<style lang="scss" scoped>
.name-container {
  .card {
  }
}
</style>
