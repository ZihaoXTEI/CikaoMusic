import myRequest from './index'

/**
 * 请求MV的数据
 * @function getTopMV
 * @param {number} offset 取出数量
 * @param {number} limit 偏移数量
 */
export function getTopMV(offset, limit = 10) {
  return myRequest.get('/top/mv', {
    offset,
    limit
  })
}

/**
 * 请求MV的播放地址
 * @function getMVURL
 * @param {number} id MV的编号
 */
export function getMVURL(id) {
  return myRequest.get('/mv/url', {
    id
  })
}

/**
 * 请求MV的详情
 * @function getMVDetail
 * @param {number} mvid MV的编号
 */
export function getMVDetail(mvid){
  return myRequest.get('/mv/detail',{
    mvid
  })
}

/**
 * 请求推荐视频
 * @function getRelatedVideo
 * @param {number} id MV的编号
 */
export function getRelatedVideo(id){
  return myRequest.get('/related/allvideo',{
    id
  })
}