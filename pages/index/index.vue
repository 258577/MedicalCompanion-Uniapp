<template>
	<view class="content">
		<navbar :isHome="true"/>
		<view class="neirong" >
			<view class="gong-gao" style="background: #faffd3;" v-if="haveTips">
				<view class="gonggao-icon">
					<image src="../../static/resource/gonggao.png" mode="" style="display:block;width: 40rpx;height: 40rpx;margin-right: 14rpx;"></image>
				</view>
				<view class="gonggao-text">
					<text style="color: #be9719;font-size: 26rpx;">点击右上角“添加到我的小程序"，方便下次找到！</text>
				</view>
				<view class="gonggao-delete" @click="closeTip">
					<image src="../../static/resource/close.png" mode="" style="display:block;width: 40rpx;height: 40rpx;margin-right: 14rpx;"></image>
				</view>
			</view>
		</view>
		<view v-if = "slides && slides.length > 0" class="lunbotu">
			<swiper autoplay circular :interval="4000" :duration="500">
				<block v-for="(item,index) in slides" :key="index">
					<swiper-item>
						<image :src="item.pic_image_url" mode="widthFix" show-menu-by-longpress :data-index="index"></image>
					</swiper-item>
				</block>
			</swiper>
		</view>
		<view v-if="nav2s && nav2s.length > 0" class="nav2-list">
			<block v-for="(item,index) in nav2s" :key="index">
				<view class="nav2-item" :data-index="index" @click="onNav2Tap">
					<view class="nav2-pic">
						<image :src="item.pic_image_url" mode="widthFix"></image>
					</view>
				</view>
			</block>
		</view>
		<view v-if="navs && navs.length > 0" class="navs-list">
			<block v-for="(item,index) in navs" :key="index">
					<view class="navs-item" @click="onNavTap" :data-index="index">
						<view class="navs-pic"><image :src="item.pic_image_url"></image></view>
						<view class="navs-text" :style="'color:' + (item.tcolor ? item.tcolor : '')">{{ item.title }}</view>
					</view>
			</block>
		</view>
		<view class="hospital-list">
			<view class="hospi-list" v-for="(item,index) in hospitals" :key="item.id" :data-hid="item.id" @click="onHospi">
				<view class="hosp-list">
					<image mode="aspectFill" :src="item.avatar_url" class="hos-img"></image>
				</view>
				<view class="hosp-text">
					<view class="Big-tx">
						<text class="tex1">{{item.name}}</text>
					</view>
					<view class="Mid-tx">
						<text class="tex2">{{item.rank}}&nbsp;&nbsp;</text>
						<text class="tex2">{{item.label}}</text>
					</view>
					<view class="Small-tx">
						<text class="tex3">{{item.intro}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref, reactive, computed, toRaw } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	const NavTo = () => {
		uni.navigateTo({
			url:'/pages/search/index'
		})
	}
	const app = getApp()
	// 定义轮播图数据
	const slides = ref([])
	// 快捷入口2
	const nav2s = ref([])
	// 2
	const navs = ref([])
	// 医院列表
	const hospitals = ref([])
	onLoad(() => {
		app.globalData.utils.getUserInfo()
		app.globalData.utils.request({
			url: '/app/init',
			success: res => {
				console.log(res);
				const { id } = res.data.area
				app.globalData.utils.request({
					url: '/Index/index',
					data: {
						aid: id
					},
					success: ({data}) => {
						console.log(data);
						slides.value = data.slides
						nav2s.value = data.nav2s
						navs.value = data.navs
						hospitals.value = data.hospitals
					}
				})
			}
		})
		
	})
	const onNav2Tap = (e) => {
		const nav = toRaw(nav2s.value[e.currentTarget.dataset.index])
		jump(nav,'nav2')
	}
	const onNavTap = (e) => {
		const nav = toRaw(navs.value[e.currentTarget.dataset.index])
		jump(nav,'navs')
	}
	
	
	const jump = (nav) => {
		
		if(nav.stype == 1) {
			uni.navigateTo({
				url:nav.stype_link
			})
		}
	}
	const onHospi = (e) => {
		uni.navigateTo({
			url:'../hospital/index?hid=' + e.currentTarget.dataset.hid
		})
	}
	const haveTips = ref(true)
	const closeTip = ()=>{
		haveTips.value = false
	}
</script>

<style>
	
	.neirong{
		position: relative;
		margin-top: 180rpx;
	}
	.gong-gao{
		width: 97%;
		height: 70rpx;
		border-radius:200rpx;
		display: flex;
		margin-left: 15rpx;
		align-items: center;
	}
	.gonggao-delete{
		transform: translate(50%);
	}
	.lunbotu {
		padding: 20rpx 20rpx 0 20rpx;
		overflow: hidden;
	}
	.lunbotu swiper {
		height: 320rpx;
		overflow: hidden;
		border-radius: 10rpx;
	}
	.lunbotu swiper image {
		width: 100%;
		height: 100%;
	}
	.nav2-list {
		padding: 10rpx 20rpx 0 20rpx;
	}
	.nav2-list::after{
		content:'';
		display:block;
		height: 0;
		line-height: 0;
		clear: both;
		visibility: hidden;
	}
	.nav2-item {
		float: left;
		margin-top: 20rpx;
		width: 50%;
		text-align: center;
		box-sizing: border-box;
		padding: 0 5rpx;
	}
	.nav2-pic {
		width: 100%;
	}
	.nav2-pic image {
		display: block;
		width: 100%;
	}
	.navs-list ::after {
		content:'';
		display:block;
		height: 0;
		line-height: 0;
		clear: both;
		visibility: hidden;
	}
	.navs-item {
		float: left;
		margin-top: 20rpx;
		width: 20%;
		text-align: center;
		padding: 10rpx 0;
	}
	.navs-pic image {
		display: block;
		margin: 0 auto;
		width: 110rpx;
		height: 110rpx;
	}
	
	.hospital-list {
		padding: 20rpx 20rpx 0 20rpx;
		overflow: hidden;
	}
	.hospi-list {
		background-color: #fbfaf5;
		width: 97%;
		height: 230rpx;
		margin-top: 20rpx;
		border-radius: 50rpx;
		border: 2px solid #dcdcdc;
		display: flex;
		overflow: hidden;
	}
	.hosp-list{
		margin-left: 0%;
		display: flex;
		width: 50%;
	}
	.hos-img {
		height: 230rpx;
		/* display: flex; */
		/* display: block; */
	}
	.hosp-text {
		display: block;
		padding-left: 10rpx;
	}
	.tex1 {
		color: #1d1b1b;
		font-size: 35rpx;
		font-weight: bold;
	}
	.Mid-tx {
		margin-top: 4rpx;
	}
	.tex2 {
		font-size: 30rpx;
		color:#2eada7;
		font-weight: bold;
	}
	.tex3 {
		font-size: 25rpx;
		color: #929292;;
	}
	
</style>
