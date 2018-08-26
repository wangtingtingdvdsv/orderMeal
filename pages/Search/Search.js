// pages/Search/Search.js
Page({
  data: {
    searchdish:false,
    productJson:[],
    tips:[
      {name:123},{name:456},{name:789}
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  Search:function(t){
    var that = this;
    wx.request({
      url:"https://cxd.mynatapp.cc/buyer/product/key",
      method:'GET',
      header: {
        'content-type': 'application/json' ,
      },
      data: {
        key: t.detail.value,
      },
      success:function(t){
        var data = t.data.data;
        if(data != ''){
        console.log(data);
        var arr = [];
        for (let i = 0; i < data.length; i++) {
          arr.push(data[i].productName);
        }
        console.log(arr);
        that.setData({
          productJson: t.data.data
        })
        }
        else{
          wx.showToast({
            title: '未找到该菜品',
            icon: 'loading',
            duration: 1000,
            mask: true
          })
        }
      },
      fail:function(t){
       // console.log(t.data)``
      console.log(21111111111111)
      }
    })
  },
  bindSearch: function (e) {
    var keywords = e.target.dataset.keywords;
    var url = '../dishes/dishes?keywords=' + keywords;
    wx.redirectTo({
      url: url
    })
  }
})