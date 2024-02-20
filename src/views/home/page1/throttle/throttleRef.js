import { customRef } from "vue";
// data 为创建时的数据
// delay 为节流时间
export function throttleRef(data, delay = 1000) {
  // 创建定时器
  let timer = null;
  // 对 delay 进行判断，如果传递的是 null 则不需要使用 节流方案，直接返回使用 ref 创建的。
  return delay == null
    ? // 返回 ref 创建的
      ref(data)
    : // customRef 中会返回两个函数参数。一个是：track 在获取数据时收集依赖的；一个是：trigger 在修改数据时进行通知派发更新的。
      customRef((track, trigger) => {
        return {
          get() {
            // 收集依赖
            track();
            // 返回当前数据的值
            return data;
          },
          set(value) {
            // 判断
            if (timer == null) {
              // 创建定时器
              timer = setTimeout(() => {
                // 修改数据
                data = value;
                // 派发更新
                trigger();
                // 清除定时器
                clearTimeout(timer);
                timer = null;
              }, delay);
            }
          },
        };
      });
}
