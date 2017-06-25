/* 
* @Author: Wei
* @Date:   2016-05-12 01:06:51
* @Last Modified by:   Wei
* @Last Modified time: 2017-01-04 14:51:15
*/

'use strict';

var common = require('util/common'),
    validator = require('util/validator'),
    wx = require('static/libs/wechat/jweixin'),
    Vue = require('vue');

var intervalId = undefined,
    timeoutCount = 59;

module.exports = Vue.extend({
    template: __inline('index.tpl'),
	data: function() {
		return {
            phone: '',
            verifyCode: '',
            password: '',
	        sendValidCodeBtnText: '点击验证',
	        sendValidCodeBtnClass: {
	            'z-dis': false
	        },
            locationInfo: {},
            wxCode: ''
	    }
    },
    route: {
        data: function (transition) {
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
                success: function (res) {
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
                }
            });
        },
        sendValidCode: function() {
            var vm = this;
            if (vm.sendValidCodeBtnClass['z-dis']) return;
            if (validator.check('#phone-row')) {
                vm.sendValidCodeBtnClass['z-dis'] = true;
                
                var data = {
                    trade: '02',
                    phone: vm.phone,
                    tradeCode: 'FWPWD',
                    wxCode: vm.wxCode
                };
                var params = mui.extend({}, data, vm.locationInfo);
                sendValidCode(params, function(response) {
                    vm.sendValidCodeBtnText = '60';
                    intervalId = window.setInterval(function() {
                        if (timeoutCount == 0) {
                            window.clearInterval(intervalId);
                            timeoutCount = 59;
                            vm.sendValidCodeBtnText = '点击验证';
                            vm.sendValidCodeBtnClass['z-dis'] = false;
                        } else {
                            vm.sendValidCodeBtnText = timeoutCount--;
                        }
                    }, 1000);
                }, function(response) {
                    vm.sendValidCodeBtnText = '点击验证';
                    vm.sendValidCodeBtnClass['z-dis'] = false;
                });
            }
        },
        resetPassword: function() {
            var vm = this;
            if (validator.check('#m-find-password-form')) {
                modifyTradePassword({
                    phone: vm.phone,
                    password: vm.password,
                    verifyCode: vm.verifyCode,
                    tradeCode: 'FWPWD'
                }, function(response) {
					common.msg('密码重置成功', function() {
                        window.location.href = common.wxRedirectUri('/user/login');
                    });
                }, function(json) {
                });
            }
        }
    },
    ready: function() {
        if (intervalId) {
            timeoutCount = 59;
            window.clearInterval(intervalId);
        }
        var vm = this;
        common.antiFraud.sendInfo();
        vm.wxCode = vm.$route.query.code;
        vm.phone = vm.$route.query.phone || '';
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

//修改交易密码
function modifyTradePassword(data, callback, failure) {
    common.Ajax({
        url: 'api/wx/user/forgetPassword',
        data: data,
        success: function(json) {
            typeof callback === 'function' && callback(json);
        },
        failure: function(json) {
            typeof failure === 'function' && failure(json);
        }
    })
}