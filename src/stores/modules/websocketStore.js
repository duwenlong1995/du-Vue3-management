import { defineStore } from "pinia";
import { ref } from "vue";

// 你可以对 `defineStore()` 的返回值进行任意命名，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。(比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。
const websocketStore = defineStore("resource", {
  // 其他配置...
  state: () => ({
    // 这里是你的状态
    socket: null,
    messageQueue: [],
    readyState: 0,
    socketMessage: "1",
  }),
  getters: {
    // 这里是你的 getters
    SET_SOCKET: (state, socket) => {
      state.socket = socket;
    },
    SET_SOCKET_MESSAGE: (state, socketMessage) => {
      state.socketMessage = socketMessage;
    },
  },
  actions: {
    // 这里是你的 actions
    connectWebSocket() {
      const PING_INTERVAL = 5000; // 心跳间隔，单位为毫秒
      const heartbeatMessage = { type: 0, msg: "ping" }; // 心跳消息
      const heartbeatMessage2 = { type: 0, msg: "pong", data: ["在线设备"] }; // 心跳消息
      const HOST_ADDRESS = "ws://127.0.0.1:7531";
      const socket = ref(new WebSocket(HOST_ADDRESS));
      let checkTask = null;
      // 监听连接事件
      socket.value.onopen = () => {
        // 启动心跳检测 确保连接存活 客户端每隔5秒向服务端发送一次心跳消息
        console.log(heartbeatMessage);
        checkTask = setInterval(() => {
          socket.value.send(JSON.stringify(heartbeatMessage));
        }, PING_INTERVAL);
      };

      // 监听消息事件
      socket.value.onmessage = (event) => {
        console.log(event.data, "event2");
        const message = JSON.parse(event.data);
        if (message.type == WebSocket.CONNECTING) {
          socket.value.send(JSON.stringify(heartbeatMessage2));
          return;
        } else {
          if (this.messageQueue.length > 2 << 16) {
            this.messageQueue = [];
          }
          console.log("WebSocket消息: ", message);
          this.SET_SOCKET_MESSAGE(message);
        }
      };

      // 监听关闭事件 断线重连
      socket.value.onclose = () => {
        if (this.socket.readyState === WebSocket.CLOSED) {
          this.messageQueue.forEach((message) => {
            this.sendMessage(message);
          });
          this.messageQueue = [];
        }
        // 清除心跳计时器
        checkTask && clearInterval(checkTask);
        // 断线重连
        setTimeout(() => {
          this.connectWebSocket();
        }, 3000);
      };

      // 连接错误
      socket.value.onerror = (event) => {
        console.log("WebSocket error:", event);
      };
    },

    // 发送消息方法
    sendMessage(message) {
      this.socket.send(message);
    },
  },
});
export default websocketStore;
