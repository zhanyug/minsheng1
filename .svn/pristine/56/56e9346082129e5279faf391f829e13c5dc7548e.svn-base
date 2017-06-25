/* 
 * @Author: Ma
 * @Date:   2016-05-18 15:06
 * @Last Modified by:   Wei
 * @Last Modified time: 2017-01-17 18:16:11
 */

'use strict';

var validator = require('util/validator'),
    common = require('util/common'),
    Vue = require('vue');
var all;
var amtSum = 0; //总金额

//will还款部分js
var data = {
    page: 1,
    rows: 10,
    app_sts: '',
    appl_type: ''
};
module.exports = Vue.extend({
    template: __inline('repayList.tpl'),
    data: function() {
        return {
            items: [],
            loan_no: '',
            repayAmount: 0,
            appl_cde: '',
            itemLists: [],
            sumAmt: '0',
            checkBox: false,
            seven_day_amt: "",
            one_month_amt: "",
            all_unpaid_amt: "",
            goRepayBtnClass: {
                'z-dis': false
            },
            navClass: '',
            checkClass: '',
            isDateFlag: false,
            view: {
                isDataLoaded: false
            }
        }
    },
    route: {
        data: function() {
            this.itemLists = {};
            this.sumAmt = 0;
            this.checkBox = false;
            initData(this);
            //will部分js
            this.appl_cde = this.$route.query.appl_cde;
            var type = this.$route.query.type;

            amtSum = 0;
            this.sumAmt = amtSum;
            this.checkBox = false;
            this.navClass = type;
            toGetInfo(type, this);

            this.query(this.appl_cde);
            if (this.$route.query.repayFlag == 1) {
                this.isDateFlag = true;
            } else {
                this.isDateFlag = false;
            }
        }
    },
    methods: {
        toGetInfo: function(id) {
            var param = this.$route.query;
            param.type = id;

            router.go({
                path: '/userRe/repayList',
                query: param
            });
        },
        choseUl: function(itemList) {
            var ps_perd_list = [];
            for (var i = 0; i < this.itemLists.length; i++) {
                if (this.itemLists[i].loan_no == itemList.loan_no) {
                    ps_perd_list.push(this.itemLists[i]);
                }
            }

            var cn = document.getElementById(itemList.ps_perd_no + '#' + itemList.loan_no);
            if (itemList.choseFlag) {
                for (var i = 0; i < ps_perd_list.length; i++) {
                    if (ps_perd_list[i].ps_perd_no > itemList.ps_perd_no) {
                        if (ps_perd_list[i].choseFlag) {
                            common.msg('您不能隔期还款');
                            return;
                        }
                    }
                }
                itemList.choseFlag = false;
                cn.className = 'repaymentTwo_a';
            } else {
                for (var i = 0; i < ps_perd_list.length; i++) {
                    if (ps_perd_list[i].ps_perd_no < itemList.ps_perd_no) {
                        if (!ps_perd_list[i].choseFlag) {
                            common.msg('您不能隔期还款');
                            return;
                        }
                    }
                }
                itemList.choseFlag = true;
                cn.className = 'repaymentTwo_a onclick_a';
            }

            amtSum = 0;
            for (var i = 0; i < this.itemLists.length; i++) {
                if (this.itemLists[i].loan_no == itemList.loan_no && this.itemLists[i].ps_perd_no == itemList.ps_perd_no) {
                    this.itemLists.$set(i, itemList);
                }
                if (this.itemLists[i].choseFlag) {
                    amtSum = accAdd(amtSum, Number(this.itemLists[i].ps_prcp_amt));
                }
            }

            if (amtSum == 0) {
                this.checkClass = '';
            } else {
                this.checkClass = 'onclick_a';
            }
            this.sumAmt = amtSum.toFixed(2);
        },
        goRepay: function() {
            var vm = this;
            var amt = vm.sumAmt;
            if (vm.goRepayBtnClass['z-dis']) return;
            var str = "[";
            /*
              -- 20160117 注释 合计金额为0继续通过
            if (amt == 0) {
                common.msg("您还没有选择还款期数");
                return false;
            }*/

            for (var i = 0; i < this.itemLists.length; i++) {
                if (this.itemLists[i].choseFlag) {
                    str = str + '{loan_no:\"' + this.itemLists[i].loan_no + '\",ps_perd_no:\"' + this.itemLists[i].ps_perd_no + '\"},';
                }
            }

            var len = str.length - 1;
            var strEnd = str.substring(0, len)
            strEnd = strEnd + "]";

            console.log("amt:" + amt + ";list_lm_loan:" + strEnd)
            vm.goRepayBtnClass['z-dis'] = true;
            common.Ajax({
                url: 'api/wx/auth/credit/preRepayChk',
                data: {
                    "amt": amt,
                    "list_lm_loan": strEnd
                },
                success: function(json) {
                    console.log(JSON.stringify(json))
                    if (json.isOver == "N") {
                        //01按单借据 02按还款计划 03借据+部分还款计划
                        var list = json.payoffLoanList;
                        if (json.settl_typ == "03") {
                            var msg = "";
                            for (var i = 0; i < list.length; i++) {
                                if (i == 0) {
                                    msg += "借据" + list[i] + "<br>";
                                } else {
                                    msg += list[i] + "<br>";
                                }

                            }
                            //							var len=msg.length-1;
                            //							var msgShow=msg.substring(0,len);
                            //							msgShow += "已全部勾选剩余还款期次，是否将该借据全部结清？"
                            msg += "已全部勾选剩余还款期次，是否将该借据全部结清？"
                            common.confirm(msg, function() {
                                //确定还款
                                repayPlan(json.settl_typ, amt, strEnd, list);
                            }, function() {
                                vm.goRepayBtnClass['z-dis'] = false;
                                //取消还款
                            })
                        } else {
                            repayPlan(json.settl_typ, amt, strEnd, list);
                        }
                    } else {
                        vm.goRepayBtnClass['z-dis'] = false;
                        common.alert("您勾选的还款金额已经超过银行卡最大限额，请调整还款期次。")
                    }
                },
                failure: function(json) {
                    vm.goRepayBtnClass['z-dis'] = false;
                }
            })
        },
        toInfo: function(itemList) {
            amtSum = 0;
            router.go({
                name: 'userRePlanInfo',
                params: {
                    userId: 'repayPlanInfo'
                },
                query: {
                    id: itemList.ps_perd_no + '#' + itemList.loan_no
                }
            })
        },
        toLoanRepayList: function() {
            router.go({
                path: '/user/loan/query/repay/list',
                query: {
                    flag: '0'
                }
            });
        },

        query: function(appl_cde) {
            var vm = this;
            common.Ajax({
                url: 'api/wx/auth/credit/queryIOUList',
                data: {
                    appl_cde: appl_cde
                },
                success: function(json) {
                    vm.items = json.data;
                }
            });
        },
        toLoanInfo: function(loan_no) {
            var vm = this;
            router.go({
                path: '/loan/query/repayDetails',
                query: {
                    appl_cde: vm.appl_cde,
                    loan_no: loan_no
                }
            });
        },
        toggleItem: function(item) {
            if (item.lm_flag == 'Y' || (item.loan_sts == 'CLSDB' || item.loan_sts == 'OFFED' || item.loan_sts == 'SETL')) {
                common.msg('该借据暂不能发起还款');
                return;
            }
            if (item.is_hesitation == 'Y') {
                common.msg('该借据处于犹豫期内，不能发起提前还款');
                return;
            }

            this.loan_no = item.loan_no;
            this.repayAmount = item.wait_repay_amt;
        },
        repay: function() {
            var vm = this;
            if (vm.repayAmount > 0) {
                router.go({
                    path: '/loan/query/repayCalc',
                    query: {
                        loan_no: vm.loan_no
                    }
                });
            } else {
                common.msg('请选择借据');
            }
        }

    },
    ready: function() {
    }
});


