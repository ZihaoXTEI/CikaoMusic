import throttle from '../../utils/throttle'
import { audioContext, playerStore } from '../../store/index'

const app = getApp()

const modeNameList = ['order', 'repeat', 'random']

Page({
  data: {
    statusBarHeight: 20,
    currentPage: 0,
    contentHeight: 555,

    isFirstPlay: true,
    id: 0,
    currentSong: {},
    currentTime: 0,
    durationTime: 0,
    lyricList: [],
    currentLyricIndex: 0,
    currentLyricText: '',

    lyricScrollTop: 0,

    playSongList: [],
    playSongIndex: 0,
    playMode: 0,
    playModeName: 'order',
    isPlaying: false,

    sliderValue: 0,
    isSliderChanging: false,
  },

  onLoad(options) {
    const id = options.id
    this.setData({ id })

    // 设备信息
    this.setData({ statusBarHeight: app.globalData.statusBarHeight })
    this.setData({ contentHeight: app.globalData.windowHeight })

    // 播放歌曲
    playerStore.onStates(['currentSong', 'durationTime', 'currentTime', 'lyricList', 'currentLyricIndex', 'currentLyricText', 'playMode', 'isPlaying'], this.handleSongAllInfo)

    // store歌曲数据列表
    playerStore.onStates(['playSongList', 'playSongIndex'], this.handlePlayList)
  },

  updateProgress: throttle(function (currentTime) {
    if (!this.data.isSliderChanging) {
      const sliderValue = currentTime / this.data.durationTime * 100
      this.setData({ sliderValue, currentTime })
    }
  }, 500, { leading: false, trailing: false }),

  // 进度条改变事件
  handleSliderChange(event) {
    const value = event.detail.value
    const currentTime = value / 100 * this.data.durationTime
    audioContext.seek(currentTime / 1000)
    this.setData({ sliderValue: value, currentTime, isSliderChanging: false })
  },

  // 进度条正在改变事件
  handleSliderChanging(event) {
    const value = event.detail.value
    // 计算当前时间
    const currentTime = value / 100 * this.data.durationTime
    this.setData({ currentTime, isSliderChanging: true })
  },

  handleSwiperChange(event) {
    const currentPage = event.detail.current
    this.setData({ currentPage })
  },

  handleBackTap() {
    wx.navigateBack()
  },

  // 歌曲控制相关事件
  handlePrevBtnTap() {
    playerStore.dispatch('changeNewSongAction', false)
  },

  handleNextBtnTap() {
    playerStore.dispatch('changeNewSongAction', true)
  },

  handleModeBtnTap() {
    let modeIndex = this.data.playMode + 1
    if (modeIndex === modeNameList.length) modeIndex = 0
    playerStore.setState('playMode', modeIndex)
  },

  handlePlayOrPauseTap() {
    playerStore.dispatch('changePlayStatusAction')
  },

  // 当前歌单列表点击事件
  handleCurrentListTap() {
    wx.navigateTo({
      url: '/pages/detail-song/index?type=currentlist',
    })
  },

  // playerStore
  handlePlayList(value) {
    if (value.playSongList) {
      this.setData({ playSongList: value.playSongList })
    }
    if (value.playSongIndex !== undefined) {
      this.setData({ playSongIndex: value.playSongIndex })
    }
  },

  handleSongAllInfo({ currentSong, durationTime, currentTime, lyricList, currentLyricIndex, currentLyricText,
    playMode, isPlaying }) {
    if (currentSong) {
      this.setData({ currentSong })
    }
    if (durationTime) {
      this.setData({ durationTime })
    }
    if (currentTime) {
      this.updateProgress(currentTime)
    }
    if (lyricList) {
      this.setData({ lyricList })
    }
    if (currentLyricIndex !== undefined) {
      this.setData({ currentLyricIndex, lyricScrollTop: currentLyricIndex * 35 })
    }
    if (currentLyricText) {
      this.setData({ currentLyricText })
    }

    if (playMode !== undefined) {
      this.setData({ playMode, playModeName: modeNameList[playMode] })
    }
    if (isPlaying !== undefined) {
      this.setData({ isPlaying })
    }
  },
  onUnload() {
    playerStore.offStates(['playSongList', 'playSongIndex'], this.handlePlayList)
    playerStore.offStates(['currentSong', 'durationTime', 'currentTime', 'lyricList', 'currentLyricIndex', 'currentLyricText', 'playMode', 'isPlaying'], this.handleSongAllInfo)
  }
})