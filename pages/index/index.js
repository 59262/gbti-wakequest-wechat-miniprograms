const app = getApp()

Page({
  onShow() {
    app.playBgm()
  },

  startTest() {
    app.setBgmEnabled(false)
    wx.navigateTo({
      url: '/pages/test/test'
    })
  }
})
