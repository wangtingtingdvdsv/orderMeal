const app = getApp();
var time = require('../../utils/util.js');
Page({
  data: {
    products:{
      //orderId:[{productId, productName}]
    } 
  },
  onLoad:function(){
    let userOpenid = app.globalData.userOpenid;
    console.log(userOpenid)
    var that = this;
    wx.request({
      url: 'https://cxd.mynatapp.cc/buyer/order/' + userOpenid,
      method:'GET',
      header: {
        'content-type': 'application/json'
      },
      success:function(resInfo){
         console.log("订单详情", resInfo.data.data);

        var deliveryOrder = resInfo.data.data
        for (var i = 0; i < resInfo.data.data.length; i++){
          deliveryOrder[i].deliveryTime = time.formatTimeTwo(resInfo.data.data[i].deliveryTime, 'Y-M-D h:m')
        }
        that.setData({
          orderList: deliveryOrder
        })

        for (let i = 0; i < deliveryOrder.length; i++) {
          that.data.products[deliveryOrder[i].orderId] = [];
          let orderDetailList = deliveryOrder[i].orderDetailList;
          for (let j = 0; j < orderDetailList.length; j++) {
            let product = {};
            product.productId = orderDetailList[j].productId;
            product.productName = orderDetailList[j].productName;
            that.data.products[deliveryOrder[i].orderId].push(product);
          }
        }
        that.setData({
          products: that.data.products
        })
      }
    })
  },
  goToComment:function(event){
    let orderId = event.target.id;
    let str = JSON.stringify(this.data.products[orderId])
    wx.navigateTo({
      url: '../Comment/Comment?jsonStr=' + str + '&orderId=' + orderId,
    })
  }
})