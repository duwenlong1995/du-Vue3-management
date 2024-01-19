import request from "./request";

// 请求中： 请求参数和返回值的类型都需要进行约束
// 验证码请求
export function CaptchaAPI(params) {
  return request({
    url:
      "/api/front/codeImage/get?key=" +
      params.imageCodeKey +
      "&_=" +
      Date.now(),
    method: "get",
    responseType: "arraybuffer",
    data: params,
  });
}
// uuid
export function GetUuidAPI(params) {
  return request({
    url: "/api/front/codeImage/uuid",
    method: "get",
    data: params,
  });
}
// 登录请求
export function LoginAPI(params) {
  return request({
    url: "/api/employee/login",
    method: "post",
    data: params,
  });
}
