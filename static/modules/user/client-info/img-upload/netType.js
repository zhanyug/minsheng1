var NET = {
	key : 'wsq_nettype',
	init : function() {
		if (jQuery.os.wx) {
			if (typeof WeixinJSBridge != 'undefined') {
				NET.wxNetType();
			} else {
				jq(document).bind('WeixinJSBridgeReady', function() {
					NET.wxNetType();
				});
			}
		} else if (typeof mqq !== 'undefined' && mqq.version
				&& mqq.device.isMobileQQ()) {
			NET.mqqNetType();
		}
		window.NETTYPE = localStorage.getItem(NET.key)
				|| window.NETTYPE_DEFAULT;
	},
	wxNetType : function() {
		WeixinJSBridge.invoke('getNetworkType', {}, function(e) {
			switch (e.err_msg) {
			case 'network_type:wifi':
				localStorage.setItem(NET.key, window.NETTYPE_WIFI);
				break;
			case 'network_type:edge':
				localStorage.setItem(NET.key, window.NETTYPE_EDGE);
				break;
			case 'network_type:wwan':
				localStorage.setItem(NET.key, window.NETTYPE_EDGE);
				break;
			case 'network_type:fail':
				localStorage.setItem(NET.key, window.NETTYPE_FAIL);
				break;
			default:
				break;
			}
		});
	},
	mqqNetType : function() {
		mqq.device.getNetworkType(function(result) {
			switch (result) {
			case 0:
				localStorage.setItem(module.exports.key, window.NETTYPE_FAIL);
				break;
			case 1:
				localStorage.setItem(module.exports.key, window.NETTYPE_WIFI);
				break;
			case 2:
				localStorage.setItem(module.exports.key, window.NETTYPE_EDGE);
				break;
			case 3:
				localStorage.setItem(module.exports.key, window.NETTYPE_3G);
				break;
			default:
				break;
			}
		});
	}
};
// @ sourceURL=http://dzqun.gtimg.cn/quan/scripts/module/netType.js
