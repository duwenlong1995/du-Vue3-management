let webSock = null;
let global_callback = null;
let isConnect = false; //连接标识 避免重复连接
let rec; //断线重连后，延迟5秒重新创建WebSocket连接  rec用来存储延迟请求的代码
let socketParams = {
  pageKey: -1,
};
let isActiveClose = false; // 是否主动关闭socket

let serverPort = "8080"; // webSocket连接端口
let wsUri = "ws://" + "localhost" + ":" + serverPort;
// let serverPort = "8081"; // webSocket连接端口
// let wsUri = "ws://" + "192.168.50.156" + ":" + serverPort;

function createWebSocket(callback) {
  if (
    webSock == null ||
    Object.prototype.toString.call(webSock) !== "[object WebSocket]"
  ) {
    initWebSocket(callback);
  }
}

function initWebSocket(callback) {
  log("init webSocket");
  global_callback = callback;
  // 初始化websocket
  webSock = new WebSocket(`${wsUri}?Authorization=${填写登录令牌token}`);
  webSock.onmessage = function (e) {
    websocketOnMessage(e);
  };
  webSock.onclose = function (e) {
    websocketClose(e);
  };
  webSock.onopen = function () {
    websocketOpen();
  };

  // 连接发生错误的回调方法
  webSock.onerror = function () {
    websocketError();
  };
}

//心跳设置
const heartCheck = {
  timeout: 20000, //每段时间发送一次心跳包 这里设置为20s
  timeoutObj: null, //延时发送消息对象（启动心跳新建这个对象，收到消息后重置对象）

  start: function () {
    this.timeoutObj = setInterval(function () {
      if (isConnect) webSock.send(JSON.stringify(socketParams));
    }, this.timeout);
  },

  reset: function () {
    clearTimeout(this.timeoutObj);
    this.start();
  },
};

//定义重连函数
let reConnect = () => {
  log("尝试重新连接");
  if (isConnect) return; //如果已经连上就不在重连了
  rec && clearTimeout(rec);
  rec = setTimeout(function () {
    // 延迟5秒重连  避免过多次过频繁请求重连
    if (!isConnect) {
      initWebSocket();
    }
  }, 5000);
};

// 实际调用的方法
function sendSock(agentData) {
  if (webSock.readyState === webSock.OPEN) {
    // 若是ws开启状态
    websocketSend(agentData);
  } else if (webSock.readyState === webSock.CONNECTING) {
    // 若是 正在开启状态，则等待1s后重新调用
    setTimeout(function () {
      sendSock(agentData);
    }, 1000);
  } else {
    // 若未开启 ，则等待1s后重新调用
    setTimeout(function () {
      sendSock(agentData);
    }, 1000);
  }
}

function closeSock({ activeClose = false }) {
  log(`关闭了 activeClose = ${activeClose}`);
  isActiveClose = activeClose;
  // 清除心跳定时器
  heartCheck.timeoutObj && clearTimeout(heartCheck.timeoutObj);
  // 清除重连定时器
  rec && clearTimeout(rec);
  if (isActiveClose) {
    // 关闭socket
    webSock.close();
  }
  // 初始化相关变量
  webSock = null;
  isConnect = false;
}

// 数据接收
function websocketOnMessage(msg) {
  // global_callback(JSON.parse(msg.data));
  if (!msg || !msg.data) {
    // 可能得情况 - 心跳机制、无关信息接收
    log("收到数据：空消息");
    return;
  }
  log("收到数据：" + msg.data);
  // 收到信息为Blob类型时
  let result = null;
  if (msg.data instanceof Blob) {
    const reader = new FileReader();
    reader.readAsText(msg.data, "UTF-8");
    reader.onload = (e) => {
      result = JSON.parse(reader.result);
      //console.log("websocket收到", result);
      global_callback(result);
    };
  } else {
    result = JSON.parse(msg.data);
    //console.log("websocket收到", result);
    global_callback(result);
  }
}

// 数据发送
function websocketSend(agentData) {
  log("发送数据：" + agentData);
  webSock.send(agentData);
}

// 关闭
function websocketClose(e) {
  log("connection closed (" + e.code + ")");
  if (isActiveClose) {
    isActiveClose = false;
    return;
  }
  closeSock({ activeClose: false });
  // 执行重连
  reConnect();
}

const websocketError = () => {
  log("WebSocket连接发生错误");
  closeSock({ activeClose: true });
  // 执行重连
  reConnect();
};

function websocketOpen(e) {
  log("连接打开");
  isConnect = true;
  heartCheck.start(); //发送心跳 看个人项目需求
}

export { sendSock, createWebSocket, closeSock };
