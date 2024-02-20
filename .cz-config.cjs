module.exports = {
  types: [
    { value: "feat", name: "feat: 新功能" },
    { value: "fix", name: "fix: 修复bug" },
    { value: "docs", name: "docs: 文档变更" },
    {
      value: "style",
      name: "style: 代码格式（不影响功能，例如空格、分号等格式修正）",
    },
    {
      value: "refactor",
      name: "refactor: 代码重构（不包括 bug 修复、功能新增）",
    },
    { value: "perf", name: "perf: 性能优化" },
    { value: "test", name: "test: 增加、修改测试用例" },
    {
      value: "build",
      name: "build: 构建系统、外部依赖变更（如升级 npm 包、修改 webpack 配置等）",
    },
    { value: "ci", name: "ci: 修改 CI 配置、脚本" },
    {
      value: "chore",
      name: "chore: 对构建过程或辅助工具和库（如文档生成）的更改",
    },
    { value: "revert", name: "revert: 代码回退" },
  ],

  scopes: [{ name: "app" }, { name: "eslint" }],
  // 覆盖交互提示信息
  messages: {
    type: "请选择你的提交类型",
    scope: "请选择 SCOPE",
    subject: "简短描述本次修改:\n",
    body: '提供关于本次修改更具体的信息（可选），使用 "|" 换行：\n',
    breaking: "列举非兼容性重大的变更（可选）:\n",
    footer: "列举出所有变更的 ISSUES CLOSED（可选），例如：#31, #34:\n",
    confirmCommit: "确定提交信息？",
  },
  // 跳过的问题列表
  skipQuestions: ["footer"],

  // 允许自定义范围
  allowCustomScopes: true,

  // 允许更改提交类型
  allowBreakingChanges: ["feat", "fix"],

  // 设置提交信息的长度限制
  subjectLimit: 100,
};
