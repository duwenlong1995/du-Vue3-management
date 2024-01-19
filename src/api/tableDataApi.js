import request from "./request";

// 列表请求
export function listDataApi(params) {
  return request({
    url: "/api/employee/page",
    method: "get",
    params,
  });
}
