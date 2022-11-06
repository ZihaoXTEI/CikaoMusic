import { playerStore, rankSongStore, recommendSongStore } from '../../store/index'
import { getSongMenuDetail } from '../../service/api_music'

Page({
  data: {
    type: 'rank', // 当前类型
    key: 'newRankSongList', // 类型对应 rankstore 的属性名称
    id: '', // 歌曲ID

    songInfo: {}  // 歌曲信息
  },

  onLoad(options) {
    const type = options.type
    this.setData({ type })

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
    }
  },

  // 请求歌单详情数据
  async fetchSongMenu() {
    const res = await getSongMenuDetail(this.data.id)
    this.setData({ songInfo: res.playlist })
  },

  // 歌曲 Item 点击事件
  handleSongItemTap() {
    playerStore.setState('playSongList', this.data.songInfo.tracks)
  },

  // store 绑定事件
  handleRank(value) {
    this.setData({ songInfo: value })
    wx.setNavigationBarTitle({
      title: value.name,
    })
  },

  onUnload() {
    const { type, key } = this.data
    if (type === 'rank') {
      rankSongStore.offState(key, this.handleRank)
    } else if (type === 'recommend') {
      recommendSongStore.offState('recommendSongList', this.handleRank)
    }
  },

})