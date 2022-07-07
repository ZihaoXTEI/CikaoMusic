import { HYEventStore } from 'hy-event-store'
import { getRankings } from '../service/api_music'

const rankingMap = { 0: 'newRanking', 1: 'hotRanking', 2: 'originRanking', 3: 'upRanking' }

const rankingStore = new HYEventStore({
  state: {
    newRanking: {}, // 新歌
    hotRanking: {}, // 热门
    originRanking: {},  // 原创
    upRanking: {} // 飙升
  },
  actions: {
    getRankingDataAction(ctx) {
      for (let i = 0; i < rankingMap.length; i++) {
        getRankings(i).then(res => {
          const rankingName = rankingMap[i]
          ctx[rankingName] = res.playlist
        })
      }
    }
  }
})

export {
  rankingStore,
  rankingMap,
}