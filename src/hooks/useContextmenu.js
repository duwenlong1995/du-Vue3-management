import { ref, onMounted, onUnmounted } from "vue";
export default function useContextmenu(containerRef) {
  const x = ref(0);
  const y = ref(0);
  const showMenu = ref(false);
  const openMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    x.value = e.clientX;
    y.value = e.clientY;
    showMenu.value = true;
  };
  const closeMenu = () => {
    showMenu.value = false;
  };
  onMounted(() => {
    const div = containerRef.value;
    div.addEventListener("contextmenu", openMenu);
    window.addEventListener("click", closeMenu, true);
    window.addEventListener("contextmenu", closeMenu, true);
  });
  onUnmounted(() => {
    const div = containerRef.value;
    div.removeEventListener("contextmenu", openMenu);
    //移除window上的事件
    window.removeEventListener("click", closeMenu, true);
    window.removeEventListener("contextmenu", closeMenu, true);
  });
  console.log(x.value, y.value);
  console.log(showMenu.value);
  return { x, y, showMenu };
}
