<template>
	<view class="list">
		<view class="item">
			<!-- <view>代叫车人：{{prop.nickname}}</view> -->
			<view>专车预约状态：</view>
			<view class="status" :style="{ backgroundColor: prop.status == 0 ? '#A742E1' : '#476483' }">{{ prop.status == 0 ? '待叫车' : '已叫车' }}</view>
		</view>
		<view class="item">
			<view>乘车人：{{ prop.passenger }}</view>
			<view>联系电话： {{ prop.telephone }}</view>
		</view>
		<view class="item">打车时间：{{ prop.createTime }}</view>
		<view class="item">打车类型：{{ prop.type == 1 ? '恭送' : '接驾' }}</view>
		<view class="item">出发地：{{ prop.origin }}</view>
		<view class="item">目的地：{{ prop.destination }}</view>
		<template v-if="prop.status == 1">
			<view class="h-line txt-line"></view>
			<view class="item">
				<view>司机姓名：{{ prop.driver }}</view>
				<view>联系电话： {{ prop.driverTel }}</view>
			</view>
			<view class="item">车牌号：{{ prop.carNo }}</view>
		</template>
		<!-- <button v-if="prop.status==0" @click="buttonClick">立即处理</button> -->
	</view>
</template>

<script>
export default {
	name: 'taxi',
	props: {
		prop: {
			type: Object,
			default: {}
		}
	},
	data() {
		return {};
	},
	methods: {
		buttonClick() {
			this.$emit('handleCar', this.prop.id);
		}
	}
};
</script>

<style lang="scss">
.list {
	color: #ffffff;
	display: flex;
	flex-direction: column;
	background: #493362;
	padding: 30upx 40upx;
	margin-top: 25upx;
    view:first-child{
		view:first-child{
			font-weight: bold;
		}
	}
	.item {
		display: flex;
		justify-content: space-between;
		padding: 8upx 0;

		.status {
			padding: 4upx 10upx 0;
			height: 50upx;
			line-height: 50upx;
			border-radius: 6upx;
		}
	}

	button {
		margin-top: 10upx;
		width: 100%;
		height: 80upx;
		line-height: 80upx;
		color: #ffffff;
		background: #ff7a22;
		font-size: 30upx;
	}
	.h-line {
		height: 1px;
		width: 100%;
		background: #999999;
		margin-top: 10upx;
	}
}
</style>
