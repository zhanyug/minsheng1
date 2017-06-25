/* 
 * @Author: Wei
 * @Date:   2016-05-24 17:08:13
 * @Last Modified by:   Wei
 * @Last Modified time: 2017-01-10 19:27:22
 */

'use strict';

var common = require('util/common'),
    Vue = require('vue');

require('static/libs/mui/pull/mui.pullToRefresh');
require('static/libs/mui/pull/mui.pullToRefresh.material');

module.exports = Vue.extend({
    template: __inline('module.tpl'),
    data: function() {
        return {
            showItems: [],
            allItems: [],
            allHandlingItems: [],
            allHandledItems: [],
            loanAllItems: [],
            loanHandlingItems: [],
            loanHandledItems: [],
            pickAllItems: [],
            pickHandlingItems: [],
            pickHandledItems: [],
            repayAllItems: [],
            repayHandlingItems: [],
            repayHandledItems: [],

            data: {
                page: 1,
                rows: 10,
                app_sts: '',
                appl_type: ''
            },
            pageSet: {
                allItemsPage: 1,
                allHandlingItemsPage: 1,
                allHandledItemsPage: 1,
                loanAllItemsPage: 1,
                loanHandlingItemsPage: 1,
                loanHandledItemsPage: 1,
                pickAllItemsPage: 1,
                pickHandlingItemsPage: 1,
                pickHandledItemsPage: 1,
                repayAllItemsPage: 1,
                repayHandlingItemsPage: 1,
                repayHandledItemsPage: 1
            }
        }
    },
    methods: {
        onTap: function(tapType) {
            this.data.app_sts = tapType;
            this.query();
        },
        onMenu: function(menuType) {
            this.data.appl_type = menuType;
            this.query();
        },
        onClick: function(item) {
            if (item.out_sts == '00') {
                common.alert('该申请还未正式提交，暂无申请流程轨迹');
            } else {
                router.go({
                    path: '/loan/apply/apply-progress',
                    query: {
                        appl_pk: item.appl_pk,
                        appl_type: item.appl_type
                    }
                });
            }
        },
        init: function() {
            var vm = this;

            mui('#scroll').pullToRefresh({
                up: {
                    auto: true,
                    callback: function() {
                        var self = this;
                        setTimeout(function() {
                            vm.query(self);
                        }, 500);
                    }
                }
            });
        },
        resetParam: function() {
            this.data = {
                page: 1,
                rows: 10,
                app_sts: '',
                appl_type: ''
            };

            this.pageSet = {
                allItemsPage: 1,
                handlingItemsPage: 1,
                handledItemsPage: 1
            };

            /*mui('#scroll-wrapper1').pullRefresh().refresh(true);*/
        },
        query: function(pullRefreshEl) {
            var vm = this;

            var type = vm.data.app_sts;
            var appl_type = vm.data.appl_type;

            if (type == '' && appl_type == '') {
                vm.data.page = vm.pageSet.allItemsPage;
            } else if (type == '1' && appl_type == '') {
                vm.data.page = vm.pageSet.allHandlingItemsPage;
            } else if (type == '2' && appl_type == '') {
                vm.data.page = vm.pageSet.allHandledItemsPage;
            } else if (type == '' && appl_type == 'XFDK') {
                vm.data.page = vm.pageSet.loanAllItemsPage;
            } else if (type == '1' && appl_type == 'XFDK') {
                vm.data.page = vm.pageSet.loanHandlingItemsPage;
            } else if (type == '2' && appl_type == 'XFDK') {
                vm.data.page = vm.pageSet.loanHandledItemsPage;
            } else if (type == '' && appl_type == 'FKSQ') {
                vm.data.page = vm.pageSet.pickAllItemsPage;
            } else if (type == '1' && appl_type == 'FKSQ') {
                vm.data.page = vm.pageSet.pickHandlingItemsPage;
            } else if (type == '2' && appl_type == 'FKSQ') {
                vm.data.page = vm.pageSet.pickHandledItemsPage;
            } else if (type == '' && appl_type == 'ZDHK') {
                vm.data.page = vm.pageSet.repayAllItemsPage;
            } else if (type == '1' && appl_type == 'ZDHK') {
                vm.data.page = vm.pageSet.repayHandlingItemsPage;
            } else if (type == '2' && appl_type == 'ZDHK') {
                vm.data.page = vm.pageSet.repayHandledItemsPage;
            }

            common.Ajax({
                url: 'api/wx/auth/credit/queryApplyListState',
                data: vm.data,
                fw: '/loan/apply/query',
                success: function(json) {
                    if (json.count > 0) {
                        if (type == '' && appl_type == '') {
                            vm.showItems = vm.allItems = vm.allItems.concat(json.data);
                            vm.pageSet.allItemsPage++;
                        } else if (type == '1' && appl_type == '') {
                            vm.showItems = vm.allHandlingItems = vm.allHandlingItems.concat(json.data);
                            vm.pageSet.allHandlingItemsPage++;
                        } else if (type == '2' && appl_type == '') {
                            vm.showItems = vm.allHandledItems = vm.allHandledItems.concat(json.data);
                            vm.pageSet.allHandledItemsPage++;
                        } else if (type == '' && appl_type == 'XFDK') {
                            vm.showItems = vm.loanAllItems = vm.loanAllItems.concat(json.data);
                            vm.pageSet.loanAllItemsPage++;
                        } else if (type == '1' && appl_type == 'XFDK') {
                            vm.showItems = vm.loanHandlingItems = vm.loanHandlingItems.concat(json.data);
                            vm.pageSet.loanHandlingItemsPage++;
                        } else if (type == '2' && appl_type == 'XFDK') {
                            vm.showItems = vm.loanHandledItems = vm.loanHandledItems.concat(json.data);
                            vm.pageSet.loanHandledItemsPage++;
                        } else if (type == '' && appl_type == 'FKSQ') {
                            vm.showItems = vm.pickAllItems = vm.pickAllItems.concat(json.data);
                            vm.pageSet.pickAllItemsPage++;
                        } else if (type == '1' && appl_type == 'FKSQ') {
                            vm.showItems = vm.pickHandlingItems = vm.pickHandlingItems.concat(json.data);
                            vm.pageSet.pickHandlingItemsPage++;
                        } else if (type == '2' && appl_type == 'FKSQ') {
                            vm.showItems = vm.pickHandledItems = vm.pickHandledItems.concat(json.data);
                            vm.pageSet.pickHandledItemsPage++;
                        } else if (type == '' && appl_type == 'ZDHK') {
                            vm.showItems = vm.repayAllItems = vm.repayAllItems.concat(json.data);
                            vm.pageSet.repayAllItemsPage++;
                        } else if (type == '1' && appl_type == 'ZDHK') {
                            vm.showItems = vm.repayHandlingItems = vm.repayHandlingItems.concat(json.data);
                            vm.pageSet.repayHandlingItemsPage++;
                        } else if (type == '2' && appl_type == 'ZDHK') {
                            vm.showItems = vm.repayHandledItems = vm.repayHandledItems.concat(json.data);
                            vm.pageSet.repayHandledItemsPage++;
                        }
                    } else {
                        if (type == '' && appl_type == '') {
                            vm.showItems = vm.allItems;
                        } else if (type == '1' && appl_type == '') {
                            vm.showItems = vm.allHandlingItems;
                        } else if (type == '2' && appl_type == '') {
                            vm.showItems = vm.allHandledItems;
                        } else if (type == '' && appl_type == 'XFDK') {
                            vm.showItems = vm.loanAllItems;
                        } else if (type == '1' && appl_type == 'XFDK') {
                            vm.showItems = vm.loanHandlingItems;
                        } else if (type == '2' && appl_type == 'XFDK') {
                            vm.showItems = vm.loanHandledItems;
                        } else if (type == '' && appl_type == 'FKSQ') {
                            vm.showItems = vm.pickAllItems;
                        } else if (type == '1' && appl_type == 'FKSQ') {
                            vm.showItems = vm.pickHandlingItems;
                        } else if (type == '2' && appl_type == 'FKSQ') {
                            vm.showItems = vm.pickHandledItems;
                        } else if (type == '' && appl_type == 'ZDHK') {
                            vm.showItems = vm.repayAllItems;
                        } else if (type == '1' && appl_type == 'ZDHK') {
                            vm.showItems = vm.repayHandlingItems;
                        } else if (type == '2' && appl_type == 'ZDHK') {
                            vm.showItems = vm.repayHandledItems;
                        }
                    }

                    pullRefreshEl && pullRefreshEl.endPullUpToRefresh(json.count == 0 || json.count < vm.data.rows);
                }
            });
        }
    },
    ready: function() {
        mui.init();
        this.init();
    }
});
