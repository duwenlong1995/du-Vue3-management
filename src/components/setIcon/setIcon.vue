<template>
  <div class="setIcon-container">
    <div class="common" @click="setting">
      <slot name="check"></slot>
    </div>
    <div class="active" @click="checkSetting">
      <slot name="checked"></slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["setting", "checkSetting"]);
//将值暴露出去,可以通过ref拿到
// defineExpose({ unActive, active });
const setting = () => {
  emit("setting");
};
const checkSetting = () => {
  emit("checkSetting");
};
</script>

<style lang="scss" scoped>
.setIcon-container {
  .common {
  }
  .active {
  }
}
</style>
