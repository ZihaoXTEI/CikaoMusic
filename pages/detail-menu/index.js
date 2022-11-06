import { getSongMenuTag, getSongMenuList } from '../../service/api_music'

Page({
  data: {
    songMenus: []
  },
  onLoad() {
    this.fetchAllMenuList()
  },

  // 请求歌单数据
  async fetchAllMenuList() {
    const { tags } = await getSongMenuTag()

    const allPromises = []
    for (const tag of tags) {
      const promise = getSongMenuList(tag.name)
      allPromises.push(promise)
    }

    Promise.all(allPromises).then(res => {
      this.setData({ songMenus: res })
    })
  }
})