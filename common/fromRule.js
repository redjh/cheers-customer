const rule = [{
		name: "passenger",
		checkType: "string",
		checkRule: "1,4",
		errorMsg: "姓名应为1-4个字符"
	},
	{
		name: "telephone",
		checkType: "phoneno",
		checkRule: "",
		errorMsg: "请输入11位手机号码"
	},
	{

		name: "origin",
		checkType: "notnull",
		checkRule: "",
		errorMsg: "请输入出发地址"

	},
	{
		name: "destination",
		checkType: "notnull",
		checkRule: "",
		errorMsg: "请输入目标地址"

	},
	{
		name: "type",
		checkType: "in",
		checkRule: "0,1",
		errorMsg: "请选择服务类型"
	}
];

export default{
	rule
}
