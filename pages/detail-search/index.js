import { getSearchHot, getSearchSuggest, getSearchResult } from '../../service/api_search'
import debounce from '../../utils/debounce'
import stringToNodes from '../../utils/string2nodes'

const debounceGetSearchSuggest = debounce(getSearchSuggest, 100)

Page({
  data: {
    hotKeywordList: [],  // 关键字
    suggestSongList: [],  // 建议歌曲列表
    suggestSongsNodeList: [], // 建议歌曲节点
    resultSongList: [], //  搜索结果
    searchValue: '' //  搜索词
  },

  onLoad() {
    this.fetchSearchHot()
  },

  // 获取热门搜索数据
  async fetchSearchHot() {
    const res = await getSearchHot()
    this.setData({ hotKeywordList: res.result.hots })
  },

  // 搜索框改变事件
  handleSearchChange(event) {
    const searchValue = event.detail
    this.setData({ searchValue })

    if (!searchValue.length) {
      this.setData({ suggestSongList: [], resultSongList: [] })
    }

    debounceGetSearchSuggest(searchValue).then(res => {

      // 获取建议的关键字歌曲
      const suggestSongList = res?.result?.allMatch
      this.setData({ suggestSongList })
      if (!suggestSongList) return

      console.log(suggestSongList)

      // 转换成 node 节点
      const suggestKeywords = suggestSongList.map(item => item.keyword)
      const suggestSongsNodeList = []
      for (const keyword of suggestKeywords) {
        const nodes = stringToNodes(keyword, searchValue)
        suggestSongsNodeList.push(nodes)
      }
      this.setData({ suggestSongsNodeList })
    })
  },

  // 搜索事件
  handleSearchAction() {
    const searchValue = this.data.searchValue
    // 获取搜索结果
    getSearchResult(searchValue).then(res => {
      this.setData({ resultSongList: res.result.songs })
    })
  },

  // 关键字点击事件
  handleKeywordItemTap(event) {
    // 获取关键字
    const keyword = event.currentTarget.dataset.keyword
    this.setData({ searchValue: keyword })
    // 发送网络请求
    this.handleSearchAction()
  }

})