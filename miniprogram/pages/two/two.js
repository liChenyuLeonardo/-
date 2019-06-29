//two.js
//获取应用实例
var app = getApp()
Page({
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  btnChange: function () {
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
