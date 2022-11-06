import { HYEventStore } from "hy-event-store"
import { getSongDetail, getSongLyric } from '../service/api_player'
import { parseLyric } from '../utils/parse-lyric'

const audioContext = wx.createInnerAudioContext()

const playerStore = new HYEventStore({
  state: {
    id: 0,
    currentSong: {},  // 当前播放歌曲信息
    currentTime: 0, // 当前播放时间
    durationTime: 0,  // 歌曲时长

    lyricList: [],  // 歌词信息
    currentLyricIndex: 0, // 当前歌词下标
    currentLyricText: '', // 当前歌词

    isFirstPlay: true,  // 是否首次播放

    playSongList: [], // 歌单列表
    playSongIndex: 0, // 当前播放歌曲的歌单下标

    playMode: 0,  // 0：顺序播放 2：单曲循环 3：随机播放
    isPlaying: false  // 是否正在播放
  },
  actions: {
    playMusicWithSongId(ctx, id) {
      // 保存当前ID
      ctx.id = id
      ctx.isPlaying = true
      if (ctx.currentSong.id !== id) {
        ctx.currentSong = {}
      }

      // 请求歌曲数据
      getSongDetail(id).then(res => {
        const currentSong = res.songs[0]
        ctx.currentSong = currentSong
        ctx.durationTime = currentSong.dt
      })
      // 请求歌词数据
      getSongLyric(id).then(res => {
        const lyricString = res.lrc.lyric
        const lyricList = parseLyric(lyricString)
        ctx.lyricList = lyricList
      })

      // 播放歌曲
      audioContext.stop()
      audioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
      audioContext.autoplay = true


      // 监听 AudioContext 事件
      if (ctx.isPlaying) {
        ctx.isFirstPlay = false
        this.dispatch('handleAudioContextListener')
      }
    },

    // 绑定 AudioContext 相关事件
    handleAudioContextListener(ctx) {
      // 监听音频播放进度更新事件
      audioContext.onTimeUpdate(() => {
        ctx.currentTime = audioContext.currentTime * 1000

        // 匹配歌词
        if (!ctx.lyricList.length) return
        let index = ctx.lyricList.length - 1
        for (let i = 0; i < ctx.lyricList.length; i++) {
          const lyricItem = ctx.lyricList[i]
          if (lyricItem.time > ctx.currentTime) {
            index = i - 1
            break
          }
        }

        if (index === ctx.currentLyricIndex || index === -1) return
        ctx.currentLyricIndex = index
        ctx.currentLyricText = ctx.lyricList[index].text
      })

      // 监听音频加载中事件。当音频因为数据不足，需要停下来加载时会触发
      audioContext.onWaiting(() => {
        audioContext.pause()
      })

      // 监听音频进入可以播放状态的事件
      audioContext.onCanplay(() => {
        if (ctx.isPlaying) {
          audioContext.play()
        }
      })

      // 监听音频自然播放至结束的事件
      audioContext.onEnded(() => {
        // 调用改变播放歌曲 Action
        this.dispatch('changeNewSongAction')
      })
    },

    // 改变播放歌曲 Action
    changeNewSongAction(ctx, isNext = true) {
      let index = ctx.playSongIndex
      let length = ctx.playSongList.length

      // 根据当前播放模式，得出歌单列表下标值
      switch (ctx.playMode) {
        case 0:
          index = isNext ? index + 1 : index - 1
          if (index === -1) index = length - 1
          if (index === length) index = 0
          break
        case 1:
          break
        case 2:
          index = Math.floor(Math.random() * length)
          break
      }

      ctx.playSongIndex = index

      // 播放新歌曲
      const id = ctx.playSongList[index].id
      this.dispatch('playMusicWithSongId', id)
    },

    // 更改播放状态（播放/暂停）
    changePlayStatusAction(ctx) {
      if (audioContext.paused) {
        audioContext.play()
        ctx.isPlaying = true
      } else {
        audioContext.pause()
        ctx.isPlaying = false
      }
    }
  }
})

export { audioContext, playerStore }