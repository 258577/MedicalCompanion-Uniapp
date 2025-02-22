// service页面
```html
<view>
    <view class="od-banner">
        <image class="od-banner-icon" src="/static/resource/images/od_bg_icon.png" mode="widthFix" />
        <view class="od-jd od-jd-0">
            <view class="od-jd-out">
                <view class="od-jd-in"></view>
            </view>
            <view class="vp-flex od-jd-text">
                <view class="vp-flex_1">
                    <text class="od-jd-st-0">填写订单</text>
                </view>
                <view class="vp-flex_1">
                    <text class="od-jd-st-10">在线支付</text>
                </view>
                <view class="vp-flex_1">
                    <text class="od-jd-st-20">专人服务</text>
                </view>
                <view class="vp-flex_1">
                    <text class="od-jd-st-30">服务完成</text>
                </view>
            </view>
        </view>
    </view>
    <view class="pub-box">
        <view class="pub-box-bd">
            <view class="weui-cell weui-cell_input">
                <view class="weui-cell__hd">
                    <image class="serv-icon"
                        :src="service.icon_image ? service.icon_image_url : '../../static/resource/images/avatar.jpg'">
                    </image>
                </view>
                <view class="weui-cell__bd">
                    <text class="serv-name">{{ service.name }}</text>
                </view>
                <view class="weui-cell__ft">
                    <view class="f5 ic_info" @click="handleTap">服务内容</view>
                </view>
            </view>
        </view>
    </view>
    <block v-if="service.stype == 10 || service.stype == 15 || service.stype == 20">
        <view class="pub-box">
            <view class="pub-box-bd">
                <view class="weui-cell weui-cell_input">
                    <view class="weui-cell__hd">
                        <view class="weui-label">就诊医院</view>
                    </view>
                    <view class="weui-cell__bd"></view>
                    <view class="weui-cell__ft weui-cell__ft_in-access">
                        <view>
                            <picker @change="onHospitalChange" :value="hospital_index" :range="hospitals"
                                range-key="name">
                                <input type="text" :disabled="true" placeholder="请选择要就诊的医院"
                                    :value="hospitals[hospital_index].name" placeholder-class="vp-placeholder" />
                            </picker>
                        </view>
                    </view>
                </view>
                <view class="weui-cell weui-cell_input">
                    <view class="weui-cell__hd">
                        <view class="weui-label">就诊时间</view>
                    </view>
                    <view class="weui-cell__bd"></view>
                    <view class="weui-cell__ft weui-cell__ft_in-access">
                        <view>
                            <dtPicker @dtPickerChanged="onStartTimeChanged" :timestamp="order.starttime"
                                placeholder="请选择就诊时间"></dtPicker>
                        </view>
                    </view>
                </view>
                <view class="weui-cell weui-cell_input" @click="onClientChange">
                    <view class="weui-cell__hd">
                        <view class="weui-label">就诊人</view>
                    </view>
                    <view class="weui-cell__bd"></view>
                    <view class="weui-cell__ft weui-cell__ft_in-access">
                        <view>
                            <input class="weui-input" placeholder-class="vp-placeholder" placeholder="请选择就诊人"
                                style="text-align: right;" :disabled="true" :value="client.name" type="text">
                        </view>
                    </view>
                </view>
                <block v-if="service.stype == 15">
                    <!-- 接送陪诊 -->
                    <view class="weui-cell weui-cell_input">
                        <view class="weui-cell__hd">接送地址</view>
                        <view class="weui-cell__bd">
                            <input class="weui-input" name="receiveAddress" style="text-align: right"
                                placeholder-class="vp-placeholder" placeholder="请填写就诊人所在地址" v-model="order.receiveAddress" />
                        </view>
                    </view>
                </block>

                <view class="weui-cell weui-cell_input">
                    <view class="weui-cell__hd">联系电话</view>
                    <view class="weui-cell__bd">
                        <input class="weui-input" type="number" name="tel" style="text-align: right"
                            placeholder-class="vp-placeholder" placeholder="请填写您的联系电话" v-model="order.tel" />
                    </view>
                </view>
            </view>
        </view>
        <view class="pub-box">
            <view class="pub-box-tt">服务需求</view>
            <view class="pub-box-bd">
                <view class="weui-cell weui-cell_input">
                    <view class="weui-cell__bd">
                        <textarea name="demand" auto-height placeholder="请简单描述您要就诊的科室.."
                            placeholder-class="vp-placeholder" style="min-height: 150rpx" v-model="order.demand" />
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
                    <view class="weui-cell__hd">
                        <view class="weui-label">所在医院</view>
                    </view>
                    <view class="weui-cell__bd"></view>
                    <view class="weui-cell__ft weui-cell__ft_in-access">
                        <view>
                            <picker @change="onHospitalChange" :value="hospital_index" :range="hospitals"
                                range-key="name">
                                <input type="text" :disabled="true" placeholder="请选择就诊所在医院"
                                    :value="hospitals[hospital_index].name" placeholder-class="vp-placeholder" />
                            </picker>
                        </view>
                    </view>
                </view>

                <view class="weui-cell weui-cell_input">
                    <view class="weui-cell__hd">
                        <view class="weui-label">服务时间</view>
                    </view>
                    <view class="weui-cell__bd"></view>
                    <view class="weui-cell__ft weui-cell__ft_in-access">
                        <view>
                            <dtPicker @dtPickerChanged="onStartTimeChanged" :timestamp="order.starttime"
                                placeholder="请选择期望服务时间"></dtPicker>
                        </view>
                    </view>
                </view>

                <view class="weui-cell weui-cell_input" @click="onAddressChange">
                    <view class="weui-cell__hd">
                        <view class="weui-label">收件信息</view>
                    </view>
                    <view class="weui-cell__bd"></view>
                    <view class="weui-cell__ft weui-cell__ft_in-access">
                        <input class="weui-input" :disabled="true" style="text-align: right"
                            placeholder-class="vp-placeholder" placeholder="请选择收件信息" :value="
                                                            order.address.userName
                                                                ? order.address.userName + '(' + order.address.cityName + order.address.countyName + order.address.detailInfo + ')'
                                                                : ''
                                                        " />
                        <!-- {{order.address?(order.address.userName+'('+order.address.telNumber+')'):''}} -->
                    </view>
                </view>
                <view class="weui-cell weui-cell_input">
                    <view class="weui-cell__hd">联系电话</view>
                    <view class="weui-cell__bd">
                        <input class="weui-input" type="number" name="tel" style="text-align: right"
                            placeholder-class="vp-placeholder" placeholder="请填写您的联系电话" v-model="order.tel" />
                    </view>
                </view>
            </view>
        </view>

        <view class="pub-box">
            <view class="pub-box-tt">服务需求</view>
            <view class="pub-box-bd">
                <view class="weui-cell weui-cell_input">
                    <view class="weui-cell__bd">
                        <textarea name="demand" auto-height placeholder="如有其他服务要求请在此填写.."
                            placeholder-class="vp-placeholder" style="min-height: 150rpx" v-model="order.demand" />
                    </view>
                </view>
            </view>
        </view>
    </block>
    <block v-if="service.stype == 110">
        <!-- 上门服务 -->
        <view class="pub-box">
            <view class="pub-box-bd">
                <view class="weui-cell weui-cell_input">
                    <view class="weui-cell__hd">
                        <view class="weui-label">服务时间</view>
                    </view>
                    <view class="weui-cell__bd"></view>
                    <view class="weui-cell__ft weui-cell__ft_in-access">
                        <view>
                            <dtPicker @dtPickerChanged="onStartTimeChanged" :timestamp="order.starttime"
                                placeholder="请选择期望服务时间"></dtPicker>
                        </view>
                    </view>
                </view>

                <view class="weui-cell weui-cell_input" @click="onClientChange">
                    <view class="weui-cell__hd">服务对象</view>
                    <view class="weui-cell__bd"></view>
                    <view class="weui-cell__ft weui-cell__ft_in-access">
                        <input class="weui-input" :disabled="true" style="text-align: right"
                            placeholder-class="vp-placeholder" placeholder="请选择服务对象" :value="client.name" />
                    </view>
                </view>
                <view class="weui-cell weui-cell_input">
                    <view class="weui-cell__hd">服务地址</view>
                    <view class="weui-cell__bd">
                        <input class="weui-input" name="receiveAddress" style="text-align: right"
                            placeholder-class="vp-placeholder" placeholder="请填写服务所在地址" v-model="order.receiveAddress" />
                    </view>
                </view>
                <view class="weui-cell weui-cell_input">
                    <view class="weui-cell__hd">联系电话</view>
                    <view class="weui-cell__bd">
                        <input class="weui-input" type="number" name="tel" style="text-align: right"
                            placeholder-class="vp-placeholder" placeholder="请填写您的联系电话" v-model="order.tel" />
                    </view>
                </view>
            </view>
        </view>

        <view class="pub-box">
            <view class="pub-box-tt">服务需求</view>
            <view class="pub-box-bd">
                <view class="weui-cell weui-cell_input">
                    <view class="weui-cell__bd">
                        <textarea name="demand" auto-height placeholder="请简单描述您要就诊的科室.."
                            placeholder-class="vp-placeholder" style="min-height: 150rpx" v-model="order.demand" />
                    </view>
                </view>
            </view>
        </view>
    </block>
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
</view>
```

