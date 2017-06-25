/* 
* @Author: Wei
* @Date:   2016-06-02 17:21:27
* @Last Modified by:   Wei
* @Last Modified time: 2016-12-10 16:36:15
*/

'use strict';

var common = require('util/common'),
    Vue = require('vue');

module.exports = Vue.extend({
    template: __inline('partial-repay-calc.tpl'),
	data: function() {
		return {
			details: {},
            loanNo: '',
            repayAmount: 0,
            repayBtnText: '立即还款',
            type: 'A'
	    }
    },
    methods: {
    	query: function(data) {
    		var _this = this;
    		_this.items = [];
    		common.Ajax({
	    		url: 'api/wx/auth/credit/initiRepayTrialBody',
	    		data: data,
				success: function(json) {
					_this.details = json;
                    _this.repayAmount = json.total_repay_amt;
				}
	    	});
    	},
    	repay: function() {
            var _this = this;
            router.go({
                path: '/loan/query/pay',
                query: {
                    loan_no: this.loanNo,
                    amt: this.repayAmount
                }
            });
    	}
    },
    ready: function() {
        var _this = this;

        var loanNo = _this.$route.query.loan_no; // 借据编号
        var repayAmount = this.$route.query.amt; // 还款金额

        _this.repayAmount = repayAmount;
        _this.loanNo = loanNo;

        var arr = [{
            loan_no: loanNo
        }];
        var requestData = {
            settl_typ: '01',
            actv_pay_ind: 'A',
            amt: repayAmount
        };
        requestData.list_lm_loan = JSON.stringify(arr);
    	this.query(requestData);
    }
});