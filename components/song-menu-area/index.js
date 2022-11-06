const app = getApp()

Component({
  properties: {
    // 标题名称
    title: {
      type: String,
      value: '默认歌单'
    },
    songMenu: {
      type: Array,
      value: []
    }
  },
  data: {
    screenWidth: 375
  },
  lifetimes: {
    attached() {
      this.setData({ screenWidth: app.globalData.screenWidth })
    }
  },
  methods: {
    // 点击事件
    handleMenuMoreTap(){
      wx.navigateTo({
        url: '/pages/detail-menu/index',
      })
    }
  }
})