clients页面
```html
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
            <text v-else @click="removeClient" :data-id="item.id" style="
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
```
order-index页面
```html
<view>
    <view style="width: 100%; border-bottom: 0 none; position: fixed; z-index: 2">
        <view style="background: #ffffff; position: relative">
            <view class="h-tab vp-flex">
                <view :class="'h-tab-item vp-flex_1 ' + (filt == '' ? 'on' : '')" data-filt=""
                    @tap="onFilterChange">全部</view>
                <view :class="'h-tab-item vp-flex_1 ' + (filt == 1 ? 'on' : '')" data-filt="1"
                    @tap="onFilterChange">待支付</view>
                <view :class="'h-tab-item vp-flex_1 ' + (filt == 2 ? 'on' : '')" data-filt="2"
                    @tap="onFilterChange">待服务</view>
                <view :class="'h-tab-item vp-flex_1 ' + (filt == 3 ? 'on' : '')" data-filt="3"
                    @tap="onFilterChange">已完成</view>
                <view :class="'h-tab-item vp-flex_1 ' + (filt == 4 ? 'on' : '')" data-filt="4"
                    @tap="onFilterChange">已取消</view>
            </view>
        </view>
    </view>
    <view style="height: 100rpx"></view>
    <block v-if="list != null">
        <view v-if="list != null && list.length == 0" style="padding: 40rpx 40rpx 40rpx 40rpx; text-align: center">
            <image src="/static/resource/images/empty.png" mode="widthFix" style="width: 200rpx" />
            <view class="f5">没有相关内容~</view>
        </view>
        <view v-else class="od-list">
            <block v-for="(item, index) in list" :key="index">
                <view class="od-item" @tap="toOrder" :data-id="item.out_trade_no">
                    <view class="weui-cell weui-cell_access">
                        <view class="weui-cell__hd">
                            <view>
                                <image :src="item.service_logo_image_url" mode="widthFix" class="od-logo"
                                    style="width: 100rpx; height: 100rpx; margin-right: 20rpx" />
                            </view>
                        </view>
                        <view class="weui-cell__bd">
                            <view>
                                <text style="font-weight: bold">{{ item.service_name }}</text>
                            </view>
                            <view class="od-info">
                                <block v-if="item.service_stype <= 20">
                                    <view>
                                        <text>{{ item.hospital_name }}（{{ item.area_name }}）</text>
                                    </view>
                                    <view>
                                        预约时间：
                                        <formater :timestamp="item.starttime" format="MM-dd hh:mm"></formater>
                                    </view>
                                    <view>
                                        就诊人员：
                                        <text>{{ item.client_name }}</text>
                                    </view>
                                </block>
                                <block v-if="item.service_stype > 20 && item.service_stype < 100">
                                    <view>
                                        <text>{{ item.hospital_name }}（{{ item.area_name }}）</text>
                                    </view>
                                    <view>
                                        处理时间：
                                        <formater :timestamp="item.starttime" format="MM-dd hh:mm"></formater>
                                    </view>
                                </block>
                                <block v-if="item.service_stype > 100">
                                    <view>
                                        服务时间：
                                        <formater :timestamp="item.starttime" format="MM-dd hh:mm"></formater>
                                    </view>
                                    <view>
                                        服务对象：
                                        <text>{{ item.client_name }}</text>
                                    </view>
                                    <!-- <view>服务地址：<text>{{item.address.address}}</text> </view> -->
                                </block>
                            </view>
                        </view>
                        <view class="weui-cell__ft">
                            <!-- 待付款 -->
                            <block v-if="item.trade_state == '待支付'">
                                <view style="color: #ffa200"><text>待支付</text></view>
                                <view style="color: #ffa200">
                                    <counter style="font-size: 24rpx" :second="item._exp_time"
                                        @counterOver="onCounterOver" />
                                </view>
                            </block>
                            <!-- 进行中 -->
                            <block v-if="item.trade_state == '待服务'">
                                <view style="color: #1da6fd"><text>待服务</text></view>
                            </block>
                            <!-- 已完成 -->
                            <block v-if="item.trade_state == '已完成'">
                                <view style="color: #21c521"><text>已完成</text></view>
                            </block>
                            <!-- 已取消 -->
                            <block v-if="item.trade_state == '已取消'">
                                <view style="color: #999999"><text>已取消</text></view>
                            </block>
                        </view>
                    </view>
                </view>
            </block>
        </view>
    </block>
</view>
```

