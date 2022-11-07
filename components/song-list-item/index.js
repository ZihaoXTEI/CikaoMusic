import { playListStore } from '../../store/index'

Component({
  properties: {
    item: {
      type: Object,
      value: {}
    }
  },

  methods: {
    // 删除歌单按钮点击事件
    handleDeleteTap() {
      const { listName } = this.properties.item
      playListStore.dispatch('deletePlayListByName', listName)
      wx.showToast({
        title: '歌单删除成功',
      })
    },

    // Item 点击事件
    handleListItemTap() {
      const { listName } = this.properties.item
      wx.navigateTo({
        url: `/pages/detail-song/index?type=playlist&&listname=${listName}`,
      })
    },
  }
})
