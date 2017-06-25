/* 
 * @Author: Ma
 * @Date:   2016-05-16 09:25
 * @Last Modified by:   Wei
 * @Last Modified time: 2017-02-07 17:04:33
 */

'use strict';

/**
 * @require "static/scss/mui/plugins/mui.picker.css"
 */
var validator = require('util/validator'),
	common = require('util/common'),
	Data = require('util/data'),
    wx = require('static/libs/wechat/jweixin'),
	Vue = require('vue');
require('static/libs/mui/plugins/mui.picker')
require('static/libs/mui/plugins/mui.poppicker');

var loanUse = ''; //贷款用途，申请参数
var intervalId; //获取短信验证码按钮限时程序
var timeoutCount = 59; //获取短信验证码按钮倒计时
var varifyCodeLimitAmt = null;
var userPicker = undefined;

module.exports = Vue.extend({
	template: __inline('drawing.tpl'),
	data: function() {
		return {
			loanAmt: null, // 提款金额
			min_dn_amt: '-', // 最低提款额
			max_dn_amt: '-', // 最高提款额
			list_p_mtd: [],
			singleFlag: false,
			apply_tnr: '', // 申请期限
			apply_tnr_typ: '', // 申请期限类型
			min_amt: null, // 最小金额
			max_amt: null, // 最大金额
			mtd_cde: '', // 还款方式
			due_day: '', // 还款日
			day_int_rat: '', // 日利率
			apply_tnr_typ_list: [],
			mtd_cde_list: [],
			apply_tnr_typ_cls: null,
			mtd_cde_cls: null,
			showPayInfo: false,
			showPhoneInfo: false,
			showIdInfo: false,
			showApplyTnr: false,
			goNextBtnClass: {
				'z-dis': false
			},
			goNextBtnText: '提交',
			sendValidCodeBtnText: '获取',
			sendValidCodeBtnClass: {
				'z-dis': false
			},
			showTrialInfo: false,
			showTrialDetailInfo: false,
			showTrialDetailTitle: '展开',
			items: [],
			itemCosts: [],
			total_ps_prcp_amt: '',
			total_ps_norm_int: '',
			total_amt: '',
			total_ps_brokerage_amt: '',
			total_ps_prime_amt: '',
			duanxinCode: '',
			idNoPrefix: '',
			idNo: '', // 身份证后6位
			idNumber: '', // 身份证,
			tradePassword: '',
			drawAmtTips: '',
			locationInfo: {},
			view: {
				isShowAgreement1: false,
				isShowAgreement2: false,
				isShowAgreement3: false
			},
			argeement: {

			}
		}
	},
	route: {
        data: function (transition) {
            console.log('route view activated!');
            transition.next();
            console.warn('Change view to: ' + transition.to.path);

            // fetch Wechat JS API signature
            common.wx.fetchTokenSignature(wx, transition.to.path, common.wx.jsApi.location, this);
        }
    },
    methods: {
    	amountLimit: function(event) {
    		var el = event.target;
    		// 0-9 | .
    		// common.alert(el.value);

			el.value = el.value.replace(/[^\d\.]/g, '');

			var lastChar = el.value.substring(el.value.length - 1, el.value.length);
			if (el.value != '' && lastChar == '.' && el.value.substring(0, el.value.length - 1).indexOf('.') != -1) {
				el.value = el.value.substring(0, el.value.length - 1);
				return;
			}

    		if (el.value != '' && !validator.rule['money'].test(parseFloat(el.value))) {
    			el.value = el.value.substring(0, el.value.length - 1);
    		}
    	},
		applyClick: function(item) {
			var vm = this;
			vm.apply_tnr_typ = item.type;
			vm.apply_tnr_typ_cls = item.type;
			vm.day_int_rat = item.value;
			if (item.type == 'D' || item.type == 'M') {
				vm.showApplyTnr = true;
			} else {
				vm.showApplyTnr = false;
			}
		},
		mtdCdeClick: function(item) {
			var vm = this;
			vm.mtd_cde = item.type;
			vm.mtd_cde_cls = item.type;
			vm.day_int_rat = item.value;
		},
		loanAmtChange: function() {
			var vm = this;

			if (vm.loanAmt < vm.min_dn_amt) {
				vm.loanAmt = null;
				common.msg('提现金额不能小于最小限额[' + vm.min_dn_amt + ']');
				return;
			}
			if (vm.loanAmt > vm.max_dn_amt) {
				vm.loanAmt = null;
				common.msg('提现金额不能大于最大限额[' + vm.max_dn_amt + ']');
				return;
			}
			var loanAmt = parseInt(vm.loanAmt);
			if (varifyCodeLimitAmt && loanAmt > parseInt(varifyCodeLimitAmt.limitAmtFirst)) {
				vm.showPhoneInfo = true;
				if (loanAmt > parseInt(varifyCodeLimitAmt.limitAmtSecond)) {
					vm.showIdInfo = true;
				} else {
					vm.showIdInfo = false;
				}
			} else {
				vm.showPhoneInfo = false;
				vm.showIdInfo = false;
			}

			if (vm.singleFlag) {
				return;
			}

			var _apply_tnr_typ_list = [];
			var _mtd_cde_list = [];

			for (var i = 0; i < vm.list_p_mtd.length; i++) {
				if (vm.loanAmt >= vm.list_p_mtd[i].min_amt && vm.loanAmt <= vm.list_p_mtd[i].max_amt) {
					pushValueInArrayWhenNo(_apply_tnr_typ_list, {
						type: vm.list_p_mtd[i].apply_tnr_typ,
						value: vm.list_p_mtd[i].day_int_rat
					});
					pushValueInArrayWhenNo(_mtd_cde_list, {
						type: vm.list_p_mtd[i].mtd_cde,
						value: vm.list_p_mtd[i].day_int_rat
					});
				}
			}

			if (_apply_tnr_typ_list.length > 0 && _mtd_cde_list.length >0) {
				vm.apply_tnr_typ_list = _apply_tnr_typ_list;
				vm.apply_tnr_typ = '';
				vm.apply_tnr_typ_cls = null;
				vm.mtd_cde_list = _mtd_cde_list;
				vm.mtd_cde = '';
				vm.mtd_cde_cls = null;
				vm.day_int_rat = null
				vm.showApplyTnr = false;
			}
		},
		subBtn: function() {
			var vm = this;
			var params = {
				appl_cde: vm.$route.query.id,
				dn_amt: vm.loanAmt,
				apprv_tnr: vm.showApplyTnr ? vm.apply_tnr : vm.apply_tnr_typ,
				apprv_tnr_typ: vm.apply_tnr_typ,
				loan_freq: "1M",
				mtd_cde: vm.mtd_cde,
				due_day_opt: '2', //还款日类型          	1放款日对日2	固定日
				due_opt: '',
				purpose: loanUse
			}
			if(checkFull(params, this)) {
				common.Ajax({
					url: 'api/wx/lg/user/setTxPwdQuery',
					data: {},
					success: function(json) {
						vm.showPayInfo = true;
						vm.idNoPrefix = json.idNo.substring(0, json.idNo.length - 6);
					}
				});
			}
		},
		goNext: function() {
			var vm = this;
			if(vm.goNextBtnClass['z-dis']) return;

			var paramsDrawing = {
				appl_cde: vm.$route.query.id,
				dn_amt: vm.loanAmt,
				apprv_tnr: vm.showApplyTnr ? vm.apply_tnr : vm.apply_tnr_typ,
				apprv_tnr_typ: vm.apply_tnr_typ,
				loan_freq: '1M',
				mtd_cde: vm.mtd_cde,
				due_day_opt: '1', //还款日类型          	1放款日对日2	固定日
				due_opt: '',
				purpose: loanUse,
				txPwd: vm.tradePassword,
				verifyCode: '',
				checkType: '1', //1:校验密码，2：密码和校验码都校验
				refer_type: '04'
			};
			if(vm.showPhoneInfo) {
				//验证短信、支付密码，提交
				paramsDrawing.verifyCode = vm.duanxinCode;
				paramsDrawing.checkType = '2';
				
				if(paramsDrawing.txPwd == "" || paramsDrawing.txPwd == null || paramsDrawing.txPwd == undefined) {
					common.msg("请输入支付密码")
					return false;
				} else if(paramsDrawing.verifyCode == "" || paramsDrawing.verifyCode == null || paramsDrawing.verifyCode == undefined) {
					common.msg("请输入短信验证码")
					return false;
				}
			} else {
				//验证支付密码，提交
				if(paramsDrawing.txPwd == "" || paramsDrawing.txPwd == null || paramsDrawing.txPwd == undefined) {
					common.msg("请输入支付密码")
					return false;
				}
			}

			if (vm.showIdInfo) {
				if (validator.rule['sfz'].test(vm.idNoPrefix + vm.idNo)) {
					paramsDrawing.idNumber = vm.idNoPrefix + vm.idNo;
					paramsDrawing.checkType = '3'; // 校验身份证
				} else {
					common.msg('请输入正确的身份证号');
					return;
				}
			} else {
				paramsDrawing.idNumber = '';
			}

			var params = mui.extend({}, paramsDrawing, vm.locationInfo);

			console.log("提款申请参数+" + JSON.stringify(params));
			vm.goNextBtnClass['z-dis'] = true;
            vm.goNextBtnText = '<span class="mui-icon mui-icon-spinner spin"></span> 处理中';
			common.Ajax({
				url: 'api/wx/auth/credit/drawing',
				data: params,
				success: function(json) {
					console.log('remove poppicker');
					setTimeout(function() {
						vm.goNextBtnClass['z-dis'] = false;
			            vm.goNextBtnText = '提交';
						//提款成功
						router.go({
							name: 'loanSuccess',
							params: {
								userId: 'loanSuccess'
							},
							query: {
								id: vm.loanAmt,
							}
						})
					}, 500);
				},
				failure: function(json) {
					vm.goNextBtnClass['z-dis'] = false;
		            vm.goNextBtnText = '提交';
					common.msg(json.returnMsg);
				}
			})
		},
		sendValidCode: function() {
			var mobile;
			var vm = this;
			if(vm.sendValidCodeBtnClass['z-dis']) {
				return;
			}
			common.Ajax({
				url: 'api/wx/lg/user/queryUserAllInfo',
				data: {},
				success: function(json) {
					console.log("个人信息查询初始化+" + JSON.stringify(json))
					mobile = json.mobile;
					vm.sendValidCodeBtnClass['z-dis'] = true;
					
					var data = {
						trade: '02',
						phone: mobile,
						tradeCode: "DRAW"
					};

					var params = mui.extend({}, data, vm.locationInfo);
					common.Ajax({
						url: 'api/wx/user/sendVerifyCode',
						data: params,
						success: function(json) {
							vm.sendValidCodeBtnText = '60';
							intervalId = window.setInterval(function() {
								if(timeoutCount == 0) {
									window.clearInterval(intervalId);
									timeoutCount = 59;
									vm.sendValidCodeBtnText = '获取';
									vm.sendValidCodeBtnClass['z-dis'] = false;
								} else {
									vm.sendValidCodeBtnText = timeoutCount--;
								}
							}, 1000);
						},
						failure: function(json) {
							window.clearInterval(intervalId);
							timeoutCount = 59;
							vm.sendValidCodeBtnText = '获取';
							vm.sendValidCodeBtnClass['z-dis'] = false;
						}
					})

				},
				failure: function(json) {
					vm.sendValidCodeBtnText = '获取';
					vm.sendValidCodeBtnClass['z-dis'] = false;
				}
			})
		},
		closePayInfo: function() {
			this.showPayInfo = false;
		},
		showTrial: function() {
			var paramsRepayPlan = {
				cal_typ: "01", //01自定义02
				amt: this.loanAmt,
				apply_tnr: this.showApplyTnr ? this.apply_tnr : this.apply_tnr_typ,
				apply_tnr_typ: this.apply_tnr_typ,
				loan_freq: "1M",
				mtd_cde: this.mtd_cde,
				due_day_opt: '1', //还款日类型          	1放款日对日2	固定日
				due_day: '',
				day_int_rat: this.$route.query.day_int_rat,
				appl_cde: this.$route.query.id,
				loan_typ: this.$route.query.loan_typ
			};
			if(checkRePlan(paramsRepayPlan, this)) {
				repayPlanTrial(this, paramsRepayPlan);
			}
		},
		closeTrial: function() {
			this.showTrialInfo = false;
		},
		showTrialDetail: function() {
			if (this.showTrialDetailInfo) {
				this.showTrialDetailInfo = false;
				this.showTrialDetailTitle = '展开';
			} else {
				this.showTrialDetailInfo = true;
				this.showTrialDetailTitle = '收起';
			}
		},
		showCost: function(item) {
			if(item.list_fee_info != null) {
				this.itemCosts = item.list_fee_info.fee_info;
			} else {
				var arr = [{
					"fee_typ": 99
				}]
				this.itemCosts = arr;
			}
			var text = '';
			for (var i = 0; i < this.itemCosts.length; i++) {
				text += '<div class="f-tac">费用类型：' + common.getDict('fee_typData', this.itemCosts[i].fee_typ) + '</div><div class="f-tac">' + '费用金额：' + (this.itemCosts[i].fee_amt? this.itemCosts[i].fee_amt : 0) + '</div>';
			}
			common.alert(text);
		},
		returnDataInputView: function(event) {
			event.preventDefault();
			this.showPayInfo = false;
			document.getElementById('m-form-drawing').reset();
		}
	},
	ready: function() {

		if (intervalId) {
			timeoutCount = 59;
            window.clearInterval(intervalId);
        }

        // load wx jssdk
        common.wx.getLocation(wx, this);

		var appSeq = this.$route.query.id;
		var loan_typ = this.$route.query.loan_typ;
		var day_int_rat = this.$route.query.day_int_rat;
		//初始化页面数据
		initData(this, loan_typ, appSeq);

		common.Ajax({
            url: 'api/wx/lg/user/getLimitValue',
            data: {},
            success: function(json) {
            	varifyCodeLimitAmt = json;
            }
        });
	}
});

