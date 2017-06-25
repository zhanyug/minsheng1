/* 
* @Author: Wei
* @Date:   2016-06-03 09:14:17
* @Last Modified by:   Wei
* @Last Modified time: 2016-12-10 16:06:58
*/

'use strict';

var common = require('util/common'),
    Vue = require('vue');

var data = {
	page: 1,
	rows: 10,
	app_sts: '',
	appl_type: ''
};

module.exports = Vue.extend({
    template: __inline('repay.tpl'),
	data: function() {
		return {
			items: [],
            loan_no: '',
			repayAmount: 0,
			appl_cde: ''
	    }
    },
    methods: {
    	query: function(appl_cde) {
    		var _this = this;
    		common.Ajax({
	    		url: 'api/wx/auth/credit/queryIOUList',
	    		data: {
	    			appl_cde: appl_cde
	    		},
				success: function(json) {
					_this.items = json.data;
				}
	    	});
    	},
    	toggleItem: function(item) {
            if (item.lm_flag == 'Y' || (item.loan_sts == 'CLSDB' || item.loan_sts == 'OFFED' || item.loan_sts == 'SETL')) {
                return;
            }
            if (item.is_hesitation == 'Y') {
                common.msg('该借据处于犹豫期内，不能发起提前还款');
                return;
            }
            this.loan_no = item.loan_no;
            this.repayAmount = item.wait_repay_amt;
        },
    	repay: function() {
            var vm = this;
    		if (vm.repayAmount > 0) {
	            router.go({
	            	path: '/loan/query/repayCalc',
	            	query: {
                        loan_no: vm.loan_no
                    }
	            });
    		} else {
    			common.msg('请选择借据');
    		}
    	},
        toLoanInfo: function(loan_no) {
            var vm = this;
            router.go({
                path: '/loan/query/repayDetails',
                query: {
                    appl_cde: vm.appl_cde,
                    loan_no: loan_no
                }
            });
        }
    },
    ready: function() {
    	this.appl_cde = this.$route.query.appl_cde;
        this.query(this.appl_cde);
    }
});