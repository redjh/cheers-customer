<template>
	<view class="container">
		<view class="page-body">
			<scroll-view class="nav-left" scroll-y :style="'height:' + height + 'px'">
				<view
					class="nav-left-item"
					@click="categoryClickMain(item, index)"
					:key="index"
					:class="index == categoryActive ? 'active' : ''"
					v-for="(item, index) in categoryList"
				>
					<view class="txt">{{ item.name }}</view>
				</view>
			</scroll-view>
			<scroll-view class="nav-right" scroll-y :scroll-top="scrollTop" @scroll="scroll" :style="'height:' + height + 'px'" scroll-with-animation>
				<view :id="index === 0 ? 'first' : ''" class="nav-right-item" v-for="(sub, index) in subCategoryList" :key="sub.id">
					<view class="goods-wrap">
						<view class="img">
							<image :src="sub.image" />
							<view class="rebate">返利{{ sub.rate * 100 }}%</view>
						</view>
						<view class="name-price">
							<view>{{ sub.goodsName }}</view>
							<view class="price">
								<view class="sale-price">¥{{ sub.salePrice }}</view>
								<view class="origin-price">¥{{ sub.originalPrice }}</view>
							</view>
						</view>
					</view>
					<view class="h-line"></view>
					<view class="desc">
						<view class="txt">产品描述</view>
						<view class="txt">{{ sub.description | filterA }}</view>
						<view class="txt">{{ sub.description | filterB }}</view>
						<view class="txt">{{ sub.description | filterC }}</view>
					</view>
					<view class="h-line txt-line"></view>
				</view>
				<page-foot :name="name" v-if="subCategoryList.length > 1"></page-foot>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import common from '../../common/common.js'
export default {
	name: 'left-category',
	props: {
		categoryList: {
			type: Array,
			default: []
		},
		subCategoryList: {
			type: Array,
			default: []
		}
	},
	inject: ['goods'],
	data() {
		return {
			categoryActive: 0,
			scrollTop: 0,
			scrollHeight: 0,
			name: '七月_',
			height:0
		};
	},
	created() {
		console.log('compoent', this.categoryList);
		// 根据父元素的高度，初始化组件高度
		let info = uni
			.createSelectorQuery()
			.in(this.goods)
			.select('.goods');
		info.boundingClientRect(data => {
			console.log('data', JSON.stringify(data));
			let leftCategoryHeight;
			if (data) {
				leftCategoryHeight = data.height;
				uni.setStorage({
					key: 'leftCategory_height',
					data: leftCategoryHeight,
					success: res => {
						console.log('set success');
					}
				});
			} else {
				uni.getStorage({
					key: 'leftCategory_height',
					success: function(res) {
						console.log('getKey', res.data);
						leftCategoryHeight = res.data;
					}
				});
			}
			this.height = leftCategoryHeight;
			console.log('compoent-height', this.height);
		}).exec();
	},
	methods: {
		scroll(e) {
			this.scrollHeight = e.detail.scrollHeight;
		},
		/* 点击商品类目菜单 */
		categoryClickMain(categroy, index) {
			this.categoryActive = index;
			this.scrollTop = -this.scrollHeight * index;
			this.$emit('clickCategory', categroy.type);
		},
		getCategory() {}
	},
	/* 商品描述数据处理 */
	filters: common.descFilter
};
</script>

<style lang="scss">
.page-body {
	display: flex;
}

.nav {
	display: flex;
	width: 100%;
}

.nav-left {
	width: 30%;
	background: #493362;
}

.nav-left-item {
	height: 80upx;
	font-size: 30upx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.nav-left-item .txt {
	flex: 1;
	display: flex;
	justify-content: center;
}

.active::before {
	content: '';
	height: 60upx;
	width: 2px;
	background: #ff8c1c;
	position: relative;
	left: 40upx;
}

.active {
	background: #372051;
}
// 右侧商品样式
.nav-right {
	width: 70%;
	color: #ffffff;

	.nav-right-item {
		// height: 400upx;
		margin-bottom: 15upx;
		padding: 11upx;
		font-size: 28upx;
		margin-right: 24upx;

		view {
			display: flex;
		}

		.h-line {
			height: 1px;
			width: 100%;
			background: #999999;
			margin-top: 10upx;
		}

		.txt-line {
			margin-top: 0;
		}
	}
}
.goods-wrap {
	height: 135upx;

	.img {
		position: relative;
		overflow: hidden;
		&,image {
			width: 220upx;
			height: 135upx;
		}
		/* 返利 start */
		.rebate {
			padding: 0 42upx;
			font-size: 20upx;
			background: #a303e6;
			line-height: 40upx;
			transform: rotate(45deg);
			white-space: nowrap;
			position: absolute;
			top: 20upx;
			right: -40upx;
		}
		/* 返利 end */
	}
	.name-price {
		flex: 1;
		flex-direction: column;
		justify-content: space-around;
		padding: 0 20upx;
		margin-left: 10upx;

		.price {
			justify-content: space-between;

			.sale-price {
				color: #fffc1c;
				font-size: 12px;
			}

			.origin-price {
				font-size: 12px;
				text-decoration: line-through;
			}
		}
	}
}
.desc,
.goods-wrap {
	margin-left: 10upx;
}
.desc {
	margin-top: 10upx;
	line-height: 1.5;
	flex-direction: column;
	.txt {
		font-size: 12px;
	}
}
</style>
