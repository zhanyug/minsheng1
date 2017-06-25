/* 
* @Author: Wei
* @Date:   2016-06-02 17:21:27
* @Last Modified by:   Wei
* @Last Modified time: 2016-12-07 15:13:58
*/

'use strict';

var common = require('util/common'),
    Vue = require('vue');

module.exports = Vue.extend({
    template: __inline('repay-details-items.tpl'),
	data: function() {
		return {
			items: [],
            params: {}
	    }
    },
    methods: {
    	query: function(data) {
            var _this = this;
            _this.items = [];
            common.Ajax({
                url: 'api/wx/auth/credit/queryIOUDetails',
                data: data,
                success: function(json) {
                    _this.items = json.list_lm_shd.lm_shd || [];
                }
            });
        }
    },
    ready: function() {
    	this.params = this.$route.query;
    	this.query(this.params);
    }
});