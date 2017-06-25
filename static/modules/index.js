/* 
 * @Author: Wei
 * @Date:   2016-05-12 02:22:07
 * @Last Modified by:   Wei
 * @Last Modified time: 2016-12-26 16:00:28
 */

'use strict';

var common = require('util/common'),
	Vue = require('vue');

module.exports = Vue.extend({
	template: __inline('index.tpl'),
	data: function() {
		return {
			isLogin: window.isLogin,
			userGender: window.userGender // 1-男；2-女
		}
	},
	methods: {
		loginOut: function() {
			var vm = this;
			common.confirm('是否确认退出？', function() {
				useAjax('api/wx/lg/user/loginOut', '', function(response) {
					window.isLogin = false;
    				window.isUserGenderFetched = false;
					vm.isLogin = false;
					// reinitialize
					vm.$nextTick(function() {
						unLoginInit();
					});
				}, function(json) {
				})
			});
		},
		toRedirectPage: function(event) {
			//var path = event.target.dataset.path;
			//window.location.href = common.wxRedirectUri(path);
			
		window.location.href = "/wx/user/register";
		},
		toRedirectPages:function(event){
			window.location.href = "/wx/user/login";
		},
		fetchGender: function() {

		}
	},
	ready: function() {
		var vm = this;
		useAjax('api/wx/user/checkLogin', '', function(response) {
			vm.isLogin = response.isLogin;

			vm.$nextTick(function () {
		    	if (response.isLogin) {
		    		if (window.isUserGenderFetched) {
	    				vm.userGender = window.userGender;
		    		} else {
		    			useAjax('api/wx/lg/user/getUserSex', {}, function(json) {
		    				vm.userGender = json.userSex;
		    				window.userGender = json.userSex;
		    				window.isUserGenderFetched = true;
		    			});
		    		}
		    		loginInit();
				} else {
					unLoginInit();
				}
		    });
		}, function(json) {
		});
	}
});

//调用common Ajax，参数：url、data、callback、failure
function useAjax(url, data, callback, failure) {
	common.Ajax({
		url: url,
		data: data,
		success: function(json) {
			typeof callback === 'function' && callback(json);
		},
		failure: function(json) {
			typeof failure === 'function' && failure(json);
		}
	})
}

function loginInit() {
	var userLoad_w = $("#load-banner").width();
	var userLoad_h =userLoad_w*0.55;
	var userLoad_wlogo =userLoad_w*0.22;
	var userLoad_hlogo = (userLoad_h-userLoad_wlogo)/3;
	$(".load-banner").css("height",userLoad_h);
	$(".load-logo").width(userLoad_wlogo).height(userLoad_wlogo).css("padding-top",userLoad_hlogo );
	$(".load-text").css("padding-top",userLoad_hlogo );		
	$(".load-text").css("line-height",userLoad_wlogo + "px" );	
	/*var category_lg = $("#user_load ul li");
	var category_img = $("#user_load ul li img");
	var userLoad_wid = category_lg.width();
	var category_imgw = userLoad_wid*0.4;
   	category_lg.css("height",userLoad_wid);
	category_img.width(category_imgw).height(category_imgw);*/
}

function unLoginInit() {
	var img_w = $("#about-banner").width();
   	var img_h =img_w*0.55;
   	var img_wlogo =img_w*0.3;
   	var img_hlogo = (img_h-img_wlogo)/3;
  	$(".about-banner").css("height",img_h);
  	$(".banner-logo").width(img_wlogo).height(img_wlogo).css("padding-top",img_hlogo );	
  	$(".banner-text").width(img_wlogo + 6).height(img_wlogo).css("padding-top",img_hlogo );	
   
   	//var category_lg = $("#user_load ul li");
   	//var category_img = $("#user_load ul li img");
   	//var logo_w = category_lg.width();
   	//var category_imgw = logo_w*0.4;
	//category_lg.css("height",logo_w);
    //category_img.width(category_imgw).height(category_imgw);
}