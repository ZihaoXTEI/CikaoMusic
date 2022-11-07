import { playerStore, playListStore } from '../../store/index'
import { tabList } from '../../constants/index'

Component({
  properties: {
    // 歌曲序号
    index: {
      type: Number,
      value: 0
    },
    item: {
      type: Object,
      value: {}
    },
    playList: {
      type: Array,
      value: []
    }
  },

  methods: {
    // 点击事件
    handleSongItemClick() {
      const id = this.properties.item.id
      wx.navigateTo({
        url: `/pages/music-player/index?id=${id}`,
      })
      // 设置播放歌曲
      playerStore.dispatch("playMusicWithSongId", id)
    },

    // 更多按钮点击事件
    handleMoreIconTap() {
      // 弹出 actionSheet
      wx.showActionSheet({
        itemList: ['收藏', '喜欢', '添加到歌单'],
        success: (res) => {
          const index = res.tapIndex
          this.handleOperationResult(index)
        }
      })
    },

    async handleOperationResult(index) {
      let toastTitle = ''
      switch (index) {
        // 收藏 favor
        case 0:
          const favorList = wx.getStorageSync('favorList') || []
          favorList.push(this.properties.item)
          wx.setStorageSync('favorList', favorList)
          toastTitle = '我的收藏'
          break
        // 喜欢 likeList
        case 1:
          const likeList = wx.getStorageSync('likeList') || []
          likeList.push(this.properties.item)
          wx.setStorageSync('likeList', likeList)
          toastTitle = '我的喜欢'
          break
        case 2:
          const playListNameList = this.properties.playList.map(item => item.listName)
          const res = await wx.showActionSheet({
            itemList: playListNameList
          })
          const index = res.tapIndex
          playListStore.dispatch('addSongInPlayList', index, this.properties.item)

          toastTitle = '歌单'
          break
      }

      wx.showToast({
        title: `添加至${toastTitle}成功`,
      })
    },

    // 添加歌词至歌单回调
    // handleAddPlayList(index) {
    //   playListStore.dispatch('addSongInPlayList',index,this.properties.item)
    // }
  }
})
