Component({
  properties: {
    visible: {
      type: Boolean,
      value: false
    },
    result: {
      type: Object,
      value: {}
    }
  },
  methods: {
    onClose() {
      this.triggerEvent('close')
    },
    onSave() {
      this.triggerEvent('save')
    }
  }
})
