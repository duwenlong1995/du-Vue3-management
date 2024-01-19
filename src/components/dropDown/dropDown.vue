<template>
  <div class="dropDown-container" ref="containerRef">
    <slot name="icon"></slot>
    <!-- 通过 Teleport 将菜单传送到 body 中  -->
    <teleport to="body">
      <transition>
        <div
          class="contextmenu"
          v-if="showDropDown"
          :style="{ left: x + 'px', top: y + 'px' }"
        >
          <slot name="content"> </slot>
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script setup>
import { ref } from "vue";
// import setIcon from "../../components/table/components/setIcon/setIcon.vue";

const props = defineProps({
  menu: {
    type: Array,
    default: () => [],
  },
  x: {
    type: Number,
    default: 1365,
  },
  y: {
    type: Number,
    default: 95,
  },
});
const x = props.x;
const y = props.y;
const showDropDown = ref(false);
//将值暴露出去,可以通过ref拿到
defineExpose({ showDropDown });
const setIconRef = ref(null);
console.log(setIconRef);
</script>

<style lang="scss" scoped>
.contextmenu {
  position: fixed;
  border-radius: 8px;
  box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08),
    0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
  //   .menu-list {
  //     padding: 3px 3px;
  //     min-width: 100px;
  //     min-height: 150px;
  //     border-radius: 4px;
  //     background-color: #fff;
  //     .menu-item {
  //       padding: 5px 10px;
  //       cursor: pointer;
  //       border-radius: 4px;
  //     }
  //     .menu-item:hover {
  //       color: #fff;
  //       background-color: #002060;
  //     }
  //   }
}
// 过度样式
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.dropDown-container {
  height: 20px;
  width: 20px;
}
</style>
