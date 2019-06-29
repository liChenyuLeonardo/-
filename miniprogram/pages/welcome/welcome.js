Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  onShow: function () {
    wx.login({
      success: function (tmp) {
        console.log('sucess......');
        wx.request({
          url: "https://www.lichenyu666.top/user_login.php?code=" + tmp.code,
          method: 'GET',
          success(tmp2) {
            console.log(tmp2);
            wx.setStorage({
              key: 'userID',
              data: tmp2.data.userID
            })
            wx.setStorage({
              key: 'ErrorStatus',
              data: tmp2.data.login_status,
            })
            if (tmp2.data.login_status==404) {
              wx.showToast({
                title: '登录失败，错误代码：' + tmp2.data.login_status + '，请联系开发人员',
                icon: 'none',
                duration: 2000,
              })
              wx.redirectTo({
                url: '/pages/fail/fail'
              })

            } else if (tmp2.data.login_status == 0) {
              wx.showToast({
                title: '登录成功',
                duration: 3000,
              })

              setTimeout(function () {
                wx.switchTab({
                  url: '/pages/two/two',
                })
              }, 2000)
            } else if (tmp2.data.login_status == 2) {
              wx.redirectTo({
                url: '/pages/register/register'
              })
            }/*else{
              wx.showToast({
                title: '登录失败，错误代码：' + tmp2.data.login_staus + '，请联系开发人员',
                icon: 'none',
                duration: 2000,
              })
              wx.redirectTo({
                url: '/pages/fail/fail'
              })
            }*/
          }
        })
      }
    });
  },


})