order-order页面
```html
<template>
	<view>
		<view class="od-banner">
			<image class="od-banner-icon" src="/static/resource/images/od_bg_icon.png" mode="widthFix" />
			<view :class="'od-jd od-jd-' + orderStatus">
				<view class="od-jd-out">
					<view class="od-jd-in"></view>
				</view>
				<view class="vp-flex od-jd-text">
					<view class="vp-flex_1">
						<text class="od-jd-st-0">填写订单</text>
					</view>
					<view class="vp-flex_1">
						<text class="od-jd-st-10">在线支付</text>
					</view>
					<view class="vp-flex_1">
						<text class="od-jd-st-20">专人服务</text>
					</view>
					<view class="vp-flex_1">
						<text class="od-jd-st-30">服务完成</text>
					</view>
				</view>
			</view>
		</view>
		<view class="order-status">
			<!-- 待付款 -->
			<block v-if="orderStatus == 10">
				<view><text class="od-st">订单待支付</text></view>
				<view class="od-stt">
					请在
					<counter style="font-size: 24rpx" :second="order._exp_time" @counterOver="onCounterOver" />
					内完成支付，超时订单自动取消
				</view>
				<view class="od-op">
					<button class="btnp" @click="dopay">立即支付（{{order.price}}元）</button>
				</view>
			</block>
			<!-- 进行中 -->
			<block v-if="orderStatus == 20">
				<block v-if="order.service_state == 0">
					<view><text class="od-st">正在为您安排服务专员...</text></view>
					<view class="od-stt">请保持手机畅通，稍后将有服务专员与您联系</view>
				</block>
				<block v-if="order.service_state == 1">
					<view><text class="od-st">服务进行中</text></view>
					<view class="od-stt">已安排服务专员，将于预约时间进行服务</view>
				</block>
			</block>
			<!-- 已完成 -->
			<block v-if="orderStatus == 30">
				<view><text class="od-st">服务已完成</text></view>
				<view class="od-stt">感谢您的使用，如有售后问题请联系客服</view>
			</block>
			<!-- 已取消 -->
			<block v-if="orderStatus == 40">
				<view><text class="od-st">订单已取消</text></view>
				<view class="od-stt">期待下次为您服务，如需帮助可咨询客服</view>
			</block>
		</view>
		<block v-if="orderStatus == 20">
			<view class="od-box">
				<view class="weui-cells">
					<view class="weui-cell">
						<view class="weui-cell__hd">
							<view class="weui-label od-box-tt">本次服务专员</view>
						</view>
						<view class="weui-cell__bd"></view>
					</view>
					<view class="weui-cell od-staff">
						<view class="weui-cell__hd">
							<view>
								<image :src="order._staff.avatar_url" mode="aspectFill" class="od-staff-avatar" />
							</view>
						</view>
						<view class="weui-cell__bd">
							<view>{{ order._staff.nickname }}</view>
						</view>
						<view class="weui-cell__ft">
							<view>
								<button class="btn1m" @tap="makePhoneCall" :data-tel="order._staff.mobile">电话联系</button>
							</view>
						</view>
					</view>
				</view>
			</view>
		</block>
		<view class="od-box">
			<view class="weui-cells">
				<view class="weui-cell">
					<view class="weui-cell__hd">
						<view class="weui-label od-box-tt">预约信息</view>
					</view>
					<view class="weui-cell__bd"></view>
				</view>
				<view class="weui-cell">
					<view class="weui-cell__hd">
						<view class="weui-label">预约服务</view>
					</view>
					<view class="weui-cell__bd"></view>
					<view class="weui-cell__ft">
						<view>
							{{ order.service_name }}
						</view>
					</view>
				</view>
				<block v-if="order.service_stype <= 20">
					<view class="weui-cell">
						<view class="weui-cell__hd">
							<view class="weui-label">就诊医院</view>
						</view>
						<view class="weui-cell__bd"></view>
						<view class="weui-cell__ft">
							<view>
								{{ order.hospital_name }}
							</view>
						</view>
					</view>
					<view class="weui-cell">
						<view class="weui-cell__hd">
							<view class="weui-label">期望就诊时间</view>
						</view>
						<view class="weui-cell__bd"></view>
						<view class="weui-cell__ft">
							<view>
								<formater :timestamp="order.starttime" format="YYYY-MM-dd hh:mm"></formater>
							</view>
						</view>
					</view>
					<view class="weui-cell">
						<view class="weui-cell__hd">
							<view class="weui-label">就诊人</view>
						</view>
						<view class="weui-cell__bd"></view>
						<view class="weui-cell__ft">
							<view>{{ order.client_name }} {{ order.client_sex == 1 ? '男' : '女' }} {{ order.client_age }}周岁</view>
						</view>
					</view>
					<view class="weui-cell">
						<view class="weui-cell__hd">
							<view class="weui-label">就诊人电话</view>
						</view>
						<view class="weui-cell__bd"></view>
						<view class="weui-cell__ft">
							<view>
								{{ order.tel }}
							</view>
						</view>
					</view>
					<block v-if="order.service_stype == 15">
						<view class="weui-cell">
							<view class="weui-cell__hd">
								<view class="weui-label">接送地址</view>
							</view>
							<view class="weui-cell__bd"></view>
							<view class="weui-cell__ft">
								<view>
									{{ order.receiveAddress }}
								</view>
							</view>
						</view>
					</block>
				</block>
				<block v-if="order.service_stype > 20 && order.service_stype < 100">
					<view class="weui-cell">
						<view class="weui-cell__hd">
							<view class="weui-label">所在医院</view>
						</view>
						<view class="weui-cell__bd"></view>
						<view class="weui-cell__ft">
							<view>
								{{ order.hospital_name }}
							</view>
						</view>
					</view>
					<view class="weui-cell">
						<view class="weui-cell__hd">
							<view class="weui-label">期望处理时间</view>
						</view>
						<view class="weui-cell__bd"></view>
						<view class="weui-cell__ft">
							<view>
								<formater :timestamp="order.starttime" format="YYYY-MM-dd hh:mm"></formater>
							</view>
						</view>
					</view>
					<view class="weui-cell">
						<view class="weui-cell__hd">
							<view class="weui-label">收件人</view>
						</view>
						<view class="weui-cell__bd"></view>
						<view class="weui-cell__ft">
							<view>{{ order.address.userName }} {{ order.address.telNumber }}</view>
						</view>
					</view>
					<view class="weui-cell">
						<view class="weui-cell__hd">
							<view class="weui-label">收件地址</view>
						</view>
						<view class="weui-cell__bd"></view>
						<view class="weui-cell__ft">
							<view>{{ order.address.cityName }}{{ order.address.countyName }}{{ order.address.detailInfo }}</view>
						</view>
					</view>
				</block>
				<block v-if="order.service_stype > 100">
					<view class="weui-cell">
						<view class="weui-cell__hd">
							<view class="weui-label">期望服务时间</view>
						</view>
						<view class="weui-cell__bd"></view>
						<view class="weui-cell__ft">
							<view>
								<formater :timestamp="order.starttime" format="YYYY-MM-dd hh:mm"></formater>
							</view>
						</view>
					</view>
					<view class="weui-cell">
						<view class="weui-cell__hd">
							<view class="weui-label">服务对象</view>
						</view>
						<view class="weui-cell__bd"></view>
						<view class="weui-cell__ft">
							<view>{{ order.client_name }} {{ order.client_sex == 1 ? '男' : '女' }} {{ order.client_age }}周岁</view>
						</view>
					</view>
					<view class="weui-cell">
						<view class="weui-cell__hd">
							<view class="weui-label">服务对象电话</view>
						</view>
						<view class="weui-cell__bd"></view>
						<view class="weui-cell__ft">
							<view>
								{{ order.client_mobile }}
							</view>
						</view>
					</view>
		
					<view class="weui-cell">
						<view class="weui-cell__hd">
							<view class="weui-label">服务地址</view>
						</view>
						<view class="weui-cell__bd"></view>
						<view class="weui-cell__ft">
							<view>
								{{ order.address.address }}
							</view>
						</view>
					</view>
				</block>
				<view class="weui-cell">
					<view class="weui-cell__hd">
						<view class="weui-label">其他需求</view>
					</view>
					<view class="weui-cell__bd"></view>
					<view class="weui-cell__ft">
						<view>
							{{ order.demand }}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="od-box">
			<view class="weui-cells">
				<view class="weui-cell">
					<view class="weui-cell__hd">
						<view class="weui-label od-box-tt">订单信息</view>
					</view>
					<view class="weui-cell__bd"></view>
				</view>
				<view class="weui-cell">
					<view class="weui-cell__hd">
						<view class="weui-label">联系电话</view>
					</view>
					<view class="weui-cell__bd"></view>
					<view class="weui-cell__ft">
						<view>
							{{ order.tel }}
						</view>
					</view>
				</view>

				<view class="weui-cell">
					<view class="weui-cell__hd">
						<view class="weui-label">下单时间</view>
					</view>
					<view class="weui-cell__bd"></view>
					<view class="weui-cell__ft">
						<view>
							<formater :timestamp="order.order_start_time" format="YYYY-MM-dd hh:mm"></formater>
						</view>
					</view>
				</view>
				<view class="weui-cell">
					<view class="weui-cell__hd">
						<view class="weui-label">应付金额</view>
					</view>
					<view class="weui-cell__bd"></view>
					<view class="weui-cell__ft">
						<view>{{ order.price }}元</view>
					</view>
				</view>

				<block v-if="orderStatus == 20">
					<view class="weui-cell">
						<view class="weui-cell__hd">
							<view class="weui-label">实付金额</view>
						</view>
						<view class="weui-cell__bd"></view>
						<view class="weui-cell__ft">
							<view>{{ order.price }}元</view>
						</view>
					</view>
					<view class="weui-cell">
						<view class="weui-cell__hd">
							<view class="weui-label">付款时间</view>
						</view>
						<view class="weui-cell__bd"></view>
						<view class="weui-cell__ft">
							<view>
								<formater :timestamp="order.pay_time" format="YYYY-MM-dd hh:mm"></formater>
							</view>
						</view>
					</view>
				</block>
				<view class="weui-cell">
					<view class="weui-cell__hd">
						<view class="weui-label">订单编号</view>
					</view>
					<view class="weui-cell__bd"></view>
					<view class="weui-cell__ft">
						<view class="color_click">
							{{ order.out_trade_no }}
						</view>
					</view>
				</view>

				<navigator class="weui-cell weui-cell_access" url="../index/server">
					<view class="weui-cell__hd">
						<view class="weui-label">联系客服</view>
					</view>
					<view class="weui-cell__bd"></view>
					<view class="weui-cell__ft weui-cell__ft_in-access">疑问或投诉</view>
				</navigator>
			</view>
		</view>
		<uni-popup ref="qrcodePopup" type="center" :is-mask-click="false" background-color="#fff">
			<view class="pay-box">
				<image @click="payment" src="/static/resource/images/modal_closer.png" style="display:block;width:30rpx;height:30rpx"></image>
				<view class="text-center">微信支付</view>
				<canvas id="qrcode" canvas-id="qrcode" style="width: 300rpx;height: 300rpx"></canvas>
				<view class="text-center">请用本人微信扫描以上二维码</view>
			</view>
		</uni-popup>
	</view>
</template>
```
// hospital
```html
<template>
	<view>
		<navbar title-text="" :isHeight="false" :isWhite="true" background="none" @navBarAttached="onNavBarAttached" />
		<view style="position: relative;">
			<image
				:src="hospital.avatar_url"
				mode="aspectFill"
				style="filter: blur(50rpx) brightness(0.8); display: block; width: 100%; height: 550rpx; overflow: hidden"
			></image>
			<view :style="'position:absolute;top:' + navBarHeight + 'rpx;padding-top:65rpx;overflow:hidden;width:100%;'">
				<view class="hospital-hd">
					<view class="weui-cell weui-cell_access" hover-class="weui-cell_active" @tap="showShareModal">
						<view class="weui-cell__hd">
							<image
								:src="hospital.avatar_url"
								mode="aspectFill"
								style="position: absolute; top: -65rpx; display: block; width: 150rpx; height: 135rpx; border-radius: 10rpx; overflow: hidden"
							></image>
						</view>
						<view class="weui-cell__bd" style="padding-left: 170rpx">
							<view style="position: absolute; top: -65rpx">
								<text style="font-size: 36rpx; color: #ffffff; font-weight: bold">{{ hospital.name }}</text>
							</view>
							<view>
								<text class="hosp-rank">{{ hospital.rank }}</text>
								<text class="hosp-label">{{ hospital.label }}</text>
							</view>
						</view>
						<view class="weui-cell__ft weui-cell__ft_in-access"><text class="f4">转发</text></view>
					</view>
					<view class="weui-cell weui-cell_access" hover-class="weui-cell_active" @tap="toMap">
						<view class="weui-cell__hd">
							<image
								src="/static/resource/images/ic_address.png"
								mode="aspectFill"
								style="margin-right: 10rpx; display: block; width: 40rpx; height: 40rpx"
							></image>
						</view>
						<view class="weui-cell__bd">
							<view>
								<text style="font-size: 24rpx">{{ hospital.city }}{{ hospital.district }}{{ hospital.address }}</text>
							</view>
						</view>
						<view class="weui-cell__ft weui-cell__ft_in-access"><text class="f4">导航</text></view>
					</view>
				</view>
				<view class="hospital-bd">
					<view class="weui-cells serv-list">
						<view class="weui-cell serv-item">
							<view class="weui-cell__bd">
								<view style="padding-top: 10rpx"><text class="serv-name">在线预约您需要的服务</text></view>
							</view>
							<view class="weui-cell__ft"></view>
						</view>
						<view class="weui-cell serv-item" @tap="toService" :data-svid="item.id" v-for="(item, index) in services" :key="index">
							<block v-if="item.use_switch == 1">
								<view class="weui-cell__hd">
									<image class="serv-logo" :src="item.logo_image ? item.logo_image_url : '../../resource/images/avatar.jpg'" mode="aspectFill" />
								</view>
								
								<view class="weui-cell__bd">
									<view>
										<text class="serv-name">{{ item.name }}</text>
									</view>
									<view class="serv-line serv-intro">{{ item.intro }}</view>
									<view class="serv-line">
										<text class="serv-price">{{ item.price }}</text>
										<text class="serv-unit">元/次</text>
									</view>
								</view>
								
								<view class="weui-cell__ft">
									<button class="btn1m">预约</button>
								</view>
							</block>
						</view>
					</view>
				</view>
			</view>
		</view>
		<share :shareModal="clone_shareModal"></share>
	</view>
</template>
```
user页面
```js
<template>
	<view>
		<view class="op-cells" style="background-color: #ffffff; padding: 0 0 60rpx 0; overflow: hidden; text-align: center">
			<view style="margin-top: 40rpx">
				<view style="display: inline-block; width: 150rpx; height: 150rpx; border-radius: 200rpx; overflow: hidden">
					<block v-if="mine.avatar">
						<image :src="mine.avatar_url" style="width: 150rpx; height: 150rpx" />
					</block>
					<block v-else>
						<image src="/static/resource/images/avatar.jpg" style="width: 150rpx; height: 150rpx" />
					</block>
				</view>
			</view>
			<view style="padding-top: 20rpx">
				<text class="user-nickname">{{ mine.nickname ? mine.nickname : '用户' + mine._id }}</text>
			</view>
		</view>
		<view class="weui-cells op-cells" style="margin-top: 20rpx">
			<view class="weui-cell">
				<view class="weui-cell__bd">我的订单</view>
				<view class="weui-cell__ft"><text @tap="toOrders" style="font-size: 26rpx">全部</text></view>
			</view>
			<view class="weui-cell" style="padding: 0">
				<view class="weui-cell__bd">
					<view class="data-cell" hover-class="weui-cell_active" @tap="toOrders" data-filt="1">
						<view class="data-icon"><image src="/static/resource/images/od_10.png" mode="widthFix" /></view>
						<view class="data-txt">待支付</view>
						<text v-if="statistic.topays > 0" class="data-cell-hint data-cell-hint-red">{{ statistic.topays }}</text>
					</view>
				</view>
				<view class="weui-cell__bd">
					<view class="data-cell" hover-class="weui-cell_active" @tap="toOrders" data-filt="2">
						<view class="data-icon"><image src="/static/resource/images/od_20.png" mode="widthFix" /></view>
						<view class="data-txt">待服务</view>
						<text v-if="statistic.todos > 0" class="data-cell-hint data-cell-hint-red">{{ statistic.todos }}</text>
					</view>
				</view>
				<view class="weui-cell__bd">
					<view class="data-cell" hover-class="weui-cell_active" @tap="toOrders" data-filt="3">
						<view class="data-icon"><image src="/static/resource/images/od_30.png" mode="widthFix" /></view>
						<view class="data-txt">已完成</view>
					</view>
				</view>
				<view class="weui-cell__bd">
					<view class="data-cell" hover-class="weui-cell_active" @tap="toOrders" data-filt="4">
						<view class="data-icon"><image src="/static/resource/images/od_40.png" mode="widthFix" /></view>
						<view class="data-txt">已取消</view>
					</view>
				</view>
			</view>
		</view>
		<view class="weui-cells op-cells" style="margin-top: 20rpx">
			<view class="weui-cell weui-cell_access" hover-class="weui-cell_active">
				<view class="weui-cell__hd">
					<image src="/static/resource/images/ic_clients.png" style="display: block; margin-right: 20rpx; width: 20px; height: 20px"></image>
				</view>
				<view class="weui-cell__bd">服务对象管理</view>
				<view class="weui-cell__ft weui-cell__ft_in-access"></view>
			</view>
			<view class="weui-cell weui-cell_access" hover-class="weui-cell_active" @tap="showShareModal">
				<view class="weui-cell__hd">
					<image src="/static/resource/images/ic_share.png" style="display: block; margin-right: 20rpx; width: 20px; height: 20px"></image>
				</view>
				<view class="weui-cell__bd">分享转发</view>
				<view class="weui-cell__ft weui-cell__ft_in-access"></view>
			</view>
		</view>
		<share :shareModal="clone_shareModal"></share>
	</view>
</template>
```