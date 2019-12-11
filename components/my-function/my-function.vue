<template>
	<view class="business">
		<navigator open-type="navigate" url="/pages/mine/reservation/reservation">
			<view class="item">
				<image src="../../static/mine/order.png" class="img"></image>
				<view class="">酒吧预约</view>
				<view class="">{{orderNum}}个</view>
			</view>
		</navigator>
		<navigator open-type="navigate" url="/pages/mine/taxiList/taxiList">
			<view class="item">
				<image src="../../static/mine/balance.png" class="img"></image>
				<view class="">打车预约</view>
				<view class="">¥{{taxi}}</view>
			</view>
		</navigator>
		<navigator open-type="navigate" url="/pages/mine/income/income">
			<view class="item">
				<image src="../../static/mine/balance.png" class="img"></image>
				<view class="">我的收入</view>
				<view class="">¥{{money}}</view>
			</view>
		</navigator>
	</view>

</template>

<script>
	export default {
		name: 'my-function',
		props: {
			orderNum: {
				type: Number,
				default: 0
			},
			money: {
				type: Number,
				default: 0
			},
			taxi: {
				type: Number,
				default: 0
			}
		}
	}
</script>

<style lang="scss">
	.business {
		width: 100%;
		display: flex;
		justify-content: space-around;
		/* #ifdef MP-WEIXIN */
		margin-top: 60upx;
		/* #endif */

		.item {
			display: flex;
			flex-direction: column;
			align-items: center;

			image {
				height: 40upx;
				width: 40upx;
				margin-bottom: 8upx;
			}

			view {
				line-height: 40upx;
			}
		}
	}
</style>
