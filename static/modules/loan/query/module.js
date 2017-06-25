/* 
 * @Author: Wei
 * @Date:   2016-06-02 15:07:40
 * @Last Modified by:   Wei
 * @Last Modified time: 2017-02-23 09:52:32
 */

'use strict';

var common = require('util/common'),
    Vue = require('vue');

require('static/libs/mui/pull/mui.pullToRefresh');
require('static/libs/mui/pull/mui.pullToRefresh.material');

var data = {
    page: 1,
    rows: 10,
    app_sts: '',
    appl_type: '',
    query_type: 'loan',
    loan_sts: '02|03'
};

var isLoadedAll = false;

module.exports = Vue.extend({
    template: __inline('module.tpl'),
    data: function() {
        return {
            items: [],
            isQueryFlag: true
        }
    },
    methods: {
        query: function(pullRefreshEl) {
            var _this = this;
            common.Ajax({
                url: 'api/wx/auth/credit/queryLoanList',
                data: data,
                fw: '/user/loan/query',
                success: function(json) {
                    isLoadedAll = (json.count == 0);

                    _this.items = _this.items.concat(json.data);

                    data.page++;

                    pullRefreshEl && pullRefreshEl.endPullUpToRefresh(json.count == 0 || json.count < data.rows);
                }
            });
        },
        onQuery: function(item) {
            if (this.isQueryFlag) {
                router.go({
                    path: '/user/loan/query/repay/details',
                    query: {
                        appl_cde: item.appl_cde,
                        loan_sts: item.loan_sts
                    }
                });
            }
        },
        onRepay: function(item) {
            this.isQueryFlag = false;
            router.go({
                path: '/user/loan/query/repay/list',
                query: {
                    appl_cde: item.appl_cde
                }
            });
        },
        onSingle: function(item) {
            this.isQueryFlag = false;
            router.go({
                path: '/loan/query/sign-limit',
                query: {
                    appl_cde: item.appl_cde
                }
            });
        },
        onLoan: function(item) {
            this.isQueryFlag = false;
            router.go({
                name: 'user',
                params: {
                    userId: 'loanSinfo'
                },
                query: {
                    id: item.appl_cde + '#' + item.loan_typ_desc,
                    loan_typ: item.loan_typ
                }
            });
        }
    },
    ready: function() {
        var _this = this;

        data = {
            page: 1,
            rows: 10,
            app_sts: '',
            appl_type: '',
            query_type: 'loan',
            loan_sts: '02|03'
        }

        mui.init();
        mui('#m-loan-query-list').pullToRefresh({
            up: {
                auto: true,
                callback: function() {
                    var self = this;
                    setTimeout(function() {
                        _this.query(self);
                    }, 500);
                }
            }
        });
    }
});