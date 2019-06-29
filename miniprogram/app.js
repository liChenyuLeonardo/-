App({
  onLaunch: function () {
    wx.showToast({
      title: '等待登录',
      icon: 'loading',
      duration: 5000,
    })
    //调用API从本地缓存中获取数据
  },

  getUserInfo: function (cb) {
    var that = this;
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function (tmp) {
          console.log('sucess......');
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo;
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      });
    }
  },
  globalData: {
    userInfo: null
  }
})