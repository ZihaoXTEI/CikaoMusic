import { playerStore } from '../../store/index'

Component({
  properties: {
    item: {
      type: Object,
      value: {}
    }
  },
  methods: {
    // 点击事件
    handleSongItemTap() {
      const id = this.properties.item.id
      wx.navigateTo({
        url: `/pages/music-player/index?id=${id}`,
      })
      // 设置播放歌曲
      playerStore.dispatch("playMusicWithSongId", id)
    }
  }
})
