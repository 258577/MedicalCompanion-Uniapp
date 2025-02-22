<template>
	<view>
		
		<view class="search-page">
			<navbar></navbar>
			<!-- 搜索框 -->
			<view class="search-box">
				<view class="search-input">
					<image src="../../static/resource/search.png" class="search-icon"></image>
					<input 
						type="text" 
						v-model="searchKey" 
						placeholder="搜索医院" 
						@input="onSearch"
						confirm-type="search"
					/>
					<image 
						v-if="searchKey" 
						src="../../static/resource/close.png" 
						class="clear-icon"
						@click="clearSearch"
					></image>
				</view>
			</view>
			
			<!-- 搜索结果列表 -->
			<view class="result-list" v-if="searchKey">
				<view 
					class="result-item" 
					v-for="(item, index) in filteredHospitals" 
					:key="index"
					@click="selectHospital(item)"
				>
					<text>{{ item.name }}</text>
				</view>
				<view class="no-result" v-if="filteredHospitals.length === 0">
					<text>未找到相关医院</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, computed } from 'vue'

// 搜索关键词
const searchKey = ref('')

// 医院列表数据
const hospitals = ref([
	{ id: 1, name: '武汉中心医院' },
	{ id: 2, name: '协和医院' },
	{ id: 3, name: '湘雅分院' },
	{ id: 4, name: '中医药大学' }
])

// 筛选后的医院列表
const filteredHospitals = computed(() => {
	if (!searchKey.value) return []
	return hospitals.value.filter(hospital => 
		hospital.name.toLowerCase().includes(searchKey.value.toLowerCase())
	)
})

// 搜索输入
const onSearch = () => {
	// 可以在这里添加防抖处理
	console.log('searching:', searchKey.value)
}

// 清空搜索
const clearSearch = () => {
	searchKey.value = ''
}

// 选择医院
const selectHospital = (hospital) => {
	console.log('selected hospital:', hospital)
	uni.navigateTo({
		url: `../hospital/index?hid=${hospital.id}`
	})
}
</script>

<style>
.search-page {
	padding: 20rpx;
	background-color: #f5f5f5;
	min-height: 100vh;
}

.search-box {
	margin-top: 68px;
	padding: 20rpx;
	background-color: #fff;
	border-radius: 10rpx;
}

.search-input {
	display: flex;
	align-items: center;
	background-color: #f5f5f5;
	padding: 15rpx 20rpx;
	border-radius: 30rpx;
}

.search-icon {
	width: 40rpx;
	height: 40rpx;
	margin-right: 10rpx;
}

.clear-icon {
	width: 40rpx;
	height: 40rpx;
}

input {
	flex: 1;
	font-size: 28rpx;
}

.result-list {
	margin-top: 20rpx;
	background-color: #fff;
	border-radius: 10rpx;
}

.result-item {
	padding: 30rpx 20rpx;
	border-bottom: 1rpx solid #eee;
}

.result-item:last-child {
	border-bottom: none;
}

.no-result {
	padding: 40rpx;
	text-align: center;
	color: #999;
	font-size: 28rpx;
}
</style>