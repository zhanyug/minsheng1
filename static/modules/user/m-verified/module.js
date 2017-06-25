/* 
 * @Author: Ma
 * @Date:   2016-05-13 15;03
 * @Last Modified by:   Wei
 * @Last Modified time: 2017-02-22 12:48:12
 */

'use strict';

/**
 * @require("static/scss/mui/plugins/mui.picker.css")
 */
var common = require('util/common'),
	validator = require('util/validator'),
	Vue = require('vue'),
    wx = require('static/libs/wechat/jweixin');/*,
	EXIF = require('util/img/exif'),
	ImageCompresser = require('util/img/processImg')*/;
require('static/libs/mui/plugins/mui.picker');
	/*ImageCompresser = require('util/img-upload/imageCompresser'),
	JPEGEncoder = require('util/img-upload/JPEGEncoder');*/
	//身份证正反面路径
var head_image = '',
	handheld_image = '';
	//period = '';
var idCardInputTime=0;//身份证输入时长
var timeIdCard;//身份证输入时间计时器

// OCR识别状态
var isIdCardFrontRecongnizeCort = false;
var isIdCardBackRecongnizeCort = false;
var isRecongnizeTrigger = false; // 是否OCR识别触发switch toggle

module.exports = Vue.extend({
	template: __inline('m-verified.tpl'),
	data: function() {
		return {
			name: '',
			idCard: '',
			lastDate: '',
			period: '',
			saveBtnText: '下一步',
			saveBtnClass: {
				'z-dis': false
			},
			showFlag: false,
			nameShow: '',
			idCardShow: '',
			idPeriodShow: '',
			bankCardShow: '',
			resMobileShow: '',
			openid : '',
			isContentShow: false,
			images: {
				localId: [],
				serverId: []
			},
            isWxTokenFetched: false,
            ocr: {
            	ocr_user_name: '', // 用户名
				ocr_id_no: '', // 身份证号
				ocr_period: '', // 身份证有效期
				ocr_recd_no_id_front: '', // 身份证正面识别编号
				ocr_recd_no_id_back: '' // 身份证反面识别编号
            }
		}
	},
    route: {
        data: function (transition) {
        	alert(111111111111);
            console.log('route view activated!');
            transition.next();
           //console.warn('Change view to: ' + transition.to.path);

            var vm = this;
            // fetch Wechat JS API signature
            common.wx.fetchTokenSignature(wx, transition.to.path, common.wx.jsApi.image, this, function() {
                wx.ready(function () {
                    wx.hideOptionMenu();
                    vm.isWxTokenFetched = true;
                });
            });
        }
    },
	methods: {
		idCardAutoCapitalize: function(event) {
    		var el = event.target;
    		if (el.value && el.value != '') {
				el.value = el.value.toUpperCase();
    		}
    	},
        chooseImage: function(event) {
        	var vm = this;
        	var index = event.target.dataset.index;
        	wx.ready(function () {
	        	wx.chooseImage({
	        		count: 1, // 默认9
				    sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
			        success: function (res) {
			            vm.images.localId[index] = res.localIds[0];
			            event.target.src = res.localIds[0];
			            if (!mui.os.ios) {
			            	// 支持低版本Android系统，延迟100ms执行上传
			            	setTimeout(function() {
								vm.uploadImageToWechat(index);
			            	}, 100);
			            } else {
			            	vm.uploadImageToWechat(index);
			            }
			        },
			        fail: function (res) {
			          	// alert(JSON.stringify(res));
			          	// common.alert('微信接口异常');
			        }
			    });
		    });
        },
        uploadImageToWechat: function(index) {
        	var vm = this;
		    wx.uploadImage({
	            localId: vm.images.localId[index],
	            success: function (res) {
		          	vm.images.serverId[index] = res.serverId;
		          	vm.fetchRecongnizeResult(index, res.serverId);
		        },
		        fail: function (res) {
		         	// alert(JSON.stringify(res));
		         	// common.alert('微信接口异常');
		        }
	        });
        },
        // 获取识别信息
        fetchRecongnizeResult: function(index, serverId) {
        	var vm  = this;
			// common.msg('图片信息识别中……');
			router.app.isLoadingToastShow = true;
        	common.Ajax({
				url: 'api/wx/media/ocrIDRecognize',
				data: {
					id_type: '0' + (parseInt(index) + 1), // 01-身份证正面 02-身份证反面
					media_id: serverId
				},
				success: function(json) {
					// OCR信息
					if (index == '0') {
						// 身份证正面
						vm.name = json.name || vm.name || '';
						vm.idCard = json.id_number || vm.idCard || '';
						// 返后台信息
						vm.ocr.ocr_user_name = json.name || '';
						vm.ocr.ocr_id_no = json.id_number || '';
						vm.ocr.ocr_recd_no_id_front = json.ocrRecdNo || '';
						isIdCardFrontRecongnizeCort = true;
					} else if (index == '1') {
						// 身份证反面
						if (json.validity == '长期') {
							vm.period = '2199.12.31';
							if (!mui('.mui-content .mui-switch')[0].classList.contains('mui-active')) {
								mui(".mui-content .mui-switch").switch().toggle();
							}
						} else {
							vm.period = json.validity || vm.period || '';
							if (mui('.mui-content .mui-switch')[0].classList.contains('mui-active')) {
								isRecongnizeTrigger = true;
								mui(".mui-content .mui-switch").switch().toggle();
							}
						}
						// 返后台信息
						vm.ocr.ocr_period = json.validity || '';
						vm.ocr.ocr_recd_no_id_back = json.ocrRecdNo || '';
						isIdCardBackRecongnizeCort = true;
					}
					Vue.nextTick(function() {
                        router.app.isLoadingToastShow = false;
                    });
				},
				failure: function(json) {
					router.app.isLoadingToastShow = false;
					// 将识别状态置为错误
					if (index == '0') {
						isIdCardFrontRecongnizeCort = false;
					} else if (index == '1') {
						isIdCardBackRecongnizeCort = false;
					}
				}
			});
        },
		goNext: function() {
			if (validator.check('#m-set-multi-media-form-avatar')) {
				var vm = this;
				var parm = {
					userName: vm.name,
					idNumber: vm.idCard,
					period: vm.period,
					idInputTime:idCardInputTime,
					idInputType:"02",
					cardInputType:"02"
				};
				if (vm.images.serverId.length != 2) {
					common.msg('请上传身份证正反面图片');
					return;
				}
				if (common.checkCardID(vm.idCard)) {
					// 身份证正反面都通过OCR正常识别后才允许通过
					if (isIdCardFrontRecongnizeCort && isIdCardBackRecongnizeCort) {
						vm.saveBtnText = '<span class="mui-icon mui-icon-spinner spin"></span> 处理中';
						vm.saveBtnClass['z-dis'] = true;

						var data = {
							media_id_front: vm.images.serverId[0],
							media_id_back: vm.images.serverId[1],
							userName: vm.name,
							idNumber: vm.idCard,
							period: vm.period,
							idInputTime:idCardInputTime,
							idInputType:"02",
							cardInputType:"02"
						};
						var params = mui.extend({}, data, vm.ocr);

						common.Ajax({
							url: 'api/wx/media/uploadIDCard',
							data: params,
							success: function(json) {
								vm.saveBtnText = '下一步';
								vm.saveBtnClass['z-dis'] = false;
								/*router.go({
									name: 'msg-verified',
									query: parm
								})*/
								// 2017-01-07 调整为整页跳转
								window.location.href = location.protocol + '//' + location.host + '/wx/msg-verified?' + mui.param(parm);
							},
							failure: function(json) {
								vm.saveBtnText = '下一步';
								vm.saveBtnClass['z-dis'] = false;
							}
						});
					} else {
						common.alert('请上传正确的身份证正反面图片');
					}
				}
			}
		},
		closeCur: function() {
			router.go({
				path: "/user/index"
			});
		},
		dateBegin:function(){
			idCardInputTime=0;
			timeIdCard = setInterval(function() {
				console.log(idCardInputTime);
				idCardInputTime++;
			}, 1000);
		},
		dateEnd:function(){
			clearInterval(timeIdCard);
		},
		uiInit: function() {
			// ui init
			var RegisterFour_w = $(".RegisterFour_photo").width();
			var RegisterFour_h = RegisterFour_w*2/3;
			$(".RegisterFour_photo").css("height",RegisterFour_h);
			$(".RegisterFour_photo input").css("height",RegisterFour_h);
			$(".RegisterFour_photo img").css("height",RegisterFour_h-2);
			$(".RegisterFour_photo img").css("width",RegisterFour_w);
		}
	},
	ready: function() {
		var vm = this; 

		isIdCardFrontRecongnizeCort = false;
		isIdCardBackRecongnizeCort = false;

		mui.init();
		initData(this); alert('a1')
		//控制时间选择器
		var pickDateBtnInput = document.getElementById("pickDateBtn");
		pickDateBtnInput.addEventListener('tap', function() {
			pickDateBtnInput.focus();

			var isActive = mui('.mui-content .mui-switch')[0].classList.contains('mui-active') ? true : false;
			if (!isActive) {
				setTimeout(function() {
					var optionsJson = pickDateBtnInput.getAttribute('data-options') || '{}';
					var options = JSON.parse(optionsJson);
					var now = new Date();
					options.beginYear = now.getFullYear();
					options.beginMonth = now.getMonth() + 1;
					options.beginDay = now.getDate();
					var id = pickDateBtnInput.getAttribute('id');
					var picker = new mui.DtPicker(options);
					picker.show(function(rs) {
						/*
						 * rs.value 拼合后的 value
						 * rs.text 拼合后的 text
						 * rs.y 年，可以通过 rs.y.vaue 和 rs.y.text 获取值和文本
						 * rs.m 月，用法同年
						 * rs.d 日，用法同年
						 * rs.h 时，用法同年
						 * rs.i 分（minutes 的第二个字母），用法同年
						 */
						pickDateBtnInput.value = rs.text.replace(/-/g, '\.');
						// period = rs.value;
						console.log(rs.value)
						picker.dispose();
					});
				}, 200);
			}
		}, false);

		// init mui switch component manually.
		mui('.mui-switch').switch();
		mui('.mui-content .mui-switch').each(function() {
			this.addEventListener('toggle', function(event) {
				if (event.detail.isActive) {
					// Long term available ID.
					vm.period = '2199.12.31';
					pickDateBtnInput.value = '2199.12.31';
					pickDateBtnInput.style.color = '#FFF';
					pickDateBtnInput.dataset.type = '*';
					// 修复调整switch CSS后switch钮不能恢复到最右侧的问题
					mui('.mui-switch-handle')[0].style.transform = 'translate(34px, 0)';
				} else {
					pickDateBtnInput.style.color = '#666';
					if (isRecongnizeTrigger) {
						isRecongnizeTrigger = false;
					} else {
						// 手工触发才置空
						vm.period = '';
					}
					pickDateBtnInput.value = '';
					pickDateBtnInput.dataset.type = 'sfz-dt';
				}
			});
		});
	}
});
//初始化
function initData(vue) {
	// 获取openid
	vue.openid = common.getUrlParm('openid');

	if (vue.$route.query.auth == '1') {
		common.Ajax({
			url: 'api/wx/lg/user/queryRealNameAuth',
			data: {},
			success: function(json) {alert(json.data.authFlag)
				if (json.data.authFlag != "1") {
					//已经实名认证过
					vue.showFlag = true;
					vue.nameShow = json.data.userName;
					vue.idCardShow = json.data.idNo;
					vue.idPeriodShow = json.data.idPeriod;
					vue.bankCardShow = json.data.bankCard;
					vue.resMobileShow = json.data.resMobile;
				} else {
					vue.showFlag = false;
				}vue.isWxTokenFetched=true;
				var waitingIntvl = setInterval(function() {
					if (vue.isWxTokenFetched) {
						vue.isContentShow = true;
						Vue.nextTick(function() {
							vue.uiInit();
						});
						clearInterval(waitingIntvl);
					}
				}, 500);
			},
			failure: function(json) {
			}
		})	
	} else {
		var waitingIntvl = setInterval(function() {
			if (vue.isWxTokenFetched) {
				vue.isContentShow = true;
		       	Vue.nextTick(function() {
					vue.uiInit();
				});
				clearInterval(waitingIntvl);
			}
		}, 500);
	}
}
