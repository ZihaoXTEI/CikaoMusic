import myRequest from './index'

/**
 * 根据音乐的编号获取歌曲详情
 * @function getSongDetail
 * @param {number | string} ids 音乐的编号
 */
export function getSongDetail(ids){
  return myRequest.get('/song/detail',{
    ids
  })
}

/**
 * 根据音乐的编号可获得对应音乐的歌词
 * @function getSongLyric
 * @param {number | string} id 音乐的编号
 */
export function getSongLyric(id){
  return myRequest.get('/lyric',{
    id
  })
}