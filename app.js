App({
  onLaunch: function () {
    wx.showToast({
      title: '等待登录',
      icon: 'loading',
      duration: 5000,
    })
    //调用API从本地缓存中获取数据
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    wx.login({
      success: function (tmp) {
        console.log('sucess......');
        wx.request({
          url: "https://www.lichenyu666.top/user_login.php?code=" + tmp.code,
          method:'GET',
          success(tmp2) {
            console.log(tmp2);
            wx.setStorage({
              key: 'OpenID',
              data: tmp2.data.user_OpenID,
            })
            console.log(tmp2.data.user_OpenID);
            if (tmp2.data.login_status >= 400){
              wx.showToast({
                title: '登录失败，错误代码：' + tmp2.data.login_staus+'，请联系开发人员',
                icon:'none',
                duration:2000,
              })
              
            } else if (tmp2.data.login_status ==0){
              wx.showToast({
                title: '登录成功',
                duration: 2000,
              })
              setTimeout(function () {
                wx.switchTab({
                  url: '../two/two',
                })
              }, 2000)
            }  else if (tmp2.data.login_status == 2){
              wx.redirectTo({
                url: '/pages/register/register'
              })
            }
          }
        })
      }
    });
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