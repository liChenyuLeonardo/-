//one.js
//获取应用实例
const app = getApp()
Page({
  data: {
    //设置初始值
    array: ['西土城校区', '沙河校区'],
    objectArray: [
      {
        id: 0,
        name: '西土城校区'
      },
      {
        id: 1,
        name: '沙河校区'
      }
    ],
    index: 0,
    typeArray:['套书出售','散书出售'],
    objectTypeArray:[
      {
        id:0,
        name:'套书出售'
      },
      {
        id:1,
        name:'散书出售'
      }
    ],
    typeIndex:0,
    newArray:['七成新','八成新','九成新','全新'],
    objectNewArray:[
      {
        id:0,
        name:'七成新'
      },
      {
        id:1,
        name:'八成新'
      },
      {
        id:2,
        name:'九成新'
      },
      {
        id:3,
        name:'全新'
      }
    ],
    newIndex:0,
    multiArray: [['信息与通信工程学院', '电子工程学院','计算机学院','自动化学院','软件学院','数字媒体与设计艺术学院','理学院','经济管理学院','公共管理学院','人文学院','国际学院','网络教育学院','民族教育学院','马克思主义学院'], ['通信工程', '信息工程', '电子信息工程', '数字媒体技术'], ['大一', '大二','大三','大四']],
    objectMultiArray: [
      [
        {
          id: 0,
          name: '信息与通信工程学院'
        },
        {
          id: 1,
          name: '电子工程学院'
        },
        {
          id: 2,
          name: '计算机学院'
        },
        {
          id: 3,
          name: '自动化学院'
        },
        {
          id: 4,
          name: '软件学院'
        },
        {
          id: 5,
          name: '数字媒体与设计艺术学院'
        },
        {
          id: 6,
          name: '理学院'
        },
        {
          id: 7,
          name: '经济管理学院'
        },
        {
          id: 8,
          name: '公共管理学院'
        },
        {
          id: 9,
          name: '人文学院'
        },
        {
          id: 10,
          name: '国际学院'
        },
        {
          id: 11,
          name: '马克思主义学院'
        }
      ], [
        {
          id: 0,
          name: '通信工程'
        },
        {
          id: 1,
          name: '信息工程'
        },
        {
          id: 2,
          name: '电子信息工程'
        },
        {
          id: 3,
          name: '数字媒体技术'
        }
      ], [
        {
          id: 0,
          name: '大一'
        },
        {
          id: 1,
          name: '大二'
        },
        {
          id: 2,
          name: '大三'
        },
        {
          id: 3,
          name: '大四'
        }
      ]
    ],
    multiIndex: [0, 0, 0],
  },
  //校区选择器的点击事件
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  //院系年级选择器
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  //院系年级选择器，某一列的值改变时触发事件
  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['通信工程', '信息工程', '电子信息工程', '数字媒体技术'];
            data.multiArray[2] = ['大一', '大二', '大三', '大四'];
            break;
          case 1:
            data.multiArray[1] = ['电子信息科学与技术', '电子科学与技术', '光电信息科学与工程'];
            data.multiArray[2] = ['大一', '大二', '大三', '大四'];
            break;
          case 2:
            data.multiArray[1] = ['计算机科学与技术', '网络工程', '智能科学与技术', '数据科学与大数据技术'];
            data.multiArray[2] = ['大一', '大二', '大三', '大四'];
            break;
          case 3:
            data.multiArray[1] = ['机械工程及自动化', '工业设计', '测控技术与仪器', '物流工程'];
            data.multiArray[2] = ['大一', '大二', '大三', '大四'];
            break;
          case 4:
            data.multiArray[1] = ['软件工程'];
            data.multiArray[2] = ['大一', '大二', '大三', '大四'];
            break;
          case 5:
            data.multiArray[1] = ['数字媒体技术', '工业设计', '数字媒体艺术'];
            data.multiArray[2] = ['大一', '大二', '大三', '大四'];
            break;
          case 6:
            data.multiArray[1] = ['数学与应用数学', '信息与计算科学', '应用物理'];
            data.multiArray[2] = ['大一', '大二', '大三', '大四'];
            break;
          case 7:
            data.multiArray[1] = ['工程管理', '工商管理', '市场营销', '信息管理与信息系统','电子商务','公共事业管理','会计学','经济学','国际经济与贸易'];
            data.multiArray[2] = ['大一', '大二', '大三', '大四'];
            break;
          case 8:
            data.multiArray[1] = ['公共事业管理'];
            data.multiArray[2] = ['大一', '大二', '大三', '大四'];
            break;
          case 9:
            data.multiArray[1] = ['英语', '日语', '法语', '数字媒体艺术'];
            data.multiArray[2] = ['大一', '大二', '大三', '大四'];
            break;
          case 10:
            data.multiArray[1] = ['电信工程及管理', '物联网工程', '电子商务及法律', '数字媒体技术'];
            data.multiArray[2] = ['大一', '大二', '大三', '大四'];
            break;
          case 11:
            data.multiArray[1] = ['马克思主义理论','马克思主义哲学'];
            data.multiArray[2] = ['大一', '大二', '大三', '大四'];
            break;
        }
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        break;
      case 1:
        data.multiArray[2] = ['大一', '大二','大三','大四'];
        data.multiIndex[2] = 0;
        console.log(data.multiIndex);
        break;
    }
    this.setData(data);
  },
  //新旧程度选择器
  bindNewChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      newIndex: e.detail.value
    })
  },
  //售出类型选择器
  bindTypeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      typeIndex: e.detail.value
    })
  },
  //确认发布
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  //重置
  formReset: function () {
    console.log('form发生了reset事件')
  }
})