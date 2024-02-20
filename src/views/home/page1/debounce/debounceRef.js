import { customRef } from "vue";

export function debounceRef(value, delay = 1000) {
  let timer;
  return customRef((track, trigger) => {
    return {
      get() {
        //收集依赖track()
        track();
        return value;
      },
      set(val) {
        clearTimeout(timer);
        timer = setTimeout(() => {
          value = val;
          // 派发更新依赖trigger()
          trigger();
        }, delay);
      },
    };
  });
}
