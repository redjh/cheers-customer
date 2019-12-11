<template>
	<view v-if="isOnload" class="page">
		<swiper :indicator-dots="true" :autoplay="true" class="carousel">
			<swiper-item v-for="carousel in carouselList" :key="carousel.id"><image :src="carousel.image" class="carousel"></image></swiper-item>
		</swiper>
		<view class="bar">
			<view class="summary-wrap">
				<view class="bra-name">{{ bar.barName }}</view>
				<view class="summary">
					<view class="average-cost">
						人均：¥
						<view style="color:#E6E433;">{{ bar.consumption }}</view>
					</view>
					<view class="lowest-rebate">
						最高返利：
						<view style="color:#FF1CA7;">{{ bar.maxRate * 100 }}%</view>
					</view>
					<view class="lowest-rebate">已有{{ bar.profitNumber }}人获利</view>
				</view>
			</view>
			<view class="tag-wrap">
				<view>
					<view class="bar-tag">
						<view class="open-time">
							<view class="txt">营业时间</view>
							<view class="txt">{{ bar.openTime | formatTime }} - {{ bar.closeTime | formatTime }}</view>
						</view>
						<view>
							<view class="tags" v-for="(tag, index) in tags" :key="index" :style="{ color: bindTagColor(index) }" v-if="index < 4">{{ tag.value[0] }}</view>
						</view>
					</view>
					<view class="bar-detail" @click="$goto(`detail/detail?barId=${bar.id}`)"><image src="../../static/bar/arrow.png" class="img"></image></view>
				</view>
			</view>
			<view class="adress-wrap">
				<view class="bar-adress">
					<view class="adress">{{ bar.address }}</view>
					<view class="bar-phone"><image src="../../static/bar/phone.png" class="phone"></image></view>
				</view>
			</view>
		</view>
		<view ref="goods" class="goods"><left-category @click-category="clickCategory" :categoryList="categoryList" :subCategoryList="subCategoryList"></left-category></view>
		<wyg-bottom-tab tabIndex="1" :tabListParent="tabList" :barId="bar.id" :barName="bar.barName"></wyg-bottom-tab>
	</view>
</template>

<script>
import testdata from '../../common/testdata.js';
import TAB from '../../static/wyg-bottom-tab/js/botoom-list.js';
import wygBottomTab from '@/components/wyg-bottom-tab/wyg-bottom-tab.vue';
import leftCategory from '@/components/left-category/left-category.vue';
export default {
	components: {
		wygBottomTab,
		leftCategory
	},
	data() {
		return {
			isOnload: false,
			tabList: TAB.bar_tab, //自定义tarbar数据
			carouselList: testdata.carouselList,
			bar: {}, //酒吧数据
			tags: [], //酒吧标签
			color1: 'red',
			color2: 'green',
			color3: 'yellow',
			color4: 'pink',
			categoryList: [], //商品类目集合
			subCategoryList: [] //单个类目的商品数据集合
		};
	},
	provide() {
		return {
			goods: this
		};
	},
	async onLoad(option) {
		uni.showLoading({
			title: '数据加载中',
			mask: true
		});
		let barId = (this.barId = option.barId);
		// 查询酒吧详情
		let res = await this.$http.get(`bars/${barId}`);
		let data = res.data;
		if (data.code === 200) {
			let bar = (this.bar = data.data);
			this.tags = bar.tags.service;
			uni.setNavigationBarTitle({ title: bar.barName });
			console.log('xxxxxxxxxx');
			// 初始化酒吧商品类目
			this.getCategory();
			//初始化第一个类目的商品
			this.getSubCategoryList(0);
			console.log('yyyyyyyy');
		}
	},
	methods: {
		/* 设置酒吧标签颜色 */
		bindTagColor(i) {
			let color = '';
			switch (i) {
				case 0:
					color = this.color1;
					break;
				case 1:
					color = this.color2;
					break;
				case 2:
					color = this.color3;
					break;
				case 3:
					color = this.color4;
					break;
			}
			return color;
		},
		/* 获取酒吧商品类目 */
		getCategory() {
			this.categoryList.push({ name: '酒水', type: 0 });
			this.categoryList.push({ name: '饮料', type: 1 });
			this.categoryList.push({ name: '小吃', type: 2 });
		},
		/* 获取对应类目下的商品 */
		async getSubCategoryList(type) {
			let res = await this.$http.get('goods', { barId: this.barId, type });
			let data = res.data;
			if (data.code === 200) {
				console.log('goods', data);
				this.subCategoryList = data.data;
				// 此两句代码只有页面初始化有作用
				this.isOnload = true;
				uni.hideLoading();
				console.log('zzzzzzzz');
			}
		},
		/* 点击商品类目菜单 */
		clickCategory(e) {
			console.log('clickCategory', e);
			this.getSubCategoryList(e);
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
$margin: 35upx;
$boderColor: #999999;
.bar {
	width: 100%;
	height: 376upx;
	display: flex;
	flex-direction: column;

	view {
		display: flex;
	}

	.summary-wrap {
		flex-direction: column;
		margin: $margin $margin 0 $margin;
		margin-top: 23upx;

		.bra-name {
			font-size: 32upx;
		}

		.summary {
			margin-top: 10upx;
			justify-content: space-between;
			view {
				font-size: 26upx;
			}
		}
	}

	.summary-wrap::after,
	.tag-wrap::after,
	.adress-wrap::after {
		content: '';
		height: 1px;
		width: 100%;
		margin-top: 10upx;
		background: $boderColor;
	}
	.tag-wrap::after {
		margin-top: -10upx;
	}
	.tag-wrap {
		margin: 10upx $margin;
		flex-direction: column;

		.bar-tag {
			flex-direction: column;
			flex: 1;
			height: 135upx;

			.open-time {
				.txt {
					align-items: center;
					font-size: 26upx;
				}

				.txt::before {
					content: '';
					background-image: url(../../static/bar/clock.png);
					background-size: 30upx 30upx;
					height: 30upx;
					width: 30upx;
					margin-right: 8upx;
				}

				.txt::after {
					content: '';
					height: 30upx;
					width: 2px;
					margin: 0 20upx;
					background: $boderColor;
				}

				.time {
				}
			}

			.tags {
				margin-top: 10upx;
				margin-right: 10upx;
				padding: 1upx 10upx;
				background: #4e4e6d;
				border-radius: 10upx;
				font-size: 22upx;
			}
		}

		.bar-detail {
			width: 100upx;
			align-items: center;
			justify-content: center;

			.img {
				height: 40upx;
				width: 40upx;
			}
		}
	}

	.adress-wrap {
		$siz: 40upx;
		margin: 0 $margin;
		flex-direction: column;

		.bar-adress {
			width: 100%;
			justify-content: space-between;

			.adress::before {
				content: '';
				height: $siz;
				width: $siz;
				background-image: url('../../static/bar/position.png');
				background-size: $siz $siz;
				margin-top: -3upx;
			}

			.adress {
				align-items: center;
				flex: 1;
				font-size: 26upx;
				box-sizing: border-box;
				border-right: 1px solid $boderColor;
				margin-right: 30upx;
			}
		}

		.bar-phone {
			width: 80upx;
			align-items: center;
			.phone {
				width: $siz;
				height: $siz;
			}
		}
	}
}

.goods {
	position: absolute;
	bottom: 50px;
	top: 676upx;
	left: 0;
	right: 0;
}
</style>
