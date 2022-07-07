import myRequest from './index'

/**
 * 获取热门搜索列表数据
 * @function getSearchHot
 */
export function getSearchHot() {
  return myRequest.get('/search/hot')
}

/**
 * 传入搜索关键词可获得搜索建议
 * @function getSearchSuggest
 * @param {*} keywords 关键词
 */
export function getSearchSuggest(keywords) {
  return myRequest.get('/search/suggest', {
    keywords,
    type: "mobile"
  })
}

/**
 * 传入搜索关键词可以搜索该音乐、专辑、歌手、歌单、用户
 * @function getSearchResult
 * @param {string} keywords 关键词
 */
export function getSearchResult(keywords) {
  return myRequest.get('/search', {
    keywords
  })
}