/* 
 * @Author: Ma
 * @Date:   2016-05-16 09:25
 * @Last Modified by:   Wei
 * @Last Modified time: 2016-05-16 20:20
 */

'use strict';

var validator = require('util/validator'),
    common = require('util/common'),
    Vue = require('vue');
module.exports = Vue.extend({
    template: __inline('loanMingxi.tpl'),
    data: function() {
        return {
            loanName: "...",
            items: [1]
        }
    },
    methods: {
        close: function(event) {

        }
    },
    ready: function() {
        var str = this.$route.query.id;
        initData(this, str);
    }
});
//页面初始化
function initData(vueObj, str) {
    var appl_cde = str.split("#")[0];
    var loanName = str.split("#")[1];
    var data = {
        appl_cde: appl_cde,
        detail_type: "01" //01提款02还款
    }
    common.Ajax({
        url: 'api/wx/auth/credit/queryDrawingDetailList',
        data: data,
        success: function(json) {
            vueObj.items = json.data;
            vueObj.loanName = loanName;
        },
        failure: function(json) {
            
        }
    })
}
