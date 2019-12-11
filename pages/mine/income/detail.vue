<template>
	<view v-if="isOnload" class="page">
		<view class="cost-detail">
			<view class="">
				交易时间 {{ time }}
				<!-- <view class="time"></view> -->
			</view>
			<view class="money">
				<view class="cost">消费 ¥{{ total }}</view>
				<view class="rebate">返利 ¥{{ money }}</view>
			</view>
		</view>
		<view class="list">
			<view :id="index === 0 ? 'first' : ''" class="nav-right-item" v-for="(item, index) in list" :key="index">
				<view class="goods-name-wrap">
					<image :src="item.image" class="goods-img" />
					<view class="goods-name">
						<view class="name">{{ item.goodsName }}</view>
						<view class="price">
							<view class="sale-price">¥{{ item.salePrice }}</view>
							<view class="origin-price">¥{{ item.originalPrice }}</view>
						</view>
					</view>
				</view>
				<view class="h-line"></view>
				<view class="goods-desc">
					<view class="txt">产品描述</view>
					<view class="txt">品牌：{{ item.description | filterA }}</view>
					<view class="txt">度数：{{ item.description | filterB }}</view>
					<view class="txt">商品亮点：{{ item.description | filterC }}</view>
				</view>
				<view class="h-line txt-line"></view>
				<view class="total-wrap">
					<view class="number">
						数量
						<view>{{ item.num }}</view>
					</view>
					<view class="rebate">
						返利
						<view>¥{{ item.cashback }}</view>
					</view>
					<view class="total">
						合计
						<view>¥{{ item.total }}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
import common from '../../../common/common.js';
export default {
	data() {
		return {
			isOnload: false,
			time: '',
			total: '',
			money: '',
			list: []
		};
	},
	async onLoad(option) {
		uni.showLoading({
			title: '数据加载中',
			mask: true
		});
		this.time = option.time;
		this.total = option.total;
		this.money = option.money;
		let orderId = option.orderId;
		let detail = await this.$http.get(`money/total/month/detail/${orderId}`);
		if (detail.data.code === 200) {
			this.list = detail.data.data || [];
			this.isOnload = true;
		}
		uni.hideLoading();
	},
	filters: common.descFilter
};
</script>

<style lang="scss">
.page {
	color: #b3adbb;

	.cost-detail {
		flex-direction: column;
		flex: 1;
		padding: 0 20upx;
		background: #493362;
		margin-top: 20upx;
		height: 100upx;
		view {
			display: flex;

			.cost {
				color: #fffc24;
			}

			.rebate {
				color: #ff59c6;
				margin-left: 20upx;
			}
		}
	}

	.time {
	}

	.list {
		width: 100%;

		.nav-right-item {
			background: #493362;
			margin-top: 20upx;
			padding: 11upx 20upx;
			font-size: 28upx;
			// margin-right: 24upx;

			view {
				display: flex;
			}

			.h-line {
				height: 1px;
				width: 100%;
				background: #52526d;
				margin-top: 10upx;
			}

			.goods-name-wrap {
				height: 135upx;

				image {
					width: 220upx;
					height: 135upx;
				}

				.goods-name {
					flex: 1;
					flex-direction: column;
					margin-left: 10upx;
					justify-content: space-around;
					padding: 0 20upx;

					.price {
						justify-content: space-between;

						.sale-price {
							color: #fffc1c;
							font-size: 12px;
						}

						.origin-price {
							font-size: 12px;
							color: #b3adbb;
							text-decoration: line-through;
						}
					}
				}
			}

			.goods-desc,
			.goods-name-wrap {
				margin-left: 10upx;
			}

			.goods-desc {
				margin-top: 10upx;
				line-height: 1.5;
				flex-direction: column;

				.txt {
					font-size: 12px;
				}
			}

			.txt-line {
				margin-top: 0;
			}
		}
		.total-wrap {
			padding: 0 10upx;
			flex-direction: column;
			view {
				font-size: 12px;
				justify-content: space-between;
			}
			.rebate,
			.total {
				padding-left: 24upx;
			}
		}
	}
}
</style>
