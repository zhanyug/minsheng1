/* 
 * @Author: Wei
 * @Date:   2016-05-16 12:08:27
 * @Last Modified by:   Wei
 * @Last Modified time: 2017-02-20 16:30:12
 */

'use strict';

var common = require('util/common'),
    wx = require('static/libs/wechat/jweixin'),
    Vue = require('vue');

var data = {};

module.exports = Vue.extend({
    template: __inline('apply-limit.tpl'),
    data: function() {
        return {
            view: {
                isAgreementShow: false,
                isShowAgreement1: false,
                isShowAgreement2: false
            },
            locationInfo: {},
            argeement: {},
            applyBtnText: '申请激活',
            applyBtnClass: {
                'z-dis': false
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
            // load wx jssdk
            common.wx.getLocation(wx, this);
        }
    },
    methods: {
        applyActivate: function() {
            var vm = this;
            var referType = '04'; // 微信
            data.refer_type = referType;
            var params = mui.extend({}, data, vm.locationInfo);

            if (vm.applyBtnClass['z-dis']) return false;
            vm.applyBtnClass['z-dis'] = true;
            vm.applyBtnText = '<span class="mui-icon mui-icon-spinner spin"></span> 处理中';

            common.Ajax({
                url: 'api/wx/auth/credit/applyCredit',
                data: params,
                success: function(json) {
                    router.go({
                        name: 'loanApplyActive',
                        params: {
                            applyId: json.appl_cde,
                            check_serno: vm.$route.query.check_serno
                        }
                    });
                    vm.applyBtnClass['z-dis'] = false;
                    vm.applyBtnText = '申请激活';
                },
                failure: function() {
                    vm.applyBtnClass['z-dis'] = false;
                    vm.applyBtnText = '申请激活';
                }
            });
        },
        showAgreement2: function() {
            var vm = this;
            common.Ajax({
                url: 'api/wx/lg/user/getUserInfo',
                data: {},
                success: function(json) {
                    var date = new Date(json.todayDate);
                    new Date();
                    vm.argeement = {
                        name: json.userName,
                        idNo: json.idNo,
                        year: date.getFullYear(),
                        month: date.getMonth() + 1,
                        day: date.getDate()
                    };
                    vm.view.isShowAgreement2 = true;
                }
            });
        },
    },
    ready: function() {
        data = this.$route.query;
        data.agreementList = JSON.stringify([{
            agt_no: "SQ030000002",
            agt_type: "1"
        }, {
            agt_no: "SQ030000003",
            agt_type: "2"
        }]);
    }
});