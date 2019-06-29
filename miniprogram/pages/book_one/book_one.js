var API = 'https://www.lichenyu666.top/get_details.php'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    imgUrls: [],
   
    hdimg: [],
    //是否采用衔接滑动
    circular: true,
    //是否显示画板指示点
    indicatorDots: true,
    //选中点的颜色
    indicatorcolor: "#000",
    //是否竖直
    vertical: false,
    //是否自动切换
    autoplay: false,
    //滑动动画时长毫秒
    duration: 100,
    //所有图片的高度
    imgheights: [],
    //图片宽度
    imgwidth: 750,
    //默认
    current: 0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.setData({
      bookId:options.book_id
    })
    let imgUrls = this.data.imgUrls;
    var that = this
    console.log('onLoad')

    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 10000
    })

    wx.request({
      url: 'https://www.lichenyu666.top/get_details.php',
      data: {
        'pid':options.book_id
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res.data)
        //res.data.splice(0, 1)
        if (res.data.data.image_url1!=null){
          console.log("1 is not null")
          imgUrls.push('https://www.lichenyu666.top/' + res.data.data.image_url1);
        } 
        else {
           console.log("1 is null")
        }
        if (res.data.data.image_url2) {
          imgUrls.push('https://www.lichenyu666.top/' + res.data.data.image_url2);
        }
        if (res.data.data.image_url3) {
          imgUrls.push('https://www.lichenyu666.top/' + res.data.data.image_url3);
        }
        if (res.data.data.image_url4) {
          imgUrls.push('https://www.lichenyu666.top/' + res.data.data.image_url4);
        }
        that.setData({
           imgUrls:imgUrls,
           list:res.data 
           })
        console.log(imgUrls)
        console.log('book_one获取接口成功')
        wx.hideToast()
      },
    })
  },
  imageLoad: function (e) {
    //获取图片真实宽度
    var imgwidth = e.detail.width,
      imgheight = e.detail.height,
      //宽高比
      ratio = imgwidth / imgheight;
    console.log(imgwidth, imgheight)
    //计算的高度值
    var viewHeight = 750 / ratio;
    var imgheight = viewHeight
    var imgheights = this.data.imgheights
    //把每一张图片的高度记录到数组里
    imgheights.push(imgheight)
    this.setData({
      imgheights: imgheights,
    })
  },
  bindchange: function (e) {
    console.log(e.detail.current)
    this.setData({ current: e.detail.current })
  }
})