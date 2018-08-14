
// pages/test/test.js
Page({
  /**
   * 统一满分为5星
   */
  data: {
    num10: 4,//后端给的分数,显示相应的星星
    num20: 3,//后端给的分数,显示相应的星星
    num30: 5,
    one_10: '',
    two_10: '',
    one_20: '',
    two_20: '',
    one_30: '',
    two_30: '',
    one_1: 0,
    two_1: 5,
    one_2: 0,
    two_2: 5,
    one_3: 0,
    two_3: 5,
  },
  onLoad: function (options) {
    //情况一:展示后台给的评分
    this.setData({
      one_10: this.data.num10,
      two_10: 5 - this.data.num10
    })
    this.setData({
      one_20: this.data.num20,
      two_20: 5 - this.data.num20
    })
    this.setData({
      one_30: this.data.num30,
      two_30: 5 - this.data.num30
    })
  },

  //情况二:用户给评分
  in_xin1: function (e) {
    var in_xin = e.currentTarget.dataset.in;
    var one_1;
    if (in_xin === 'use_sc2') {
      one_1 = Number(e.currentTarget.id);
    } else {
      one_1 = Number(e.currentTarget.id) + this.data.one_1;
    }
    this.setData({
      one_1: one_1,
      two_1: 5 - one_1
    })
  },
  in_xin2: function (e) {
    var in_xin = e.currentTarget.dataset.in;
    var one_2;
    if (in_xin === 'use_sc2') {
      one_2 = Number(e.currentTarget.id);
    } else {
      one_2 = Number(e.currentTarget.id) + this.data.one_2;
    }
    this.setData({
      one_2: one_2,
      two_2: 5 - one_2
    })
  },
  in_xin3: function (e) {
    var in_xin = e.currentTarget.dataset.in;
    var one_3;
    if (in_xin === 'use_sc2') {
      one_3 = Number(e.currentTarget.id);
    } else {
      one_3 = Number(e.currentTarget.id) + this.data.one_3;
    }
    this.setData({
      one_3: one_3,
      two_3: 5 - one_3
    })
  }
})