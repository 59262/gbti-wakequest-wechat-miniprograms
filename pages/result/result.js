const { results } = require('../../data/results')
const { saveShareCard } = require('../../utils/share-card')

Page({
  data: {
    result: results.lag,
    resultId: 'lag',
    shareVisible: false
  },

  onLoad(options) {
    const resultId = options.resultId || 'lag'
    this.setData({
      resultId,
      result: results[resultId] || results.lag
    })
    this.initRevealAudio()
  },

  onReady() {
    this.playRevealAudio()
  },

  initRevealAudio() {
    if (this.revealAudio) return

    const audio = wx.createInnerAudioContext()
    audio.src = '/assets/audio/result-reveal.mp3'
    audio.volume = 1
    audio.obeyMuteSwitch = false
    this.revealAudio = audio
  },

  playRevealAudio() {
    if (this.revealPlayed) return
    this.revealPlayed = true

    if (!this.revealAudio) {
      this.initRevealAudio()
    }

    setTimeout(() => {
      try {
        this.revealAudio.play()
      } catch (error) {
        // Keep the result page visible even if short audio playback is blocked.
      }
    }, 120)
  },

  openShareModal() {
    this.setData({ shareVisible: true })
  },

  closeShareModal() {
    this.setData({ shareVisible: false })
  },

  saveShareCard() {
    wx.showLoading({ title: '生成卡片中' })
    saveShareCard('shareCanvas', this, this.data.result)
      .then(() => {
        wx.hideLoading()
        this.closeShareModal()
        wx.showToast({ title: '已保存到相册' })
      })
      .catch(() => {
        wx.hideLoading()
        wx.showToast({
          title: '保存失败，请检查相册权限',
          icon: 'none'
        })
      })
  },

  restart() {
    wx.redirectTo({
      url: '/pages/test/test'
    })
  },

  goHome() {
    wx.reLaunch({
      url: '/pages/index/index'
    })
  },

  onUnload() {
    if (this.revealAudio) {
      this.revealAudio.destroy()
      this.revealAudio = null
    }
  }
})
