/* 
 * @Author: Ma
 * @Date:   2016-05-23 17:06:51
 * @Last Modified by:   Wei
 * @Last Modified time: 2017-01-07 17:10:13
 */

'use strict';

var validator = require('util/validator'),
	layer = require('layer'),
	common = require('util/common'),
    wx = require('static/libs/wechat/jweixin'),
	Vue = require('vue');
var intervalId; //获取短信验证码按钮限时程序
var timeoutCount = 59; //获取短信验证码按钮倒计时

module.exports = Vue.extend({
	template: __inline('register.tpl'),
	data: function() {
		return {
			mobile: '',
			code: '',
			wxCode: '',
			password: '',
			surepassword: '',
			sendValidCodeBtnText: '获取',
			sendValidCodeBtnClass: {
				'z-dis': false
			},
			locationInfo: {},
			view: {
				isShowAgreement: false
			}
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
		toGetInfo: function(id) {
            var param = this.$route.query;
            param.type = id;

            router.go({
                path: '/userRe/repayList',
                query: param
            });
        },
		showRegAgreement: function() {
			var l = layer.open({
				type: 1,
				title: [
					'用户注册协议',
					'color:#000; text-align: center'
				],
				content: document.getElementById('m-reg-agreement').innerHTML,
				style: 'z-index:19880330;background-color:#fff;position:fixed; left:0; top:0; width:100%; height:100%; border:none;',
				success: function() {
					document.querySelector('.layermbox .reg-agreement-content').style.height = document.body.scrollHeight - 50 + 'px';
				}
			});
		},
		register: function() {
			var vm = this;
			if(validator.check('#m-form-login')) {
				var data = {
					phone: vm.mobile,
					verifyCode: vm.code,
					password: vm.password,
					passAffirm: vm.surepassword,
					accept: '1'
				};
				register(data, function(response) {
					/*router.go({
						path: '/user/m-verified'
					});*/
					window.location.href = location.protocol + '//' + location.host + '/wx/user/m-verified';
				}, function(json) {
				});
			}
		},
		sendValidCode: function() {
			var vm = this;
			var data = {
				phone: vm.mobile,
				tradeCode: "REG",
				wxCode: vm.wxCode
			};
			if(vm.sendValidCodeBtnClass['z-dis']) {
				return;
			}
			if(validator.check('#phone-row')) {
				vm.sendValidCodeBtnClass['z-dis'] = true;

				var param = mui.extend({}, data, vm.locationInfo);

				common.Ajax({
					url: 'api/wx/user/sendVerifyCodeReg',
					data: param,
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
			}
		},
		show: function(){
			this.view.isShowAgreement = true;
			window.scrollTo(0,0);
		},
		hide: function(){
			this.view.isShowAgreement = false;
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
	}
});
//注册
function register(data, callback, failure) {
	common.Ajax({
		url: 'api/wx/user/register',
		data: data,
		success: function(json) {
			typeof callback === 'function' && callback(json);
		},
		failure: function(json) {
			typeof failure === 'function' && failure(json);
		}
	})
}
