<template>
	<view>
		<view class="od-banner">
			<image class="od-banner-icon" src="../../static/resource/od_bg_icon.png" mode="widthFix"></image>
			<view class="od-jd od-jd-0">
				<view class="od-jd-out">
					<view class="od-jd-in"></view>
				</view>
				<view class="vp-flex od-jd-text">
					<view class="vp-flex_0">
						<text class="od-jd-st-0">填写订单</text>
					</view>
					<view class="vp-flex_1">
						<text class="od-jd-st-10">在线支付</text>
					</view>
					<view class="vp-flex_2">
						<text class="od-jd-st-20">专人服务</text>
					</view>
					<view class="vp-flex_3">
						<text class="od-jd-st-30">服务完成</text>
					</view>
				</view>
			</view>
		</view>
		<view class="pub-box">
			<view class="pub-box-bd">
				<view class="s1">
					<view class="weui-cell__hd">
						<image class="serv-icon"
							:src="service.icon_image ? service.icon_image_url : '../../static/resource/avatar.png'"
							mode="widthFix"></image>
					</view>
					<view class="weui-cell__bd">
						<text class="serv-name">{{ service.name }}</text>

					</view>
					<view class="weui-cell__ft" @click="handTip">
						<view>
							<image src="../../static/resource/tips.png" class="sty-tips"></image>
						</view>
						<view>
							<text class="ser-con">&nbsp;服务内容</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<block v-if="service.stype == 10 || service.stype == 15 || service.stype == 20">
			<view class="pub-box">
				<view class="pub-box-pd">
					<view class="box-bg">
						<view class="jiuzhen-title">
							<view class="weui_label">就诊医院</view>
						</view>
						<view class="weui-cell__bd"></view>
						<view class="select-box">
							<view>
								<picker @change="onHospitalChange" :value="hospital_index" :range="hospitals"
									range-key="name">
									<input stype="text" :disabled="true" placeholder="请选择要就诊的医院"
										:value="hospitals[hospital_index].name + '>'"
										placeholder-class="vp-placeholder" />
								</picker>
							</view>
						</view>
					</view>

				</view>
				<view class="pub-box-pd">
					<view class="box-bg">
						<view class="time-title">
							<view class="jiuzhen-time">
								<view class="weui-label">就诊时间</view>
							</view>
							<view class="weui-cell__bd"></view>
							<view class="select-time">
								<view>
									<dtPicker @dtPickerChanged="onStartTimeChanged" :timestamp="order.starttime"
										placeholder="请选择就诊时间>"></dtPicker>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="pub-box-pd">
					<view class="box-bg">
						<view class="people-title" @click="onClientChange">
							<view class="jiuzhen-people">
								<view class="weui-label">就诊人</view>
							</view>
							<view class="weui-cell__bd"></view>
							<view class="select-people">
								<view>
									<input class="weui-input" placeholder-class="vp-placeholder" placeholder="请选择就诊人>"
										style="text-align: right;" :disabled="true" :value="client.value" stype="text">
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="pub-box-pd">
					<view class="box-bg">
						<block v-if="service.stype == 15">
							<!-- 接送陪诊 -->
							<view class="address-title">
								<view class="jeisong-address">接送地址</view>
								<view class="weui-cell__bd"></view>
								<view class="select-people">
									<input class="weui-input" name="receiveAddress" style="text-align: right"
										placeholder-class="vp-placeholder" placeholder="请填写就诊人所在地址"
										v-model="order.receiveAddress" />
								</view>
							</view>
						</block>
					</view>
				</view>
				<view class="pub-box-pd">
					<view class="box-bg">
						<view class="phone-title">
							<view class="lianxi-phone">联系电话</view>
							<view class="select-phone">
								<input class="weui-input" stype="number" name="tel" style="text-align: right"
									placeholder-class="vp-placeholder" placeholder="请填写您的联系电话" v-model="order.tel" />
							</view>
						</view>
					</view>
				</view>
				<view class="pub-box">
					<view class="pub-box-tt">服务需求</view>
					<view class="pub-box-bd">
						<view class="weui-cell weui-cell_input">
							<view class="weui-cell__bd2">
								<textarea name="demand" auto-height placeholder="如有其他服务要求请在此填写.."
									placeholder-class="vp-placeholder" style="min-height: 150rpx" v-model="order.demand" />
							</view>
						</view>
					</view>
				</view>
			</view>
		</block>
		<block v-if="service.stype == 30 || service.stype == 40">
			<!-- 送取结果,代跑取药 -->
			<view class="pub-box">
				<view class="pub-box-bd">
					<view class="weui-cell weui-cell_input">
						<view class="weui-cell__hd2">
							<view class="weui-label">所在医院</view>
						</view>
						<view class="weui-cell__bd"></view>
						<view class="weui-cell__ft2">
							<view>
								<picker @change="onHospitalChange" :value="hospital_index" :range="hospitals"
									range-key="name">
									<input stype="text" :disabled="true" placeholder="请选择就诊所在医院"
										:value="hospitals[hospital_index].name +'>'" placeholder-class="vp-placeholder" />
								</picker>
							</view>
						</view>
					</view>

					<view class="weui-cell weui-cell_input">
						<view class="weui-cell__hd2">
							<view class="weui-label">服务时间</view>
						</view>
						<view class="weui-cell__bd"></view>
						<view class="weui-cell__ft2">
							<view>
								<dtPicker @dtPickerChanged="onStartTimeChanged" :timestamp="order.starttime"
									placeholder="请选择期望服务时间>"></dtPicker>
							</view>
						</view>
					</view>

					<view class="weui-cell weui-cell_input" @click="onAddressChange">
						<view class="weui-cell__hd2">
							<view class="weui-label">收件信息</view>
						</view>
						<view class="weui-cell__bd"></view>
						<view class="weui-cell__ft2">
							<input 
							class="weui-input" 
							:disabled="true" 
							style="text-align: right"
							placeholder-class="vp-placeholder" 
							placeholder="请选择收件信息>"
							:value="order.address.userName ? order.address.userName + '(' + order.address.cityName + order.address.countyName + order.address.detailInfo + ')': ''"
							 />
							<!-- {{order.address?(order.address.userName+'('+order.address.telNumber+')'):''}} -->
						</view>
					</view>
					<view class="weui-cell weui-cell_input">
						<view class="weui-cell__hd2">联系电话</view>
						<view class="weui-cell__bd">
							<input class="weui-input" stype="number" name="tel" style="text-align: right"
								placeholder-class="vp-placeholder" placeholder="请填写您的联系电话" v-model="order.tel" />
						</view>
					</view>
				</view>
			</view>

			<view class="pub-box">
				<view class="pub-box-tt">服务需求</view>
				<view class="pub-box-bd">
					<view class="weui-cell weui-cell_input">
						<view class="weui-cell__bd2">
							<textarea name="demand" auto-height placeholder="如有其他服务要求请在此填写.."
								placeholder-class="vp-placeholder" style="min-height: 150rpx" v-model="order.demand" />
						</view>
					</view>
				</view>
			</view>
		</block>
	</view>

	<view style="height: 300rpx"></view>
	<!-- 悬浮提交按钮 -->
	<view class="vp-foot">
		<view style="background: #ffffff; padding: 20rpx">
			<view class="xieyi" style="text-align: center">
				<text :class="'is_xieyi ' + (is_xieyi ? 'is_xieyi_on' : '')" @click="onXieyiChange">我已阅读并同意</text>
				<navigator :url="cfg.page_xy">《用户协议》</navigator>
				<text>和</text>
				<navigator :url="cfg.page_fw">《服务协议》</navigator>
			</view>
			<view>
				<button :class="'btnp ' + (is_xieyi ? '' : 'btnp-disabled')" @click="submit">
					确认下单
					<block v-if="order.price > 0">（支付{{ order.price }}元）</block>
				</button>
			</view>
		</view>
		<uni-popup ref="popup" type="center" :is-mask-click="false" background-color="#fff">
		    <view class="popup-content">
		        <view class="group">
		            <input class="uni-input" type="tel" v-model="validMobile.phone" placeholder="手机号" />
		        </view>
		        <view class="group">
		            <input class="uni-input" v-model="validMobile.validCode" placeholder="验证码" />
		            <text class="valid-text" @click="countdownChange">{{countdown.validText}}</text>
		        </view>
		    </view>
		    <view class="btns">
		        <view class="cancal" @click="cancal">取消</view>
		        <view class="ok" @click="ok">确定</view>
		    </view>
		</uni-popup>
		<uni-popup ref="qrcodePopup" type="center" :is-mask-click="false" background-color="#fff">
			<view class="pay-box" style="width: 300px;height: 300px;">
				<image @click="payment" src="../../static/resource/modal_closer.png" style="display: block;width: 40rpx;height: 40rpx;"></image>
				<view class="text-center">微信支付</view>
				<canvas id="qrcode" canvas-id="qrcode" style="width: 200px;height: 200px;margin-left: 170rpx;" value="text-center"></canvas>
				<view class="text2-center" @click="cenggong">请用微信扫描二维码支付</view>
			</view>
		</uni-popup>
	</view>
