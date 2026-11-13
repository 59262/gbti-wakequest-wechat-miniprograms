Component({
  properties: {
    text: {
      type: String,
      value: ''
    },
    block: {
      type: Boolean,
      value: false
    },
    variant: {
      type: String,
      value: ''
    }
  },
  methods: {
    onTap() {
      this.triggerEvent('press')
    }
  }
})
