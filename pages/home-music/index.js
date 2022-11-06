import { rankSongStore, recommendSongStore, playerStore } from '../../store/index'
import { getMusicBannerList, getSongMenuList } from '../../service/api_music'
import querySelect from '../../utils/query-select'
import throttle from '../../utils/throttle'

const throttleQueryRect = throttle(querySelect, 1000, { trailing: true })
const app = getApp()

Page({
  data: {
    searchValue: '', // 搜索数据
    swiperHeight: 0,  // 轮播图高度
    banners: [], // 轮播图数据
    screenWidth: 375,

    hotSongMenu: [], // 热门歌单
    likeSongMenu: [], // 猜你喜欢歌曲
    recommendSongMenu: [], // 推荐歌单

    isRankData: false,
    rankSongMenu: {}, // 巅峰榜数据

    // 当前播放歌曲
    currentSong: {},
    isPlaying: false,
    animaState: 'paused'
  },

  onLoad() {

    this.fetchMusicBanner()
    this.fetchSongMenu()

    recommendSongStore.onState('recommendSongList', this.handleRecommendSongs)
    recommendSongStore.dispatch('getRecommendSongDataAction')

    rankSongStore.onState('newRankSongList', this.handleNewRankSongs)
    rankSongStore.onState('originRankSongList', this.handleRankingSongs('originRankSongList'))
    rankSongStore.onState('upRankSongList', this.handleRankingSongs('upRankSongList'))
    rankSongStore.dispatch('getRankSongDataAction')

    playerStore.onStates(['currentSong', 'isPlaying'], this.handlePlayerInfo)

    // this.setupPlayerStoreListener()

    // 获取屏幕的尺寸
    this.setData({ screenWidth: app.globalData.screenWidth })
  },

  // 获取轮播图数据
  async fetchMusicBanner() {
    const res = await getMusicBannerList()
    this.setData({ banners: res.banners })
  },

  // 获取巅峰榜歌单数据
  async fetchSongMenu() {
    getSongMenuList().then((res) => {
      this.setData({ hotSongMenu: res.playlists })
    })

    getSongMenuList('华语').then((res) => {
      this.setData({ likeSongMenu: res.playlists })
    })
  },

  // 搜索框事件
  handleSearchClick() {
    wx.navigateTo({
      url: '/pages/detail-search/index',
    })
  },

  handleRecommendItemTap(event) {
    const index = event.currentTarget.dataset.index
    playerStore.setState('playSongList', this.data.recommendSongMenu)
    playerStore.setState('playSongIndex', index)
  },

  // 播放控制栏播放/暂停按钮
  handlePlayOrPauseTap() {
    playerStore.dispatch('changePlayStatusAction')
  },

  // 播放控制栏专辑图片点击事件
  handleAlbumTap() {
    wx.navigateTo({
      url: '/pages/music-player/index',
    })
  },

  // 获取图片高度
  handleSwiperImageLoaded() {
    throttleQueryRect('.swiper-image').then((res) => {
      this.setData({ swiperHeight: res[0].height })
    })
  },

  // 推荐歌单更多点击事件
  handleRecommendMoreTap() {
    wx.navigateTo({
      url: `/pages/detail-song/index?type=recommend`
    })
  },

  // 排行榜点击跳转事件
  handleRankingItemTap(event) {
    const index = event.currentTarget.datastet.index
    const rankingName = rankingMap[index]
    this.navigateToDetailSongsPage(rankingName)
  },

  // setupPlayerStoreListener() {
  //   rankingStore.onState('hotRanking', (res) => {
  //     if (!res.tracks) return
  //     const recommendSongs = res.tracks.slice(0, 6)
  //     this.setData({ recommendSongs })
  //   })

  //   rankingStore.onState('newRanking', this.getRankingHandler(0))
  //   rankingStore.onState('originRanking', this.getRankingHandler(1))
  //   rankingStore.onState('upRanking', this.getRankingHandler(2))
  // },

  // 从 store 中获取数据
  // 获取推荐歌单数据
  handleRecommendSongs(value) {
    if (!value.tracks) return
    this.setData({ recommendSongMenu: value.tracks.slice(0, 6) })
  },

  // 获取巅峰榜歌曲数据
  handleRankingSongs(rankName) {
    return (value) => {
      if (!value.name) return
      const rankData = { ...this.data.rankSongMenu, [rankName]: value }
      this.setData({ rankSongMenu: rankData, isRankData: true })
    }
  },
  handleNewRankSongs(value) {
    if (!value.name) return
    const rankData = { ...this.data.rankSongMenu, newRankSongList: value }
    this.setData({ rankSongMenu: rankData, isRankData: true })
  },

  handlePlayerInfo({ currentSong, isPlaying }) {
    if (currentSong) {
      this.setData({ currentSong })
    }
    if (isPlaying != undefined) {
      this.setData({ isPlaying, animaState: isPlaying ? 'running' : 'paused' })
    }
  },

  onUnload() {
    recommendSongStore.offState('recommendSongList', this.handleRecommendSongs)
    rankSongStore.offState('newRankSongList', this.handleNewRankSongs)
    rankSongStore.offState('originRankSongList', this.handleRankingSongs('originRankSongList'))
    rankSongStore.offState('upRankSongList', this.handleRankingSongs('upRankSongList'))

    playerStore.offStates(['currentSong', 'isPlaying'], this.handlePlayerInfo)
  }
})
