var app = getApp();
// pages/sureInfo/sureInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName:"",
    userIcon:""
  
  },
  onGotUserInfo: function (e) {
    var that = this;
   //console.log(e.detail.errMsg)
    //console.log(e.detail.userInfo)
    //console.log(e.detail.rawData)

    wx.getSetting({
      success: function() {
        wx.login({
          success: function(res) {
            console.log(res);
            wx.getUserInfo({
              success: function(res_user) {
                console.log(res_user);
                wx.request({
                  url: 'https://cxd.mynatapp.cc/wechat/login',
                  data: {
                    code: res.code,
                    encryptedData: res_user.encryptedData,
                    iv: res_user.iv
                  },
                  method: 'POST',
                  header: {
                    'content-type': 'application/json'
                  },
                  success: function (resInfo) {
                   // console.log(resInfo.data.data.userId);
                    app.globalData['userId'] = resInfo.data.data.userId;
                    wx.navigateTo({
                      url: '../dishes/dishes',
                    })
                  
                  }
                })






              }
            })
          }
        })
      } 
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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