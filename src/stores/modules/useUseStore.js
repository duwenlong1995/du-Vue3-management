import { defineStore } from "pinia";

const useUseStore = defineStore("main", {
  state: () => {
    return {
      // 用户信息
      count: 1,
    };
  },
  actions: {},
  getters: {
    doubleCount: (state) => state.count * 2,
  },
});
export default useUseStore;
