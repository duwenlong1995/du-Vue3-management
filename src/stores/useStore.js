// 1. 分别导入各个模块
import useUseStore from "./modules/useUseStore";
import websocketStore from "./modules/websocketStore";

// 统一导出useStore方法
export default function useStore() {
  return {
    counter: useUseStore(),
    websocketStore: websocketStore(),
  };
}
