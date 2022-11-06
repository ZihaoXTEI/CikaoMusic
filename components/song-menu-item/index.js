Component({
  properties: {
    item: {
      type: Object,
      value: {}
    }
  },

  methods: {
    // 点击事件
    handleMenuItemTap() {
      const id = this.properties.item.id
      wx.navigateTo({
        url: `/pages/detail-song/index?type=menu&id=${id}`,
      })
    }
  }
})
