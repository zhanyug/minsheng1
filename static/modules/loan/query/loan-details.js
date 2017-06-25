/* 
* @Author: Wei
* @Date:   2016-06-02 17:21:27
* @Last Modified by:   Wei
* @Last Modified time: 2016-12-26 19:58:28
*/

'use strict';

var common = require('util/common'),
    Vue = require('vue');

module.exports = Vue.extend({
    template: __inline('loan-details.tpl'),
	data: function() {
		return {
			details: {},
            view: {
                isContentShow: false
            }
	    }
    },
    route: {
        data: function (transition) {
            var params = this.$route.query;
            this.query(params);
        }
    },
    methods: {
    	query: function(data) {
    		var vm = this;
    		vm.items = [];
    		common.Ajax({
	    		url: 'api/wx/auth/credit/queryLoanDetail',
	    		data: data,
				success: function(json) {
					vm.details = json || {};
                    vm.details.loan_sts = data.loan_sts;
                    vm.view.isContentShow = true;
				}
	    	});
    	},
    	sign: function(event) {
    		var appl_cde = event.target.dataset.id;
            router.go({
                path: '/loan/query/sign-limit',
                query: {
                    appl_cde: appl_cde
                }
            });
    	}
    },
    ready: function() {
    	
    }
})