/* 
* @Author: Wei
* @Date:   2016-05-12 01:06:51
* @Last Modified by:   Wei
* @Last Modified time: 2016-12-26 15:54:28
*/

'use strict';

var common = require('util/common'),
	validator = require('util/validator'),
	Vue = require('vue');

module.exports = Vue.extend({
    template: __inline('index.tpl'),
	data: function() {
		return {
		    oldPassword: '',
		    newPassword: ''
		}
	},
	methods: {
	    save: function() {
	        var vue = this;
	        if (validator.check('#m-form-password')) {
	            // login request
	            modifyTradePassword({
	                oldPassword: vue.oldPassword,
	                newPassword: vue.newPassword
	            }, function(response) {
					common.msg('登录密码修改成功', function() {
	                    router.go({
	                    	path: '/user/index'
	                    });
	                });
	            }, function(json) {
	            });
	        }
	    }
	}
});
//修改交易密码
function modifyTradePassword(data, callback, failure) {
    common.Ajax({
        url: 'api/wx/lg/user/updatePassword',
        data: data,
        success: function(json) {
            typeof callback === 'function' && callback(json);
        },
        failure: function(json) {
            typeof failure === 'function' && failure(json);
        }
    })
}