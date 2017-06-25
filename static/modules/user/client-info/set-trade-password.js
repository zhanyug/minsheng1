/* 
* @Author: Wei
* @Date:   2016-05-12 01:06:51
* @Last Modified by:   Wei
* @Last Modified time: 2017-01-04 15:30:52
*/

'use strict';

var common = require('util/common'),
    validator = require('util/validator'),
    wx = require('static/libs/wechat/jweixin'),
    Vue = require('vue');

var intervalId = undefined,
    timeoutCount = 59,
    fw = '';

module.exports = Vue.extend({
    template: __inline('set-trade-password.tpl'),
	data: function() {
		return {
            title: '设置交易密码',
            lnLink: undefined, // return page
            tradeCode: 'TXSET',
            needRegister: false,
            needSupplementInfo: false,
            needOldPassword: false,
            needMobileNo: true,
            setTradePasswordUrl: '',
            userName: '',
            idNo: '',
            bankCard: '',
            resMobile: '',
            verifyCode: '',
            oldTxPwd: '',
	        txPwd: '',
	        sendValidCodeBtnText: '获取',
	        sendValidCodeBtnClass: {
	            'z-dis': false
	        },
            returnData: {
                idNoPrefix: '',
                bankCardPrefix: '',
                userNameConfused: '',
                bankCard: '',
                idNoConfused: '',
                bankCardConfused: '',
                resMobile: '',
                verifyCode: ''
            },
            showProgress: false,
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
            // load wx jssdk
            common.wx.getLocation(wx, this);
        }
    },
    methods: {
        sendValidCode: function() {
            var vm = this;
            if (vm.sendValidCodeBtnClass['z-dis']) return;
            if (validator.check('#mobile-row')) {
                var data = {
                    trade: '02',
                    phone: this.resMobile,
                    tradeCode: vm.tradeCode
                };
                vm.sendValidCodeBtnClass['z-dis'] = true;

                var params = mui.extend({}, data, vm.locationInfo);

                sendValidCode(params, function(json) {
                    vm.sendValidCodeBtnText = '60';
                    intervalId = window.setInterval(function() {
                        if (timeoutCount == 0) {
                            window.clearInterval(intervalId);
                            timeoutCount = 59;
                            vm.sendValidCodeBtnText = '获取';
                            vm.sendValidCodeBtnClass['z-dis'] = false;
                        } else {
                            vm.sendValidCodeBtnText = timeoutCount--;
                        }
                    }, 1000);                    
                }, function(json) {
                    vm.sendValidCodeBtnText = '获取';
                    vm.sendValidCodeBtnClass['z-dis'] = false;
                });
            }
        },
        setTradePassword: function() {
            var vm = this;
            var form = '';
            if (vm.needRegister) {
                form = '#m-reg-trade-password-form'; 
            } else if (vm.needSupplementInfo) {
                form = '#m-set-trade-password-form'; 
            } else if (vm.needOldPassword) {
                form = '#m-reg-trade-password-form';
            }

            if (validator.check(form)) {
                var requestData = {
                    txPwd: vm.txPwd
                };
                if (vm.needSupplementInfo) {
                    if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(vm.returnData.idNoPrefix + vm.idNo)) {
                        common.msg('身份证号格式不正确');
                        return;
                    }
                    var bankCard = vm.returnData.bankCard.substring(0, vm.returnData.bankCard.length - 6) + vm.bankCard;
                    if (bankCard.length < 12 || bankCard.length > 32) {
                        common.msg('银行卡号格式不正确');
                        return;
                    }
                    requestData.userName = vm.userName;
                    requestData.idNo = vm.returnData.idNoPrefix + vm.idNo;
                    requestData.bankCard = bankCard;
                    requestData.resMobile = vm.resMobile;
                    requestData.verifyCode = vm.verifyCode;
                    requestData.enterFlag = 0;
                } else {
                    if (vm.needOldPassword) {
                        requestData.enterFlag = 0;
                        requestData.oldTxPwd = vm.oldTxPwd;
                        requestData.verifyCode = vm.verifyCode;
                    } else {
                        requestData.enterFlag = 1;
                    }
                }
                var params = mui.extend({}, requestData, vm.locationInfo);
                common.Ajax({
                    url: vm.setTradePasswordUrl,
                    data: params,
                    fw: fw,
                    success: function(json) {
                        common.msg('操作成功');
                        if (fw == '') {
                            window.router.go({
                                path: '/user/index'
                            });
                        } else {
                            // 如有fw参数，此时url参数无值，则为流程最终节点，完成后直接跳转至fw页面
                            window.router.go({
                                path: fw
                            });
                        }
                    }
                });
            }
        }
    },
    ready: function() {
        fw = this.$route.query.fw || '';
        var vm = this;

        if (intervalId) {
            timeoutCount = 59;
            window.clearInterval(intervalId);
        }

        var queryUrl = '';
        var stepQueryUrl = '';
        if (vm.$route.query.auth == '3') {
            queryUrl = 'api/wx/user/setTxPwdQueryDirect';
            stepQueryUrl = 'api/wx/user/stepQueryDirect';
        } else {
            queryUrl = 'api/wx/lg/user/setTxPwdQuery';
            stepQueryUrl = 'api/wx/lg/user/stepQuery';
        }

        common.Ajax({
            url: queryUrl,
            data: null,
            success: function(json) {
                vm.setTradePasswordUrl = 'api/wx/user/setTxPwd';
                vm.returnData.bankCard = json.bankCard;
                if (vm.$route.query.auth == '1' || vm.$route.query.auth == undefined) {
                    // 用户中心 - 修改交易密码 + 从业务流程跳转此处的前置任务
                    if (json.isNull && json.isNull == '1') {
                        // 未设置交易密码
                        vm.needSupplementInfo = true;
                        vm.needRegister = false;
                        vm.needOldPassword = false;
                        vm.returnData.idNoPrefix = json.idNo.substring(0, json.idNo.length - 6);
                        vm.returnData.bankCardPrefix = json.bankCard.substring(0, json.bankCard.length - 6);
                    
                        common.msg('请先设置交易密码');
                        common.Ajax({
                            url: stepQueryUrl,
                            data: {
                                url: '/user/client-info/set-trade-password'
                            },
                            success: function(json) {
                                vm.title = json.step + ' ' + json.desc;
                                vm.lnLink = '/user/index';
                            }
                        });
                    } else {
                        // 已设置交易密码
                        vm.needRegister = true;
                        vm.needSupplementInfo = false;
                        vm.needOldPassword = true;
                        vm.returnData.userNameConfused = json.userName;
                        vm.returnData.idNoConfused = json.idNo;
                        vm.returnData.bankCardConfused = json.bankCard;
                        vm.returnData.resMobile = json.resMobile;
                        vm.resMobile = json.resMobile;
                        vm.setTradePasswordUrl = 'api/wx/auth/user/updateTxPwd';
                        vm.tradeCode = 'TXMOD';
                        vm.title = '修改交易密码';
                    }
                } else if (vm.$route.query.auth == '2') {
                    // 用户中心 - 重置交易密码
                    vm.needSupplementInfo = true;
                    vm.needRegister = false;
                    vm.needOldPassword = false;
                    vm.returnData.idNoPrefix = json.idNo.substring(0, json.idNo.length - 6);
                    vm.returnData.bankCardPrefix = json.bankCard.substring(0, json.bankCard.length - 6);

                    if (json.isNull && json.isNull == '1') {
                        common.msg('请先设置交易密码');
                        // 未设置交易密码
                        common.Ajax({
                            url: stepQueryUrl,
                            data: {
                                url: '/user/client-info/set-trade-password'
                            },
                            success: function(json) {
                                vm.title = json.step + ' ' + json.desc;
                                vm.lnLink = '/user/index';
                                vm.tradeCode = 'TXSET';
                            }
                        });
                    } else {
                        // 已设置交易密码
                        vm.needMobileNo = false;
                        vm.tradeCode = 'TXRESET';
                        vm.title = '重置交易密码';
                        vm.returnData.resMobile = json.resMobile;
                        vm.resMobile = json.resMobile;
                        vm.setTradePasswordUrl = 'api/wx/auth/user/resetTxPwd';
                    }
                } else if (vm.$route.query.auth == '3') {
                    // 用户注册 - 直接设置交易密码
                    vm.showProgress = true;
                    vm.needRegister = true;
                    vm.needSupplementInfo = false;
                    vm.needOldPassword = false;
                    vm.returnData.userNameConfused = json.userName;
                    vm.returnData.idNoConfused = json.idNo;
                    vm.returnData.bankCardConfused = json.bankCard;
                    vm.returnData.resMobile = json.resMobile;
                    vm.resMobile = json.resMobile;
                } else {
                    // 非法跳转，直接跳转回首页
                    router.go({ path: '/user/index'});
                }
            },
            failure: function(json) {
                router.go({ path: '/user/index'});
            }
        })
    }
});
// 发送验证码
function sendValidCode(data, callback, failure) {
    common.Ajax({
        url: 'api/wx/user/sendVerifyCode',
        data: data,
        success: function(json) {
            typeof callback === 'function' && callback(json);
        },
        failure: function(json) {
            typeof failure === 'function' && failure(json);
        }
    })
}