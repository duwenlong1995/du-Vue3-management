<template>
  <div class="menuRight-container" ref="containerRef">
    <slot></slot>
    <!-- 通过 Teleport 将菜单传送到 body 中  -->
    <teleport to="body">
      <transition
        @beforeEnter="handleBeforeEnter"
        @enter="handleEnter"
        @afterEnter="handleAfterEnter"
      >
        <div
          class="contextmenu"
          v-if="showMenu"
          :style="{ left: x + 'px', top: y + 'px' }"
        >
          <div class="menu-list">
            <div
              class="menu-item"
              v-for="(item, i) in menu"
              :key="item.label"
              @click="handleClick(item)"
            >
              {{ item.label }}
            </div>
          </div>
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script setup>
import { ref } from "vue";
import useContextmenu from "@/hooks//useContextmenu.js";
const props = defineProps({
  menu: {
    type: Array,
    default: () => [],
  },
});
const containerRef = ref(null);
const emit = defineEmits(["select"]);
const { x, y, showMenu } = useContextmenu(containerRef);
// 菜单的点击事件
const handleClick = (item) => {
  showMenu.value = false;
  // 并返回选中的菜单
  emit("select", item);
};
const handleBeforeEnter = (el) => {
  el.style.height = 0;
};
const handleEnter = (el) => {
  el.style.height = "auto";
  const h = el.clientHeight;
  el.style.height = 0;
  requestAnimationFrame(() => {
    el.style.height = h + "px";
    el.style.transition = ".5s";
    // requestAnimationFrame(() => {
    //   el.style.height = h + "px";
    //   el.style.transition = ".5s";
    // });
  });
};
const handleAfterEnter = (el) => {
  el.style.transition = "none";
};
</script>

<style lang="scss" scoped>
.menuRight-container {
  display: flex;
  .contextmenu {
    position: absolute;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 3px;
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    white-space: nowrap;
    max-width: 5%;
    overflow: hidden;
    .menu-list {
      overflow: hidden;
      .menu-item {
        display: inline-block;
        padding: 5px 10px;
        cursor: pointer;
        color: #333;
        font-size: 14px;
      }
      .menu-item:hover {
        background-color: #f5f5f5;
      }
    }
  }
}
</style>