</template>

<script setup>
	import UQRCode from 'uqrcodejs';
	import {
		ref,
		reactive,
		computed,
		toRaw
	} from 'vue'
	import {
		onLoad
	} from '@dcloudio/uni-app'
	const app = getApp()
	onLoad((options) => {
		console.log(options, 'soptions');
		main_load(options)
	})
	
	// 手机验证
	const validMobile = reactive({
		phone: '',
		validCode: ''
	})
	const countdown = reactive({
		validText: '获取验证码',
		time: 60
	})
	// 弹窗
	const popup = ref()
	// 医院数据源
	const hospitals = ref([])
	// 选中的医院索引
	const hospital_index = ref(0)
	// 页面服务详情数据
	const service = ref([])
	// 订单数据
	const order = reactive({
		price: '',
		starttime: '',
		address: {
			userName: '',
			cityName: '',
			countyName: '',
			detailInfo: ''
		},
		receiveAddress: '',
		tel: '',
		demand: ''

	})
	// 陪审人
	const client = reactive({
		name: ''
	})
	// 资料
	const cfg = reactive({
		page_xy: '',
		page_fw: ''
	})
	// 是否同意协议
	const is_xieyi = ref(false)

	const main_load = (options) => {
		app.globalData.utils.request({
			url: '/Service/order',
			data: {
				svid: options.svid

			},
			success: (res) => {
				console.log(res);
				service.value = res.data.service
				hospitals.value = res.data.hospitals
				// 默认选中
				const hospitalsData = toRaw(hospitals.value)
				if (options.hid > 0) {
					// 自动选择
					for (let i = 0; i < hospitalsData.length; i++) {
						if (hospitalsData[i].id == options.hid) {
							hospital_index.value = i
							order.price = hospitalsData[i].service_price
							break;
						}
					}
				}
			}
		})
	}
	const handTip = () => {

	}
	// 改变医院数据
	const onHospitalChange = (e) => {
		const value = parseInt(e.detail.value)
		hospital_index.value = value
		order.price = toRaw(hospitals.value)[value].service_price
	}
	// 修改日期后的回调
	const onStartTimeChanged = (e) => {
		order.starttime = e.detail.value
	}
	// 选择就诊人
	const onClientChange = () => {
		uni.navigateTo({
			url: '../clients/index?act=select',
		})
	}
	// 协议
	const onXieyiChange = () => {
		is_xieyi.value = !is_xieyi.value
	}
	uni.$on('clientChange', (data) => {
		console.log(data, 'data');
		client.value = data.name
		client.id = data.id
		client.sex = data.sex
		client.age = data.age
		client.mobile = data.mobile
	})
	// 收件信息
	const onAddressChange = ()=> {
		uni.chooseAddress({
			success: res => {
				console.log(res,'res');
				// userName: '',
				// cityName: '',
				// countyName: '',
				// detailInfo: ''
				order.address.userName = res.userName
				order.address.cityName = res.cityName
				order.address.countyName = res.countyName
				order.address.detailInfo = res.detailInfo
			},
			fail: res=>{
				console.log(res,'res');
			}
		})
	}
	// let submitOrder 
	// 下单
	const submit = () => {
		console.log(popup.value);
		if(!is_xieyi.value) {
			return uni.showToast({
				title: '请先阅读并同意用户协议和服务协议',
				icon: 'none',
				duration: 1000
			})
		}
		const orderData = toRaw(order)
		const serviceData = toRaw(service.value)
		const hospitalsData = toRaw(hospitals.value) 
		const clientData = toRaw(client)
		// 服务
		orderData.service_code = serviceData.code
		orderData.service_id = serviceData.id
		orderData.service_name = serviceData.name
		orderData.service_stype = serviceData.stype
		// 医院校验
		if(serviceData.stype < 100) {
			if(hospital_index.value == 0) {
				return uni.showToast({
					title: '请选择医院',
					icon: 'none',
					duration: 1000
				})
			}
			orderData.hospital_id = hospitalsData[hospital_index.value].id
			orderData.hospital_name = hospitalsData[hospital_index.value].name
		}
		// 时间校验
		if(!orderData.starttime){
			return uni.showToast({
				title: '请选择时间',
				icon: 'none',
				duration: 1000
			})
		}
		// 服务类型为陪诊
		if(serviceData.stype == 10 || serviceData.stype == 15 || serviceData.stype == 20) {
			// 就诊人校验
			if(!clientData.id) {
				return uni.showToast({
					title: '请选择就诊人',
					icon: 'none',
					duration: 1000
				}) 
			}
			orderData.client ={}
			orderData.client.age = clientData.age
			orderData.client.mobile = clientData.mobile
			orderData.client.name = clientData.name
			orderData.client.sex = clientData.sex
			
			// 接送地址校验
			if (serviceData.stype == 15) {
				if(!order.receiveAddress) {
					return uni.showToast({
						title: '请填写就诊人所在地址',
						icon: 'none',
						duration: 1000
					}) 
				}
			}
		}
		// 类型代跑取药
		if (serviceData.stype == 30 || serviceData.stype == 40) {
			// 收件地址
			if(!orderData.address.userName) {
				return uni.showToast({
					title: '请填写收件信息',
					icon: 'none',
					duration: 1000
				}) 
			}
		}
		// 判断联系电话
		if (!orderData.tel) {
			return uni.showToast({
				title: '请填联系方式',
				icon: 'none',
				duration: 1000
			})
		}
		console.log(orderData,'orderData');
		// 判断用户是否存在
		if(!uni.getStorageSync('token')) {
			popup.value.open('center')
		}else{
			// 下单逻辑
			createOrder(orderData)
		}
	}
	// 验证取消和确认
	const cancal = () => {
		popup.value.close()
	}
	const ok = () => {
		if(!validMobile.phone || !validMobile.validCode){
			return uni.showToast({
				title: '电话或验证码不正确，请重新填写',
				icon: 'none',
				duration: 1000
			})
		}
		// 验证验证码
		app.globalData.utils.request({
			url: '/user/authentication',
			method: 'POST',
			data: {
				tel:validMobile.phone,
				code:validMobile.validCode
			},
			success: res => {
				// 缓存token
				uni.setStorageSync('token',res.data.token)
				// 下单的方法
				createOrder(orderData)
				
			},
			fail: res => {
				uni.showToast({
					title: 'res.msg',
					icon: 'none',
					duration: 1000
				})
			}
		})
		
	}
	const qrcodePopup = ref()
	
	// 获取验证码是否被点击
	let flag = false
	const countdownChange = () => {
		// 判断手机号是否存在
		if(!validMobile.phone) {
			return uni.showToast({
				title: '请填写手机号',
				icon: 'none',
				duration: 1000
			})
		}
		const time = setInterval(() => {
			if(countdown.time <= 0){
				countdown.validText = '获取验证码'
				countdown.time = 60
				flag = false
				clearInterval(time)
			}else{
				countdown.time -= 1
				countdown.validText = `剩余${countdown.time}s`
			}
		},1000)
		flag = true
		app.globalData.utils.request({
			url: '/get/code',
			method: 'POST',
			data: {
				tel:validMobile.phone,
				
			},
			success: res => {
				uni.showToast({
					title: '验证码发送成功，请输入验证码',
					icon: 'none',
					duration: 1000
				})
			},
			fail: res => {
				uni.showToast({
					title: '发送失败，请重新尝试',
					icon: 'none',
					duration: 1000
				})
			}
		})
	}
	const createOrder = (orderData) => {
		console.log(orderData);
		app.globalData.utils.request({
			url: '/pay/createOrder',
			method: 'POST',
			header: {
				token:uni.getStorageSync('token')
			},
			data: orderData,
			success: res => {
				qrcodePopup.value.open('center')
				// 获取uQRCode实例
			    var qr = new UQRCode();
			    // 设置二维码内容
			    qr.data = res.wx_code
			    // 设置二维码大小，必须与canvas设置的宽高一致
			    qr.size = 150;
			    // 调用制作二维码方法
			    qr.make();
			    // 获取canvas上下文
			    var canvasContext = uni.createCanvasContext('qrcode'); // 如果是组件，this必须传入
			    // 设置uQRCode实例的canvas上下文
			    qr.canvasContext = canvasContext;
			    // 调用绘制方法将二维码图案绘制到canvas上
			    qr.drawCanvas()  			
			},
			fail: res => {
				uni.showToast({
					// title: 'res.msg',
					// icon: 'none',
					// duration: 1000
				})
			}
		})
		
	}
	// 跳转订单列表
	const payment = () => {
		uni.switchTab({
			url: '/pages/order/index'
		})
	}
</script>

<style>
	@import './index.css'
</style>