<template>
	<view v-if="isOnload">
		<view class="uni-padding-wrap">
			<form @submit="formSubmit" @reset="formReset">
				<view class="info-list">
					<view class="single-info">
						<view class="uni-title">姓名</view>
						<view class="uni-list-cell"><input class="uni-input" name="passenger" /></view>
					</view>
					<view class="single-info">
						<view class="uni-title">联系电话</view>
						<view class="uni-list-cell"><input class="uni-input" type="number" name="telephone" /></view>
					</view>
					<view class="single-info">
						<view class="uni-title">出发地</view>
						<view class="uni-list-cell"><input :disabled="value == 0 ? false : true" class="uni-input" v-model="originAddress" name="origin" /></view>
					</view>
					<view class="single-info">
						<view class="uni-title">目的地</view>
						<view class="uni-list-cell"><input :disabled="value == 0 ? true : false" class="uni-input" v-model="destination" name="destination" /></view>
					</view>
				</view>
				<view class="radio-wrap">
					<radio-group class="uni-flex" name="type" @change="change">
						<label>
							<radio checked="true" value="0" style="transform:scale(0.6)" />
							接驾
						</label>
						<label>
							<radio value="1" style="transform:scale(0.6)" />
							恭送
						</label>
					</radio-group>
				</view>
				<view class="button-wrap">
					<button class="btn-submit" formType="submit" type="primary">确定</button>
					<button type="default" formType="reset">取消</button>
				</view>
			</form>
		</view>
	</view>
</template>
<script>
import graceChecker from '@/common/graceChecker.js';
import fromRule from '@/common/fromRule.js';
export default {
	data() {
		return {
			isOnload: false,
			title: '表单验证',
			barAddress: '', //酒吧地址
			destination: '', //目的地址
			originAddress: '东大桥', //出发地址
			value: 0, //出行方式：0 接驾 1 恭送
			barId: ''
		};
	},
	async onLoad(option) {
		uni.showLoading({
			title: '数据加载中',
			mask: true
		});
		uni.setNavigationBarTitle({ title: option.barName });
		let barId = (this.barId = option.barId);
		let res = await this.$http.get(`bars/${barId}`);
		if (res.data.code === 200) {
			this.barAddress = this.destination = res.data.data.address;
			this.isOnload = true;
		}
		uni.hideLoading();
	},
	methods: {
		/* 表单提交 */
		formSubmit: function(e) {
			//定义表单规则，进行表单检查
			let formData = e.detail.value;
			let checkRes = graceChecker.check(formData, fromRule.rule);
			if (checkRes) {
				this.takeATaxi(formData);
			} else {
				// 表单检验出错
				uni.showToast({
					title: graceChecker.error,
					icon: 'none'
				});
			}
		},
		/* 清除表单数据 */
		formReset: function(e) {
			console.log('清空数据');
			this.chosen = '';
			uni.navigateBack({});
		},
		/* 选择服务类型 */
		change(e) {
			if (e.detail.value == 0) {
				this.originAddress = this.destination;
				this.destination = this.barAddress;
			} else if (e.detail.value == 1) {
				this.destination = this.originAddress;
				this.originAddress = this.barAddress;
			}
			this.value = e.detail.value;
		},
		/* 打车 */
		async takeATaxi(formData) {
			formData.barId = this.barId;
			let res = await this.$http.post('cars', formData);
			if (res.data.code === 200) {
				uni.showToast({
					title: '专车预约成功，请等候...',
					icon: 'none'
				});
			} else {
				uni.showToast({
					title: res.data.message,
					icon: 'none'
				});
			}
		}
	}
};
</script>

<style>
page {
}

.uni-padding-wrap {
	margin-top: 35upx;
	padding: 0;
	width: 100%;
}

.single-info {
	display: flex;
	justify-content: space-between;
	margin-right: 84upx;
}

.uni-list-cell {
	width: 488upx;
}

.uni-title {
	flex: 1;
	display: flex;
	justify-content: flex-end;
}

.uni-input {
	margin-left: 20upx;
	padding: 0 20upx;
	background: #372051;
	height: 60upx;
	border-radius: 10upx;
	box-sizing: border-box;
	border: 1px solid #7e7e9f;
}

.uni-list-cell::after {
	height: 0;
}

.radio-wrap {
	width: 100%;
	display: flex;
	justify-content: center;
	margin-top: 20upx;
}

radio-group {
	width: auto;
}

.button-wrap {
	display: flex;
	margin-top: 50upx;
	/* justify-content: space-around; */
}

button {
	/* margin: 0 0; */
	height: 80upx;
	width: 200upx;
	display: flex;
	justify-content: center;
	align-items: center;
}

button[type='primary'] {
	background: #ff7a22;
}

button[type='default'] {
	background: #4c4c69;
	color: #ffffff;
}
</style>