//初始化
function initData(vm, loan_typ, appSeq) {
	//申请前检查
	console.log("api/wx/flow/credit/chkDrawApply,appl_cde:" + appSeq);
	common.Ajax({
		url: 'api/wx/auth/credit/chkDrawApply',
		data: {
			appl_cde: appSeq
		},
		success: function(json) {
			if(json.allow_dn == "N") {
				common.alert(json.check_msg, function() {
					history.back();
				})
			} else {
				pickerUse();
				vm.min_dn_amt = json.min_dn_amt;
				vm.max_dn_amt = json.max_dn_amt;

				vm.drawAmtTips = '从' + common.format.amount(vm.min_dn_amt) + '到' + common.format.amount(vm.max_dn_amt);

				vm.list_p_mtd = json.list_p_mtd.p_mtd;
				vm.due_day = json.due_day;
				if (vm.list_p_mtd.length == 1) {
					vm.singleFlag = true;
					vm.apply_tnr_typ = vm.list_p_mtd[0].apply_tnr_typ;
					vm.mtd_cde = vm.list_p_mtd[0].mtd_cde;
					vm.day_int_rat = vm.list_p_mtd[0].day_int_rat;
					if (vm.apply_tnr_typ == 'D' || vm.apply_tnr_typ == 'M') {
						vm.showApplyTnr = true;
					}
				} else {
					vm.singleFlag = false;
				}
				for (var i = 0; i < vm.list_p_mtd.length; i++) {
					pushValueInArrayWhenNo(vm.apply_tnr_typ_list, {
						type: vm.list_p_mtd[i].apply_tnr_typ,
						value: vm.list_p_mtd[i].day_int_rat
					});
					pushValueInArrayWhenNo(vm.mtd_cde_list, {
						type: vm.list_p_mtd[i].mtd_cde,
						value: vm.list_p_mtd[i].day_int_rat
					});
				}
			}
		},
		failure: function(json) {

		}
	});
	// 初始化协议操作表
	initActionSheet(vm);
}

