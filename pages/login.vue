<template>
	<view class="page">
		<view class="title">切尔斯CLUB</view>
		<image src="../static/login.png" class="img"></image>
		<template v-if="!loginReq.encryptedData">
			<button open-type="getUserInfo" lang="zh_CN" @getuserinfo="getUserInfo">授权登陆</button>
		</template>
		<template v-else>
			<view v-if="is_real_name" class="uni-form-item uni-column">
				<view class="">请输入您的实名制信息</view>
				<input class="uni-input" @input="onKeyName" focus placeholder="请输入您的姓名" />
				<input class="uni-input" @input="onKeyInput" placeholder="请输入您的微信账号" />
				<button @click="confirm">确认</button>
				<view class="notice">注意:此微信账号为酒吧返利账号，请务必填写正确！</view>
			</view>
		</template>
	</view>
</template>

<script>
export default {
	data() {
		return {
			loginReq: {},
			is_real_name: false //是否实名制
		};
	},
	methods: {
		/* 微信授权，获取用户信息 */
		getUserInfo(e) {
			let d = e.detail;
			if (d.encryptedData) {
				console.log('授权成功: ', d);
				//获取微信手授权数据
				this.loginReq.cloudID = d.cloudID;
				this.loginReq.iv = d.iv;
				this.loginReq.rawData = d.rawData;
				this.loginReq.signature = d.signature;
				this.$set(this.loginReq, 'encryptedData', d.encryptedData);
				//获取到微信授权信息后，直接登录系统
				this.login();
			} else {
				console.error('授权失败: ', d);
			}
		},
		/* 检查用户输入信息 */
		confirm() {
			if (this.loginReq.chatId === '') {
				uni.showToast({
					title: '微信账号不能为空!',
					icon: 'none'
				});
			} else if (this.loginReq.realName === '') {
				uni.showToast({
					title: '真实姓名不能为空!',
					icon: 'none'
				});
			} else {
				this.updateUserInfo();
			}
		},
		/* 登陆小程序 */
		async login() {
			uni.showLoading({ mask: true });
			let loginResult = await this.$http.post('login', this.loginReq);
			if (loginResult.data.code === 200) {
				uni.setStorageSync('loginReq', this.loginReq);
				uni.setStorageSync('loginTicket', loginResult.data.data.token);
				uni.hideLoading();
				//小程序登录成功后，检查用户微信账号和真实姓名是否填写
				if(!loginResult.data.data.chatId || !loginResult.data.data.realName){
					this.is_real_name = true;
				}else{
					uni.reLaunch({
						url: '/pages/index/index'
					});
				}
			}
		},
		/*微信账号*/
		onKeyInput(event) {
			this.loginReq.chatId = event.target.value.trim();
		},
		/*姓名*/
		onKeyName(event) {
			this.loginReq.realName = event.target.value.trim();
		},
		/*检查用户是否已经实名制*/
		async updateUserInfo() {
			uni.showLoading({
				mask:true
			})
			let res = await this.$http.post('user/modify',{chatId:this.loginReq.chatId,realName:this.loginReq.realName})
			if (res.data.code === 200) {
				uni.hideLoading()
				uni.reLaunch({
					url: '/pages/index/index'
				});
			}
		}
	},
	onLoad() {
		//获取微信登陆接口返回的code
		let _this = this;
		uni.login({
			provider: 'weixin',
			success(res) {
				if (res.errMsg === 'login:ok') {
					_this.loginReq.code = res.code;
				}
			},
			fail(error) {
				console.error('login-fail: ', error);
			}
		});
		/* 权宜之计，需要增加一个接口，判断用户是否已经是否已经 */
		let loginReq = uni.getStorageSync('loginReq');
		if (typeof loginReq === 'object') {
			this.is_real_name = true;
			this.loginReq.chatId = loginReq.chatId;
			this.loginReq.realName = loginReq.realName;
		}
	}
};
</script>

<style lang="scss">
.page {
	height: 100vh;
	background-color: #f5f5f5;
	align-items: center;
	$border: 1px solid rgba(73, 51, 98, 1);
	$borderRadius: 8px;
	.title {
		margin-top: 246upx;
		margin-bottom: 48upx;
		font-size: 48upx;
		color: #1a2632;
	}
	.img {
		height: 245upx;
		width: 245upx;
		margin-bottom: 280upx;
	}
	button {
		width: 340upx;
		box-sizing: border-box;
		border: $border;
		border-radius: $borderRadius;
		line-height: 80upx;
		color: #493362;
	}
	.uni-column {
		display: flex;
		align-items: center;
		flex-direction: column;
		color: #000000;
		font-size: 20px;
		margin-top: -160upx;
		.uni-input {
			margin-top: 30upx;
			width: 450upx;
			border: $border;
			border-radius: $borderRadius;
		}
		button {
			background: #493362;
			color: #ffffff;
			padding-top: 2px;
			margin: 60upx 0;
		}
		.notice {
			color: #1a2632;
			align-self: flex-start;
			font-size: 22upx;
			margin-left: 30upx;
		}
	}
}
</style>
