# 图标组件使用方法

## 两个方法

1. setting 点击操作 check 图标
2. checkSetting 点击操作 checked 图标

## 传两个图标(激活和关闭)

```html
<setIcon @setting="handleSettingClick" @checkSetting="handleCheckSettingClick">
  <template v-slot:check>
    <svg width="20" height="20"></svg>
  </template>
  <template v-slot:checked>
    <svg width="20" height="20"></svg>
  </template>
</setIcon>
```
