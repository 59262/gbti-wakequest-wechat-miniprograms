# 使用说明

## GBTI 小程序

1. 用微信开发者工具导入仓库根目录。
2. 在项目设置中填写你自己的 AppID。
3. 编译后从首页点击开始测试。
4. 完成 18 道题后查看结果；结果页可以打开分享卡片并请求相册权限。
5. 用“再测一次”验证答案重置，用“返回首页”验证导航和背景音乐开关。

## WakeQuest 小程序

1. 单独导入 `wakequest-miniprogram/`，不要把它当作 GBTI 的页面目录。
2. 在命令行进入该目录，执行 `pnpm install --frozen-lockfile`。
3. 在微信开发者工具中执行“工具 → 构建 npm”。
4. 从首页进入预览响铃流程，确认铃声、震动、任务页、紧急关闭和完成页。
5. 当前动作页是测试计数模式：点击“我已完成一次深蹲”五次才会完成任务。相机授权失败时应显示错误提示。

## 发布前本地验证

- 在模拟器和至少一台真机上测试音频、震动、相机授权、相册授权和页面返回。
- 确认 `project.private.config.json`、`node_modules/` 和 `miniprogram_npm/` 没有进入待提交列表。
- 运行根目录的 JavaScript 语法检查、计算器 smoke test，以及 `wakequest-miniprogram/` 中的 `pnpm audit`。
