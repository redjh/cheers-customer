<template>
	<view v-if="isOnload" class="page">
		<swiper :indicator-dots="true" :autoplay="true" class="carousel">
			<swiper-item v-for="carousel in carouselList" :key="carousel.id"><image :src="carousel.image" class="carousel"></image></swiper-item>
		</swiper>
		<view class="bar-list">
			<view class="single-bar" v-for="bar in barList" :key="bar.id" @click="goToBar(bar.id)">
				<view class="bar-wraper" v-bind:style="{ backgroundImage: 'url(' + 'http://img1.gtimg.com/ln/pics/hv1/13/43/1999/129995953.jpg' + ')' }">
					<view class="bar-function">
						<view @click.stop="gotoTaxi(bar.id, bar.barName)"><image src="../../static/taxi.png" class="function"></image></view>
						<view @click.stop="gotoOrder(bar.id, bar.barName)"><image src="../../static/order.png" class="function"></image></view>
						<view class="rebate-wrap">
							<view class="rebate">返利{{ bar.maxRate * 100 }}%</view>
						</view>
					</view>
					<view class="bar-sketch">
						<view class="sketch">
							<image src="../../static/name.png" class="sketch-left"></image>
							{{ bar.barName }}
						</view>
						<view class="sketch sketch-right">¥{{ bar.consumption }}元/人</view>
						<view class="sketch ">
							<!-- 							<image src="../../static/distance.png" class="sketch-left"></image>
							1.23KM -->
						</view>
						<view class="sketch sketch-right">已有{{ bar.profitNumber }}人获利</view>
					</view>
				</view>
			</view>
		</view>
		<wyg-bottom-tab tabIndex="1" :tabListParent="tabList"></wyg-bottom-tab>
	</view>
</template>

<script>
import testdata from '../../common/testdata.js';
import TAB from '../../static/wyg-bottom-tab/js/botoom-list.js';
import wygBottomTab from '@/components/wyg-bottom-tab/wyg-bottom-tab.vue';
export default {
	components: {
		wygBottomTab
	},
	data() {
		return {
			isOnload: false,
			carouselList: testdata.carouselList,
			barList: [],
			tabList: TAB.index_tab, //tabbar数据
			pageNo: 1,
			pageSize: 5,
			totalPage: 0
		};
	},
	async onLoad() {
		uni.showLoading({ title: '数据加载中', mask: true });
		let result = await this.$http.get('bars');
		let data = result.data;
		if (data.code === 200) {
			this.barList = data.data.rows || [];
			this.pageNo = data.data.pageNo;
			this.totalPage = data.data.totalPage;
			this.isOnload = true;
			uni.showTabBar();
		}
		uni.hideLoading();
	},
	methods: {
		goToBar(barId) {
			this.$goto(`../bar/bar?barId=${barId}`);
		},
		gotoOrder(barId, barName) {
			this.$goto(`../bar/reservation/reservation?barId=${barId}&barName=${barName}`);
		},
		gotoTaxi(barId, barName) {
			this.$goto(`../taxi/taxi?barId=${barId}&barName=${barName}`);
		}
	}
};
</script>

<style>
@import 'index.css';
</style>
