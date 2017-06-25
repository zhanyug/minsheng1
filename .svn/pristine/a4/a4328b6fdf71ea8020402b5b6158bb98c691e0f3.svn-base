/* 
* @Author: Wei
* @Date:   2016-05-16 12:08:27
* @Last Modified by:   Wei
* @Last Modified time: 2016-06-14 11:29:03
*/

'use strict';

var common = require('util/common'),
    Vue = require('vue');

module.exports = Vue.extend({
    template: __inline('apply-active.tpl'),
	data: function() {
		return {
			applyId: ''
	    }
    },
    methods: {
    	applyProgress: function() {
    		router.go({
    			path: '/loan/apply/apply-progress',
    			query: {
    				appl_pk: this.applyId,
    				appl_type: 'XFDK'
    			}
    		});
    	}
    },
    ready: function() {
    	this.applyId = this.$route.params.applyId;
    }
});