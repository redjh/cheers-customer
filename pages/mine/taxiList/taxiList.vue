<template>
	<view v-if="isOnlad"><taxi @handleCar="handleTaxi" v-for="car in taxiList" :key="index" :prop="car"></taxi></view>
</template>

<script>
import taxi from '@/components/taxi/taxi.vue';
export default {
	components: {
		taxi
	},
	data() {
		return {
			isOnlad: false,
			taxiList: []
		};
	},
	async onLoad() {
		uni.showLoading({
			mask: true
		});
		let res = await this.$http.get('cars');
		if (res.data.code === 200) {
			this.taxiList = res.data.data;
			this.isOnlad = true;
			uni.hideLoading();
		}
	}
};
</script>

<style lang="scss"></style>
