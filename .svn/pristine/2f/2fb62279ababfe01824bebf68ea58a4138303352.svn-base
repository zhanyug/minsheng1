/*
* @Author: bstLee
* @Date:   2016-08-03 17:22:41
* @Last Modified by:   Wei
* @Last Modified time: 2016-12-30 19:01:23
*/

'use strict';

var common = require('util/common'),
    Vue = require('vue'),
    wx = require('static/libs/wechat/jweixin');

module.exports = Vue.extend({
    template: __inline('upload-success.tpl'),
    data: function() {
        return {
            
        }
    },
    route: {
        data: function (transition) {
            console.log('route view activated!');
            transition.next();
            console.warn('Change view to: ' + transition.to.path);

            var vm = this;
            // fetch Wechat JS API signature
            common.wx.fetchTokenSignature(wx, transition.to.path, common.wx.jsApi.window, this);
        }
    },
    methods: {
        backToUploadPage: function() {
            var vm = this;
            router.go({
                path: '/upload/cms-multi-media',
                query: vm.$route.query
            });
        },
    	closeWxView: function() {
            wx.ready(function () {
                wx.closeWindow();
            });
        }
    }
 });
