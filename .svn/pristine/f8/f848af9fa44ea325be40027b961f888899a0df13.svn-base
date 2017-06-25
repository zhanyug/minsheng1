/* 
 * @Author: Ma
 * @Date:   2016-05-18 15:06
 * @Last Modified by:   Wei
 * @Last Modified time: 2016-12-26 15:49:27
 */

'use strict';

var validator = require('util/validator'),
	common = require('util/common'),
	Vue = require('vue');

var type = 0;

module.exports = Vue.extend({
	template: __inline('repayIndex.tpl'),
	data: function() {
		return {
			dateStyle: {
				display: 'block'
			},
			dateClass: 'selected',
			dataStyle: {
				display: 'none'
			},
			dataClass: '',
			seven_day_amt: '',
			one_month_amt: '',
			all_unpaid_amt: '',
			all_loan_amt: '', // 总借款金额
			all_unreplay_amt: '', // 按笔未还总金额
			all_replay_num: '', // 总还款笔数
			replay_progress_scale: '', // 还款进度百分比
			all_loan_os_prcp: 0
		}
	},
	methods: {
		changeTaps: function(id) {
			if (id == 1) {
				this.dateStyle.display = 'block';
				this.dataStyle.display = 'none';
				this.dateClass = 'selected';
				this.dataClass = '';
			} else if (id == 2) {
				this.dateStyle.display = 'none';
				this.dataStyle.display = 'block';
				this.dateClass = '';
				this.dataClass = 'selected';
			}
		},
    	ChangeDiv: function(divId,divName,zDivCount) { 
			 var spanlist = document.getElementsByTagName('i');
			 type = divId;
			 for(var i=0;i<spanlist.length;i++){
			  if(i == divId){
			   spanlist[i].style.backgroundColor ="#e4a94f";
			   spanlist[i].style.color ="#fff";
			 }else{ 
			 spanlist[i].style.backgroundColor = "#f0f0f0";
			 spanlist[i].style.color ="#666";
			 }
			 }
			for(i=0;i<=zDivCount;i++)
			 {
			     document.getElementById(divName+i).style.display="none";
			 }
			 document.getElementById(divName+divId).style.display="block"; 
		},
		toDateRepay: function() {
			if (this.all_loan_amt != 0) {
				router.go({
	                path: '/userRe/repayList',
	                query: {
	                	repayFlag : 1,
	                	type: type
	                }
	            });
			} else {
				common.msg('暂无需还款');
			}
		},
		toDataRepay: function() {
			if (this.all_loan_amt != 0) {
				router.go({
	                path: '/userRe/repayList',
	                query: {
	                	repayFlag : 2
	                }
	            });
			} else {
				common.msg('暂无需还款');
			}
		}
	},
	ready: function() {
		initData(this);
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
		fw:"/userRepayIndex",
		success: function(json) {
			vueObj.seven_day_amt = json.seven_day_amt;
			vueObj.one_month_amt = json.one_month_amt;
			vueObj.all_unpaid_amt = json.all_unpaid_amt;
			vueObj.all_loan_amt = json.all_loan_amt;
			vueObj.all_unreplay_amt = json.all_unreplay_amt;
			vueObj.all_replay_num = json.all_replay_num;
			vueObj.replay_progress_scale = json.replay_progress_scale;
			vueObj.all_loan_os_prcp = json.all_loan_os_prcp;

			// ui init
			var canvas = document.getElementById('myCanvas');
			var canvas_height= window.innerWidth;
			var shuzhi = vueObj.replay_progress_scale;
			var can_w = canvas_height/2;
			//x,y 坐标,radius 半径,process 百分比,backColor 中心颜色, proColor 进度颜色, fontColor 中心文字颜色
			function DrowProcess(x,y,radius,process,backColor,proColor,fontColor){
				if (canvas.getContext) {
					var cts = canvas.getContext('2d');
					canvas.width = canvas_height;
					canvas.height =300;
				}else{
					return;
				}
				cts.beginPath();  
			// 坐标移动到圆心  
				cts.moveTo(x, y);  
			// 画圆,圆心是24,24,半径24,从角度0开始,画到2PI结束,最后一个参数是方向顺时针还是逆时针  
				cts.arc(x, y, radius, 0, Math.PI * 2, true);  
				cts.closePath();  
			// 填充颜色  
				cts.fillStyle = backColor;  
				cts.fill();
				cts.beginPath();  
			// 画扇形的时候这步很重要,画笔不在圆心画出来的不是扇形  
				cts.moveTo(x, y);  
			// 跟上面的圆唯一的区别在这里,不画满圆,画个扇形  
				cts.arc(x, y, radius, Math.PI * 1.5, Math.PI * 1.5 -  Math.PI * 2 * process / 100, true);  
				cts.closePath();  
				cts.fillStyle = proColor;  
				cts.fill(); 
			//填充背景白色
				cts.beginPath();  
				cts.moveTo(x, y); 
				cts.arc(x, y, radius - (radius * 0.03), 0, Math.PI * 2, true);  
				cts.closePath();
				cts.fillStyle = 'rgba(255,255,255,1)';  
				cts.fill(); 
			//在中间写字 
				cts.font = "2em Arial";  
				cts.fillStyle = 'rgba(102,102,102,1)';  
				cts.textAlign = 'center';  
				cts.textBaseline = 'middle';  
				cts.moveTo(x, y); 
				cts.fillText("还款进度", x, y/1.8); 
				cts.font = "8em Arial";  
				cts.fillStyle = 'rgba(51,51,51,1)';  
				cts.fillText(process+"%", x, y);  
				cts.font = "1.5em Arial";  
				cts.fillStyle = 'rgba(217,217,217,1)';  
				cts.fillText("总贷款"+vueObj.all_loan_amt+"元", x, y/0.7); 
				cts.font = "1.1em Arial";  
				cts.fillStyle = 'rgba(80,80,80,1)';
			}
			var bfb = 0;
			var time=0;
			function Start(){
				DrowProcess( can_w, 160,135,bfb,'#ddd','#e4a94f','#e4a94f');
				var t = setTimeout(Start,5);
				if(bfb>=shuzhi){
					clearTimeout(t);
					bfb=0;
					return;
				}
				bfb+=1;

			}
			Start();
		},
		failure: function(json) {
		}
	})
}