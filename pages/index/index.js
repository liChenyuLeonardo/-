//index.js
//获取应用实例
var imageUtil = require('../../utils/util.js');
var app = getApp()
Page({
  data: {
    userInfo: {},
    imagewidth: 0,//缩放后的宽 
    imageheight: 0,//缩放后的高 
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  imageLoad: function (e) {
    var imageSize = imageUtil.imageUtil(e)
    this.setData({
      imagewidth: imageSize.imageWidth,
      imageheight: imageSize.imageHeight
    })
  },

  btnChange:function(){
      wx.navigateTo({
      url: '/pages/changeInfo/changeInfo'
    })   
  },

  btnShopping: function () {
    wx.navigateTo({
      url: '/pages/trolley/trolley'
    })
  },

  btnMessage: function () {
    wx.navigateTo({
      url: '/pages/logs/logs'
    })
  },

  mChange: function () {
    wx.navigateTo({
      url: '/pages/message/m'
    })

  },

  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
    wx.getStorage({
      key: 'studentInfo',
      success: function (res) {
        that.setData({
          studentInfo: res.data
        })
      }
    })
  }
})

