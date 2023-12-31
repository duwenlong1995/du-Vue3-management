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
          style="
            position: fixed;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          "
        >
          <div
            class="menu-list"
            style="
              min-width: 100px;
              min-height: 150px;
              border-radius: 4px;
              position: fixed,
              background-color: #fff;
            "
          >
            <div
              class="menu-item"
              v-for="(item, i) in menu"
              :key="item.label"
              @click="handleClick(item)"
              style="padding: 5px 10px; cursor: pointer; border-radius: 4px"
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
  .contextmenu {
  }
}
</style>
