Component({
  properties: {
    option: {
      type: Object,
      value: {}
    },
    selected: {
      type: Boolean,
      value: false
    }
  },
  methods: {
    onTap() {
      this.triggerEvent('select', { key: this.data.option.key })
    }
  }
})
