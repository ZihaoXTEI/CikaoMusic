Component({
  properties: {
    item: {
      type: Object,
      value: {}
    },
    // 巅峰榜类型
    key: {
      type: String,
      value: "newRankSongList"
    }
  },
  methods: {
    // 巅峰榜点击事件
    handleRankItemTap(){
      const key = this.properties.key
      wx.navigateTo({
        url: `/pages/detail-song/index?type=rank&key=${key}`,
      })
    }
  }
})
