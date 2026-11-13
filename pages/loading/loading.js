Page({
  data: {
    resultId: '',
    isHidden: false,
    trigger: '',
    coreType: '',
    progress: 12,
    statusText: '读取样本'
  },

  onLoad(options) {
    const isHidden = options.hidden === '1'
    this.setData({
      resultId: options.resultId || 'lag',
      isHidden,
      trigger: options.trigger || '',
      coreType: options.coreType || ''
    })
    this.startLoading()
  },

  startLoading() {
    const steps = this.data.isHidden
      ? [
          { progress: 28, text: '发现稀有标记' },
          { progress: 58, text: '点亮 Rare Type' },
          { progress: 86, text: '生成隐藏结果卡' },
          { progress: 100, text: '匹配完成' }
        ]
      : [
          { progress: 32, text: '读取日常模式' },
          { progress: 62, text: '计算精神物种' },
          { progress: 90, text: '生成结果卡' },
          { progress: 100, text: '匹配完成' }
        ]

    const interval = this.data.isHidden ? 420 : 340
    let index = 0
    this.timer = setInterval(() => {
      const step = steps[index]
      this.setData({
        progress: step.progress,
        statusText: step.text
      })
      index += 1
      if (index >= steps.length) {
        clearInterval(this.timer)
        this.timer = null
        setTimeout(() => this.goResult(), 260)
      }
    }, interval)
  },

  goResult() {
    wx.redirectTo({
      url: `/pages/result/result?resultId=${this.data.resultId}&hidden=${this.data.isHidden ? 1 : 0}&trigger=${this.data.trigger}&coreType=${this.data.coreType}`
    })
  },

  onUnload() {
    if (this.timer) clearInterval(this.timer)
  }
})
