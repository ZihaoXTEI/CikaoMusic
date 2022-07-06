Component({
  /**
   * 组件的属性列表
   */
  properties: {
    /**
     * 标题内容
     */
    title:{
      type:String,
      value:'默认标题'
    },
    /**
     * 右侧文本
     */
    rightText:{
      type:String,
      value:'更多'
    },
    /**
     * 是否显示右侧文本
     */
    showRight:{
      type:String,
      value:true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleRightClick:function(){
      this.triggerEvent('click')
    }
  }
})
