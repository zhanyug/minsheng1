/* 
 * @Author: Wei
 * @Date:   2016-05-09 15:02:02
 * @Last Modified by:   Wei
 * @Last Modified time: 2017-01-10 19:52:33
 */
'use strict';

// load utils
var common = require('util/common'),
    validator = require('util/validator'),
    wx = require('static/libs/wechat/jweixin');

    // require('static/libs/util/location');
    
    require('components/layer/layer'),
    require('static/libs/mui/plugins/mui.picker'),
    require('static/libs/mui/plugins/mui.poppicker'),
    require('static/libs/mui/pull/mui.pullToRefresh'),
    require('static/libs/mui/pull/mui.pullToRefresh.material'),
    require('static/libs/util/Checking');

// import vue to global variable
window.Vue = require('vue');
var VueRouter = require('vue-router');

// init MUI
mui.init();

// fis async
var configRouter = require('static/libs/route/index');
// var app = require('modules/index');

// set vuejs to debug level
Vue.config.debug = true;

// import vue router
Vue.use(VueRouter);

// load filters
Vue.filter('encode', function(str) {
    return encodeURIComponent(str)
});
Vue.filter('decode', function(str) {
    return decodeURIComponent(str)
});

/**
 * CSS3 Animate
 */
Vue.transition('flip', {
    enterClass: 'flipInX',
    leaveClass: 'flipOutX'
});

Vue.transition('fade', {
    enterClass: 'fadeIn',
    leaveClass: 'fadeOut'
});

Vue.transition('zoom', {
    enterClass: 'zoomIn',
    leaveClass: 'fadeOut'
});

Vue.transition('fadeUp', {
    enterClass: 'fadeInUp',
    leaveClass: 'fadeOut'
});

// define component: loading(page level)
Vue.component('c-loading', {
    template: __inline('../vue-components/loading.tpl')
});
// define component: loading toast(app level)
Vue.component('c-loading-toast', {
    props: ['show', 'tips'],
    template: __inline('../vue-components/loading-toast.tpl')
});
// define component: header
Vue.component('c-header', {
    props: ['noLnLink', 'noRnLink', 'lnLink', 'rnLink', 'title'],
    template: __inline('../vue-components/header.tpl')
});

// set wechat url
window.url = location.href;
window.tmp = {};

// create router
var router = new VueRouter({
    history: true,
    root: '/wx/',
    saveScrollPosition: false
});
// configure router
configRouter(router);
// boostrap the app
var App = Vue.extend({
    data: function() {
        return {
            isLoadingToastShow: false
        }
    }
});
router.start(App, '#root');
// remove loading state
document.getElementById('loading').classList.remove('m-component-loading');
// change view to request view
/*var viewPath = common.getUrlParm('path');
if (viewPath) {
    var paramIndex = window.url.indexOf('&');
    if (paramIndex > 0) {
        viewPath = viewPath + '?' + window.url.substr(paramIndex+1);
    }
	router.go({ path: viewPath});
} else {
	router.go({ path: '/user/index'});
}*/
// just for debugging
window.router = router;