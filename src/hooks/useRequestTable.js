import { ref } from "vue";
/**
 * 请求函数requestApi
 * 请求参数params
 */
export default function useRequestTable() {
  const data = ref(null);
  const error = ref("");
  const loading = ref(false); // 控制加载状态
  async function fetchData(requestApi, params) {
    try {
      loading.value = true;
      // 调用 API 函数或其他异步逻辑
      const res = await requestApi(params);
      // 更新data值为从服务器获取的数据
      data.value = res.data.records;
    } catch (e) {
      // 捕获错误并更新错误变量
      error.value = e;
    } finally {
      loading.value = false;
    }
  }
  console.log(data.value);
  // 返回一个包含数据和错误信息的数组
  return { data, error, loading, fetchData };
}
