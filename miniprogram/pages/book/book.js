var API = 'https://www.lichenyu666.top/search.php'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    subject:[],
    is_eventOngoing:false,
    offset: 0,//默认搜索结果从第零条开始
    flag: false,//是否到了最后一页的标志
    bookname:'',
    searchType: 0,//搜索条件
    nums: 5,//默认一次最多返回5条搜索结果
    api: 'https://www.lichenyu666.top/',
    QueryStatus:1,
    select: false,
    curNavId: 2,
    curIndex: 1,
    colors: ["red", "time", "suit"],
    whattop: [
      {
        id: 1,
        name: "价格♢",
      },
      {
        id: 2,
        name: "最新发布",
      },
      {
        id: 3,
        name: "最早发布",
      }
    ],
  },

 /*条件选择器*/
  switchtap: function (res) {
    console.log(res.currentTarget.dataset.id)
    let id = res.currentTarget.dataset.id;
    let index = res.currentTarget.dataset.index;
    this.setData({
      curNavId: id,
      curIndex: id
    })

    if (this.data.select == true) {
      this.setData({
        select: !this.data.select
      })
    }
  },

  bindShowMsg() {
    let index = 1;
    this.setData({
      select: !this.data.select,
      curNavId: 1,
    })
  },

  
  mySelect(e) {
    var name = e.currentTarget.dataset.name
    this.setData({
      tihuoWay: name,
      select: false
    })

    if (name == '价格升序') {
      this.setData({
        curNavId: 1,
        curIndex: 4,
        index: 1
      })
    }
    else (name == '价格降序')
    {
      this.setData({
        curNavId: 1,
        curIndex: 5,
        index: 1
      })
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      mid: options.book_name
    })
//加载页面的时候把搜索条件和关键词写入data
    var that = this;
    that.data.bookname=options.book_name;
    if(options.searchType!=null)
    that.data.searchType=options.searchType;
    that.updateData();
    console.log('book获取接口成功', options)
    wx.hideToast()
    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that=this;
    wx.setNavigationBarTitle({
      title: '加载中',
    })
    wx.showNavigationBarLoading();
    
    setTimeout(function(){
      wx.setNavigationBarTitle({
        title: '搜索结果',
      })
      wx.hideNavigationBarLoading()
    },1000)
  },


  //=================================
  updateData: function() {
    return new Promise((resolve, reject) => {
    var that=this;
    wx.request({
      url: API,
      data: { pages:that.data.offset, 
      nums: that.data.nums, 
      type: that.data.searchType,
       book_name: that.data.bookname },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (options) {
        console.log(options)
        that.setData({ QueryStatus: options.data[0].QueryStatus })
        if (options.data[0].QueryStatus == 1) {
          if (options.data[0].num_rows < that.data.nums)//该次搜索结果个数小于偏移量，则已到达最后一页
             that.data.flag = true;
          else
          {
            that.data.flag = false;
            that.data.offset+=that.data.nums; 
          }
          options.data.splice(0, 1)
          var temp = new Array;
          temp = that.data.subject;
          temp = temp.concat(options.data);
          that.setData({
            subject: temp,
          })
            }
         }
    })
    })
  },


  //---------------------------------
 onReachBottom:function(){
  //这里添加到达最后一页的代码，下面只是示例
  var that=this;
  console.log("上拉触底");
  if(that.data.is_eventOngoing==true){
    console.log('恭喜你发现神龙');
    return;
  }
  console.log("数据刷新");
    that.data.is_eventOngoing=true;
   if(that.data.flag==true)
   {
     that.data.is_eventOngoing = false;
      return;
   }
   else
   {
     wx.setNavigationBarTitle({
       title: '加载中',
     })
     wx.showNavigationBarLoading();
     that.updateData().then(
       wx.setNavigationBarTitle({
         title: '搜索结果',
       }),
      wx.hideNavigationBarLoading()
      )

    }
  that.data.is_eventOngoing=false;

  },

goBook_one:function(event){
  console.log(event.currentTarget)
  var bookId = event.currentTarget.dataset.bookId
  console.log(bookId)
  wx.showToast({
    title: '正在跳转',
    icon: 'loading',
    duration: 1000,
    success: function () {
      console.log('提示成功')
    }
  })
  wx.navigateTo({
    url: '/pages/book_one/book_one?book_id=' + bookId
  })                                                                 
},
  bindblur: function (res) {
    console.log(res.detail.value)
    this.inputValue = res.detail.value

    wx.showToast({
      title: '正在跳转',
      icon: 'loading',
      duration: 1000,
      success: function () {
        console.log('提示成功')
      }
    })
    wx.navigateTo({
      url: '/pages/book/book?book_name=' + this.inputValue
    })
  },
    })