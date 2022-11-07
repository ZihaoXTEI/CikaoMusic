import { HYEventStore } from "hy-event-store"

const playListStore = new HYEventStore({
  state: {
    playList: [
      { listName: '流行音乐', songList: [] },
      { listName: '古典音乐', songList: [] },
      { listName: '经典音乐', songList: [] },
    ]
  },

  actions: {
    // 添加歌曲至指定歌单
    addSongInPlayList(ctx, index, songItem) {
      const newPlayList = [...ctx.playList]
      newPlayList[index].songList.push(songItem)
      ctx.playList = [...newPlayList]
    },

    // 删除指定歌单
    deletePlayListByName(ctx, listName) {
      ctx.playList = ctx.playList.filter(item =>
        item.listName !== listName
      )
    }
  }
})

export { playListStore }