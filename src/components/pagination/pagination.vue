<template>
  <div class="pagination-container">
    <ul ref="paginationRef">
      <li @click="handleLast">
        <a href="#" class="last">
          <svg
            t="1705155226819"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="5705"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="16"
            height="16"
          >
            <path
              d="M401.066667 512l302.933333 302.933333-59.733333 59.733334L341.333333 571.733333 281.6 512 341.333333 452.266667l302.933334-302.933334 59.733333 59.733334L401.066667 512z"
              fill="#444444"
              p-id="5706"
            ></path>
          </svg>
        </a>
      </li>
      <li
        v-for="(item, index) in totals"
        :key="index"
        @click="handleClick(item)"
        :class="{ highlighted: index + 1 === customIndex }"
      >
        <a href="#" class="page">{{ item }}</a>
      </li>
      <li @click="handleNext">
        <a href="#" class="next">
          <svg
            style="transform: rotateY(180deg)"
            t="1705155226819"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="5705"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="16"
            height="16"
          >
            <path
              d="M401.066667 512l302.933333 302.933333-59.733333 59.733334L341.333333 571.733333 281.6 512 341.333333 452.266667l302.933334-302.933334 59.733333 59.733334L401.066667 512z"
              fill="#444444"
              p-id="5706"
            ></path>
          </svg>
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, toRef, onMounted } from "vue";

const props = defineProps({
  total: {
    type: Number,
  },
  current: {
    type: Number,
  },
});
/**
 *  处理总分页数
 */
const number = props.total;
const newArray = Array.from({ length: number }, (_, index) => index + 1);
const totals = toRef(newArray).value;

/**
 * 处理当前分页
 */
const handleClick = (val) => {
  customIndex.value = val;
};
const paginationRef = ref(null);
// 在组件挂载后，通过 ref.value 获取列表元素并修改样式
const customIndex = ref();
customIndex.value = props.current; // 设置要改变样式的索引
if (
  paginationRef.value &&
  paginationRef.value.children.length >= customIndex.value
) {
  // 确保索引在范围内
  paginationRef.value.children[customIndex.value].classList.add("highlighted");
}
/**
 * 点击上一个
 */
const handleLast = (props) => {
  customIndex.value -= 1;
};
/**
 * 点击下一个
 */
const handleNext = (props) => {
  customIndex.value += 1;
};

/**
 * 数组数目大于6之后显示...,最后显示
 */
</script>

<style lang="scss" scoped>
.pagination-container {
  li {
    display: inline-block;
    min-width: 32px;
    height: 32px;
    margin-right: 8px;
    font-family: Arial;
    line-height: 30px;
    text-align: center;
    vertical-align: middle;
    list-style: none;
    background-color: #fff;
    border: 1px solid #d9d9d9;
    border-radius: 2px;
    outline: 0;
    cursor: pointer;
    user-select: none;
    .page {
      font-size: 14px;
      text-decoration: none;
      padding: 5px 12px;
      color: #000000d9;
      background-color: #fff;
    }
    .last {
      svg {
        margin-top: 6px;
      }
    }
    .next {
      svg {
        margin-top: 6px;
      }
    }
  }
  //   当前分页和选择分页的样式
  .highlighted {
    border: 1px solid #4285f4;
    .page {
      color: #4285f4;
      outline: none;
    }
  }
  li:focus,
  li:hover {
    border: 1px solid #1890ff;

    transition: all 0.3s;
    .page {
      color: #4285f4;
      outline: none;
    }
    .last {
      svg {
        path {
          fill: #1890ff;
        }
      }
    }
    .next {
      svg {
        path {
          fill: #1890ff;
        }
      }
    }
  }
}
</style>
