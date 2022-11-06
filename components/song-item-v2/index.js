import { playerStore } from '../../store/index'

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
    }
  }
})
