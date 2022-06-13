// pages/home-video/index.js
import { getTopMV } from '../../service/api_video'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topMVs: [],
    hasMore: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getPageData(0)
  },

  // 封装网络请求方法
  async getPageData(offset) {
    // 判断是否可以请求
    if (!this.data.hasMore) return

    // 展示加载动画
    wx.showNavigationBarLoading()

    // 请求数据
    const res = await getTopMV(offset)
    let newData = this.data.topMVs
    if (offset == 0) {
      newData = res.data
    } else {
      newData = [...newData, ...res.data]
    }

    // 设置数据
    this.setData({ topMVs: newData })
    this.setData({ hasMore: res.hasMore })

    wx.hideNavigationBarLoading()

    if (offset == 0) {
      wx.stopPullDownRefresh()
    }
  },

  // 点击事件处理方法
  handlerVideoItemClick(event){
    const id = event.currentTarget.dataset.item.id
    
    // 页面跳转
    wx.navigateTo({
      url: `/pages/detail-video/index?id=${id}`,
    })
  },

  // 监听用户下拉动作函数
  onPullDownRefresh(){
    this.getPageData(0)
  },

  // 页面上拉触底事件的处理函数
  onReachBottom(){
    this.getPageData(this.data.topMVs.length)
  }

})