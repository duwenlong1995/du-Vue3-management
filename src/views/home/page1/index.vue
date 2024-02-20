<template>
  <div class="name-container">
    <!-- <input :value="text" @input="handleUpdate" /> -->
    <input v-model="text" />
    <p class="result">{{ text }}</p>
    <button @click="handleThrottle">节流{{ count }}</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
/**
 *  防抖
 */
// import { debounce } from "./debounce/debounce";
// const text = ref("");
// const update = (e) => {
//   text.value = e.target.value;
// };
// const handleUpdate = debounce(update, 1000);
/**
 * ref实现防抖
 */
import { debounceRef } from "./debounce/debounceRef";
const text = debounceRef("");
/**
 * 节流
 */
// import { throttle } from "./throttle/throttle";
// const handleThrottle = throttle(() => {
//   console.log("节流");
// }, 1000);
/**
 * ref实现节流
 */
import { throttleRef } from "./throttle/throttleRef";
// 创建
const count = throttleRef(0);
const handleThrottle = () => {
  count.value++;
};
</script>

<style lang="scss" scoped>
.name-container {
  .result {
    font-size: 16px;
  }
}
</style>
