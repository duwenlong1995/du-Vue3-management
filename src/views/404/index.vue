<template>
  <div class="undefined-container">
    <div class="minPage">
      <img src="@/assets/images/404.gif" alt="" />
      <ul>
        <li style="margin-bottom: 6px; font-size: 16px; color: #262626">
          啊哦~你想找的内容离你而去了哦
        </li>
        <li style="margin-bottom: 6px; font-size: 16px">
          内容不存在，可能为入下原因导致：
        </li>
        <li><span>①</span> 内容还在审核中</li>
        <li><span>②</span> 内容以前存在，但是由于不符合新的规定而被删除</li>
        <li><span>③</span> 内容地址错误</li>
        <li><span>④</span> 作者删除了内容</li>
      </ul>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.undefined-container {
  height: 100vh;
  width: 100%;
  background-color: #ffffff;
  .minPage {
    height: 100vh;
    width: 100%;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  img {
    transform: scale(0.8);
  }
  ul {
    transform: translateY(-150px);
    list-style: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    li {
      width: 350px;
      margin: 4px;
      font-size: 14px;
      color: gray;
      span {
        font-size: 14px;
      }
    }
  }
}
</style>
