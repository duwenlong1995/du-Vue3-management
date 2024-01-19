import { ref, onMounted, onUnmounted } from "vue";

function useTableResize(tableRef) {
  const columnWidths = ref({}); // 用于存储每一列的宽度

  // 处理鼠标按下事件
  const handleMouseDown = (event, key) => {
    const initialX = event.clientX;
    const handleMouseMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - initialX;
      const newWidth = (columnWidths.value[key] || 100) + deltaX;

      // 更新列宽
      columnWidths.value = {
        ...columnWidths.value,
        [key]: `${Math.max(newWidth, 50)}px`, // 设置最小宽度为50px
      };
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  // 在组件挂载时监听表格宽度变化
  onMounted(() => {
    const observer = new ResizeObserver(() => {
      const newWidths = {};
      tableRef.value.querySelectorAll("th").forEach((th) => {
        const key = th.getAttribute("data-key");
        const width = window.getComputedStyle(th).width;
        newWidths[key] = width;
      });
      columnWidths.value = newWidths;
    });

    observer.observe(tableRef.value);

    onUnmounted(() => {
      observer.disconnect();
    });
  });

  return {
    columnWidths,
    handleMouseDown,
  };
}

export default useTableResize;
