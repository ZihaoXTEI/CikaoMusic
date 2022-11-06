import { HYEventStore } from 'hy-event-store'
import { getSongMenuDetail } from '../service/api_music'

// 推荐歌单
const recommendSongStore = new HYEventStore({
  state: {
    recommendSongList: {}
  },
  actions: {
    // 请求推荐歌单数据
    getRecommendSongDataAction(ctx) {
      getSongMenuDetail(3778678).then(res => {
        ctx.recommendSongList = res.playlist
      })
    }
  }
})

export { recommendSongStore }