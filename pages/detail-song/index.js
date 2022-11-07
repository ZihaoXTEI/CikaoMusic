import { playerStore, rankSongStore, recommendSongStore, playListStore } from '../../store/index'
import { getSongMenuDetail } from '../../service/api_music'
import { tabList } from '../../constants/index'

Page({
  data: {
    type: 'rank', // 当前类型
    key: 'newRankSongList', // 类型对应 rankstore 的属性名称
    id: '', // 歌曲ID

    songInfo: {}, // 歌曲信息
    playList: [], // 自己的歌单列表
    currentList: [], // 当前播放歌单列表
  },

  onLoad(options) {
    const type = options.type
    this.setData({ type })

    // 获取自己的歌单数据，用于添加歌单时展示歌单列表
    playListStore.onState('playList', this.handlePlayList)

    // 根据对应的类型设置对应数据
    if (type === 'rank') {
      const key = options.key
      this.data.key = key
      rankSongStore.onState(key, this.handleRank)
    } else if (type === 'recommend') {
      recommendSongStore.onState('recommendSongList', this.handleRank)
    } else if (type === 'menu') {
      const id = options.id
      this.data.id = id
      this.fetchSongMenu()
    } else if (type === 'profile-tab') {
      const tab = options.tab
      const songList = wx.getStorageSync(tab) || []
      const tabItem = tabList.find(item => item.type === tab)
      const songInfo = { name: tabItem.name, tracks: songList }
      this.setData({ songInfo })
    } else if (type === 'playlist') {
      const listName = options.listname
      const playListItem = this.data.playList.filter(item => item.listName === listName).shift()
      const songInfo = { name: playListItem.listName, tracks: playListItem.songList }
      this.setData({ songInfo })
    } else if (type === 'currentlist') {
      playerStore.onState('playSongList', this.handlePlaySongList)
      const songInfo = { name: '正在播放歌单', tracks: this.data.currentList }
      this.setData({ songInfo })
    }
  },

  // 请求歌单详情数据
  async fetchSongMenu() {
    const res = await getSongMenuDetail(this.data.id)
    this.setData({ songInfo: res.playlist })
  },

  // 歌曲 Item 点击事件
  handleSongItemTap() {
    // 保存当前歌单
    playerStore.setState('playSongList', this.data.songInfo.tracks)
  },

  // store 绑定事件
  handleRank(value) {
    this.setData({ songInfo: value })
    wx.setNavigationBarTitle({
      title: value.name,
    })
  },

  handlePlayList(value) {
    this.setData({ playList: value })
  },

  handlePlaySongList(value) {
    this.setData({ currentList: value })
  },

  onUnload() {
    const { type, key } = this.data
    if (type === 'rank') {
      rankSongStore.offState(key, this.handleRank)
    } else if (type === 'recommend') {
      recommendSongStore.offState('recommendSongList', this.handleRank)
    }

    playListStore.offState('playList', this.handlePlayList)
  },

})