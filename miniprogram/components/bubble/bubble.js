Component({
  /**
   * 组件的属性列表
   */
  properties: {
    userID:{
      type:Number,
      value:wx.getStorageSync('userID')
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
  }
})
