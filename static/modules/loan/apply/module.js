/* 
 * @Author: Wei
 * @Date:   2016-05-16 12:08:27
 * @Last Modified by:   Wei
 * @Last Modified time: 2017-02-13 18:48:48
 */

'use strict';

var common = require('util/common'),
    Vue = require('vue');

var data = {
    loan_typ: "X201701273",
    loan_prom: ""
};

module.exports = Vue.extend({
    template: __inline('module.tpl'),
    data: function() {
        return {
            applyBtnText: '下一步',
            applyBtnClass: {
                'z-dis': false
            }
        }
    },
    methods: {
        attendAction: function() {
            var vm = this;
            if (vm.applyBtnClass['z-dis']) return false;
            vm.applyBtnClass['z-dis'] = true;
            vm.applyBtnText = '<span class="mui-icon mui-icon-spinner spin"></span> 处理中';
            common.Ajax({
                url: 'api/wx/flow/credit/chkLoadRequest',
                data: data,
                fw: '/loan/apply',
                success: function(json) {
                    if (json.check_flag == 'Y') {
                        data.check_serno = json.check_serno;
                        router.go({
                            path: '/user/personal-info',
                            query: data
                        });
                    } else {
                        vm.showFlag = true;
                        common.alert(json.check_msg);
                        vm.applyBtnClass['z-dis'] = false;
                        vm.applyBtnText = '下一步';
                    }
                },
                failure: function() {
                    vm.applyBtnClass['z-dis'] = false;
                    vm.applyBtnText = '下一步';
                }
            });
        }
    }
});
