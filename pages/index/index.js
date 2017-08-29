//index.js
//获取应用实例
var app = getApp(),
    deviceInfo = app.globalData.deviceInfo;
    console.log(deviceInfo);
Page({
  data: {
    latitude:"",
    longitude:"",
    markers:[],
    controls: [
      {
        id: 1,
        iconPath: '../../resource/pin.png',
        position: {
          // deviceInfo.windowWidth 单位是 px 使用
          left: deviceInfo.windowWidth / 2 - 15,
          top:  (deviceInfo.windowHeight - 42)/ 2 - 30,
          width: 30,
          height: 30
        } 
      },
      {
        id: 2,
        iconPath: '../../resource/center.png',
        position: {
          // deviceInfo.windowWidth 单位是 px 使用
          left: 15,
          top: deviceInfo.windowHeight - 80,
          width: 30,
          height: 30
        }, 
        clickable:true
      }
    ]
  
  },
  onReady: function (e) {
    // 使用 wx.createMapContext 获取 map 上下文
    // myMap 值得是 地图的id名
    this.mapCtx = wx.createMapContext('map')
  },
  onShow:function(){
    let that = this;
    wx.getLocation({
      type:"gcj02",
      success:function(res){
        that.setData({
          longitude:res.longitude,
          latitude:res.latitude
        })
      }
    }),
    wx.request({
      url:"https://nuanwan.wekeji.cn/student/index.php/trade/get_list",
      data:{},
      method:"GET",
      heder:{
        "content-type":"application/x-www-form-urlecoded"
      },
      success:this.handleGetMarkersSucc.bind(this)
    })
  },
  handleGetMarkersSucc:function(res){

    // [{
    //   iconPath: "/resources/others.png",
    //   id: 0,
    //   latitude: 23.099994,
    //   longitude: 113.324520,
    //   width: 50,
    //   height: 50
    // }]

    var markers = res.data.data;
    var results = [];
    for(var i = 0;i < markers.length;i ++){

      var item = markers[i];
      // console.log(item.type);
      results.push({
        iconPath:"../../resource/" + item.type + ".png",
        id:i,
        latitude:item.latitude,
        longitude:item.longitude,
        width:30,
        height:30
      })
    }
    console.log(results);
    this.setData({
      markers:results
    })
  },
  handleGetLocationSucc:function(res){
    this.setData({
      longitude:res.longitude,
      latitude:res.latitude
    })
  },
  // onShareAppMessage 要有返回值
  onShareAppMessage: function () {
    return {
      title: '最酷炫的线下水族交易平台',
      path: '/page/index/index'
    }
  },
  handleControlTap:function(e){
    var id = e.controlId;
    if(id = 2){
       
        this.mapCtx.moveToLocation()
      
    }
  }
})
