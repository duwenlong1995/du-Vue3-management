<template>
  <div class="sendMessageForm-container">
    <a-form
      ref="formRef"
      :model="formState"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      :rules="rules"
    >
      <a-form-item label="发送的内容" name="desc">
        <a-textarea v-model:value="formState.desc" />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="sendData">发送</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, computed } from "vue";

import { storeToRefs } from "pinia";
// 导入工具函数
import useStore from "@/stores/useStore";
/**
 * pinia中使用storeToRefs可以保证解构出来的数据也是响应式的
 */
const { counter } = useStore();
const { count } = storeToRefs(counter);
// console.log("pinia响应式数据",count.value);

/**
 * 发送消息
 */
const sendData = () => {};
const labelCol = { span: 3 };
const wrapperCol = { span: 8 }; //为输入控件设置布局样式时，使用该属性，用法同 labelCol

/**
 * 表单数据和验证规则
 */
const formRef = ref();
const formState = reactive({
  desc: "",
});
const rules = {
  desc: [
    {
      required: true,
      message: "请正确输入内容",
      trigger: "blur",
    },
  ],
};
</script>

<style lang="scss" scoped>
.sendMessageForm-container {
}
</style>
