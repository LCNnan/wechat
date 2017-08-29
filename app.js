//app.js
App({
  globalData:{
    deviceInfo:""
  },
  onLaunch: function() {
     try{
        var localInfo = wx.getSystemInfoSync("deviceInfo");
        if(!localInfo){
          wx.setStorageSync("deviceInfo",res);
          this.globalData.deviceInfo = res;
        }else{
          this.globalData.deviceInfo = localInfo;
        }
        // this.globalData.deviceInfo = res
        // console.log(res);
        // console.log(res.model)
        // console.log(res.pixelRatio)
        // console.log(res.windowWidth)
        // console.log(res.windowHeight)
        // console.log(res.language)
        // console.log(res.version)
        // console.log(res.platform)
      } catch (e) {
        // Do something when catch error
      }
  }
 
})
