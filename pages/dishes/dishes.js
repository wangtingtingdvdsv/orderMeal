const app = getApp()

Page({
  data: {
    sortMoudlePraise: true,
    sortMoudlePrice: false,
    currentData: 0,
    total:'00.00',
    activeMenuId:'0', 
    mealOrderInfo: {},
    mealsInfo:{
    },
    vegetableClassification: []
  },
  onLoad: function() {
    var that = this;
    wx.request({
      url: 'https://cxd.mynatapp.cc/buyer/product/list',
      method: 'GET',
      header: {
        'content-type': 'text/html'
      },
      success: function (resInfo) {
        var data = resInfo.data.data;
        for(let i = 0; i < data.length; i++) {
          console.log(data[i].categoryName);
          var end = that.data.vegetableClassification.some(function(currentValue){
                        //任意一项相等则不能push
                        return currentValue.categoryName == data[i].categoryName ||    
                               currentValue.categoryType == data[i].categoryType
                    })
          if(!end) {
            that.data.vegetableClassification.push({
              'categoryName': data[i].categoryName,
              'categoryType': data[i].categoryType,
            });
          }
          that.data.mealsInfo[data[i].categoryType] = data[i].products
          for (let j = 0; j < data[i].products.length;j++) {
            that.data.mealOrderInfo[data[i].products[j].productId] = {};
            that.data.mealOrderInfo[data[i].products[j].productId].num = 0;
            that.data.mealOrderInfo[data[i].products[j].productId].productName = data[i].products[j].productName;
            that.data.mealOrderInfo[data[i].products[j].productId].productPrice = data[i].products[j].productPrice;
          }
        }
        that.setData({
          mealOrderInfo: that.data.mealOrderInfo
        })
        app.globalData.mealOrderInfo = that.data.mealOrderInfo;   
        that.setData({
          mealsInfo: that.data.mealsInfo
        })
        that.setData({
          vegetableClassification: that.data.vegetableClassification
        })
     
      }
    })
    //获取收获地址
    let userId = app.globalData.userId;
    wx.request({
      url: 'https://cxd.mynatapp.cc/user/info/'+userId,
      method: 'GET',
      header: {
        'content-type': 'html/text'
      },
      success: function (resInfo) {
        var data = resInfo.data.data;
        console.log(data.userName);
        app.globalData.address.userName = data.userName;
        app.globalData.address.userAddress = data.userAddress;
        app.globalData.address.userPhone = data.userPhone;
        app.globalData.address.userGender = data.userGender;
      },
      error: function(){
        console.log("错误");
      }
    })
  },
  individualMeals: function(event) {
    var id = event.target.id;
    console.log(id);  
    var _this = this;
    _this.setData(
      {
        activeMenuId:id
      }
    );  
  },
  addmeal: function(event) {
    var _this = this;
    var id = event.target.id;
    var activeMenuId = _this.data.activeMenuId; 
    var num = _this.data.mealOrderInfo[id].num;
    num++;
    _this.data.mealOrderInfo[id].num = num;
    _this.setData({
      mealOrderInfo: _this.data.mealOrderInfo
    })
    app.globalData.mealOrderInfo = _this.data.mealOrderInfo;   
    console.log(this.data.mealOrderInfo);
    for (let i = 0; i < _this.data.mealsInfo[activeMenuId].length; i++) {
      if (_this.data.mealsInfo[activeMenuId][i].productId == id) {
        var money = Number(_this.data.total) + Number(_this.data.mealsInfo[activeMenuId][i].productPrice)
        _this.setData({
        total: money.toFixed(2)
        })   
      }
    }
    app.globalData.total = _this.data.total;
  },
  minusmeal: function(event) {
    
    var _this = this;
    var id = event.target.id;
    var activeMenuId = _this.data.activeMenuId;
    var num = _this.data.mealOrderInfo[id].num;
    num--;
    _this.data.mealOrderInfo[id].num = num;
    _this.setData({
      mealOrderInfo: _this.data.mealOrderInfo
    })
    app.globalData.mealOrderInfo = _this.data.mealOrderInfo;   
    for (let i = 0; i < _this.data.mealsInfo[activeMenuId].length; i++) {
      if (_this.data.mealsInfo[activeMenuId][i].productId == id) {
        var money = Number(_this.data.total) - Number(_this.data.mealsInfo[activeMenuId][i].productPrice)
        _this.setData({
          total: money.toFixed(2)
        })
      }
    }
  },
  //点击我显示底部弹出框
  clickme: function () {
    this.showModal();
  },

  //显示对话框
  showModal: function () {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  //隐藏对话框
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },
  //清空购物车
  deleteShopCar: function() {
    console.log("mealOrderInfo上",this.data.mealOrderInfo);
    for(var item in this.data.mealOrderInfo) {
        console.log("item", item);
      console.log("1this.data[item]", this.data.mealOrderInfo[item]);
        this.data.mealOrderInfo[item] = 0;
      console.log("2this.data[item]", this.data.mealOrderInfo[item]);
      this.setData({
        mealOrderInfo: this.data.mealOrderInfo
      })      
    }
    console.log("mealOrderInfo下",this.data.mealOrderInfo);

    this.setData({
      total: '00.00'   
    })
    this.hideModal();
  },
  //商品评价页
  evaluation: function(event) {
    if (event.currentTarget.id != "mealInfoTop") {
      return;
    }
    wx.navigateTo({
      url: '/pages/evaluation/evaluation',
    })
  },
  sortTheMoudlePraise: function () {
    this.setData({
      sortMoudlePraise: !this.data.sortMoudlePraise,
    })
  },
  sortTheMoudlePrice: function () {
    this.setData({
      sortMoudlePrice: !this.data.sortMoudlePrice,
    })
  },
  theOrder:function(){
    wx.navigateTo({
      url: '../Order/Order',
    })
  },
  theChoice:function(){
    this.setData({
      showModalStatus: !this.data.showModalStatus
    })
  },
  thePayIt:function(){
    if(this.data.total==0){
      wx.showToast({
        title: '请选择菜品',
        icon: 'loading',
        duration: 2000,
        mask: true
      })
    }
    else{
      var url;
      if(app.globalData.address.userPhone &&
        app.globalData.address.userGender &&
        app.globalData.address.userName &&
        app.globalData.address.userAddress) {
        url = '../submit/submit';
      } else {
        url =  '../addAddress/addAddress';  
      }
      wx.navigateTo({
        url: url,
      })
    }
  }
})
