//chat.js
//获取应用实例
var util = require('../../utils/util.js');
Page({
  data: {
    msg:'',
    list:[],
    link_status:'false',
    offset:0,
    nums:10,
    flag:false,
    chat_id:null,
    bookinfo:1,
    userID:null,
    talkerID:null,
     is_eventOngoing:false,
     scrollTop:0,
     len:0
  },

  onLoad(options) {
    const nickname=options.nickname;
    wx.setNavigationBarTitle({
      title: nickname
    })
    var that = this;
    var userID=wx.getStorageSync('userID');
    that.setData({
      userID:userID,//登录的时候该用户的userID就会存储在storage里面，使用getStorageSync来获取
      talkerID:options.talkerID,
    })
    that.data.chat_id= options.chat_id;
    that.dataRequest();
    that.data.bookinfo=0;
  },
  //--------------------------------------------
  //下拉刷新
 pullDownRefresh: function () {
    var that=this;
 if(that.data.is_eventOngoing==true)
    {
      console.log("重复触发事件");
      return;
    }
      console.log("下拉刷新")
  that.setData({
     is_eventOngoing:true
   })
    if (that.data.flag == true)
    {
      that.setData({
        is_eventOngoing: false
      })
      return;
    }
    else {
      var that = this;
      that.dataRequest();
       }
   that.setData({
     is_eventOngoing: false,
   })
   console.log("数据更新后scrollTop:  "+that.data.scrollTop)
  },
  //------------------------------------------------
  //用于向服务器请求并更新数据
  dataRequest:function(){
    var that=this;
    wx.request({
      url: 'https://www.lichenyu666.top/msg_recv.php',
      data: { 
        offset: that.data.offset,
       nums: that.data.nums, 
       chat_id: that.data.chat_id, 
       bookinfo: that.data.bookinfo
        },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data[0])
        if (res.data[0].msg_status != 404) {
          if (res.data[0].num_rows < that.data.nums)
            that.data.flag = true;
          else
          {
            that.data.flag = false;
            that.data.offset+=that.data.nums;
          }
          let length=res.data[0].num_rows;
            that.setData({
              link_status: res.data[0].link_status,
              len:that.data.len+=length
            })
            if(res.data[0].link_status==true)
            {
              that.setData({
                book_id: res.data[0].book_id,
                book_name: res.data[0].book_name,
                book_author: res.data[0].author,
                book_price: res.data[0].price
                })
            }
         res.data.splice(0, 1)
         for(var i=0;i<length;i++)
         {
           if(res.data[i].user1_id==that.data.userID){
              res.data[i].msgType=0;//这里对数据做一些处理，如果某条消息的发送者是该用户，则其msgType为0，置于聊天页面的右边。该用户是接受者的则为1，置于聊天页面的左边
          }
           else
           res.data[i].msgType=1;
         }
          var temp = new Array;
          temp = res.data.reverse();
          temp = temp.concat(that.data.list);
          that.setData({
            list: temp
          })
        }
        else {
          //记得在这里添加错误处理代码
          console.log("chat_list 没有内容")
        }
      }
    })
  },

  //--------------------------------------
  // 输入
  onInput(e) {
    const value = e.detail.value;
    this.setData({ msg: value });
  },

  submitdate: function (event) {
    var that = this;
    var msg = that.data.msg;
    if(msg=='')
      return;
    that.setData({
      msg:''
    })
    wx.request({
      method: 'GET',
      url: 'https://www.lichenyu666.top/msg_send.php', //接口地址
      data: {
        chat_id: that.data.chat_id,
        user1_id:that.data.userID ,
        user2_id: that.data.talkerID,//userid
        msg: msg
      },
      //加上时间和异常处理
      success: function (res) {
        //console.log(res)
        console.log("chatID是" + that.data.chat_id+"  user1_id:"+that.data.userID+"   user2_id: "+that.data.talkerID)
        if(res.data.msg_status==200)
        {
         // var time = util.formatTime(new Date());
          var msg_id=res.data.msg_status;
          const haha={
            //msg_time:time,
            msg_id:msg_id,
            msgType:0,
            text:msg
          }
          let temp=that.data.list;
          temp.push(haha);
          that.setData({
            list:temp,
            scrollTop:that.data.len*1000
          })
        }
        else{
          wx.showToast({
            title: '信息发送失败',
            duration:500
          })
        }
      },
      fail: function (res) {
        console.log('错误：' + ':' + res)
        wx.showToast({
          title: '连接服务器失败',
          duration: 3000,
        })
      }
    })
  }
})