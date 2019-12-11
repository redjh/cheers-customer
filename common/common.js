export default {
	descFilter: {
		filterA(value) {
			let str = value && value.split('||')[0];
			return str && str.replace(':', ': ');
		},
		filterB(value) {
			let str = value && value.split('||')[1];
			return str && str.replace(':', ': ');
		},
		filterC(value) {
			let str = value && value.split('||')[2];
			return str && str.replace(':', ': ');
		}
	}
}
