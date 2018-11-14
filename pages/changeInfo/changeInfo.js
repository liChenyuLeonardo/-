var app = getApp()
Page({
  data: {
    infoMess:'',
    sN: '',
    aN: '',
    mN: '',
    gN: '',
  },

  submitdate: function (event) {
    var studentInfo = event.detail.value;
    wx.setStorage({
      key: 'studentInfo',
      data: studentInfo,
      success: function (res) {
        wx.navigateTo({
          url: '/pages/index/index'
        })
      }
    })
  },//缓存数据

  sNameInput: function (e) {
    this.setData({
      sN: e.detail.value
    })
  },

  aNameInput: function (e) {
    this.setData({
      aN: e.detail.value
    })
  },

  mNameInput: function (e) {
    this.setData({
      mN: e.detail.value
    })
  },

  gNameInput: function (e) {
    this.setData({
      gN: e.detail.value
    })
  },
  //登录按钮点击事件，调用参数要用：this.data.参数；
  //设置参数值，要使用this.setData({}）方法
  loginBtnClick: function () {
    if (this.data.aN.length == 0 || this.data.sN.length == 0 || this.data.mN.lengdth == 0 || this.data.gN.length == 0)
    {
      this.setData
      ({
        infoMess: '所有信息都不能为空！'
      })
    } 
    else
    {
      this.setData({infoMess:'修改成功'})
      wx.request
      ({
          url: 'http://localhost/1.php',
         data: {
            sNn: this.data.sN,
            aNn: this.data.aN,
            mNn: this.data.mN,
            gNn: this.data.gN,
          },
          method: 'GET',
          header:
          {
            'content-type': 'application/json'
          },
          success: function (res) {
            console.log(res.data)
            wx.showModal({ title: '提示1', content: res.data, })
          },
          fail: function (res) {
            wx.showModal({ title: '提示2', content: res.data, })
          }
      })
    }
  },
  //重置按钮点击事件
  resetBtnClick: function (e) 
  {
    this.setData({
      sN: '',
      aN: '',
      mN: '',
      gN: '',
    })
  },
 /* onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  }*/

  /*newBtnDown() {
    wx.request({
      url: 'http://localhost/1.php',
      data:
      {
        userName: 'Tiger0817', passWord: '12345',
      },
      method: 'GET',
      header:
      {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        wx.showModal({ title: '提示', content: res.data, })
      },
      fail: function (res) {
        wx.showModal({ title: '提示', content: res.data, })
      }
    })
  }*/
})
