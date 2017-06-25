/* 
* @Author: Wei
* @Date:   2016-06-02 17:21:27
* @Last Modified by:   Wei
* @Last Modified time: 2017-02-06 09:54:26
*/

'use strict';

var common = require('util/common'),
    validator = require('util/validator'),
    Vue = require('vue');

module.exports = Vue.extend({
    template: __inline('partial-payment.tpl'),
	data: function() {
		return {
            repayAmount: 0,
			details: {}
	    }
    },
    methods: {
        selectMinRepayAmount: function() {
            this.repayAmount = this.details.pp_min_val;
        },
        selectMaxRepayAmount: function() {
            this.repayAmount = this.details.pp_max_val;
        },
    	repay: function(event) {
            if (validator.check('#m-loan-partial-payment-form')) {
                if (parseFloat(this.details.pp_min_val) > parseFloat(this.repayAmount) || parseFloat(this.details.pp_max_val) < parseFloat(this.repayAmount)) {
                    common.msg('输入的还款金额应在最低还款额与最高还款额之间');
                    return;
                }
                // 展示部分还款详情
                router.go({
                    path: '/loan/query/partial-repay-calc',
                    query: {
                        loan_no: this.details.loan_no,
                        amt: this.repayAmount
                    }
                });
            }
    	}
    },
    ready: function() {
    	this.details = this.$route.query;
        this.repayAmount = this.$route.query.pp_min_val;
    }
});