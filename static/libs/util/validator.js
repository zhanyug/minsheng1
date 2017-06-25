/* 
 * @Author: Will.Su
 * @Desc: Form validator for Vue.js/MUI v1.0.1
 * @Date:   2016-04-23 13:48:55
 * @Last Modified by:   Wei
 * @Last Modified time: 2017-02-21 11:15:54
 */
"use strict";

var validate = {
	/**
	 * 验证正则条件
	 */
	rule: {
		"*": /^[\w\W]+$/, //任意不为空
		"n": /^\d+$/, //数字
		"vc": /^[A-Za-z0-9]+$/, //验证码
		"s": /^[\u4E00-\u9FA5\uf900-\ufa2d\w\.\s]+$/, //特殊字符
		"p": /^[0-9]{6}$/, //邮政编码
		"m": /(^1[3,4,5,7,8]{1}[0-9]{9}$)/, //手机
		"gh": /^(\d{3,4}\-?)?\d{7,8}$/, //固话
		/*"tel": /^(((0\d{3}[\-]){1}\d{7,8}|(0\d{2}[\-]){1}\d{7,8}))([\-]\d{1,4})?$/, //联系电话*/
		"tel": /^\d{1,16}$/, //联系电话
		"f": /^((\+?[0-9]{2,4}\-[0-9]{3,4}\-)|([0-9]{3,4}\-))?([0-9]{7,8})(\-[0-9]+)?$/, //传真
		"e": /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, //邮箱
		"url": /^(\w+:\/\/)?\w+(\.\w+)+.*$/, //地址路径
		"zh": /^[\u4E00-\u9FA5\uf900-\ufa2d]+$/, //中文
		"float":/^[-\+]?\d+(\.\d+)?$/,//浮点数字
		"+integer":/^[1-9]\d*$/,//正整数
		"money":/^([1-9]+[0-9]*(\.[0-9]{1,2})?|0\.[1-9]([0-9]{0,1})|0\.0[1-9]|([1-9][0-9]*))$/,//金钱/^((\d{1,3}(,\d{3})+?|\d+)(\.\d{1,2})?|(\.\d{1,2}))$/
		"gold-amt":/^(([1-9]+)|([0-9]+(\.[0-9]{1,4})?))$/,//金钱/^((\d{1,3}(,\d{3})+?|\d+)(\.\d{1,2})?|(\.\d{1,2}))$/
		"u": /^[a-zA-Z][a-zA-Z0-9_]$/, //用户名
		"up": /^.*[A-Za-z0-9\\w_-]+.*$/, //用户密码
		"sfz": /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, //身份证
		"hz": /^(P\d{7}|G\d{8}|S\d{7,8}|D\d+|1[4,5]\d{7})$/, //护照
		"org": /^([0-9A-Z]){8}-[0-9|X]$/, // 组织机构代码
		"bc": /^\d{12,32}$/, // 银行卡
		"zh-n": /^[\u4E00-\u9FA5\uf900-\ufa2d]+$/, // 姓名
		"address": /^[\w\W]+$/, //任意不为空
		"up-n": /\d/, // 密码-数字
		"up-w": /[A-Za-z]/, // 密码-字母
		"up-l": /^[A-Za-z0-9]{8,24}$/, // 密码-长度
		"sfz-dt": /([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})\.(((0[13578]|1[02])\.(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)\.(0[1-9]|[12][0-9]|30))|(02\.(0[1-9]|[1][0-9]|2[0-8])))/ // 日期2017.01.01
	},
	/**
	 * 验证提示信息
	 */
	msg: {
		"*": "请填写{limit}任意字符",
		"n": "请填写{limit}数字",
		"vc": "请填写{limit}验证码",
		"s": "请填写{limit}字符",
		"p": "请填写正确的邮政编码",
		"m": "请输入正确的手机号码",
		"gh": "请填写固定电话",
		"tel": "请输入正确的电话号码，纯数字且不超过16位",
		"f": "请填写传真号码",
		"e": "邮箱地址格式不对",
		"url": "请填写网址",
		"zh": "请填写个{limit}中文汉字",
		"float": "请填写数字",
		"+integer": "请输入正整数",
		"money": "请填写正确的金额(保留两位小数)",
		"gold-amt": "请填写正确的金额(保留四位小数)",
		"u": "用户名可以由字母、数字、下划线组成，以字母开头，长度为{limit}",
		"up": "密码可以由字母、数字及符号组成，长度为{limit}",
		"sfz": "请输入正确的身份证号码",
		"hz": "请填写护照",
		"org": "请输入正确的组织机构代码",
		"bc": "请输入正确的账号/卡号",
		"zh-n": "请输入正确的姓名",
		"address": "请选择地址",
		"up-n": "密码必须包含数字",
		"up-w": "密码必须包含字母",
		"up-l": "请输入8-24位数字+字母的密码",
		"sfz-dt": "请输入正确的身份证截止日期"
	},
	// 获取元素值
	getValue: function(element) {
		var value;
		if (element.classList.contains("u-radio")) { //处理单选框
			value = element.parentNode.querySelectorAll(".u-radio.z-sel").dataset.id || "";
		} else if (element.classList.contains("u-select-ipt")) { //处理下拉框select
			value = element.dataset.id || "";
		} else {
			value = element.value;
		}
		return value.replace(/(^\s*)|(\s*$)/g, '');
	},
	/**
	 * @Description: 检验form
	 * @Version: V1.00
	 * @Parameters:checkElement 表单元素
	 * @Return true | false
	 */
	checkForm: function(checkElement) {
		var that = this,
			flag = true;
		var validateElements = document.querySelectorAll(checkElement + ' [data-type]:not([type=hidden])');
		for (var i = 0; i < validateElements.length; i++) {
			var element = validateElements[i];
			var datatype = that.getDatatype(element);
			var value = that.getValue(element);

			// 统一处理非空提示
			if (datatype.length != 0 && value.length === 0) {
				var placeHolder = element.getAttribute('placeholder');
				if (placeHolder) {
					mui.toast(placeHolder);
					flag = false;
					return flag;
				}
			}

			for (var j in datatype) {
				if(!datatype.hasOwnProperty(j)) {
					continue;
				}
				var dt = datatype[j].dt,
					dtLimit = datatype[j].dtLimit || null,
					msg = that.msg[dt];
				//获取正则
				var reg = that.rule[dt];
				//判断元素是否匹配正则
				if (value.replace(/\s/g, "").length === 0 && element.getAttribute('nocheck') == "nocheck") {
					flag = true;
				} else if (/tobe/.test(dt)) {
					var $tobe = document.getElementById(dt.replace("tobe(", "").replace(")", ""));
					if (value != that.getValue($tobe)) {
						mui.toast('新密码与密码确认输入不一致');
						flag = false;
						return flag;
					}
				} else {
					//处理类型
					if (dtLimit != null) {
						//处理长度
						var start = parseInt(dtLimit[0], 10),
							end = parseInt(dtLimit[1], 10);
						reg = eval(("" + reg).replace("+", "{" + start + "," + end + "}"));
						//处理返回信息
						msg = msg.replace("{limit}", "" + start + "-" + end + "位");
					} else {
						msg = msg.replace("{limit}", "");
					}
					if (!reg.test(value)) {
						if (element.classList.contains("u-radio")) { //处理单选框
							msg = "请选择此选项";
						} else if (element.classList.contains("u-select")) { //处理下拉框select
							msg = "请选择";
						} 
						//element.focus();
						mui.toast(msg);
						flag = false;
						return flag;
					}
				}
			}
		}
		return flag;
	},
	/**
	  * @Description: 获取元素上检验格式
	  * @Version: V1.00 
	  * @Create Date: 2015-12-11上午11:22:37
	  * @Parameters:@param _this  
	  * 	<code>*|n{1,3} 代表 不为空 且 为数字</code>
	  * @Return 
	  *	[{
			dt: 检验格式,
			dtLimit : 限制长度
		}]
	 */
	getDatatype: function(element) {
		var dts = element.dataset.type.replace(/\s/g, "").split("|"),
			dtArray = [];
		for (var i in dts) {
			if(!dts.hasOwnProperty(i)) {
				continue;
			}
			var dt = dts[i],
				dtLimitNum = [],
				dtLimit;
			//如果datatype中包含数字
			if (/\d/.test(dt)) {
				dtLimit = dt.substr(0, dt.indexOf("{"));
				dtLimitNum = dt.substr(dt.indexOf("{") + 1, dt.indexOf("}") - 2).split(",");
				dtArray.push({
					dt: dtLimit,
					dtLimit: dtLimitNum
				});
			} else {
				dtArray.push({
					dt: dt
				});
			}
		}
		return dtArray;
	},
	/**
	 * @Description: 检验form 表单元素入口
	 * @Version: V1.00
	 * @Parameters:FormId 表单id
	 * @Return void
	 */
	check: function(FormId) {
		var that = this;
		try {
			return that.checkForm(FormId);
		} catch (e) {
			if (console) {
				console.log(e);
			}
		}
	}
};

module.exports = validate;