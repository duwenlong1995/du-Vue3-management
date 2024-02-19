// 全局new Map()会造成内存泄漏，使用weakmap不会
const map = new WeakMap();
// 监控一个元素的尺寸变化
const ob = new ResizeObserver((entries) => {
  for (const entry of entries) {
    const handler = map.get(entry.target);
    if (handler) {
      const box = entry.borderBoxSize[0];
      handler({
        width: box.inlineSize,
        height: box.blockSize,
      });
    }
  }
});

export default {
  mounted(el, binding) {
    // 监视尺寸变化
    ob.observe(el);
    map.set(el, binding.value);
  },
  unmounted(el) {
    // 取消监听
    ob.unobserve(el);
    // 清理处理函数，防止内存泄漏
    // map.delete(el);
  },
};
