<template>
	<view v-if="isOnload" class="page">
		<image src="../../../static/mine/bg-order.png" class="bg-order"></image>
		<view class="summary-wrap">
			<view class="summary">
				<view class="bar-name title">{{data.barName}}</view>
				<!-- <view class="seat-position">{{data.seat}}</view> -->
				<view class="txt">{{data.num}}人</view>
				<view class="txt">到店时间 {{data.arrivalTime}}</view>
			</view>
			<view class="status-txt title" :style="{color:data.status==1?'#b0b0b9':'#FF6FD5'}">
				{{data.status==1?"已完成":"未完成"}}
			</view>
		</view>
		<view class="barcode-wrap">
			<view class="code-txt title">
				预约码 {{data.code}}
			</view>
			<image :src="data.codeImage" class="barcode"/>
		</view>
		<view v-if="data.status==1" class="cover-style">不可用</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				isOnload:false,
				data: {}
			}
		},
		async onLoad(option) {
			uni.showLoading({
				title: '数据加载中',
				mask: true
			});
				let res = await this.$http.get(`appointments/${option.id}`);
				if (res.data.code === 200) {
					this.data = res.data.data;
					this.isOnload=true;
				}
				uni.hideLoading()
		}
	}
</script>

<style lang="scss">
	.page {
		color: #FFFFFF;
	}

	.bg-order {
		margin-top: 14upx;
		height: 300upx;
		width: 750upx;
	}
	
	.summary-wrap {
		margin-top: 10upx;
		width: 100%;
		display: flex;
	}

	.barcode-wrap {
		margin-top: 50upx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.code-txt{
		display: flex;
		justify-content: center;
	}
	.barcode {
		margin-top: 20upx;
		height: 350upx;
		width: 350upx;
	}
	.summary {
		margin-top: 19upx;
		margin-left: 40upx;
		white-space: nowrap;
		flex: 1;
	}
	
	.status-txt {
		white-space: nowrap;
		position: relative;
		left: -43upx;
		top: 10upx;
	}
	/* 二维码遮罩 */
	.cover-style{
		height: 350upx;
		width: 350upx;
		background: #f5f5f5;
		opacity: 0.7;
		position: relative;
		margin: 0 auto;
		top:-350upx;
		display:flex;
		justify-content: center;
		align-items: center;
		color: #000000;
		font-weight: bold;
		font-size: 20px;
	}
	
	.title{
		font-size: 30upx;
	}
	.txt{
		font-size: 24upx;
	}

</style>
