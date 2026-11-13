const app = getApp()

Component({
  data: {
    enabled: true
  },

  lifetimes: {
    attached() {
      this.setData({
        enabled: app.globalData.bgmEnabled
      })
    }
  },

  methods: {
    toggleMusic() {
      const enabled = app.toggleBgm()
      this.setData({ enabled })
    }
  }
})
