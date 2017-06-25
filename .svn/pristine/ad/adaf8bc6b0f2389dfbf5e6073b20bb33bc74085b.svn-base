/* 
* @Author: Wei
* @Date:   2016-05-12 01:06:51
* @Last Modified by:   Wei
* @Last Modified time: 2017-02-06 09:55:58
*/

'use strict';

var common = require('util/common'),
    validator = require('util/validator'),
    wx = require('static/libs/wechat/jweixin'),
    Vue = require('vue');

var intervalId = undefined,
    timeoutCount = 59;

module.exports = Vue.extend({
    template: __inline('pay.tpl'),
	data: function() {
		return {
	        origTradePassword: '',
	        newTradePassword: '',
	        sendValidCodeBtnText: '获取',
	        sendValidCodeBtnClass: {
	            'z-dis': false
	        },
            verifyCode: '',
            txPwd: '',
            showVerifyCode: false,
            loanNo: '',
            locationInfo: {},
            goNextBtnClass: {
                'z-dis': false
            },
            goNextBtnText: '提交',
	    }
    },
    route: {
        data: function (transition) {
            console.log('route view activated!');
            transition.next();
            console.warn('Change view to: ' + transition.to.path);

            // fetch Wechat JS API signature
            common.wx.fetchTokenSignature(wx, transition.to.path, common.wx.jsApi.location, this);
            // load wx jssdk
            common.wx.getLocation(wx, this);
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
                data: {},
                success: function(json) {
                    console.log("个人信息查询初始化+" + JSON.stringify(json))
                    mobile = json.mobile;
                    vm.sendValidCodeBtnClass['z-dis'] = true;
                    
                    var data = {
                        trade: '02',
                        phone: mobile,
                        tradeCode: "REPAY"
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
                            common.msg(json.returnMsg);
                            window.clearInterval(intervalId);
                            timeoutCount = 59;
                            vm.sendValidCodeBtnText = '获取';
                            vm.sendValidCodeBtnClass['z-dis'] = false;
                        }
                    })
                },
                failure: function(json) {
                    common.msg(json.returnMsg);
                    vm.sendValidCodeBtnText = '获取';
                    vm.sendValidCodeBtnClass['z-dis'] = false;
                }
            })
        },
        verifyPassword: function() {
            var vm = this;
            if(vm.goNextBtnClass['z-dis']) return;
            if (validator.check('#m-trade-password-verify-form')) {

                var data = {
                    txPwd: vm.txPwd,
                    checkType: vm.showVerifyCode ? 2 : 1,
                    verifyCode: vm.verifyCode,
                    settl_typ: '01',
                    actv_pay_ind: 'A',
                    amt: vm.$route.query.amt,
                    list_lm_loan: JSON.stringify([{
                        loan_no: vm.loanNo
                    }])
                };
                var params = mui.extend({}, data, vm.locationInfo);

                vm.goNextBtnClass['z-dis'] = true;
                vm.goNextBtnText = '<span class="mui-icon mui-icon-spinner spin"></span> 处理中';

                common.Ajax({
                    url: 'api/wx/auth/credit/repaymentApply',
                    data: params,
                    success: function(json) {
                        vm.goNextBtnClass['z-dis'] = false;
                        vm.goNextBtnText = '提交';
                        router.go({
                            path: '/user/repaySuccess'
                        });
                    },
                    failure: function(json) {
                        vm.goNextBtnClass['z-dis'] = false;
                        vm.goNextBtnText = '提交';
                    }
                });
            }
        }
    },
    ready: function() {
        var vm = this;

        vm.loanNo = this.$route.query.loan_no;

        common.Ajax({
            url: 'api/wx/user/getSysValueBySysCode',
            data: {
                paramCode: 'VERIFY_CODE_LIMIT_AMT'
            },
            success: function(json) {
                if (parseFloat(vm.$route.query.amt) >= parseFloat(json.paramValue)) {
                    vm.showVerifyCode = true;
                } else {
                    vm.showVerifyCode = false;
                }
            }
        });
    }
});