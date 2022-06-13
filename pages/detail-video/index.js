// pages/detail-video/index.js
import { getMVURL, getMVDetail, getRelatedVideo } from '../../service/api_video'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mvURLInfo: {},
    mvDetail: {},
    relatedVideos: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const id = options.id
    this.getPageData(id)
  },

  // 请求页面数据方法
  getPageData(id) {
    console.log(id)
    // 请求播放地址
    getMVURL(id).then(res => {
      this.setData({ mvURLInfo: res.data })
    })

    // 请求视频详情信息
    getMVDetail(id).then(res => {
      this.setData({ mvDetail: res.data })
    })
    // 请求相关视频
    getRelatedVideo(id).then(res => {
      this.setData({ relatedVideos: res.data })
    })
  }

})