import { ref, onMounted, onUnmounted } from "vue";

export default function useDragTable(initialColumns) {
  // 使用ref来管理状态
  const columns = ref(initialColumns); // 表格列
  const isDragging = ref(false); // 是否正在拖拽
  const draggingColumn = ref(null); // 正在拖拽的列索引

  // 开始拖拽事件处理函数
  const startDrag = (index) => {
    isDragging.value = true; // 标记开始拖拽
    draggingColumn.value = index; // 设置正在拖拽的列索引
  };

  // 拖拽事件处理函数
  const onDrag = (event) => {
    if (isDragging.value) {
      // 若正在拖拽
      const dragEndIndex = calculateDragEndIndex(event.clientX); // 计算拖拽结束的列索引
      swapColumns(draggingColumn.value, dragEndIndex); // 交换列位置
    }
  };

  // 停止拖拽事件处理函数
  const stopDrag = () => {
    if (isDragging.value) {
      // 若正在拖拽
      isDragging.value = false; // 停止拖拽
      draggingColumn.value = null; // 重置正在拖拽的列索引
    }
  };

  // 计算拖拽结束的列索引
  const calculateDragEndIndex = (clientX) => {
    const rect = document.querySelector("table").getBoundingClientRect(); // 获取表格边界
    const relativeX = clientX - rect.left; // 获取相对于表格左边界的位置
    const columnIndex = Math.floor(
      relativeX / (rect.width / columns.value.length)
    ); // 计算列索引
    return Math.min(Math.max(columnIndex, 0), columns.value.length - 1); // 确保列索引在合法范围内
  };

  // 交换列位置
  const swapColumns = (startIndex, endIndex) => {
    const temp = columns.value[startIndex]; // 临时存储开始拖拽列的信息
    columns.value[startIndex] = columns.value[endIndex]; // 将开始拖拽的列移动到结束拖拽的位置
    columns.value[endIndex] = temp; // 将结束拖拽位置的列移动到开始拖拽的位置
  };
  // 在组件挂载时添加监听器
  onMounted(() => {
    document.addEventListener("mousemove", onDrag); // 监听鼠标移动事件
    document.addEventListener("mouseup", stopDrag); // 监听鼠标抬起事件
  });

  // 在组件卸载时移除监听器，防止内存泄漏
  onUnmounted(() => {
    document.removeEventListener("mousemove", onDrag); // 移除鼠标移动事件监听器
    document.removeEventListener("mouseup", stopDrag); // 移除鼠标抬起事件监听器
  });

  return {
    columns, // 返回表格列数据
    startDrag, // 返回开始拖拽函数
    stopDrag, // 返回停止拖拽函数
    draggingColumn, // 返回正在拖拽的列索引
  };
}
