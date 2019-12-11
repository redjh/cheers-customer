<template>
	<view v-if="isOnload" class="page">
		<view class="one">
			<view class="cards">{{ bar.barName }}</view>
			<view class="bar-time">
				<view class="open-time">
					<view class="txt time">营业时间</view>
					<view class="txt">平均营业</view>
					<view class="txt">周一至周日</view>
					<view class="txt">{{ bar.openTime | formatTime }} - {{ bar.closeTime | formatTime }}</view>
				</view>
			</view>
			<view class="bar-phone">
				<view class="phone">{{ bar.telephone }}</view>
				<view class="phone-btn">拨打商家电话</view>
			</view>
		</view>
		<view class="two">
			<view class="cards cards-img">特色服务</view>
			<view class="single-card" v-for="service in bar.tags.service" :key="service.title">
				<view class="card-name">
					<image :src="service.icon" />
					<view class="title">{{ service.title }}</view>
				</view>
				<view class="tags">
					<view v-for="(value, i) in service.value" :key="i">{{ value }}</view>
				</view>
			</view>
		</view>
		<view class="three">
			<view class="cards cards-img">产地设施</view>
			<view class="single-card" v-for="place in bar.tags.place" :key="service.title">
				<view class="card-name">
					<image :src="place.icon" />
					<view class="title">{{ place.title }}</view>
				</view>
				<view v-if="!!place.traffics" class="traffic">
					<view v-for="(value, i) in place.traffics" :key="i">
						<view v-for="(v, k) in value.data" :class="'traffic-detail' + k" :style="{ background: k === 0 ? value.color : '' }" :key="k">{{ v }}</view>
					</view>
				</view>
				<view v-else class="tags">
					<view v-for="(value, i) in place.value" :key="i">{{ value }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			isOnload: false,
			bar: {}
		};
	},
	async onLoad(option) {
		uni.showLoading({
			title: '数据加载中',
			mask: true
		});
		let barId = option.barId;
		let res = await this.$http.get(`bars/${barId}`);
		let data = res.data;
		if (data.code === 200) {
			uni.setNavigationBarTitle({ title: data.data.barName });
			this.bar = data.data;
			console.log(this.bar);
			this.setTrafficStyle(this.bar.tags.place);
			this.isOnload = true;
		}
		uni.hideLoading();
	},
	methods: {
		/* 设置交通信息的样式 */
		setTrafficStyle(places) {
			let traffics = [];
			for (let i = 0; i < places.length; i++) {
				let place = places[i];
				if (place.title === '交通信息') {
					console.log(place.value);
					let traffic = place.value;
					for (let j = 0; j < traffic.length; j++) {
						let t = traffic[j].split('|');
						let color = ['#C30888', '#2C76F2', '#972CF2'];
						traffics.push({
							data: t,
							color: color[j]
						});
					}
					place.traffics = traffics;
					break;
				}
			}
		}
	},
	filters: {
		formatTime(value) {
			return value && value.split(' ')[1].substring(0, 5);
		}
	}
};
</script>

<style lang="scss">
page {
	color: #ffffff;

	view {
		display: flex;
	}

	$top: 19upx;

	.one {
		height: 194upx;
		margin-top: $top;
		flex-direction: column;

		.bar-time,
		.bar-phone {
			margin-left: 44upx;
			margin-right: 44upx;
		}

		.bar-time {
			.open-time {
				flex: 1;
				justify-content: space-between;

				.time {
					align-items: center;
				}
			}
		}

		.bar-phone {
			justify-content: space-between;
			margin-top: 10upx;

			.phone-btn {
				color: #15ca95;
			}

			.phone {
				align-items: center;
			}
		}

		.time:before,
		.phone::before {
			content: '';
			background-image: url(../../../static/bar/clock.png);
			background-size: 30upx 30upx;
			height: 30upx;
			width: 30upx;
			margin-right: 6upx;
			margin-top: -4upx;
		}

		.phone::before {
			background-image: url(../../../static/bar/phone.png);
		}
	}

	.cards {
		margin-left: 44upx;
		font-size: 18px;
	}

	.cards-img {
		align-items: center;
	}

	.cards-img::after {
		content: '';
		width: 34upx;
		height: 15upx;
		background: url(../../../static/bar/title.png);
		background-size: 34upx 15upx;
		margin-left: 10upx;
	}

	.one,
	.two,
	.three {
		background: #493362;
	}

	.two,
	.three {
		margin-top: $top;
		flex-direction: column;

		.single-card {
			flex-direction: column;
			margin-left: 44upx;

			.card-name {
				align-items: center;
				$size: 35upx;

				image {
					height: $size;
					width: $size;
					margin-top: -2px;
				}

				.title {
					font-size: 30upx;
					margin-left: 10upx;
				}
			}

			.tags {
				margin-left: 45upx;
				flex-wrap: wrap;

				view {
					width: 25%;
					white-space: nowrap;
					font-size: 24upx;
				}
			}

			.traffic {
				margin-left: 45upx;
				flex-direction: column;

				view {
					font-size: 12px;
					margin-bottom: 5upx;

					.traffic-detail0 {
						width: 100upx;
						border-radius: 10upx;
						justify-content: center;
					}

					.traffic-detail1 {
						width: 250upx;
						margin-left: 100upx;
					}

					.traffic-detail2 {
						margin-left: 75upx;
					}
				}
			}
		}
	}
}
</style>
