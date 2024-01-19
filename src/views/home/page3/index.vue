<template>
  <div class="name-container">
    <div class="move"></div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.name-container {
  .move {
    height: 100px;
    width: 100px;
    background: yellow;
    animation-name: identifier; /* 指定要应用的关键帧动画的名称 */
    animation-duration: 8s; /* 指定动画执行所需的时间 */
    animation-iteration-count: infinite; /* 定义动画的循环次数，这里设置为无限循环 */
  }
  @keyframes identifier {
    20% {
      background: red;
      transform: translate(60px, 0px);
    }
    30% {
      background: blue;
      border-radius: 50%;
      transform: translate(120px, 0px);
    }
    60% {
      background: green;
      transform: translate(160px, 0px);
    }
  }
}
</style>
