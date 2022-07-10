import { rankingStore, rankingMap } from '../../store/index'

import { getBanners, getSongMenu } from '../../service/api_music'

import queryRect from '../../utils/query-rect'
import throttle from '../../utils/throttle'

const throttleQueryRect = throttle(queryRect, 1000, { trailing: true })

Page({
  data: {
    swiperHeight: 0,
    banners: [], // 轮播图数据
    hotSongMenu: [], // 热门歌单
    recommendSongMenu: [], // 推荐歌单
    rankings: { 0: {}, 1: {}, 2: {} } // 排行榜
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getPageData()

    rankingStore.dispatch('getRankingDataAction')
    this.setupPlayerStoreListener()
  },

  // 获取页面数据
  getPageData() {
    getBanners().then((res) => {
      this.setData({ banners: res.banners })
    })

    getSongMenu().then((res) => {
      this.setData({ hotSongMenu: res.playlists })
    })

    getSongMenu('华语').then((res) => {
      this.setData({ recommendSongMenu: res.playlists })
    })
  },

  // 搜索框事件
  handleSearchClick() {},

  // 获取图片高度
  handleSwiperImageLoaded() {
    throttleQueryRect('.swiper-image').then((res) => {
      const rect = res[0]
      this.setData({ swiperHeight: rect.height })
    })
  },

  handleMoreClick() {
    this.navigateToDetailSongsPage('hotRanking')
  },

  // 排行榜点击跳转事件
  handleRankingItemClick(event) {
    const idx = event.currentTarget.datastet.idx
    const rankingName = rankingMap[idx]
    this.navigateToDetailSongsPage(rankingName)
  },

  // 跳转至歌单页
  navigateToDetailSongsPage(rankingName) {
    wx.navigateTo({
      url: `/pages/detail-song/index?ranking=${rankingName}&type=rank`
    })
  },

  setupPlayerStoreListener() {
    rankingStore.onState('hotRanking', (res) => {
      if (!res.tracks) return
      const recommendSongs = res.tracks.slice(0, 6)
      this.setData({ recommendSongs })
    })

    rankingStore.onState('newRanking', this.getRankingHandler(0))
    rankingStore.onState('originRanking', this.getRankingHandler(1))
    rankingStore.onState('upRanking', this.getRankingHandler(2))
  },

  // 获取排行榜歌曲数据
  getRankingHandler(idx) {
    return (res) => {
      if (Object.keys(res).length === 0) return
      const name = res.name
      const coverImgUrl = res.coverImgUrl
      const playCount = res.playCount
      const songList = res.tracks.slice(0, 3)
      const rankingObj = { name, coverImgUrl, playCount, songList }
      const newRankings = { ...this.data.rankings, [idx]: rankingObj }
      this.setData({ rankings: newRankings })
    }
  }
})
