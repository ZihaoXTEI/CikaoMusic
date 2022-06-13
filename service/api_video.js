import hyRequest from './index'

/**
 * 请求MV的数据
 * @param {number} offset 取出数量
 * @param {number} limit 偏移数量
 */
export function getTopMV(offset, limit = 10) {
  return hyRequest.get('/top/mv', {
    offset,
    limit
  })
}

/**
 * 请求MV的播放地址
 * @param {number} id MV的编号
 */
export function getMVURL(id) {
  return hyRequest.get('/mv/url', {
    id
  })
}

/**
 * 请求MV的详情
 * @param {number} mvid MV的编号
 */
export function getMVDetail(mvid){
  return hyRequest.get('/mv/detail',{
    mvid
  })
}

/**
 * 请求推荐视频
 * @param {number} id MV的编号
 */
export function getRelatedVideo(id){
  return hyRequest.get('/related/allvideo',{
    id
  })
}