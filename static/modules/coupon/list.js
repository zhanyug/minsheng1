/* 
 * @Author: Wei
 * @Date:   2016-11-17 15:10:00
 * @Last Modified by:   Wei
 * @Last Modified time: 2016-11-20 10:03:09
 */
'use strict';

var common = require('util/common'),
    Vue = require('vue');

// import mui pullToRefresh plugins
require('static/libs/mui/pull/mui.pullToRefresh');
require('static/libs/mui/pull/mui.pullToRefresh.material');

var data = {
    page: 1,
    rows: 10
};

var isLoadedAll = false;

module.exports = Vue.extend({
    template: __inline('list.tpl'),
    data: function() {
        return {
            items: [{
            	i: 0
            }],
            pageSet: {
                currentItemsPage: 1,
                historyItemsPage: 1
            },
            isQueryFlag: true
        }
    },
    methods: {
        init: function() {
            var vm = this;
            /*
             * init data
             */
            data = {
                page: 1,
                rows: 10
            };
            isLoadedAll = false;

            vm.tabs.set('navall', 'menu_conall');

            //阻尼系数
            var deceleration = mui.os.ios ? 0.003 : 0.0009;
            mui('.mui-scroll-wrapper').scroll({
                bounce: false,
                indicators: true, //是否显示滚动条
                deceleration: deceleration
            });
            mui('#scroll1').pullToRefresh({
                up: {
                    auto: true,
                    callback: function() {
                        var self = this;
                        setTimeout(function() {
                            _this.query(self);
                        }, 500);
                    }
                }
            });
        },
        query: function(pullToRefreshElement) {
        	var vm = this;
			common.Ajax({
                url: 'api/wx/auth/credit/queryApplyListState',
                data: _this.data,
                fw: '/loan/apply/query',
                success: function(json) {
                    vm.isLoadedAll = (json.count == 0);
                    
                    if (!_this.isLoadedAll) {
                    	/*if () {

                    	}*/
                        _this.repayHandledItems = _this.repayHandledItems.concat(json.data);
                        _this.pageSet.currentItemsPage++;
                    }

                    pullToRefreshElement && pullToRefreshElement.endPullUpToRefresh(json.count == 0 || json.count < _this.data.rows);
                }
            });
        },
        // is show more coupon details 
        isShowMoreInfo: function(event) {
        	var target = event.target.closest('ul');
        	var display = target.style.display;
        	display == 'none'? target.style.display = 'block': target.style.display = 'none';
        },
        // coupon tabs controll
        tabs: function() {
            function tagall(name, elem) {
                return (elem || document).getElementsByTagName(name);
            }
            function id(name) {
                return document.getElementById(name);
            }

            function first(elem) {
                elem = elem.firstChild;
                return elem && elem.nodeType == 1 ? elem : next(elem);
            }

            function next(elem) {
                do {
                    elem = elem.nextSibling;
                } while (
                    elem && elem.nodeType != 1
                )
                return elem;
            }
            return {
                set: function(elemId, tabId) {
                    var elem = tagall("li", id(elemId));
                    var tabs = tagall("cite", id(tabId));
                    var listNum = elem.length;
                    var tabNum = tabs.length;
                    for (var i = 0; i < listNum; i++) {
                        elem[i].onclick = (function(i) {
                            return function() {
                                for (var j = 0; j < tabNum; j++) {
                                    if (i == j) {
                                        tabs[j].style.display = "block";
                                        elem[j].firstChild.className = "selectedall";
                                    } else {
                                        tabs[j].style.display = "none";
                                        elem[j].firstChild.className = "";
                                    }
                                }
                            }
                        })(i);
                    }
                }
            }
        }
    },
    ready: function() {
        var vm = this;
        vm.init();
    }
});
