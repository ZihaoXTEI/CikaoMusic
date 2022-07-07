import myRequset from './index'

/**
 * 获取轮播图数据
 * @function getBanners
 * @param {number} type 资源类型 可选：0-PC 1-Android 2-iPhone 3-iPad
 */
export function getBanners(type = 2) {
  return myRequset.get('/banner', {
    type
  })
}

/**
 * 获取歌曲榜单数据
 * @function getRankings
 * @param {number} idx 榜单类型 可选：0-飙升 1-热门 2-新歌 3-原创
 */
export function getRankings(idx) {
  return myRequset.get('/top/list', {
    idx
  })
}

/**
 * 获取网友精选碟歌单数据
 * @function getSongMenu
 * @param {string} cat 歌单类型 可选：全部（默认）、华语、古风、欧美、流行
 * @param {number} limit 取出歌曲数量
 * @param {number} offset 偏移数量
 */
export function getSongMenu(cat = '全部', limit = 6, offset = 0){
  return myRequset.get('/top/playlist',{
    cat,
    limit,
    offset
  })
}

/**
 * 获取歌单详情动态部分，如评论数、是否收藏、播放数
 * @function getSongMenuDetail
 * @param {*} id 歌单的编号
 */
export function getSongMenuDetail(id){
  return myRequset.get('/playlist/detail/dynamic',{
    id
  })
}