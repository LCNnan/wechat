Page({
	data:{
		hasResult:false,
		searchWord:"",
		resultList:[]
	},
	handleSearchChange:function(e){
		this.setData({
			searchWord:e.detail.value
		})
	},
	handleSearchTap:function(){
		console.log(this.data.searchWord);
		wx.request({
			url: 'https://nuanwan.wekeji.cn/student/index.php/trade/get_search_list', //仅为示例，并非真实的接口地址
		    data: {
			   keyword:this.data.searchWord
		    },
		    method:"POST",
		    header: {
		      'content-type': 'application/x-www-form-urlencoded'
		    },
		    success:this.hanldleGetListSucc.bind(this)
		})
	},
	hanldleGetListSucc:function(res){
		var data = res.data;
		console.log(data);
		if(data.ret){
			this.setData({
				hasResult:true,
				resultList:data.data
			})
		}else{
			this.setData({
				hasResult:false,
				resultList:[]
			})
		}
		
		console.log(res);
	},
	handleItemTap:function(e){
		console.log(e);
		wx.navigateTo({
			url:"/pages/detail/detail?id=" + e.currentTarget.id
		})
	}
})