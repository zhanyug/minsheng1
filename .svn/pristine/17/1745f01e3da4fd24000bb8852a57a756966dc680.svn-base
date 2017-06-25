/* 
* @Author: Wei
* @Date:   2016-06-02 17:21:27
* @Last Modified by:   Wei
* @Last Modified time: 2016-12-20 16:40:12
*/

'use strict';

var common = require('util/common'),
    Vue = require('vue');

module.exports = Vue.extend({
    template: __inline('repay-details.tpl'),
	data: function() {
		return {
			details: {},
            params: {},
            view: {
                isContentShow: false
            }
	    }
    },
    methods: {
    	query: function(data) {
    		var vm = this;
    		vm.items = [];
    		common.Ajax({
	    		url: 'api/wx/auth/credit/queryIOUDetails',
	    		data: data,
				success: function(json) {
					vm.details = json;
                    vm.view.isContentShow = true;
				}
	    	});
    	},
        fetchRepayDetails: function() {
            router.go({
                path: '/loan/query/repayDetailsItems',
                query: this.params
            });
        },
    	repay: function(event) {
    		var loan_no = event.target.dataset.id;

            router.go({
                path: '/loan/query/repayCalc',
                query: {
                    loan_no: loan_no
                }
            });
    	}
    },
    ready: function() {
    	this.params = this.$route.query;
    	this.query(this.params);
    }
});