import { tabList } from '../../constants/index'
import { playListStore } from '../../store/index'

Page({
  data: {
    isLogin: false,
    userInfo: {},
    avatarUrl: '',

    tabList: [],

    showDialog: false,
    listName: '',
    playList: [],
  },
  onLoad(options) {
    this.setData({ tabList })
    // 判断用户是否已经登录
    const userInfo = wx.getStorageSync('userinfo')
    this.setData({ isLogin: !!userInfo })
    if (this.data.isLogin) {
      this.setData({ userInfo })
    }

    playListStore.onState('playList', this.handlePlayList)
  },

  async handleUserLoginTap() {
    // 获取用户的头像和昵称
    const profile = await wx.getUserProfile({
      desc: '获取您的头像和昵称',
    })

    // 获取用户的 openid

    // 保存至本地
    wx.setStorageSync('userinfo', profile.userInfo)

    // 保存至 Data
    this.setData({ isLogin: true, userInfo: profile.userInfo })
  },

  // Tab Item 点击事件
  handleTabTap(event) {
    const item = event.currentTarget.dataset.item
    wx.navigateTo({
      url: `/pages/detail-song/index?type=profile-tab&&tab=${item.type}`,
    })
  },

  // 添加歌单点击事件
  handlePlusTap() {
    this.setData({ showDialog: true })
  },

  // 添加歌单对话框确认点击事件
  handleConfirmTap() {
    // 获取歌单名称
    const { listName } = this.data
    const playListRecord = { listName, songList: [] }
    const newPlayList = [...this.data.playList]
    newPlayList.push(playListRecord)

    playListStore.setState('playList', newPlayList)

    wx.showToast({
      title: '添加歌单成功',
    })
  },

  // 解决小程序双向绑定报警告 Bug
  handleInputChange() { },

  // playliststore 回调
  handlePlayList(value) {
    this.setData({ playList: value })
  },

  // onChooseAvatar(e) {
  //   const { avatarUrl } = e.detail
  //   this.setData({
  //     avatarUrl,
  //   })
  // },

  onunload() {
    handlePlayList.offState('playList', this.handlePlayList)
  }
})


const songMenuList = { listName: '古典音乐', songList: [] }
// const songMenuList = { listName: '流行音乐', songList: [] }
// const songMenuList = { listName: '轻音乐', songList: [] }