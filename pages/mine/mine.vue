<template>
	<view v-if="isOnload" class="page">
		<bg></bg>
		<my-function :orderNum="orderNum" :money="money" :taxi="carNum"></my-function>
		<view class="lately">
			<view class="seven">最近七天收入</view>
			<view class="income-wrap" v-for="(item, index) in lately" :key="index">
				<view class="date">{{ item.time }}</view>
				<view class="income">
					收入
					<view class="money">¥{{ item.money }}</view>
				</view>
			</view>
		</view>
		<wyg-bottom-tab tabIndex="2" :tabListParent="tabList"></wyg-bottom-tab>
	</view>
</template>

<script>
import bg from '@/components/bg/bg.vue';
import myFunction from '@/components/my-function/my-function.vue';
import TAB from '../../static/wyg-bottom-tab/js/botoom-list.js';
import wygBottomTab from '@/components/wyg-bottom-tab/wyg-bottom-tab.vue';
export default {
	components: {
		bg,
		myFunction,
		wygBottomTab
	},
	data() {
		return {
			isOnload: false,
			lately: [],
			orderNum: 0,
			money: 0,
			carNum:0,
			tabList:TAB.index_tab
		};
	},
	onLoad() {
		uni.showLoading({
			title: '数据加载中',
			mask: true
		});
		this.queryData();
		this.isOnload = true;
		uni.hideLoading();
	},
	onHide() {
		this.queryData();
	},
	methods:{
		async queryData(){
			// 查询酒吧预约总数
			let appointmentsRes = await this.$http.get('appointments/total');
			if (appointmentsRes.data.code === 200) {
				this.orderNum = appointmentsRes.data.data || 0;
			}
			// 查询收入总数
			let moneyRes = await this.$http.get('money/total');
			if (appointmentsRes.data.code === 200) {
				this.money = moneyRes.data.data || 0;
			}
			
			// 查询专车预约总数
			let carsRes = await this.$http.get('cars/total');
			if (carsRes.data.code === 200) {
				this.carNum = carsRes.data.data;
			}
			
			// 查询最近7天收入
			let latelyRes = await this.$http.get('money/total/day');
			if (latelyRes.data.code === 200) {
				let lately = latelyRes.data.data;
				this.lately = lately && lately.splice(0, 7);
			}
		}
	}
};
</script>

<style lang="scss">
.page {
	color: #ffffff;

	view {
		display: flex;
	}

	.head-img {
		width: 100%;
		height: 175upx;
		margin-top: 190upx;
		justify-content: center;

		.img {
			height: 175upx;
			width: 175upx;
			border-radius: 50%;
		}
	}

	.business {
		width: 100%;
		margin-top: 35upx;
		justify-content: space-around;

		.my {
			flex-direction: column;
			align-items: center;

			image {
				height: 40upx;
				width: 40upx;
				margin-bottom: 4upx;
			}

			view {
				font-size: 12px;
			}
		}
	}

	.lately {
		margin-top: 50upx;
		flex-direction: column;

		.seven {
			height: 70upx;
			background: #493362;
			padding: 0 46upx;
			align-items: center;
			margin-bottom: 38upx;
			font-size: 28upx;
		}

		.income-wrap {
			margin: 0 46upx 10upx;

			.date {
				flex: 1;
			}

			.income {
				justify-content: flex-end;

				.money {
					margin-left: 10upx;
					color: #fffc1c;
					justify-content: flex-end;
				}
			}
		}
	}
}
</style>
