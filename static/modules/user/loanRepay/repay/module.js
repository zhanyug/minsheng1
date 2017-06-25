/* 
 * @Author: Ma
 * @Date:   2016-05-19 09:40
 * @Last Modified by:   Wei
 * @Last Modified time: 2017-02-07 14:24:03
 */

'use strict';

var validator = require('util/validator'),
	common = require('util/common'),
    wx = require('static/libs/wechat/jweixin'),
	Vue = require('vue');
var intervalId; //获取短信验证码按钮限时程序
var timeoutCount = 60; //获取短信验证码按钮倒计时
var parRepay;
module.exports = Vue.extend({
	template: __inline('repay.tpl'),
	data: function() {
		return {
			zhifuCode: '',
			currDate: '请稍等。。。',
			total_ps_prcp_amt: '', //本金
			total_ps_norm_int: '', //利息
			total_ps_od_int_amt: '', //罚金
			total_ps_comm_od_int: '', //复利
			total_ps_brokerage_amt: '', //佣金
			total_amort_prime_amt: '', //优惠
			total_ps_fee_amt: '', //费用
			total_ps_tax_amt: '', //增值税
			total_repay_amt: '', // 总金额
			btnText: '立即还款',
			goNextBtnClass: {
				'z-dis': false
			},
			goNextBtnText: '提交',
			checkBoxAll: true,
			checkBoxPart: false,
			sendValidCodeBtnText: '获取',
			sendValidCodeBtnClass: {
				'z-dis': false
			},
			showPayInfo: false,
			showVerifyCode: false,
			locationInfo: {}
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
		sendValidCode: function() {
			var mobile;
			var vm = this;
			if(vm.sendValidCodeBtnClass['z-dis']) {
				return;
			}
			common.Ajax({
				url: 'api/wx/lg/user/queryUserAllInfo',
				data: vm.locationInfo,
				success: function(json) {
					console.log("个人信息查询初始化+" + JSON.stringify(json))
					mobile = json.mobile;
					vm.sendValidCodeBtnClass['z-dis'] = true;
					
					var data = {
						trade: '02',
						phone: mobile,
						tradeCode: "REPAY"
					};
					console.log(JSON.stringify(data))
					common.Ajax({
						url: 'api/wx/user/sendVerifyCode',
						data: data,
						success: function(json) {
							vm.sendValidCodeBtnText = '60';
							intervalId = window.setInterval(function() {
								if(timeoutCount == 0) {
									window.clearInterval(intervalId);
									timeoutCount = 60;
									vm.sendValidCodeBtnText = '获取';
									vm.sendValidCodeBtnClass['z-dis'] = false;
								} else {
									vm.sendValidCodeBtnText = timeoutCount--;
								}
							}, 1000);
						},
						failure: function(json) {
							window.clearInterval(intervalId);
							timeoutCount = 60;
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
		toRepay: function() {
			var vm = this;
			common.Ajax({
	            url: 'api/wx/user/getSysValueBySysCode',
	            data: {
	                paramCode: 'VERIFY_CODE_LIMIT_AMT'
	            },
	            success: function(json) {
	            	if (parseFloat(vm.total_repay_amt) >= parseFloat(json.paramValue)) {
	                    vm.showVerifyCode = true;
	                } else {
	                    vm.showVerifyCode = false;
	                }
	            }
	        });
			this.showPayInfo = true;
		},
		goNext: function() {
			var vm = this;
			if(vm.goNextBtnClass['z-dis']) return;

			if(!checkPar(this)) {
				return false;
			}
			var paramsRepay = {
				settl_typ: parRepay.settl_typ,
				actv_pay_ind: parRepay.actv_pay_ind,
				amt: parRepay.amt,
				txPwd: this.zhifuCode,
				checkType: this.showVerifyCode ? 2 : 1,
				verifyCode: this.duanxinCode,
				list_lm_loan: parRepay.list_lm_loan,
				payoffLoanList: parRepay.payoffLoanList
			}

			var params = mui.extend({}, paramsRepay, vm.locationInfo);

			vm.goNextBtnClass['z-dis'] = true;
            vm.goNextBtnText = '<span class="mui-icon mui-icon-spinner spin"></span> 处理中';

			common.Ajax({
				url: 'api/wx/auth/credit/repaymentApply',
				data: params,
				success: function(json) {
					vm.goNextBtnClass['z-dis'] = false;
		            vm.goNextBtnText = '提交';
					router.go({
						path: "/user/repaySuccess"
					})
				},
				failure: function(json) {
					vm.goNextBtnClass['z-dis'] = false;
		            vm.goNextBtnText = '提交';
				}
			})
		},
		closePayInfo: function() {
			this.showPayInfo = false;
		},
		returnDataInputView: function(event) {
			event.preventDefault();
			this.showPayInfo = false;
			document.getElementById('m-loan-repay-form').reset();
		}
	},
	ready: function() {
		var vm = this;

		// load wx jssdk
        common.wx.getLocation(wx, this);
        
		var id = vm.$route.query.id;
		//初始化数据
		parRepay = window.tmp;
		console.log("主动还款试算申请参数：" + JSON.stringify(parRepay));
		common.Ajax({
			url: 'api/wx/auth/credit/initiRepayTrialBody',
			data: parRepay,
			success: function(json) {
				var currentDate = new Date();
				var year = currentDate.getFullYear();
				var month = currentDate.getMonth() + 1;
				var day = currentDate.getDate();
				var cuDate = year + "-" + month + "-" + day;
				vm.currDate = cuDate;
				vm.total_ps_prcp_amt = json.total_ps_prcp_amt; //本金
				vm.total_ps_norm_int = json.total_ps_norm_int; //利息
				vm.total_ps_od_int_amt = json.total_ps_od_int_amt; //罚金
				vm.total_ps_comm_od_int = json.total_ps_comm_od_int; //复利
				vm.total_ps_brokerage_amt = json.total_ps_brokerage_amt; //佣金
				vm.total_amort_prime_amt = json.total_amort_prime_amt; //优惠
				vm.total_ps_fee_amt = json.total_ps_fee_amt; //费用
				vm.total_ps_tax_amt = json.total_ps_tax_amt; //增值税
				vm.total_repay_amt = json.total_repay_amt; //总金额
			},
			failureHanlder: true,
			failure: function(json) {
				common.alert(json.returnMsg, function() {
					history.back();
				});
			}
		})
	}
});
//校验支付密码和短信校验码是否填写
function checkPar(vueObj) {
	if(vueObj.zhifuCode == "" || vueObj.zhifuCode == null || vueObj.zhifuCode == undefined) {
		common.msg("请输入支付证码");
		return false;
	} else if(vueObj.showVerifyCode && (vueObj.duanxinCode == "" || vueObj.duanxinCode == null || vueObj.duanxinCode == undefined)) {
		common.msg("请输入短信验证码");
		return false;
	}
	return true;
}