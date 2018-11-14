Page({

  /**
   * 页面的初始数据
   */
  data: {
    weeklyMovieList: [
      {
        imagePath: "/images/微信截图_20180925010242.png"
      },
      {
        imagePath: "/images/微信截图_20180925010242.png"
      }, {
        imagePath: "/images/微信截图_20180925010242.png"
      }, {
        imagePath: "/images/微信截图_20180925010242.png"
      }],
    homeworkcourse: [
      {
        imagePath: "/images/微信截图_20180925015510.png",
        homeworksubject: "高数",
        homeworknumber: "1234"
      },
      {
        imagePath: "/images/微信截图_20180925015510.png",
        homeworksubject: "线代",
        homeworknumber: "567"
      },
      {
        imagePath: "/images/微信截图_20180925015510.png",
        homeworksubject: "数分",
        homeworknumber: "3951"
      },
      {
        imagePath: "/images/微信截图_20180925015510.png",
        homeworksubject: "模电",
        homeworknumber: "2951"
      },
      {
        imagePath: "/images/微信截图_20180925015510.png",
        homeworksubject: "英语",
        homeworknumber: "5820"
      }
    ]
  },

  bindViewTap: function () {
    wx.navigateTo({
      url: '../index/index',
    })
  },


  hot: function () {
    var array_function = this.data.homeworkcourse.length
    for (var i = 0; i < array_function; i++) {
      for (var j = 0; j < array_function - i - 1; j++) {
        let array_number1 = this.homeworkcourse[j].homeworknumber
        let array_number2 = this.homeworkcourse[j + 1].homeworknumber
        let array_1 = this.homeworkcourse[j]
        let array_2 = this.homeworkcourse[j + 1]
        if (array_number1 > array_number2) {
          let array_medium1 = array_2.imagePath
          let array_medium2 = array_2.homeworksubject
          let array_medium3 = array_2.homeworknumber
          array_2.imagePath = array_1.imagePath
          array_2.homeworksubject = array_1.homeworksubject
          array_2.homeworknumber = array_1.homeworknumber
          array_1.imagePath = array_medium1
          array_1.homeworksubject = array_medium2
          array_1.homeworknumber = array_medium3
        }
      }
    }

    this.setData({
      homeworkcourse: this.data.homeworkcourse, //把更改的数组setData给原数组元素
      imagePath: false,
      homeworksubject: false,
      homeworknumber: true,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      currentIndex: this.data.weeklyMovieList.length - 1
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})