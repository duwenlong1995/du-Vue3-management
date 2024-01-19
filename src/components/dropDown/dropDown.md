# 小弹窗组件使用方法

## 两个插槽

1. <template #icon></template>外部点击触发弹窗图标按钮
2. <template #content></template>弹窗内容

## menu

```html
<dropDown ref="dropDownRef" :menu="columns">
  <!-- 外部触发drop下拉框 -->
  <template #icon> </template>
  <!-- 内容插槽 -->
  <template #content> </template>
</dropDown>
```
