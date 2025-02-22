<template>
	<view class="nav">
		<!-- 状态栏  需要计算-->
		<view :style="'height:' + status + 'rpx;' + bgStyle"></view>
		<!-- 内容 -->
		<view v-if = "isHome" class="heardNav" :style="'height:' + navHeight + 'rpx;line-height:' + navHeight + 'rpx;padding-left:20rpx;'">
			<view class="city"><img src="../../static/resource/earth.png" alt="" class="area-icon">&nbsp;中部地区></view>
			<view style="flex: 1">
				<navigator 
					url="../../pages/search/index" 
					:style="'height:' + menu.height*2 + 'rpx;line-height:' + menu.height*2 + 'rpx;margin-top:' + (menu.top*2 - status) + 'rpx;margin-left:32rpx;margin-right:' + (menu.width*2 + 24) + 'rpx;background:#f4f4f4;border-radius:200rpx;text-align:center'">					
					<text class="search-text">🔍找医院</text>
				</navigator>
			</view>
			
		</view>
		<view v-else class="navbar" :style="'height:' + navHeight + 'rpx;' + bgStyle">
			<view class="back-icon" @click="backHome">
				<image v-if="pages > 1" src="../../static/resource/back.png"></image>
				<image v-else src="../../static/resource/home.png"></image>
			</view>
			<view class="nav-title" v-if = "props.titleText">
				<view :style="'height:' + navHeight + 'rpx;line-height:' + navHeight + 'rpx;' + setStyle">{{props.titleText}}</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref, reactive, onBeforeMount } from 'vue'
	const props = defineProps({
		titleText:String,
		background:{
			type:String,
			default:'rgba(255,255,255,1)'
		},
		color:{
			type:String,
			default:'rgba(0,0,0,1)'
		},
		textSize:{
			type:String,
			default:32
		},
		iconWidth:{
			type:String,
			default:116
		},
		iconHeight:{
			type:String,
			default:38
		},
		isHome:{
			type:Boolean,
			default: false
		},
	})
	// 
	const emits = defineEmits(['navBarAttached'])
	// 状态栏在页面出来前就出现 生命周期onBeforeMount
	onBeforeMount( () => {
		setNavSize()
		setStyle()
		emits('navBarAttached',{
			detail:{
				statusHeight: status.value,
				navHeight: navHeight.value,
				navBarHeight: status.value + navHeight.value
			}
		})
	})
	
	
	// 胶囊
	const menu = reactive(uni.getMenuButtonBoundingClientRect())
	// 状态栏高度
	const status = ref(0)
	// 内容高度
	const navHeight = ref(0)
	// 背景
	const bgStyle = ref('')
	// 字体
	const textStyle = ref('')
	// 图标
	const iconStyle = ref('')
	// 页面栈的数量
	const pages = ref(getCurrentPages().length)
	const setNavSize = ()=> {
		const { system, statusBarHeight } = uni.getSystemInfoSync()
		// 乘2 rps单位  px单位不用乘2（具体看uniapp的css预处理器)
		status.value = statusBarHeight * 2
		const isiOS = system.indexOf('iOS') > -1
		if(!isiOS){
			navHeight.value = 96
		}else{
			// 有刘海?
			navHeight.value = 88
		}
	}
	// 设置样式
	const setStyle = () => {
		bgStyle.value = ['background:' + props.background].join(';')
		textStyle.value = ['color:' + props.color,'font-size:' + props.textSize].join(';')
		iconStyle.value = ['width:' + props.iconWidth + 'rpx','height:' + props.iconHeight + 'rpx'].join(';')
	}
	const backHome = () => {
		if(pages.value > 1){
			uni.navigateBack()
		}else{
			uni.switchTab({
				url:'/pages/index/index'
			})
		}
		}
	
</script>

<style>
	.nav {
		position:fixed;
		width:100%;
		top:0;
		left:0;
		z-index:2;
	}
	.back-icon {
		display: flex;
		align-items: center;
		width: 64rpx;
		height: 100%;
		margin-left: 10px;
	}
	.back-icon image {
		width: 70rpx;
		height: 70rpx;
	}
	.navbar {
		position: relative;
	}
	.nav-title {
		position: absolute;
		top:0;
		left:50%;
		transform: translate(-50%);
	}
	.heardNav{
		display: flex;
	}
	.area-icon {
		align-items: center;
		/* top:60rpx; */
		width: 44rpx;
		height: 44rpx;
		margin-left: 10rpx;
		
	}
	.search-text{
		color:#b3b3b3;
	}
	.search-icon{
		align-items: center;
		/* top:60rpx; */
		width: 44rpx;
		height: 44rpx;
		margin-left: 21rpx;
	}
</style>