function initActionSheet(vm) {
	mui('body').on('shown', '.mui-popover', function(e) {
		//console.log('shown', e.detail.id);//detail为当前popover元素
	});
	mui('body').on('hidden', '.mui-popover', function(e) {
		//console.log('hidden', e.detail.id);//detail为当前popover元素
	});
	mui('body').on('tap', '.mui-popover-action li>a', function() {
		var a = this;
		var index = a.dataset.index;
		if (index == '1') {
			vm.view.isShowAgreement1 = true;
		} else if(index == '2') {
			common.Ajax({
				url: 'api/wx/lg/user/getUserInfo',
				data: {},
				success: function(json) {
					var date = new Date(json.todayDate);
					new Date();
					vm.argeement = {
						name: json.userName,
						idNo: json.idNo
					};
					vm.view.isShowAgreement2 = true;
				}
			})
		} else if (index == '3') {	
			vm.view.isShowAgreement3 = true;
		}
		// 关闭actionsheet
		mui('#' + parent.id).popover('toggle');
	})
}

/**
 * 数值不在数组中存住时加入数组
 * @param  {[type]}  arr   [数组]
 * @param  {[type]}  value [值]
 * @return {Boolean}       [description]
 */
function pushValueInArrayWhenNo(arr, item) {
	var isNotIn = true;
	for (var i = 0; i < arr.length; i++) {
		if (arr[i].type == item.type) {
			isNotIn = false;
		}			
	}
	if (isNotIn) {
		arr.push(item);
	};
}

