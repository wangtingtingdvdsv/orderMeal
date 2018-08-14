// pages/thePay/thePayOver.js
const app = getApp()
Page({
  data:{
    total:"",
    delivery:{}
  },
  onLoad: function() {
    this.setData({
      total: app.globalData.total
    })
    console.log("time", app.globalData.deliveryTime);
    //顾客信息
    var delivery = {};
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    if(app.globalData.deliveryTime == "") {
      
      delivery.time = "立即送出" +year + "-" +month+'-'+ day+ '  '+ date.getHours() + ":" + date.getMinutes();
    } else {
      delivery.time = year + "-" + month + '-' + day + '  ' + app.globalData.deliveryTime;
    }
    delivery.name = app.globalData.address.userName;
    delivery.address = app.globalData.address.userAddress;
    this.setData({
      delivery: delivery
    })
  },
  return:function(){
    wx.redirectTo({
      url: '../dishes/dishes',
    })
  }
})