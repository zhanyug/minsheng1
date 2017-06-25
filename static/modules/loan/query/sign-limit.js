/* 
 * @Author: Wei
 * @Date:   2016-05-16 12:08:27
 * @Last Modified by:   Wei
 * @Last Modified time: 2016-12-23 17:05:16
 */

'use strict';

var common = require('util/common'),
    Vue = require('vue');

module.exports = Vue.extend({
    template: __inline('sign-limit.tpl'),
    data: function() {
        return {
            limit: 0,
            appl_cde: '',
            view: {
                isShowAgreement: false
            }
        }
    },
    methods: {
        query: function(data) {
            var _this = this;
            common.Ajax({
                url: 'api/wx/auth/credit/queryLoanDetail',
                data: data,
                success: function(json) {
                    _this.limit = json.loan_amt;
                }
            });
        },
        agreeActivate: function() {
            var _this = this;
            router.go({
                path: '/loan/query/sign-agreement',
                query: {
                    appl_cde: _this.appl_cde
                }
            });
        },
        showAgreement: function() {
            view.isShowAgreement = true;
        }
    },
    ready: function() {
        var query = this.$route.query;
        this.query(query);
        this.appl_cde = query.appl_cde;
    }
});
