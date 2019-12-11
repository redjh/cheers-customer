export default {
	// 酒吧详情页的tabBar
	bar_tab: [{
		id: 1,
		name: "专车",
		imgOff: "../../static/wyg-bottom-tab/img/car.png",
		imgOn: "../../static/wyg-bottom-tab/img/car.png",
		url: "/pages/taxi/taxi"
	}, {
		id: 2,
		name: "预定",
		imgOff: "../../static/wyg-bottom-tab/img/order.png",
		imgOn: "../../static/wyg-bottom-tab/img/order.png",
		url: "/pages/bar/reservation/reservation"
	}],
	// 首页-我的页面的tabBar
	index_tab: [{
		id: 1,
		name: "首页",
		imgOff: "../../static/tabbar/index.png",
		imgOn: "../../static/tabbar/index-sel.png",
		"url": "/pages/index/index"
	}, {
		id: 2,
		name: "我的",
		imgOff: "../../static/tabbar/mine.png",
		imgOn: "../../static/tabbar/mine-sel.png",
		url: "/pages/mine/mine"
	}]
};