function initData(vueObj) {
    //初始化数据
    common.Ajax({
        url: 'api/wx/auth/credit/queryAllRepayPlanBody',
        data: {
            "query_type": "01",
            "detail_type": "01",
        },
        fw: "/userRe/repayList",
        success: function(json) {
            vueObj.seven_day_amt = json.seven_day_amt;
            vueObj.one_month_amt = json.one_month_amt;
            vueObj.all_unpaid_amt = json.all_unpaid_amt;
        },
        failure: function(json) {
        }
    })
}

function toGetInfo(id, vm) {
    if (id) {
        id = parseInt(id) + 1;
        id = '0' + id;
    } else {
        id = '03';
    }
    common.Ajax({
        url: 'api/wx/auth/credit/queryAllRepayPlanList',
        data: {
            "query_type": "02",
            "detail_type": id,
        },
        success: function(json) {
            vm.itemLists = json.data;
            vm.view.isDataLoaded = true;
        },
        failure: function(json) {
        }
    })
}

//去还款试算
function repayPlan(type, sum, str, list) {
    var payo = '[';
    for (var i = 0; i < list.length; i++) {
        payo += '\"' + list[i] + '\",';
    }
    var len = payo.length - 1;
    var payoffLoanList = payo.substring(0, len);
    payoffLoanList += ']';
    if (list.length == 0) {
        payoffLoanList = "";
    }
    console.log("payoffLoanList+" + list.length + "+" + payoffLoanList)
    var parRepay = {
        "settl_typ": type,
        "actv_pay_ind": "A",
        "amt": sum,
        "list_lm_loan": str,
        "payoffLoanList": payoffLoanList
    }
    window.tmp = parRepay;
    router.go({
        name: 'userrepay',
        params: {
            userId: 'repay'
        }
    })
}
//精确浮点数加法
function accAdd(arg1, arg2) {
    var r1, r2, m;
    try {
        r1 = arg1.toString().split(".")[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split(".")[1].length
    } catch (e) {
        r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2))
    return (arg1 * m + arg2 * m) / m
}
//浮点数减法
function accSub(arg1, arg2) {
    return accAdd(arg1, -arg2);
}