import Vue from 'vue'
import App from './App'
import http from './common/interface'

Vue.prototype.$http = http

Vue.config.productionTip = false

Vue.prototype.$goto = function(url) {
	uni.navigateTo({
		url
	})
}

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
