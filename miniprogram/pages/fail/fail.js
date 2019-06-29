var imageUtil = require('../../utils/util.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imagewidth: 0,//缩放后的宽 
    imageheight: 0,//缩放后的高
  },

  imageLoad: function (e) {
    var imageSize = imageUtil.imageUtil(e)
    this.setData({
      imagewidth: imageSize.imageWidth*8.5,
      imageheight: imageSize.imageHeight*1.8
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that=this
    wx.getStorage({
      key: 'ErrorStatus',
      success: function (res) {
        that.setData({
          ErrorStatus: res.data
        })
      }
    })

  },

})