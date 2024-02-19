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
          v-size-ob:borderBoxSize="handleSizeChange"
          class="contextmenu"
          v-if="showMenu"
          :style="{ left: pos.posX + 'px', top: pos.posY + 'px' }"
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
import { ref, computed } from "vue";
import useContextmenu from "@/hooks/useContextmenu.js";
import useViewport from "@/hooks/useViewport.js";
const props = defineProps({
  menu: {
    type: Array,
    default: () => [],
  },
});
const containerRef = ref(null);
const emit = defineEmits(["select"]);
//鼠标位置
const { x, y, showMenu } = useContextmenu(containerRef);
//视口尺寸
const { vw, vh } = useViewport();
//菜单尺寸
let w = ref(0);
let h = ref(0);
const handleSizeChange = ({ width, height }) => {
  w.value = width;
  h.value = height;
};
console.log(w.value, h.value);
const pos = computed(() => {
  let posX = x.value;
  let posY = y.value;
  // x坐标
  if (x.value > vw.value - w.value) {
    posX -= vw.value;
  }
  // y坐标
  if (y.value > vh.value - h.value) {
    posY -= y.value - vh.value + h.value;
  }
  return {
    posX,
    posY,
  };
});
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
    requestAnimationFrame(() => {
      el.style.height = h + "px";
      el.style.transition = ".5s";
    });
  });
};
const handleAfterEnter = (el) => {
  el.style.transition = "none";
};
</script>

<style lang="scss" scoped>
.contextmenu {
  position: fixed;
  border-radius: 8px;
  // box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
// 过度样式
.v-enter-active,
.v-leave-active {
  transition: opacity 2s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.menu-list {
  padding: 3px 3px;
  min-width: 100px;
  min-height: 150px;
  border-radius: 4px;
  position: fixed;
  background-color: $boxBgColor;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  .menu-item {
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 4px;
  }
  .menu-item:hover {
    transition: color 0.5s;
    color: $fontHoverColor;
    background-color: $HoverBgColor;
  }
}

.menuRight-container {
}
</style>
