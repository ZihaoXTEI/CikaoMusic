import { HYEventStore } from 'hy-event-store'
import { getSongMenuDetail } from '../service/api_music'

const rankMap = {
  newRankSongList: 3779629,
  originRankSongList: 2884035,
  upRankSongList: 19723756
}

const rankSongStore = new HYEventStore({
  state: {
    newRankSongList: {}, // 新歌列表
    originRankSongList: {},  // 原创列表
    upRankSongList: {} // 飙升列表
  },
  actions: {
    // 请求巅峰榜歌单数据
    getRankSongDataAction(ctx) {
      for (const key in rankMap) {
        const id = rankMap[key]
        getSongMenuDetail(id).then(res => {
          ctx[key] = res.playlist
        })
      }
    }
  }
})

export { rankMap, rankSongStore }

