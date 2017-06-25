/* 
 * @Author: Wei
 * @Date:   2016-05-12 01:06:51
 * @Last Modified by:   Wei
 * @Last Modified time: 2016-05-17 10:03:17
 */

'use strict';
alert('yyy')
var common = require('util/common'),
    Vue = require('vue');

module.exports = Vue.extend({
    data: function() {
        return {};
    },
    methods: {

    },
    ready: function() {
        router.go({
            path: '/user/client-info/set-trade-password'
        });
    }
});
// check user info
function checkUserInfo(data, callback, failure) {
    common.Ajax({
        url: 'api/user/chekUserInfo',
        data: data,
        success: function(json) {
            typeof callback === 'function' && callback(json);
        },
        failure: function(json) {
            typeof failure === 'function' && failure(json);
        }
    })
}
