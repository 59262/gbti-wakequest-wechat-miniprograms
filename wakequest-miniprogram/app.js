App({
  globalData: {
    alarm: { time: '08:00', enabled: true, repeat: '工作日' },
    session: { count: 0, target: 5 },
    alarmAudio: null,
    vibrationTimer: null
  },

  startAlarm() {
    if (!this.globalData.alarmAudio) {
      const audio = wx.createInnerAudioContext()
      audio.src = '/assets/alarm.mp3'
      audio.loop = true
      audio.obeyMuteSwitch = false
      audio.onError(() => wx.showToast({ title: '铃声加载失败', icon: 'none' }))
      this.globalData.alarmAudio = audio
    }
    this.globalData.alarmAudio.play()
    this.vibrate()
    clearInterval(this.globalData.vibrationTimer)
    this.globalData.vibrationTimer = setInterval(() => this.vibrate(), 3200)
  },

  vibrate() {
    wx.vibrateLong({ fail: () => wx.vibrateShort({ type: 'medium' }) })
  },

  stopAlarm() {
    if (this.globalData.alarmAudio) this.globalData.alarmAudio.stop()
    clearInterval(this.globalData.vibrationTimer)
    this.globalData.vibrationTimer = null
  },

  onHide() {
    // Do not stop the alarm here: switching pages must not dismiss it.
  }
})
