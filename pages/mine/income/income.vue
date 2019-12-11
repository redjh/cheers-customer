<template>
	<view v-if="isOnload" class="page">
		<uni-collapse ref="add" class="warp" @change="change">
			<uni-collapse-item
				v-for="(item, key) in list"
				:key="key"
				:open="item.open"
				:show-animation="item.showAnimation"
				:disabled="item.disabled"
				:name="key"
				:title="item.subName"
			>
				<view class="summary">
					<view>
						消费
						<view class="cost">¥{{ item.total }}</view>
					</view>
					<view>
						返利
						<view class="rebate">¥{{ item.money }}</view>
					</view>
				</view>
				<view class="single-cost" v-for="(sub, i) in item.subList" :key="i" @click="gotoDetail(sub.orderId, sub.total, sub.money, sub.time)">
					<image :src="sub.imageUrl" />
					<view class="cost-detail">
						<view class="">
							<view class="title">{{ sub.barName }}</view>
							<view class="">{{ sub.time }}</view>
						</view>
						<view class="money">
							<view class="cost">消费 ¥{{ sub.total }}</view>
							<view class="rebate">返利 ¥{{ sub.money }}</view>
						</view>
					</view>
				</view>
			</uni-collapse-item>
		</uni-collapse>
	</view>
</template>

<script>
import uniCollapse from '@/components/uni-collapse/uni-collapse.vue';
import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue';
export default {
	components: {
		uniCollapse,
		uniCollapseItem
	},
	data() {
		return {
			isOnload: false,
			list: []
		};
	},
	async onLoad() {
		uni.showLoading({
			title: '数据加载中',
			mask: true
		});
		let month = await this.$http.get('money/total/month');
		if (month.data.code === 200) {
			let list = month.data.data || [];
			let detail = await this.$http.get('money/total/month/detail', { time: list[0] && list[0].time });
			let detailList;
			if (detail.data.code === 200) {
				detailList = detail.data.data || [];
			}
			for (let i = 0; i < list.length; i++) {
				let item = list[i];
				// 第一个默认打开
				item.open = i === 0 ? true : false;
				// 第一个内容赋值
				item.subList = i === 0 ? detailList : '';
				item.showAnimation = true;
				item.subName = this.fotmat(item.time);
			}
			console.log('list', list);
			this.list = list;
			this.isOnload = true;
		}
		uni.hideLoading();
	},
	methods: {
		/* 打开折叠面板，加载数据 */
		async change(e) {
			console.log(e);
			for (let i = 0; i < e.length; i++) {
				let j = e[i];
				let item = this.list[j];
				if (!item.subList) {
					let detail = await this.$http.get('money/total/month/detail', { time: item.time });
					if (detail.data.code === 200) {
						item.subList = detail.data.data;
					}
				}
			}
		},
		gotoDetail(orderId, total, money, time) {
			this.$goto(`detail?orderId=${orderId}&total=${total}&money=${money}&time=${time}`);
		},
		fotmat(time) {
			const date = new Date(time);
			let year = date.getFullYear();
			let month = date.getMonth() + 1;
			let day = date.getDate();
			month = month > 9 ? month : '0' + month;
			return `${year}年-${month}月`;
		}
	}
};
</script>

<style lang="scss">
.page {
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	background-color: #372051;

	view {
		font-size: 28upx;
		line-height: inherit;
	}

	.warp {
		margin-top: 10upx;
		$left: 30upx;

		.summary {
			display: flex;
			margin-left: $left;
			margin-top: 10upx;

			view {
				display: flex;
				flex: 1;

				.cost {
					color: #fffc24;
				}

				.rebate {
					color: #ff59c6;
				}

				.cost,
				.rebate {
					margin-left: 10upx;
				}
			}
		}

		.single-cost {
			display: flex;
			align-items: center;
			height: 156upx;
			margin-left: $left;
			box-sizing: border-box;
			border-top: 1px solid #5a5a7b;

			view {
				display: flex;
			}

			image {
				width: 110upx;
				height: 110upx;
			}

			.cost-detail {
				flex-direction: column;
				flex: 1;
				padding: 0 20upx;

				view {
					justify-content: space-between;
					font-size: 12px;
				}

				.title {
					font-size: 14px;
				}
			}
		}
	}
}
</style>
