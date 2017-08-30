Page({
	data:{
		address:"",
		message:"",
		contact:"",
		type:"sell",
		textType:""
	},
	onLoad: function(options) {// 从上一页带过来的参数
		// console.log(options);
		var id = options.id;
		wx.request({
			url: 'https://nuanwan.wekeji.cn/student/index.php/trade/get_item', //仅为示例，并非真实的接口地址
		  	data: {
			   id
		  	},
		  	method:"POST",
		  	header: {
		      'content-type': 'application/x-www-form-urlencoded'
		  	},
		  	success:this.handleGetDetail.bind(this)
		})
    // Do some initialize when page load.
  },
  handleGetDetail:function(res){
  	var data = res.data.data;
  	this.setData({
  		address:data.address,
  		message:data.message,
  		contact:data.contact,
  		type:data.type,
  		textType:data.type == "sell" ? "转让" : "求购"
  	})
  }
  // onload  载入页面只执行一次
  // onshow  没进入一次都要执行
})