//picker选择
function pickerUse() {
	userPicker = new mui.PopPicker();
	userPicker.setData(Data.loanUseType);
	// set default value 
	userPicker.pickers[0].setSelectedValue('OTH', 1000, function() {
		document.getElementById('showUserPicker').value = '其他';
		loanUse = 'OTH';
	});
	var showUserPickerButton = document.getElementById('showUserPicker');
	// var userResult = document.getElementById('userResult');
	showUserPickerButton.addEventListener('tap', function(event) {
		if (userPicker == undefined) {
			pickerUse();
		}
		userPicker.show(function(items) {
			document.getElementById('showUserPicker').value = items[0].text;
			loanUse = items[0].value;
			// 删除picker弹出层，解决跳转页面时此弹出层闪现的问题
			userPicker.dispose();
			userPicker = undefined;
		});
	}, false);
}

//检查是否完整
function checkFull(data, vm) {
	if(data.dn_amt == '' || data.dn_amt == null) {
		common.msg('请您输入要提款的金额');
		return false;
	} else if(data.dn_amt < Number(vm.amtSmall)) {
		common.msg('您输入的金额少于可提款的最小金额');
		return false;
	} else if(vm.showApplyTnr && (data.apprv_tnr == '' || data.apprv_tnr == null)) {
		common.msg('请您输入要提款的期限');
		return false;
	} else if(data.mtd_cde == '' || data.mtd_cde == null) {
		common.msg('请您输入要提款的还款方式');
		return false;
	} else if(data.purpose == '' || data.purpose == null) {
		common.msg('请选择贷款用途');
		return false;
	}
	return true;
}

