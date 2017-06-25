/* 
* @Author: Wei
* @Date:   2016-05-16 12:08:27
* @Last Modified by:   Wei
* @Last Modified time: 2016-12-05 17:21:16
*/

'use strict';

var common = require('util/common'),
    Vue = require('vue');

var data = {
    appl_pk: '',
    appl_type: ''
};

module.exports = Vue.extend({
    template: __inline('apply-progress.tpl'),
	data: function() {
		return {
			progressSteps: [],
            endClass: '',
            endTitle: '正在审批中',
            spanStyle: {},
            liStyle: {},
            pStyle: {}, 
            appl_pk: '',
            appl_type: '',
            loanFlag: false,
            isProgressShow: false,
            applTypeText: ''
	    }
    },
    methods: {
    	query: function() {
            this.progressSteps = [];
            var _this = this;
            common.Ajax({
                url: 'api/wx/auth/credit/queryApprvTrail',
                data: data,
                success: function(json) {
                	
                    _this.progressSteps = json;
                    if (json[json.length-1].operate_time != null && json[json.length-1].operate_time != '') {
                        _this.endClass = 'AppSOP_blue';
                        _this.endTitle = '已经结束审批';
                    }
                    _this.isProgressShow = true;
                }
            });
        },
        sign: function() {
            var vm = this;
            router.go({
                path: '/loan/query/sign-limit',
                query: {
                    appl_cde: vm.appl_pk
                }
            });
        }
    },
    ready: function() {
        var _this = this;
        _this.appl_pk = data.appl_pk = this.$route.query.appl_pk;
        _this.appl_type = data.appl_type = this.$route.query.appl_type;

        _this.applTypeText = common.getDict('applType', _this.appl_type);

        setTimeout(function() {
            _this.query();
        }, 500);

        if (_this.appl_type == 'XFDK') {
            _this.loanFlag = true;
            initDataLoan(_this);
        } else if (_this.appl_type == 'FKSQ' || _this.appl_type == 'ZDHK') {
            _this.loanFlag = false;
            initDataDraw(_this);
        }
    }
});

function initDataLoan(vm) {
    // spanStyle
    var AppSO_w1 = window.innerWidth;
    var AppSO_h1 =AppSO_w1/6.4655172413793105;
    var AppSO_h2 = AppSO_h1+10;

    vm.spanStyle = {
        height: AppSO_h2 + "px",
        'line-height': AppSO_h1 + "px"
    };

    // liStyle
    var AppSO_w = window.innerWidth;
    var AppSO_h =AppSO_w/11.094674556213018;

    vm.liStyle = {
        height: AppSO_h + "px",
        'line-height': AppSO_h + "px"
    };

    // pStyle
    var AppSOP_w = window.innerWidth;
    var AppSOP_h =AppSOP_w/11.094674556213018;
    vm.pStyle = {
        height: AppSOP_h + "px"
    };
}

function initDataDraw(vm) {
    // spanStyle
    var AppSO_w1 = window.innerWidth;
    var AppSO_h1 =AppSO_w1/6.4655172413793105;
    var AppSO_h2 = AppSO_h1+10;

    vm.spanStyle = {
        height: AppSO_h2 + "px",
        'line-height': AppSO_h1 + "px"
    };

    // liStyle
    var AppSO_w = window.innerWidth;
    var AppSO_h =AppSO_w/11.094674556213018;

    vm.liStyle = {
        height: AppSO_h + "px",
        'line-height': AppSO_h + "px"
    };

    // pStyle
    var AppSOP_w = window.innerWidth;
    var AppSOP_h =AppSOP_w/5.547337278106509;
    vm.pStyle = {
        height: AppSOP_h*1.45 + "px"
    };
}