/* 
* @Author: Wei
* @Date:   2016-05-12 01:06:51
* @Last Modified by:   Wei
* @Last Modified time: 2016-12-26 15:59:12
*/

'use strict';

var common = require('util/common'),
	validator = require('util/validator'),
	Vue = require('vue');

require('static/libs/mui/pull/mui.pullToRefresh');
require('static/libs/mui/pull/mui.pullToRefresh.material');

var isLoadedAll = false;

var data = {
    page: 1,
    rows: 10
};

module.exports = Vue.extend({
    template: __inline('index.tpl'),
	data: function() {
		return {
		    bankName: '',
		    bankLimitList: [],
		    details: {},
		    isDetailsShow: false
		}
	},
	methods: {
	    query: function(pullRefreshEl) {
	        var vue = this;
	        data.bankName = vue.bankName;
            // login request
            creditLimitQuery(data, function(json) {
            	isLoadedAll = (json.count == 0);
            	if (pullRefreshEl !== undefined) {
            		vue.bankLimitList = vue.bankLimitList.concat(json.data);
            	} else {
            		vue.bankLimitList = json.data;
            	}
                data.page++;
                pullRefreshEl && pullRefreshEl.endPullUpToRefresh(json.count == 0 || json.count < data.rows);
            }, function(json) {
            });
	    },
	    showLimitDetails: function(event) {
	    	var vue = this;
            var target = event.target;
            var tagName = event.target.tagName.toUpperCase();
            var index = 0;
            if (tagName === 'SPAN') {
                index = target.parentNode.dataset.index;
            } else {
                index = target.dataset.index;
            }
	    	vue.details = vue.bankLimitList[index];
			Vue.nextTick(function () {
				vue.isDetailsShow = true;
			});
	    }
	},
	ready: function() {
		var _this = this;
		$(".zyxf_bg_dis").click(function(){
			_this.isDetailsShow = false;
		});
		_this.$watch('bankName', function (newVal, oldVal) {
			data = {
	            page: 1,
	            rows: 10
	        }
        	_this.query();
        });

		data = {
            page: 1,
            rows: 10
        }

        mui.init();

        //阻尼系数
        var deceleration = mui.os.ios?0.003:0.0009;
        /*mui('#m-bank-list').scroll({
            bounce: true,
            indicators: true, //是否显示滚动条
            deceleration: deceleration
        });*/

        mui('#m-bank-list').pullToRefresh({
            up: {
                auto: true,
                callback: function() {
                    var self = this;
                    setTimeout(function() {
                        _this.query(self)
                    }, 500);
                }
            }
        });
	}
});
// 查询银行限额
function creditLimitQuery(data, callback, failure) {
    common.Ajax({
        url: 'api/wx/user/queryBankCardList',
        data: data,
        success: function(json) {
            typeof callback === 'function' && callback(json);
        },
        failure: function(json) {
            typeof failure === 'function' && failure(json);
        }
    })
}