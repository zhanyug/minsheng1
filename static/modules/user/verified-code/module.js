/* 
 * @Author: Ma
 * @Date:   2016-05-12 01:06:51
 * @Last Modified by:   Wei
 * @Last Modified time: 2017-01-10 16:28:50
 */

'use strict';

var validator = require('util/validator'),
    common = require('util/common'),
    wx = require('static/libs/wechat/jweixin'),
    Vue = require('vue');
var intervalId; //获取短信验证码按钮限时程序
var timeoutCount = 59; //获取短信验证码按钮倒计时
/*var failNum = 0;*/
module.exports = Vue.extend({
    template: __inline('verified-code.tpl'),
    data: function() {
        return {
            phoneCode: '',
            cardNo: '',
            phoneNoSign: '',
            phoneNoSignText: '',
            saveBtnText: '提交认证',
            saveBtnClass: {
                'z-dis': false
            },
            sendValidCodeBtnText: '重新获取',
            sendValidCodeBtnClass: {
                'z-dis': false
            },
            view: {
                isLoading: true
            },
            locationInfo: {}
        }
    },
    route: {
        data: function(transition) {
            console.log('route view activated!');
            transition.next();
            console.warn('Change view to: ' + transition.to.path);

            var vm = this;
            // fetch Wechat JS API signature
            common.wx.fetchTokenSignature(wx, transition.to.path, common.wx.jsApi.location, this, function() {
                wx.ready(function () {
                    wx.hideOptionMenu();
                    // Get location information
                    vm.getLocation();
                });
            });
        }
    },
    methods: {
        getLocation: function() {
            var vm = this;
            wx.getLocation({
                type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: function(res) {
                    var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                    var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                    var speed = res.speed; // 速度，以米/每秒计
                    var accuracy = res.accuracy; // 位置精度
                    vm.locationInfo = {
                        latitude: latitude,
                        longitude: longitude,
                        speed: speed,
                        accuracy: accuracy
                    };
                },
                fail: function(json) {
                	// alert(JSON.stringify(json));
                },
                cancel: function (res) {
					// alert('用户拒绝授权获取地理位置');
			    }
            });
        },
        submitVer: function() {
            var vm = this;
            if (vm.saveBtnClass['z-dis']) return;

            var params = {
                verifyCode: vm.phoneCode,
                cardNumber: vm.$route.query.cardNumber,
                resMobile: vm.$route.query.resMobile,
                userName: vm.$route.query.userName,
                idNumber: vm.$route.query.idNumber,
                period: vm.$route.query.period,
                idInputTime: vm.$route.query.idInputTime,
                idInputType: vm.$route.query.idInputType,
                cardInputType: vm.$route.query.cardInputType
            }
            if (params.verifyCode == '' || params.verifyCode == null || params.verifyCode == undefined) {
                common.msg("您还没有填写验证码");
                return;
            } else {
                vm.saveBtnText = '<span class="mui-icon mui-icon-spinner spin"></span> 处理中';
                vm.saveBtnClass['z-dis'] = true;

                common.Ajax({
                    url: 'api/wx/user/checkVerifyCode',
                    data: mui.extend({}, params, vm.locationInfo),
                    success: function(json) {
                        router.go({
                            path: '/user/client-info/set-trade-password',
                            query: {
                                auth: 3
                            }
                        });
                    },
                    failure: function(json) {
                        vm.saveBtnText = '提交认证';
                        vm.saveBtnClass['z-dis'] = false;
                    }
                });
            }
        },
        sendValidCode: function() {
            var vm = this;
            var data = {
                phone: vm.phoneNoSign,
                tradeCode: "AUTH",
                cardNo: vm.cardNo
            };
            var tailNo = vm.phoneNoSign.substring(7, 11);
            if (vm.sendValidCodeBtnClass['z-dis']) {
                return;
            } else {
                vm.phoneNoSignText = '正向您银行预留尾号为' + tailNo + '的手机号码发送短信，请稍后';
                vm.sendValidCodeBtnClass['z-dis'] = true;
            }
            if (vm.phoneNoSign != '') {

                var params = mui.extend({}, data, vm.locationInfo);

                common.Ajax({
                    url: 'api/wx/user/sendVerifyCodeReg',
                    data: params,
                    success: function(json) {
                        vm.phoneNoSignText = '已向您银行预留尾号为' + tailNo + '的手机号码发送了短信验证码';

                        vm.sendValidCodeBtnText = '60';
                        intervalId = window.setInterval(function() {
                            if (timeoutCount == 0) {
                                window.clearInterval(intervalId);
                                timeoutCount = 59;
                                vm.sendValidCodeBtnText = '重新获取';
                                vm.sendValidCodeBtnClass['z-dis'] = false;
                            } else {
                                vm.sendValidCodeBtnText = timeoutCount--;
                            }
                        }, 1000);
                    },
                    failure: function(json) {
                        window.clearInterval(intervalId);
                        timeoutCount = 59;
                        vm.sendValidCodeBtnText = '重新获取';
                        vm.sendValidCodeBtnClass['z-dis'] = false;
                    }
                })
            }
        }
    },
    ready: function() {
        if (intervalId) {
            timeoutCount = 59;
            window.clearInterval(intervalId);
        }
        var vm = this;
        vm.phoneNoSign = this.$route.query.resMobile;
        vm.cardNo = this.$route.query.cardNumber;
        vm.view.isLoading = false;
        vm.sendValidCode();
    }
});
