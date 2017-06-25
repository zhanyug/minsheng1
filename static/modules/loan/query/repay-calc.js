/* 
* @Author: Wei
* @Date:   2016-06-02 17:21:27
* @Last Modified by:   Wei
* @Last Modified time: 2016-12-23 18:30:22
*/

'use strict';

var common = require('util/common'),
    Vue = require('vue');

var repayAmount = null;

module.exports = Vue.extend({
    template: __inline('repay-calc.tpl'),
	data: function() {
		return {
			details: {},
            isFullRepay: false,
            repayAmount: 0,
            repayBtnText: '立即还款',
            type: 'A',
            view: {
                isTotalAmtShow: true
            }
	    }
    },
    methods: {
    	query: function(data) {
    		var vm = this;
    		vm.items = [];
    		common.Ajax({
	    		url: 'api/wx/auth/credit/initiRepayTrialBody',
	    		data: data,
				success: function(json) {
                    if (json.pp_min_val == null && json.pp_max_val == null) {
                        vm.isFullRepay = false;
                    } else {
                        vm.isFullRepay = true;
                    }
					vm.details = json;
                    repayAmount = vm.repayAmount = json.total_repay_amt;
				}
	    	});
    	},
    	repay: function() {
            var vm = this;
            if (vm.type == 'A') {
                router.go({
                    path: '/loan/query/pay',
                    query: {
                        loan_no: vm.$route.query.loan_no,
                        amt: vm.repayAmount
                    }
                });
            } else {
                router.go({
                    path: '/loan/query/partialPayment',
                    query: {
                        loan_no: vm.$route.query.loan_no,
                        pp_min_val: vm.details.pp_min_val,
                        pp_max_val: vm.details.pp_max_val,
                        nowDate: vm.details.nowDate,
                    }
                });
            }
    	},
        onClickType: function(event) {
            var vm = this;
            var target = event.target;
            vm.type = target.dataset.type;
            if (vm.type == 'A') {
                vm.repayBtnText = '立即还款';
                vm.repayAmount = repayAmount;
                vm.view.isTotalAmtShow = true;
            } else {
                vm.repayBtnText = '下一步';
                vm.repayAmount = '';
                vm.view.isTotalAmtShow = false;
            }
        }
    },
    ready: function() {
        var vm = this;

        var arr = [{
            loan_no: vm.$route.query.loan_no
        }];
        var requestData = {
            settl_typ: '01'
        };
        requestData.list_lm_loan = JSON.stringify(arr);
    	this.query(requestData);
    }
});