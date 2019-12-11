<template>
	<view v-if="isOnload">
		<scroll-view scroll-x="true" class="pick-date">
			<view class="single-day" v-for="(date, index) in dateList" :class="[index === 6 ? lastDate : '']" :key="index" @click="pickDate(date, index)">
				<view class="day-wrap" :class="selectedIndex === index ? selected : ''">
					<view class="txt week">{{ date.week }}</view>
					<view class="txt">{{ date.date }}</view>
				</view>
			</view>
		</scroll-view>

		<view class="order-type" v-for="seat in seatList" :key="seat.id">
			<image :src="seat.image" class="img" />
			<view class="cost">
				<view class="seat-name">{{ seat.type === 0 ? '卡座' : '吧台' }}</view>
				<view class="minimum-price">最低消费：¥{{ seat.minCharge }}</view>
			</view>
			<button class="button" type="primary" size="mini" @click="togglePopup(seat.id)">预定</button>
		</view>
		<uni-popup :show="show" type="center" :custom="true" :mask-click="false" @change="change">
			<view class="uni-tip">
				<view class="uni-tip-title">请输入预约人数</view>
				<view class="uni-tip-content"><input class="uni-input" maxlength="2" type="number" v-model="personNum" focus /></view>
				<view class="uni-tip-group-button">
					<view class="uni-tip-button" @click="cancel">取消</view>
					<view class="uni-tip-button" @click="order">确定</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import uniPopup from '@/components/uni-popup/uni-popup.vue';
export default {
	components: { uniPopup },
	data() {
		return {
			isOnload: false,
			currentDate: '', //当前时间
			seatList: [], //座位数据
			dateList: [], //时间数据
			selected: 'selected', //日期选中样式
			selectedIndex: 0, //日期选中下标
			lastDate: 'lastDate', //最后一个日期的样式
			show: false, //控制输入人数弹框是否显示
			personNum: '',
			barId: '',
			seatId: ''
		};
	},
	async onLoad(option) {
		uni.showLoading({ title: '数据加载中', mask: true });
		uni.setNavigationBarTitle({ title: option.barName });
		//初始化时间
		this.calDate();
		let barId = (this.barId = option.barId);
		let result = await this.$http.get('seats', { barId });
		let data = result.data;
		if (data.code === 200) {
			this.seatList = data.data;
			this.isOnload = true;
		}
		uni.hideLoading();
	},
	methods: {
		/* 选择日期 */
		pickDate(date, index) {
			let year = new Date().getFullYear();
			this.currentDate = `${year}-${date.date}`;
			this.selectedIndex = index;
			console.log(this.currentDate);
		},
		/* 预约 */
		async order() {
			let req = {
				seatId: this.seatId,
				barId: this.barId,
				num: this.personNum,
				appointmentTime: this.currentDate
			};
			let result = await this.$http.post('appointments', req);
			this.cancel();
			if (result.data.code === 200) {
				uni.showToast({
					title: '预定成功',
					icon: 'none'
				});
			} else {
				uni.showToast({
					title: '预定失败',
					icon: 'none'
				});
			}
		},
		/* 计算最近一周的时间 */
		calDate() {
			this.dateList = [];
			let week = new Date().getDay();
			let weeks = ['日', '一', '二', '三', '四', '五', '六'];
			for (let i = 0; i < 7; i++) {
				let obj = {};
				obj.date = this.getDate(i).substring(5);
				if (i === 0) {
					obj.week = '今天';
				} else {
					let k = week + i >= 7 ? week + i - 7 : week + i;
					console.log(i, k);
					obj.week = '星期' + weeks[k];
				}
				this.dateList.push(obj);
			}
			this.currentDate = this.getDate(0);
		},
		/* 格式化时间 */
		getDate(number) {
			const date = new Date();
			let year = date.getFullYear();
			let month = date.getMonth() + 1;
			let day = date.getDate();
			day += number;
			month = month > 9 ? month : '0' + month;
			day = day > 9 ? day : '0' + day;
			return `${year}-${month}-${day}`;
		},
		/* 打开预约人数输入框 */
		togglePopup(seatId) {
			this.personNum = '';
			this.seatId = seatId;
			this.show = true;
		},
		/* 关闭预约人数输入框 */
		cancel() {
			this.show = false;
		},
		change(e) {
			console.log(e.show);
		}
	}
};
</script>

<style>
page {
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
}
.order-type {
	display: flex;
	height: 120upx;
	margin-top: 15upx;
	padding-bottom: 1px;
	background-color: #493362;
	align-items: center;
	justify-content: space-between;
	padding-left: 20upx;
}

.img {
	height: 110upx;
	width: 110upx;
}

.cost {
	margin-left: 20upx;
	width: 370upx;
	color: rgba(255, 255, 255, 1);
	flex-direction: column;
	justify-content: space-between;
}

.seat-name {
	margin-bottom: 10upx;
	font-size: 32upx;
}

.minimum-price {
	font-size: 26upx;
}

button[type='primary'] {
	background-color: #ce7117;
}
/* 日期选择 --stat*/

.pick-date {
	width: 100%;
	height: 170upx;
	margin-top: 15upx;
	white-space: nowrap;
	background-color: #493362;
}

.single-day {
	display: inline-block;
	margin: 20upx 0 20upx 20upx;
}
.lastDate {
	margin-right: 20upx;
}

.day-wrap {
	display: flex;
	flex-flow: column;
	align-items: center;
	box-sizing: border-box;
	padding: 10upx 0;
	width: 130upx;
	height: 130upx;
}

.txt {
	height: 50%;
	align-items: center;
	font-size: 26upx;
	color: #ffffff;
}

.selected {
	background-color: #ff7a22;
	border-radius: 5upx;
}
/* 日期选择 --end*/

/* 提示窗口 --start*/
.uni-tip {
	padding: 15px;
	width: 250px;
	background: #fff;
	box-sizing: border-box;
	border-radius: 10px;
	margin-top: -70px;
}
.uni-tip .uni-input {
	border: 1px solid;
	border-radius: 5px;
}
.uni-tip-title {
	text-align: center;
	font-weight: bold;
	font-size: 16px;
	color: #333;
}

.uni-tip-content {
	padding: 15px;
	font-size: 14px;
	color: #666;
}

.uni-tip-group-button {
	margin-top: 10px;
	display: flex;
}

.uni-tip-button {
	width: 100%;
	text-align: center;
	font-size: 14px;
	color: #3b4144;
}
/* 提示窗口 --end*/
</style>
