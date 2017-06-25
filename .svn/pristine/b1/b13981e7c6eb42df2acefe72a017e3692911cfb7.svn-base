/* 
 * @Author: Ma
 * @Date:   2016-05-16 14:30
 * @Last Modified by:   Wei
 * @Last Modified time: 2016-12-24 15:20:39
 */

'use strict';

var common = require('util/common'),
    Vue = require('vue');
    
require('static/libs/mui/pull/mui.pullToRefresh');
require('static/libs/mui/pull/mui.pullToRefresh.material');

//初始化数据
var isLoadedAll = false,
	data = {
	    page: 1,
	    rows: 10,
	    loan_sts: '02',
	    query_type: 'drawing'
	};

module.exports = Vue.extend({
    template: __inline('loanType.tpl'),
    data: function() {
        return {
            items: []
        }
    },
    methods: {
        query: function(pullRefreshEl) {
            var vm = this;
            common.Ajax({
                url: 'api/wx/auth/credit/queryLoanList',
                data: data,
                fw: '/user/loanType',
                success: function(json) {
                    isLoadedAll = (json.count == 0);
                    vm.items = vm.items.concat(json.data);
                    data.page++;
                    pullRefreshEl && pullRefreshEl.endPullUpToRefresh(json.count == 0 || json.count < data.rows);
                }
            });
        },
        toLoanSinfo: function(id, lang) {
            router.go({
                name: 'user',
                params: {
                    userId: 'loanSinfo'
                },
                query: {
                    id: id,
                    loan_typ: lang
                }
            })
        }
    },
    ready: function() {
        var vm = this;

        data = {
            page: 1,
            rows: 10,
            loan_sts: '02',
            query_type: 'drawing'
        }
        mui.init();
        mui('#m-loan-repay-list').pullToRefresh({
            up: {
                auto: true,
                callback: function() {
                    var self = this;
                    setTimeout(function() {
                        vm.query(self)
                    }, 500);
                }
            }
        });
    }
});