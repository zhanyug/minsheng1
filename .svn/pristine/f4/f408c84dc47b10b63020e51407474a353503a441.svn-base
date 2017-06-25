/* 
 * @Author: Ma
 * @Date:   2016-05-19 09:10
 * @Last Modified by:   Wei
 * @Last Modified time: 2016-12-26 15:50:06
 */

'use strict';

var validator = require('util/validator'),
	common = require('util/common'),
	Vue = require('vue');
module.exports = Vue.extend({
	template: __inline('repayPlanInfo.tpl'),
	data: function() {
		return {
			cont_no: "",
			loan_no: "",
			ps_perd_no: "",
			ps_due_dt: "",
			ps_instm_amt: "",
			setl_instm_amt: "",
			ps_prcp_amt: "",
			setl_prcp: "",
			ps_norm_int: "",
			setl_norm_int: "",
			ps_brokerage_amt: "",
			setl_brokerage_amt: "",
			ps_od_int_amt: "",
			setl_od_int_amt: "",
			ps_comm_od_int: "",
			setl_comm_od_int: "",
			amort_prime_amt: "",
			ps_sts: "",
		}
	},
	methods: {
		goInfo: function(event) {
			router.go({
				name: 'userRepayCost',
				params: {
					userId: 'userRepayCost'
				},
				query: {
					id: this.$route.query.id
				}
			})
		}
	},
	ready: function() {
		var id = this.$route.query.id;
		initData(this, id)
	}
});

function initData(vueObj, id) {
	var choseQishu = id.split("#")[0];
	var choseNo = id.split("#")[1];
	common.Ajax({
		url: 'api/wx/auth/credit/queryAllRepayPlanDetail',
		data: {
			"loan_no": choseNo,
			"ps_perd_no": choseQishu,
			"query_type": "02",//01汇总02明细
			"detail_type": "03"//01 7天 02一个月03全部
		},
		success: function(json) {
			console.log(JSON.stringify(json))
			vueObj.cont_no = json.cont_no;
			vueObj.loan_no = json.loan_no;
			vueObj.ps_perd_no = json.ps_perd_no;
			vueObj.ps_due_dt = json.ps_due_dt;
			vueObj.ps_instm_amt = json.ps_instm_amt;
			vueObj.setl_instm_amt = json.setl_instm_amt;
			vueObj.ps_prcp_amt = json.ps_prcp_amt;
			vueObj.setl_prcp = json.setl_prcp;
			vueObj.ps_norm_int = json.ps_norm_int;
			vueObj.setl_norm_int = json.setl_norm_int;
			vueObj.ps_brokerage_amt = json.ps_brokerage_amt;
			vueObj.setl_brokerage_amt = json.setl_brokerage_amt;
			vueObj.ps_od_int_amt = json.ps_od_int_amt;
			vueObj.setl_od_int_amt = json.setl_od_int_amt;
			vueObj.ps_comm_od_int = json.ps_comm_od_int;
			vueObj.setl_comm_od_int = json.setl_comm_od_int;
			vueObj.amort_prime_amt = json.amort_prime_amt;
			vueObj.ps_sts = json.ps_sts;
		},
		failure: function(json) {
		}
	})

}