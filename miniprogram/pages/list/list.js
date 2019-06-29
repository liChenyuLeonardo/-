//获取应用实例
const app = getApp()
var API = 'https://www.lichenyu666.top/msg_list.php'

Page({
  data: {
    //friends: friends.list,
    friends:[]
  },
  onLoad: function (options) {
    var that = this;
    var userID=wx.getStorageSync('userID');
    that.setData({
        userID:userID
    })
   
    console.log(this.data.navTopItems)
    console.log('onLoad')

    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 10000
    })

    wx.request({
      url: API ,
      data: {
        userID:that.data.userID
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      //记得加出现错误时的处理代码
      success: function (res) {
        res.data.splice(0, 1)
        that.setData({
          friends: res.data,
        })
        wx.hideToast()
        wx.setNavigationBarTitle({
          title: '书香邮苑',
        })

      }
    })
  }
})