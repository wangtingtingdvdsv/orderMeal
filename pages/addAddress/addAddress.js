var app = getApp();
Page({
  data: {
  
  },
  bindCancel: function () {
    wx.navigateBack({});
  },
  fromSubmit: function(e) {
    // wx.navigateTo({
    //   url: '/pages/submit/submit',
    // })
    var value = e.detail.value;
    if(value.userName == "" || value.userAddress == "" || value.userPhone == "") {
      wx.showModal({
        content: '请完善信息',
      })
    } else {
      let userId = app.globalData.userId;
      wx.request({
        url: 'https://cxd.mynatapp.cc/user/info/'+userId,
        method: 'POST',
        data:JSON.stringify(value),
        header: {
          'content-type': 'application/json;charset=UTF-8'
        },
        success: function (resInfo) {
         // console.log("结果", resInfo);
          wx.navigateTo({
             url: '/pages/submit/submit',
          })
        },
        error: function(){
          console.log("错误");
        }
      })
      app.globalData.address = value;
    }
  }
});