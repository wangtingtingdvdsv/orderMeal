Page({
  data: {
    orderList: [
      {
        restaurantName: "传世排骨汤饭",
        state: "订单完成",
        price: "12",
        date: "2018-08-02",
        time: "12:29:12",
        howToDistribute: "酸甜土豆丝 x1酸甜土豆丝 x1酸甜土豆丝 x1酸甜土豆丝 x1酸甜土豆丝 x1"
      },
    ]
  },
  goToComment:function(){
    wx.navigateTo({
      url: '../Comment/Comment',
    })
  }
})