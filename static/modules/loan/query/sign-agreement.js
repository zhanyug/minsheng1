/* 
 * @Author: Wei
 * @Date:   2016-05-16 12:08:27
 * @Last Modified by:   Wei
 * @Last Modified time: 2017-01-17 17:20:52
 */

'use strict';

var common = require('util/common'),
    Vue = require('vue');

module.exports = Vue.extend({
    template: __inline('sign-agreement.tpl'),
    data: function() {
        return {
            content: '',
            appl_cde: '',
            applyBtnText: '同意',
            applyBtnClass: {
                'z-dis': false
            }
        }
    },
    methods: {
        applyActivate: function() {
            var vm = this;
            if (vm.applyBtnClass['z-dis']) return false;
            vm.applyBtnClass['z-dis'] = true;
            vm.applyBtnText = '<span class="mui-icon mui-icon-spinner spin"></span> 处理中';
            common.Ajax({
                url: 'api/wx/auth/credit/signContract',
                data: {
                    appl_cde: vm.appl_cde
                },
                success: function(json) {
                    vm.applyBtnClass['z-dis'] = false;
                    vm.applyBtnText = '同意';
                    if (json.sign_flag == 'Y') {
                        router.go({
                            path: '/loan/query/sign-result',
                            query: {
                                appl_cde: json.appl_cde
                            }
                        });
                    } else {
                        common.msg('签约失败');
                    }
                },
                failure: function() {
                    vm.applyBtnClass['z-dis'] = false;
                    vm.applyBtnText = '同意';
                }
            });
        }
    },
    ready: function() {
        var vm = this;
        var query = vm.$route.query;
        vm.appl_cde = query.appl_cde;

        common.Ajax({
            url: 'api/wx/auth/credit/queryContract',
            data: {
                appl_cde: vm.appl_cde
            },
            success: function(json) {
                vm.content = json.content;
            }
        });
    }
});
