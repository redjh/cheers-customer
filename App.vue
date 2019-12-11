<script>
export default {
	data() {
		return {
			loginReq: {}
		};
	},
	onLaunch: function() {
		let _this = this;
		// 第一次登陆前，获取的值为空字符串
		let loginReq = uni.getStorageSync('loginReq');
		if (typeof loginReq === 'object') {
			uni.login({
				provider: 'weixin',
				async success(res) {
					if (res.errMsg === 'login:ok') {
						loginReq.code = res.code;
						let result = await _this.$http.post('login', loginReq);
						if (result.data.code === 200) {
							uni.setStorageSync('loginReq', loginReq);
							uni.setStorageSync('loginTicket', result.data.data.token);
						}
					}
				},
				fail(error) {
					console.error('login-fail: ', error);
				}
			});
		}
		console.log('App Launch');
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
@import './common/uni.css';
/*每个页面公共css */
page {
	background-color: #372051;
	font-family: HiraginoSansGB-W3;
	font-size: 14px;
	color: #e1e1e1;
}

.page {
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
}

.carousel {
	width: 100%;
	height: 300upx;
}
</style>
