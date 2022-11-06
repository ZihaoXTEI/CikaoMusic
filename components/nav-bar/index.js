// 自定义播放页导航栏

const app = getApp()

Component({
  properties: {
    title: {
      type: String,
      value: '导航标题'
    }
  },

  options: {
    multipleSlots: true
  },

  data: {
    statusBarHeight: 20
  },

  lifetimes: {
    attached() {
      this.setData({ statusBarHeight: app.globalData.statusBarHeight })
    }
  },
  methods: {
    // 左侧返回按钮事件
    handleLeftTap() {
      this.triggerEvent('lefttap')
    }
  }
})
