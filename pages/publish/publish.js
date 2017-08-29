Page({
	data:{
		success:false,
		address:"请选择你的当前位置"
	},
	staticData:{
		longitude:"",
		latitude:"",
		type:"",
		message:"",
		contact:""
	},
	handleAddressTap:function(){
		wx.chooseLocation({
			success:this.handleAddressSuccess.bind(this)
		})
	},
	handleAddressSuccess:function(res){
		console.log(res,"res");
		this.setData({
			address:res.address
		})
		Object.assign(this.staticData,{
			longitude:res.longitude,
			latitude:res.latitude
		})
	},
	handleTypeChange:function(e){
		// console.log(e);
		this.staticData.type = e.detail.value;
	},
	handleMessageInput:function(e){
		this.staticData.message = e.detail.value;
	},
	handleContactInput:function(e){
		this.staticData.contact = e.detail.value;
	},
	handlePostTap:function(){
		console.log(this.data);
		console.log(this.staticData);
		let msg = "";
		if(this.data.address == "" || this.data.address == "请选择你的当前位置"){
			msg = '请选择地址'
		}else if(this.staticData.type == ""){
			msg = "请选择交易类型"
		}else if(this.staticData.contact == ""){
			msg = "请填写联系方式"
		}else if(this.staticData.message == ""){
			msg = "请填写商品信息"
		}

		if(msg){
			wx.showToast({
				title:msg,
				icon:"loading",
				duration:2000
			})
		}else{
			// 发请求了
			wx.request({
				url: 'https://nuanwan.wekeji.cn/student/index.php/trade/add_item', //仅为示例，并非真实的接口地址
				data: {
				   address: this.data.address,
				   latitude: this.staticData.latitude,
				   longitude:this.staticData.longitude,
				   message:this.staticData.message,
				   type:this.staticData.type,
				   contact:this.staticData.contact
				},
				method:"POST",
			    header: {
			      'content-type': 'application/x-www-form-urlencoded'
			    },
			    success: this.handleSubmitSucc.bind(this)
			})
		}
	},
	handleSubmitSucc:function(){
		this.setData({
			success:true
		})
	}
})

		