const app = getApp();
// pages/test/test.js
Page({
  data: {
    orderId:"",
    product:[
      // {
      //   productId,
      //   productName,
      // }
    ],
    starNum:{
      //productId:{
          // one_1: 0,
          // two_1: 5,
          // one_2: 0,
          // two_2: 5,
          // one_3: 0,
          // two_3: 5,
      //}
    },
    one_1: 0,
    two_1: 5,
    one_2: 0,
    two_2: 5,
    one_3: 0,
    two_3: 5
    // one_10: "",
    // two_10: "",
    // one_20: "",
    // two_20: "",
    // one_30: "",
    // two_30: "",
    // num10:1,
    // num20:2,
    // num30:3
  },
  onLoad: function (options) {
    //接受父页面传递过来的参数
    let orderId = options.orderId;
    let object = JSON.parse(options.jsonStr);
    this.setData({ product: object });
    this.setData({ orderId: orderId });
    console.log(orderId);
    //初始化starNum
    for (let i = 0; i < this.data.product.length; i++) {
      this.data.starNum[this.data.product[i].productId] = {}
      this.data.starNum[this.data.product[i].productId].one_1 = 0;
      this.data.starNum[this.data.product[i].productId].two_1 = 5;
      this.data.starNum[this.data.product[i].productId].one_2 = 0;
      this.data.starNum[this.data.product[i].productId].two_2 = 5;
      this.data.starNum[this.data.product[i].productId].one_3 = 0;
      this.data.starNum[this.data.product[i].productId].two_3 = 5;
    }
    this.setData({
      starNum: this.data.starNum
    })
    //情况一:展示后台给的评分
    // this.setData({
    //   one_10: this.data.num10,
    //   two_10: 5 - this.data.num10
    // })
    // this.setData({
    //   one_20: this.data.num20,
    //   two_20: 5 - this.data.num20
    // })
    // this.setData({
    //   one_30: this.data.num30,
    //   two_30: 5 - this.data.num30
    // })
  },

  //情况二:用户给评分
  in_xin1: function (e) {
    let productId = e.target.id;
    var in_xin = e.currentTarget.dataset.in;
    var one_1 = this.data.starNum[productId].one_1;
    if (in_xin === 'use_sc2') {
      one_1--;
    } else {
      one_1++;
    }
    this.data.starNum[productId].one_1 = one_1;
    this.data.starNum[productId].two_1 = 5 - one_1;
    this.setData({
      starNum: this.data.starNum
    })
  },
  in_xin2: function (e) {
    let productId = e.target.id;
    var in_xin = e.currentTarget.dataset.in;
    var one_2 = this.data.starNum[productId].one_2;
    if (in_xin === 'use_sc2') {
      one_2--;
    } else {
      one_2++;
    }
    this.data.starNum[productId].one_2 = one_2;
    this.data.starNum[productId].two_2 = 5 - one_2;
    this.setData({
      starNum: this.data.starNum
    })
  },
  in_xin3: function (e) {
    let productId = e.target.id;
    var in_xin = e.currentTarget.dataset.in;
    var one_3 = this.data.starNum[productId].one_3;
    if (in_xin === 'use_sc2') {
      one_3--;
    } else {
      one_3++;
    }
    this.data.starNum[productId].one_3 = one_3;
    this.data.starNum[productId].two_3 = 5 - one_3;
    this.setData({
      starNum: this.data.starNum
    })
  },
  // submitComment: function(e) {
  //   console.log("点击");
  //   let productId = e.target.id;
  //   wx.request({
  //     url: 'https://cxd.mynatapp.cc/buyer/comment/',
  //     method: 'POST',
  //     header: {
  //       'content-type': 'application/json'
  //     },
  //     data: {
  //       orderId: this.data.orderId,
  //       productId:e.target.id,
  //       userOpenid: app.globalData.userOpenid,
  //       qualityScore: this.data.starNum[productId].one_1,
  //       tasteScore: this.data.starNum[productId].one_2,
  //       packingScore: this.data.starNum[productId].one_3
  //     },
  //     success: function (res) {

  //       console.log("评价success", res)
  //     },
  //     error: function (error) {
  //       console.log("error", error)
  //     }
  //   })

  // },
  submitCommentButton: function() {
    var that = this;
 
    for (let obj in that.data.starNum) {
    
      wx.request({
        url: 'https://cxd.mynatapp.cc/buyer/comment/',
        method: 'POST',
        header: {
          'content-type': 'application/json'
        },
        data: {
          orderId: that.data.orderId,
          productId: obj,
          userOpenid: app.globalData.userOpenid,
          qualityScore: that.data.starNum[obj].one_1,
          tasteScore: that.data.starNum[obj].one_2,
          packingScore: that.data.starNum[obj].one_3
        },
        success: function (res) {

          console.log("评价success", res)
        },
        error: function (error) {
          console.log("error", error)
        }
      })

    }
  }
})