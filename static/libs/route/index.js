/* 
 * @Author: Wei
 * @Date:   2016-05-10 17:00:00
 * @Last Modified by:   Wei
 * @Last Modified time: 2017-02-21 19:01:46
 */
'use strict';

var common = require('util/common');

module.exports = function(router) {
	router.map({
		'/user/index': {
			name: 'index',
			component: function (resolve) {
				require(['static/modules/index'], resolve);
			},
			title: '中原消费金融'
		},
		'/user/modify-password': {
			component: function(resolve) {
				require(['static/modules/user/modify-password/module'], resolve);
			},
			title: '修改密码'
		},
		'/user/find-password': {
			name: 'find-password',
			component: function(resolve) {
				require(['static/modules/user/find-password/module'], resolve);
			},
			title: '找回密码'
		},
		'/user/client-info/set-trade-password': {
			name: 'set-trade-password',
			component: function(resolve) {
				require(['static/modules/user/client-info/set-trade-password'], resolve);
			},
			title: '设置交易密码'
		},
		'/user/m-verified': {
			name: 'm-verified',
			component: function(resolve) {
				require(['static/modules/user/m-verified/module'], resolve);
			},
			title: '实名认证'
		},
		'/msg-verified': {
			name: 'msg-verified',
			component: function(resolve) {
				require(['static/modules/user/msg-verified/module'], resolve);
			},
			title: '实名认证'
		},
		'/verified-code': {
			name: 'verified-code',
			component: function(resolve) {
				require(['static/modules/user/verified-code/module'], resolve);
			},
			title: '实名认证'
		},
		'/user/personal-info': {
			name: 'personal-info',
			component: function(resolve) {
				require(['static/modules/user/personal-info/module'], resolve);
			},
			title: '个人信息反显'
		},
		'/user/client-info/set-multi-media': {
			name: 'set-multi-media',
			component: function(resolve) {
				require(['static/modules/user/client-info/set-multi-media'], resolve);
			},
			title: '图像声纹采集'
		},
		/*
		 * hide for temporary
		'/user/client-info/set-basic-info': {
			name: 'set-basic-info',
			component: function(resolve) {
				require(['static/modules/user/client-info/set-basic-info'], resolve);
			},
			title: '基础信息录入'
		},*/
		'/loan/apply': {
			component: function(resolve) {
				require(['static/modules/loan/apply/module'], resolve);
			},
			title: '活动宣传页'
		},
		'/loan/apply/apply-active/:applyId': {
			name: 'loanApplyActive',
			component: function(resolve) {
				require(['static/modules/loan/apply/apply-active'], resolve);
			},
			title: '额度激活'
		},
		'/loan/apply/apply-limit': {
			component: function(resolve) {
				require(['static/modules/loan/apply/apply-limit'], resolve);
			},
			title: '额度激活'
		},
		'/loan/apply/apply-progress': {
			component: function(resolve) {
				require(['static/modules/loan/apply/apply-progress'], resolve);
			},
			title: '申请进度'
		},
		'/loan/apply/query': {
			component: function(resolve) {
				require(['static/modules/loan/apply/query/module'], resolve);
			},
			title: '申请查询'
		},
		'/user/loanType': {
			component: function(resolve) {
				require(['static/modules/user/loanDrawing/loanType/module'], resolve);
			},
			title: '我要提款'
		},
		'/user/:userId': {
			name: 'user',
			component: function(resolve) {
				require(['static/modules/user/loanDrawing/loanSinfo/module'], resolve);
			},
			title: '我要提款'
		},
		'/drawing/:userId': {
			name: 'drawing',
			component: function(resolve) {
				require(['static/modules/user/loanDrawing/drawing/module'], resolve);
			},
			title: '我要提款'
		},
		'/loanMingxi/:userId': {
			name: 'loanMingxi',
			component: function(resolve) {
				require(['static/modules/user/loanDrawing/loanMingxi/module'], resolve);
			},
			title: '我要提款'
		},
		'/loanSuccess/:userId': {
			name: 'loanSuccess',
			component: function(resolve) {
				require(['static/modules/user/loanDrawing/loanSuccess/module'], resolve);
			},
			title: '我要提款'
		},
		'/userRepayIndex': {
			component: function(resolve) {
				require(['static/modules/user/loanRepay/repayIndex/module'], resolve);
			},
			title: '我要还款'
		},
		'/userRe/repayList': {
			component: function(resolve) {
				require(['static/modules/user/loanRepay/repayList/module'], resolve);
			},
			title: '我要还款'
		},
		'/userRePlanInfo/:userId': {
			name: 'userRePlanInfo',
			component: function(resolve) {
				require(['static/modules/user/loanRepay/repayPlanInfo/module'], resolve);
			},
			title: '我要还款'
		},
		'/userRepayCost/:userId': {
			name: 'userRepayCost',
			component: function(resolve) {
				require(['static/modules/user/loanRepay/repayCost/module'], resolve);
			},
			title: '我要还款'
		},
		'/userrepay/:userId': {
			name: 'userrepay',
			component: function(resolve) {
				require(['static/modules/user/loanRepay/repay/module'], resolve);
			},
			title: '我要还款'
		},
		'/user/repaySuccess': {
			name: 'repaySuccess',
			component: function(resolve) {
				require(['static/modules/user/loanRepay/repaySuccess/module'], resolve);
			},
			title: '我要还款'
		},
		'/user/login': {
			name: 'login',
			component: function(resolve) {
				require(['static/modules/user/login/module'], resolve);
			},
			title: '登录'
		},
		'/user/register': {
			name: 'register',
			component: function(resolve) {
				require(['static/modules/user/register/module'], resolve);
			},
			title: '注册'
		},
		'/user/login-out': {
			name: 'login-out',
			component: function(resolve) {
				require(['static/modules/user/login-out/module'], resolve);
			},
			title: '个人中心'
		},
		'/help': {
			name: 'help',
			component: function(resolve) {
				require(['static/modules/help/module'], resolve);
			},
			title: '帮助中心'
		},
		'/help/repay': {
			name: 'help-repay',
			component: function(resolve) {
				require(['static/modules/help/repay'], resolve);
			},
			title: '主动还款失败如何处理？'
		},
		'/guide/register': {
			name: 'register-guide',
			component: function(resolve) {
				require(['static/modules/guide/register'], resolve);
			},
			title: '注册指引'
		},
		/*'/user/myList': {
			component: function(resolve) {
				require(['static/modules/user/myInfo/myList/module'], resolve);
			},
			title: '我的资料'
		},
		'/user/personInfo': {
			component: function(resolve) {
				require(['static/modules/user/myInfo/personInfo/module'], resolve);
			},
			title: '身份信息'
		},*/
		'/user/cardInfo': {
			component: function(resolve) {
				require(['static/modules/user/myInfo/cardInfo/module'], resolve);
			},
			title: '借记卡信息'
		},
		'/user/loan/query': {
			component: function(resolve) {
				require(['static/modules/loan/query/module'], resolve);
			},
			title: '贷款查询'
		},
		'/user/loan/query/repay/list': {
			component: function(resolve) {
				require(['static/modules/loan/query/repay'], resolve);
			},
			title: '贷款借据列表'
		},
		'/user/loan/query/repay/details': {
			name: 'loanQueryRepayDetails',
			component: function(resolve) {
				require(['static/modules/loan/query/loan-details'], resolve);
			},
			title: '贷款借据列详情'
		},
		'/loan/query/sign-limit': {
			component: function(resolve) {
				require(['static/modules/loan/query/sign-limit'], resolve);
			},
			title: '额度激活'
		},
		'/loan/query/sign-agreement': {
			component: function(resolve) {
				require(['static/modules/loan/query/sign-agreement'], resolve);
			},
			title: '额度激活'
		},
		'/loan/query/sign-result': {
			component: function(resolve) {
				require(['static/modules/loan/query/sign-result'], resolve);
			},
			title: '额度激活'
		},
		'/loan/query/repayDetails': {
			component: function(resolve) {
				require(['static/modules/loan/query/repay-details'], resolve);
			},
			title: '借款详情'
		},
		'/loan/query/repayDetailsItems': {
			component: function(resolve) {
				require(['static/modules/loan/query/repay-details-items'], resolve);
			},
			title: '借款详情'
		},
		'/loan/query/repayCalc': {
			component: function(resolve) {
				require(['static/modules/loan/query/repay-calc'], resolve);
			},
			title: '还款试算'
		},
		'/loan/query/partial-repay-calc': {
			component: function(resolve) {
				require(['static/modules/loan/query/partial-repay-calc'], resolve);
			},
			title: '部分还款试算'
		},
		'/loan/query/pay': {
			component: function(resolve) {
				require(['static/modules/loan/query/pay'], resolve);
			},
			title: '支付信息'
		},
		'/loan/query/partialPayment': {
			component: function(resolve) {
				require(['static/modules/loan/query/partial-payment'], resolve);
			},
			title: '支付信息'
		},
		'/info/company' : {
			name: 'companyIntro',
			component: function(resolve) {
				require(['static/modules/info/company'], resolve);
			},
			title: '中原消费金融'
		},
		'/upload/cms-multi-media' : {
			name: 'cms-upload',
			component: function(resolve) {
				require(['static/modules/upload/cms-multi-media'], resolve);
			},
			title: '上传影像信息'
		},
		'/upload/cms-multi-media/success' : {
			name: 'cms-upload-success',
			component: function(resolve) {
				require(['static/modules/upload/upload-success'], resolve);
			},
			title: '成功上传影像信息'
		},
		'/user/credit-limit' : {
			name: 'credit-limit',
			component: function(resolve) {
				require(['static/modules/user/credit-limit/module'], resolve);
			},
			title: '银行限额查询'
		},
		'/coupon/list': {
			name: 'coupon-list',
			component: function(resolve) {
				require(['static/modules/coupon/list'], resolve);
			},
			title: '优惠券列表'
		},
		'/info/special-sale': {
			name: 'special-sale',
			component: function(resolve) {
				require(['static/modules/info/activities'], resolve);
			},
			title: '产品介绍'
		},
		'*': {
			/*component: Vue.extend({
				template: '<p>404 page not found.</p>'
			})*/
			name: 'index',
			component: function(resolve) {
				require(['static/modules/index'], resolve);
			},
			title: '中原消费金融'
		}
	})

	router.redirect({
		// redirect / 到 /0
		'*': '/user/index'
	});

	router.beforeEach(function(transition) {
		console.log('ROUTE - ' + transition.to.path);
		// Firstly show the loading toast.
		router.app.isLoadingToastShow = true

		if (/*transition.to.name == 'login' 
				|| */
				transition.to.path.startWith('/wechat-frontend/app')
				|| transition.to.path.startWith('/app')
				|| transition.to.name == 'index'
				|| transition.to.name == 'login'
				|| transition.to.name == 'register'
				|| transition.to.name == 'register-guide'
				|| transition.to.name == 'help-repay'
				|| transition.to.name == 'help'
				|| transition.to.name == 'find-password'

				|| transition.to.name == 'm-verified'
				|| transition.to.name == 'msg-verified'
				|| transition.to.name == 'verified-code'
				// when the transition view is the page of set-trade-password, and the parameter 'auth' equals to 3, then DO NOT check login status.
				|| (transition.to.name == 'set-trade-password' && transition.to.query.auth == 3)

				|| transition.to.name == 'credit-limit'
				|| transition.to.name == 'companyIntro'
				|| transition.to.name == 'special-sale'
				|| transition.to.name == 'cms-upload'
				|| transition.to.name == 'cms-upload-success') {

			if (transition.to.name == 'm-verified' && transition.to.query && transition.to.query.auth && transition.to.query.auth == '2') {
				// when the transition name is m-verified, auth value is 1, to check login status is needed.
				checkLogin(router, transition);
			} else {
				// set page title
				if (transition.to.noTitle) {
					common.doc.setTitle(transition.to.title);
				}
				transition.next();
			}
		} else {
			checkLogin(router, transition);
		}
	});

	router.afterEach(function (transition) {
	  	console.log('Successfully changed view to: ' + transition.to.path);
	  	// Firstly close the loading toast.
	  	setTimeout(function() {
			router.app.isLoadingToastShow = false;
	  	}, 200);
	})
}

function checkLogin(router, transition) {
	common.Ajax({
		url: 'api/wx/user/checkLogin',
		data: null,
		success: function(json) {alert(json.isLogin)
			var lastLoginStatus = window.isLogin;
			window.isLogin = json.isLogin;
			if (json.isLogin === true) {
				if (transition.to.name == 'login') {
					// if login status is logged in and current request page is login, redirect to index page.
					router.go({
						name: 'index'
					});
				} else {
					transition.next();
				}
			} else {
				if (transition.to.name == 'login') {
					transition.next();
				} else {
					transition.abort();
					/*router.go({
						name: 'login',
						query: {
							fw: transition.to.path
						}
					});*/
					if (lastLoginStatus) {
						common.msg('会话超时，请重新登录', function() {
							// Instead of using vue-router, use wechat OAuth API to fetch the wxCode in order to login correctly.
							window.location.href = common.wxRedirectUri('/user/login?fw=' + encodeURIComponent(transition.to.path));
						});
					} else {
						// Instead of using vue-router, use wechat OAuth API to fetch the wxCode in order to login correctly.
						window.location.href = common.wxRedirectUri('/user/login?fw=' + encodeURIComponent(transition.to.path));
					}
				}
			}
		}	
	});
}