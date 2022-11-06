/**
 * 歌词解析
 */
// 匹配时间的正则：[00:58.65]
const timeRegExp = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/

export function parseLyric(lyricString) {
  const lyricStrings = lyricString.split('\n')

  const lyricList = []
  for (const lyric of lyricStrings) {
    // [00:58.65]他们说 要缝好你的伤 没有人爱小丑
    const timeResult = timeRegExp.exec(lyric)
    if (!timeResult) continue

    // 转成毫秒
    const minute = timeResult[1] * 60 * 1000
    const second = timeResult[2] * 1000
    const millsecondTime = timeResult[3]
    const millsecond = millsecondTime.length === 2 ? millsecondTime * 10 : millsecondTime * 1
    const time = minute + second + millsecond

    const text = lyric.replace(timeRegExp, '')
    lyricList.push({ time, text })
  }

  return lyricList
}