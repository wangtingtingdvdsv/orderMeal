Page({
  data: {
    evaluatons:[],
    one_1: 0,
    two_1: 5,
    one_2: 0,
    two_2: 5,
    one_3: 0,
    two_3: 5,
  },
  onLoad: function (options) {
    var that = this;
    var productId = options.productId;
    //展示后台给的评分
    wx.request({
      url: 'https://cxd.mynatapp.cc/buyer/comment/'+productId,
      method: 'GET',
      header: {
        'content-type': 'application/json',
      },
      success: function(res) {
        console.log(options.productId)
        var data = res.data.data;
        console.log(data);
        for(let i = 0; i < data.length; i++) {
          let time = new Date(data[i].createTime);
          data[i].createTime = time.getFullYear() + "-" + Number(time.getMonth() + 1) + "-" + time.getDate() + " "+ time.getHours() +":"+time.getMinutes();
          Number()
        }
        that.setData({
          evaluatons:data
        })
        that.setData({
          one_1: data[0].qualityScore,
          two_1: 5 - data[0].qualityScore
        })
        that.setData({
          one_2: data[0].tasteScore,
          two_2: 5 - data[0].tasteScore
        })
        that.setData({
          one_3: data[0].packingScore,
          two_3: 5 - data[0].packingScore
        })
      }
    })
  },
})