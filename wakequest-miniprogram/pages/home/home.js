const app = getApp()
Page({
  data: { alarm: app.globalData.alarm },
  onShow() { this.setData({ alarm: app.globalData.alarm }) },
  onTimeChange(e) { app.globalData.alarm.time = e.detail.value; this.setData({ alarm: app.globalData.alarm }) },
  onToggle(e) { app.globalData.alarm.enabled = e.detail.value; this.setData({ alarm: app.globalData.alarm }) },
  previewAlarm() { wx.navigateTo({ url: '/pages/ring/ring?preview=1' }) }
})