//还款试算前检查
function checkRePlan(data, vm) {
	if(data.amt == '' || data.amt == null) {
		common.msg("请输入提款金额再进行试算");
		return false;
	} else if(vm.showApplyTnr && (data.apprv_tnr == '' || data.apprv_tnr == null)) {
		common.msg("请输入期数再进行试算");
		return false;
	} else if(data.mtd_cde == '' || data.mtd_cde == null) {
		mui.toast("请输入还款方式再进行试算");
		return false;
	}
	return true;
}

function repayPlanTrial(vm, par) {
	var par;
	console.log("提款试算的参数:" + JSON.stringify(par))
	common.Ajax({
		url: 'api/wx/auth/credit/repayPlanTrial',
		data: par,
		success: function(json) {
			console.log(JSON.stringify(json))
			vm.total_ps_prcp_amt = json.total_ps_prcp_amt;
			vm.total_ps_norm_int = json.total_ps_norm_int;
			vm.total_amt = json.total_ps_fee_amt + json.total_ps_tax_amt;
			vm.total_ps_brokerage_amt = json.total_ps_brokerage_amt;
			vm.total_ps_prime_amt = json.total_ps_prime_amt;
			vm.items = json.list_lm_shd.lm_shd;
			//隐藏原页面，显示还款计划页面
			vm.showTrialInfo = true;
			// setTimeout(function() {
			// 	openCost(vm);
			// }, 500)
		},
		failure: function(json) {
			
		}
	})
}

function openCost(vm) {
	var listObj = document.getElementsByClassName("cost-show");
	for(var k = 0; k < listObj.length; k++) {
		listObj[k].addEventListener("tap", function(event) {
			vm.itemCosts = [];
			for(var j = 0; j < vm.items.length; j++) {
				if(vm.items[j].ps_perd_no == this.id) {
					if(vm.items[j].list_fee_info != null) {
						vm.itemCosts = vm.items[j].list_fee_info.fee_info;
					} else {
						var arr = [{
							"fee_typ": 99
						}]
						vm.itemCosts = arr;
					}
				}
			}
		})
	}
}

