Component({
  properties: {
    type: {
      type: String,
      value: 'daily'
    },
    color: {
      type: String,
      value: '#5C8574'
    },
    hidden: {
      type: Boolean,
      value: false
    },
    illustration: {
      type: String,
      value: ''
    }
  },
  data: {
    imageFailed: false
  },
  observers: {
    illustration() {
      this.setData({ imageFailed: false })
    }
  },
  methods: {
    onImageError() {
      this.setData({ imageFailed: true })
      this.triggerEvent('asseterror')
    }
  }
})
