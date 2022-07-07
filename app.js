
App({
  globalData: {
    screenWidth: 0,
    screenHeight: 0,
    statusBarHeight: 0,
    navBarHeight: 44,
    deviceRadio: 0
  },

  onLaunch() {
    // 获取设备信息
    const systemInfo = wx.getSystemInfoSync()
    this.globalData.screenWidth = systemInfo.screenWidth
    this.globalData.screenHeight = systemInfo.screenHeight
    this.globalData.statusBarHeight = systemInfo.statusBarHeight

    const deviceRadio = systemInfo.screenHeight / systemInfo.screenWidth
    this.globalData.deviceRadio = deviceRadio
  }
})
