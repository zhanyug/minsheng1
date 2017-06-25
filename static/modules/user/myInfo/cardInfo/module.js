/* 
 * @Author: Ma
 * @Date:   2016-05-16 14:30
 * @Last Modified by:   Wei
 * @Last Modified time: 2016-05-20 17:10
 */

'use strict';

var validator = require('util/validator'),
	common = require('util/common'),
	Vue = require('vue');
var itemss = [{
	"userName": "loading"
}];
module.exports = Vue.extend({
	template: __inline('cardInfo.tpl'),
	data: function() {
		return {
			items: itemss
		}
	},
	methods: {

	},
	ready: function() {
		initData(this);
	}
});

function initData(vueObj) {
	common.Ajax({
		url: 'api/wx/lg/user/queryBankCardInfo',
		data: null,
		success: function(json) {
			vueObj.items = json.data;
		},
		failure: function(json) {}
	})
}