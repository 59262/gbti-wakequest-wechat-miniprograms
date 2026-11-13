# 架构说明

## 总体结构

仓库是两个独立的原生微信小程序，不共享运行时状态，也没有后端服务。

## GBTI 数据流

```text
用户选择
  → pages/test/test.js
  → data/questions.js + utils/calculator.js
  → data/rules.js 映射结果 ID
  → pages/loading/loading.js
  → data/results.js 渲染结果
  → utils/share-card.js 绘制 Canvas 并请求相册保存
```

题目、规则、文案和图片路径均为仓库内静态资源。评分逻辑在端上运行，结果不上传服务器。`Math.random()` 仅用于隐藏结果的概率分支，因此相同答案不保证每次都得到完全相同的隐藏款结果。

## WakeQuest 数据流

```text
首页设置（内存中的 alarm/session）
  → 预览响铃页
  → 铃声与震动
  → 任务页
  → 相机页面 + 手动确认次数
  → 完成页并停止响铃
```

当前工作树没有加载 TensorFlow.js、MoveNet 模型或相机帧监听。`movenet_lightning_int8.tflite`、依赖和生成的 `miniprogram_npm/` 是预留或历史构建产物，不能据此宣称当前版本具备端侧姿态识别。

## 信任边界与维护点

- 微信运行时负责相机、音频、震动、Canvas 和相册权限；权限失败必须按用户可理解的方式提示。
- 所有用户输入目前来自固定选项或微信控件，没有网络输入、HTML 注入或文件路径拼接。
- 若增加模型远程下载、云开发、统计或登录，应单独增加配置、隐私政策、域名校验和错误脱敏设计。
- 评分规则和结果文案属于产品数据，修改它们应配套更新示例验证和版本记录。
