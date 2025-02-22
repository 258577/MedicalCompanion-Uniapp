<template>
	<view>
		<view class="addPeople">
					<view class="addPeo" @click="openAddPeopleModal">
						+添加人员
					</view>
				</view>
				<view class="cell-box" v-for="(item, index) in clients" :key="index">
				    <view class="weui-cell" @click="onClientSelected" :data-index="index">
				        <view class="weui-cell__bd">
				            <view>
				                <text style="font-weight: bold">{{ item.name }}</text>
				            </view>
				            <view>
				                <text :class="'sext' + item.sex">{{ item.sex == 1 ? '男' : '女' }}</text>
				                <text style="margin-left: 10rpx">{{ item.age }}周岁</text>
				                <text style="margin-left: 10rpx">{{ item.mobile }}</text>
				            </view>
				        </view>
				        <view class="weui-cell__ft">
				            <text v-if="act == 'select'" style="
				                display: inline-block;
				                padding: 15rpx 30rpx;
				                border: 1rpx solid #0bb584;
				                color: #0bb584;
				                font-weight: bold;
				                border-radius: 10rpx;
				                font-size: 28rpx;
				                overflow: hidden;
				            ">
				                选择
				            </text>
				            <text v-else @click="removeClient(item.id)" :data-id="item.id" style="
				                display: inline-block;
				                padding: 15rpx 30rpx;
				                border: 1rpx solid #eeeeee;
				                color: #f13e6d;
				                border-radius: 10rpx;
				                font-size: 28rpx;
				                overflow: hidden;
				            ">
				                移除
				            </text>
				        </view>
				    </view>
				</view>

		<!-- 添加人员对话框 -->
				<uni-popup ref="addPeoplePopup" type="center">
					<view class="popup-content">
						<view class="popup-title">添加人员</view>
						<view class="form-item">
							<text class="label">姓名：</text>
							<input type="text" v-model="newClient.name" placeholder="请输入姓名" />
						</view>
						<view class="form-item">
							<text class="label">性别：</text>
							<radio-group @change="handleSexChange">
								<label><radio :checked="newClient.sex === 1" :value="1" />男</label>
								<label><radio :checked="newClient.sex === 2" :value="2" />女</label>
							</radio-group>
						</view>
						<view class="form-item">
							<text class="label">年龄：</text>
							<input type="number" v-model="newClient.age" placeholder="请输入年龄" />
						</view>
						<view class="form-item">
							<text class="label">电话：</text>
							<input type="text" v-model="newClient.mobile" placeholder="请输入电话" />
						</view>
						<view class="btn-group">
							<button class="btn cancel" @click="closeAddPeopleModal">取消</button>
							<button class="btn confirm" @click="addClient">确定</button>
						</view>
					</view>
				</uni-popup>
	</view>
</template>

<script setup>
import { ref, reactive, computed, toRaw } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	const app = getApp()
	const act = ref('')
	// 服务对象 
	const clients = ref([])
	onLoad((options) => {
		act.value = options.act
		if(options.act == 'select'){
			uni.setNavigationBarTitle({
				title: '请选择服务对象'
			})
		}else{
			uni.setNavigationBarTitle({
				title: '服务对象管理'
			})
		}
		// 获取服务对象
		app.globalData.utils.request({
			url: '/User/clients',
			success(res){
				console.log(res,'res');
				clients.value = res.data.clients 
			}
		})
	})
	// 选择服务人员
	const onClientSelected = (e) => {
		if(act == '')return
		const index = e.currentTarget.dataset.index
		const clientsData = clients.value[index]
		// 出发全局自定义
		uni.$emit('clientChange',toRaw(clientsData))
		uni.navigateBack()
	}
	// 管理服务人员
	const addPeoplePopup = ref(null)
	
	// 新人员信息
	const newClient = reactive({
	    name: '',
	    sex: 1,
	    age: '',
	    mobile: ''
	})
	
	// 处理性别选择
	const handleSexChange = (e) => {
	    newClient.sex = Number(e.detail.value)
	}
	 
	// 打开添加人员对话框
	const openAddPeopleModal = () => {
	    // 重置表单
	    Object.assign(newClient, {
	        name: '',
	        sex: 1,
	        age: '',
	        mobile: '' 
	    })
	    addPeoplePopup.value.open()
	}
	
	// 关闭添加人员对话框
	const closeAddPeopleModal = () => {
	    addPeoplePopup.value.close()
	}
	
	// 添加人员
	const addClient = () => {
	    if (!newClient.name || !newClient.age || !newClient.mobile) {
	        uni.showToast({
	            title: '请填写完整信息',
	            icon: 'none'
	        })
	        return
	    }
	
	    // 添加新人员
	    const newPerson = {
	        id: Date.now(),
	        name: newClient.name,
	        sex: newClient.sex,
	        age: newClient.age,
	        mobile: newClient.mobile
	    }
	
	    clients.value.push(newPerson)
	    closeAddPeopleModal()
	    
	    uni.showToast({
	        title: '添加成功',
	        icon: 'success'
	    })
	}
	
	// 移除人员
	const removeClient = (id) => {
	    uni.showModal({
	        title: '提示',
	        content: '确定要移除该人员吗？',
	        success: (res) => {
	            if (res.confirm) {
	                const index = clients.value.findIndex(client => client.id === id)
	                if (index !== -1) {
	                    clients.value.splice(index, 1)
	                    uni.showToast({
	                        title: '移除成功',
	                        icon: 'success'
	                    })
	                }
	            }
	        }
	    })
	}
</script>

<style>
@import './index.css'
</style>