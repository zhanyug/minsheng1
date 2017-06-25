/* 
 * @Author: Ma
 * @Date:   2016-05-19 09:40
 * @Last Modified by:   Wei
 * @Last Modified time: 2016-12-28 10:08:02
 */

'use strict';

var validator = require('util/validator'),
    common = require('util/common'),
    Vue = require('vue');

module.exports = Vue.extend({
    template: __inline('repayCost.tpl'),
    data: function() {
        return {
            items: '',
            tips: ''
        }
    },
    methods: {
        goInfo: function(event) {

        }
    },
    ready: function() {
        var id = this.$route.query.id;
        initData(this, id);
    }
});

function initData(vm, id) {
    //初始化数据
    //编号id 0   期数id1
    common.Ajax({
        url: 'api/wx/auth/credit/queryAllRepayPlanDetail',
        data: {
            "loan_no": id.split("#")[1],
            "ps_perd_no": id.split("#")[0],
            "query_type": "02", //01汇总02明细
            "detail_type": "03" //01 7天  02一个月 03全部
        },
        success: function(json) {
            var list = json.list_fee_info.fee_info;
            list = [];
            if (list == null || list.length == 0) {
                vm.tips = '<br>暂无费用明细';
            } else {
                vm.items = list;
            }
        },
        failure: function(json) {
        }
    })
}
