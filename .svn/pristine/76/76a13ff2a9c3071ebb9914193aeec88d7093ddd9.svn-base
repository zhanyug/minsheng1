/* 
 * @Author: Ma
 * @Date:   2016-05-16 09:25
 * @Last Modified by:   Wei
 * @Last Modified time: 2016-05-30 10:37
 */

'use strict';

var validator = require('util/validator'),
    common = require('util/common'),
    Vue = require('vue');
//初始化数据
var data;
var appSeq; //贷款申请流水号，用于提款申请
var day_int_ratTodrawing; //要传到提款申请页面的日利率参数
module.exports = Vue.extend({
    template: __inline('loanSinfo.tpl'),
    data: function() {
        return {
            eduName: '',
            cust_name: '',
            id_no: '',
            loan_amt: '',
            used_amt: '',
            avail_amt: '',
            day_int_rat: '',
            chargeoff_ind: '',
            fk_card_no: '',
            hk_card_no: '',
            sign_dt: '',
            sign_end_dt: '',
            fk_card_bankname: '',
            hk_card_bankname: '',
            // view controll data
            view: {
                isLoading: true
            }
        }
    },
    methods: {
        toDrawing: function(event) {
            router.go({
                name: 'drawing',
                params: {
                    userId: 'drawing'
                },
                query: {
                    id: appSeq,
                    loan_typ: this.$route.query.loan_typ,
                    day_int_rat: day_int_ratTodrawing
                }
            })
        },
        goMingxi: function() {
            var idMsg = this.$route.query.id; //申请号+贷款名称
            router.go({
                name: 'loanMingxi',
                params: {
                    userId: 'loanMingxi'
                },
                query: {
                    id: idMsg
                }
            })
        }
    },
    ready: function() {
        initData(this, this.$route.query.id)
    }
});
//初始化数据
function initData(vm, id) {
    var loanId = id.split("#")[0]; //appSeq
    var loanName = id.split("#")[1];
    var par = {
        appl_cde: loanId,
        loan_sts: "02"
    }
    common.Ajax({
        url: 'api/wx/auth/credit/queryLoanDetail',
        data: par,
        success: function(json) {
            // data loading ended
            vm.view.isLoading = false;

            vm.eduName = loanName;
            appSeq = json.appl_cde;
            vm.cust_name = json.cust_name;
            vm.id_no = json.id_no;
            vm.loan_amt = json.loan_amt;
            vm.used_amt = json.used_amt;
            vm.avail_amt = json.avail_amt;
            vm.day_int_rat = (json.day_int_rat * 100).toFixed(4) + "%";
            day_int_ratTodrawing = json.day_int_rat;
            vm.chargeoff_ind = json.chargeoff_ind;
            vm.fk_card_no = json.fk_card_no;
            vm.hk_card_no = json.hk_card_no;
            vm.sign_dt = json.sign_dt;
            vm.sign_end_dt = json.sign_end_dt;
            vm.fk_card_bankname = json.fk_card_bankname;
            vm.hk_card_bankname = json.hk_card_bankname;
        },
        failure: function(json) {
        }
    })
}
