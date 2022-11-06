
App({
  globalData: {
    screenWidth: 0,
    screenHeight: 0,
    statusBarHeight: 0,
    navBarHeight: 44,
    deviceRatio: 0,  // 屏幕比例
    windowsHeigt:555,

  },

  onLaunch() {
    // 获取设备信息
    const systemInfo = wx.getSystemInfoSync()
    this.globalData.screenWidth = systemInfo.screenWidth
    this.globalData.screenHeight = systemInfo.screenHeight
    this.globalData.statusBarHeight = systemInfo.statusBarHeight

    const deviceRatio = systemInfo.screenHeight / systemInfo.screenWidth
    this.globalData.deviceRatio = deviceRatio
    
    const windowHeight = systemInfo.screenHeight - systemInfo.statusBarHeight - 44
    this.globalData.windowHeight = windowHeight
  }
})
