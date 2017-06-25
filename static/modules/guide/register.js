/* 
 * @Author: Wei
 * @Date:   2016-05-16 12:08:27
 * @Last Modified by:   Wei
 * @Last Modified time: 2017-01-16 16:57:10
 */

'use strict';

var common = require('util/common'),
    Vue = require('vue');

module.exports = Vue.extend({
    template: __inline('register.tpl'),
    data: function() {
        return {}
    },
    methods: {
        goRegister: function() {
            window.location.href = common.wxRedirectUri('/user/register');
        }
    }
});
