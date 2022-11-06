Component({
  properties: {
    title: {
      type: String,
      value: '默认标题'
    },
    rightText: {
      type: String,
      value: '更多'
    },
    showRight: {
      type: Boolean,
      value: true
    }
  },

  methods: {
    handleRightTap: function () {
      this.triggerEvent('moretap')
    }
  }
})
