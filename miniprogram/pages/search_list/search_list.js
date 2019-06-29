var app = getApp()
var API = 'https://www.lichenyu666.top/search.php'
Page({
  data: {
    list:[],
    title:''
  },
 onLoad:function(){
   var that=this
   console.log(this.data.navTopItems)
   console.log('onLoad')

   wx.showToast({
     title: '加载中...',
     icon:'loading',
     duration:10000
   })

   wx.request({
     url: API,
     data:{
      // style: this.data.curIndex,
     },
     method:'GET',
     header:{
       'content-type':'application/json'
     },
     success:function(res){
       console.log(res.data[0].num_rows)
       res.data.splice(0,1)

       that.setData({
         list:res.data,
       })

       console.log('获取接口成功',res)
       wx.hideToast()
       wx.setNavigationBarTitle({
         title: '书香邮苑',
       })

     }
   })
 },
//获取文本框内容
 bindblur:function(res){
   console.log(res.detail.value)
   this.inputValue=res.detail.value

   wx.showToast({
     title: '正在跳转',
     icon:'loading',
     duration:1000,
     success:function(){
       console.log('提示成功')
     }
   })
   wx.navigateTo({
     url: '/pages/book/book?book_name='+this.inputValue
   })
 },
  book: function (event) {
    console.log(event.currentTarget)
    var bookName = event.currentTarget.dataset.bookName
    console.log(bookName);
  }
})