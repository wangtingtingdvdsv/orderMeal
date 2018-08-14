// pages/submit/submit.js
const app = getApp();

Page({
  data:{
    mealOrderInfo: { 
     
    },
    address:{

    }
  },
  bindTimeChange: function (e) {
   
    this.setData({
      time: e.detail.value
    })
    app.globalData.deliveryTime = this.data.time;
  },
  onLoad: function() {
    //console.log(app.globalData.mealOrderInfo);
    var that = this;
    that.setData({
      mealOrderInfo: app.globalData.mealOrderInfo,
      total: app.globalData.total
    })
     console.log(that.data.mealOrderInfo);
     //地址
     that.setData({
       address: app.globalData.address
     })
  },
  submitOrder: function() {

    wx.navigateTo({
      url: '/pages/thePay/thePay',
    })
  },
  modifyAddress: function () {
    wx.navigateTo({
      url: '/pages/addAddress/addAddress',
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */

})