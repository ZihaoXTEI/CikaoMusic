# 微信小程序音乐播放器

### 项目简介

使用原生框架开发的微信音乐播放小程序，后台调用网易云音乐接口。少量采用了 Vant UI组件库。

## 功能模块设计

- 音乐首页：展示了推荐、热门和推荐歌单，底部还展示巅峰榜
- 视频首页：展示了MV
- 我的页面：进行模拟登录和查看收藏、喜爱和创建的歌单（本地存储）
- 音乐播放页面：可以控制音乐播放进行，同时滚动展示歌词

## 项目文件结构

```
│  .eslintrc.js
│  .gitignore
│  .prettierrc
│  app.js
│  app.json
│  app.wxss
│  package-lock.json
│  package.json
│  project.config.json
│  project.private.config.json
│  project.text
│  README.md
│  sitemap.json
│  
├─.vscode
│      extensions.json
│      
├─assets
│  └─images
│              
├─components
│  ├─area-header
│  │      
│  ├─nav-bar
│  │      
│  ├─rank-area-item
│  │      
│  ├─song-item-detail
│  │      
│  ├─song-item-plain
│  │      
│  ├─song-list-item
│  │      
│  ├─song-menu-area
│  │      
│  ├─song-menu-header
│  │      
│  ├─song-menu-item
│  │      
│  └─video-item
│          
├─constants
│      index.js
│      
├─pages
│  ├─detail-menu
│  │      
│  ├─detail-search
│  │      
│  ├─detail-song
│  │      
│  ├─detail-video
│  │      
│  ├─home-music
│  │      
│  ├─home-profile
│  │      
│  ├─home-video
│  │      
│  └─music-player
│          
├─service
│      api_music.js
│      api_player.js
│      api_search.js
│      api_video.js
│      index.js
│      
├─store
│      index.js
│      player-store.js
│      playlist-store.js
│      rank-store.js
│      recommend-store.js
│      
└─utils
        debounce.js
        format.wxs
        parse-lyric.js
        query-select.js
        string2nodes.js
        throttle.js
```



