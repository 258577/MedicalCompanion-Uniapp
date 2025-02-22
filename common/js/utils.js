class Utils {
	constructor() {
		// this.baseurl = 'http://159.75.169.224:7300/pz'
		// 有域名
		this.baseurl = 'https://code.itndedu.com/pz'
	}
	// 获取用户信息
	getUserInfo(){
		uni.login({
			success: res => {
				console.log(res);
				this.request({
					url: '/auth/wxLogin',
					data: {
						code: res.code
					},
					success: res => {
						console.log(res,'res');
					}
				})
			}
		})
	}
	request(option = {
		showLoading: false
	}){
		// 判断url是否传进
		if(!option.url){
			return false
		}
		if(option.showLoading){
			this.showLoading()
		}
		// http://159.75.169.224:7300/pz/auth/wxLogin
		uni.request({
			url: this.baseurl + option.url,
			data: option.data ? option.data : {},
			header: option.header ? option.header : {},
			method: option.method ? option.method : 'GET',
			// 拿到正确的this箭头函数
			success: (response) => {
				uni.hideLoading()
				// 后端返回异常
				if (response.data.code != 10000) {
					if(option.fail && typeof option.fail == 'function') {
						option.fail(response)
					}
				}else{
					// 成功结果返回
					if(option.success && typeof option.success == 'function') {
						option.success(response.data)
					}
				}
			},
			// 非200
			fail: response => {
				uni.hideLoading();
				console.log(response);
			}
		})
	}
	// 创建加载loading效果
	showLoading() {
		const isShowLoading = uni.getStorageSync('isShowLoading')
		if (isShowLoading) {
			uni.hideLoading()
			uni.setStorageSync('isShowLoading', false)
		}
		uni.showLoading({
			title: '加载中...',
			complete: function () {
				uni.setStorageSync('isShowLoading', true)
			},
			fail: function (){
				uni.setStorageSync('isShowLoading', false)
			}
		})
	}
}
export default new Utils()