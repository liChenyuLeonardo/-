//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    bName: '',
    author: '',
    pName: '',
    degree: '',
    price: '',
    tempFilePaths: '',
    list: '',
    describe: '',
    upload_picture_list: []
  },
  onLoad: function () {
  },

  bNameInput: function (e) {
    this.setData({
      bName: e.detail.value
    })
  },

  authorInput: function (e) {
    this.setData({
      author: e.detail.value
    })
  },

  pNameInput: function (e) {
    this.setData({
      pName: e.detail.value
    })
  },


  NewInput: function (e) {
    this.setData({
      degree: e.detail.value
    })
  },

  priceInput: function (e) {
    this.setData({
      price: e.detail.value
    })
  },

  describeInput: function (e) {
    this.setData({
      describe: e.detail.value
    })
  },
  submitdate: function (event) {
    var that = this;
    var bName = that.data.bName;
    var price = that.data.price;
    var author = that.data.author;
    var pName = that.data.pName;
    var vName = that.data.vName;
    var degree = that.data.degree;
    var describe = that.data.describe;
    wx.request({
      method: 'POST',
      url: 'https://www.lichenyu666.top/Uproductdata.php', //接口地址
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        'book_name': bName,
        'userID': '',//userid
        'author': author,
        'price': price,//number
        'press': pName,
        'publishN': vName,//number
        'degree': degree,//number
        'description': describe,
      },
      success: function (res) {
        console.log(res);
        if (res.data.status == true) {
          //var that1 = that
          var Product_ID = res.data.Product_ID
          var upload_picture_list = that.data.upload_picture_list
          var lastflag = upload_picture_list.length - 1
          //循环把图片上传到服务器 并显示进度   
          var count_success = true;    

          for (var j in upload_picture_list) {
            if(count_success == false)
            {
              lastflag = - 1
            }
            console.log(lastflag)
            if (upload_picture_list[j]['upload_percent'] == 0) {
              const upload_task =wx.uploadFile({
                  url: 'https://www.lichenyu666.top/Uimage.php', //需要用HTTPS，同时在微信公众平台后台添加服务器地址  
                  filePath: upload_picture_list[j]['path'], //上传的文件本地地址    
                  name: 'file',
                  async: 'false',
                  header: {
                    "Content-Type": "multipart/form-data"
                  },
                  formData: {
                    'lastflag': upload_picture_list.length - 1,
                    'num': j,
                    'Product_ID': Product_ID
                  },
                  success: function (res) {
                    console.log(res);
                    if (res.status == true) {
                      count_success = count_success - 1;
                      
                      //对上传的图片进行缓存
                      var filename = data.file //存储地址 显示
                      upload_picture_list[j]['path_server'] = filename
                      that.setData({
                        upload_picture_list: upload_picture_list
                      });
                      wx.setStorageSync('imgs', upload_picture_list);
                    }
                    else{
                      count_success = false
                    }
                  }
              })
              //上传 进度方法
              upload_task.onProgressUpdate((res) => {
                upload_picture_list[j]['upload_percent'] = res.progress
                that.setData({
                  upload_picture_list: upload_picture_list
                });
              });
            }
          }
          if(count_success==false){
            wx.showToast({
              title: '上传失败',
              duration: 3000,
            })
          } 
          else{
            wx.showToast({
              title: '上传成功',
              duration: 3000,
            })
            //跳转
          }   
        }
        else{
          wx.showToast({
            title: '上传失败',
            duration: 3000,
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
  },
  //选择图片方法
  uploadpic: function (e) {
    var that = this //获取上下文
    var upload_picture_list = that.data.upload_picture_list
    //选择图片
    wx.chooseImage({
      count: 4,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempFiles = res.tempFiles
        //把选择的图片 添加到集合里
        for (var i in tempFiles) {
          tempFiles[i]['upload_percent'] = 0
          tempFiles[i]['path_server'] = ''
          upload_picture_list.push(tempFiles[i])
        }
        //显示
        that.setData({
          upload_picture_list: upload_picture_list,
        });
      }
    })
  },

  // 删除图片
  deleteImg: function (e) {
    let upload_picture_list = this.data.upload_picture_list;
    let index = e.currentTarget.dataset.index;
    upload_picture_list.splice(index, 1);
    this.setData({
      upload_picture_list: upload_picture_list
    });
  },
  clickScan: function () {
    var that = this
    wx.scanCode({
      success(res) {
        var result = res.result
        wx.request({
          method: 'POST',
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          url: 'https://isbn.szmesoft.com/isbn/query?isbn='+result, //接口地址
          /*data: {
            'isbn': result,
          },*/
          success: function (res) {
            console.log(res)
            console.log(res.data.BookName)
            if (res.statusCode == 200) {
              that.setData({
                bName: res.data.BookName,
                author: res.data.Author,
                pName: res.data.Publishing,
              })
            } else {
              wx.showToast({
                title: res.errMsg,
                duration: 2000
              })
            }
          },
          fail: function (res) {
            wx.showToast({
              title: '连接服务器失败',
              duration: 2000
            })
          }
        })
      }
    })
  }
})