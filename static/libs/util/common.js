/* 
 * @Author: Wei
 * @Date:   2016-04-25 13:48:55
 * @Last Modified by:   Wei
 * @Last Modified time: 2017-02-22 12:46:17
 */
// 'use strict';

// init base path
var base = location.protocol + '//' + location.host + '/jeesite/';
//alert(base)
// init vue.js and plugins
var Vue = require('vue'),
    Data = require('util/data');
//dom = require('util/dom');
Vue.use(require('vue-resource'));

(function($) {
    /* remove cmcc 4G ads */
    var tlbstoolbar = document.getElementById('tlbstoolbar');
    if (tlbstoolbar) {
        tlbstoolbar.remove();
    }
    var ipageArray = document.getElementsByTagName('ipage');
    for (var i = 0; i < ipageArray.length; i++) {
        ipageArray[i].remove();
    }

    String.prototype.startWith = function(str) {
        if (str == null || str == "" || this.length == 0 || str.length > this.length)
            return false;
        if (this.substr(0, str.length) == str)
            return true;
        else
            return false;
        return true;
    };
    String.prototype.endWith = function(str) {
        if (str == null || str == "" || this.length == 0 || str.length > this.length)
            return false;
        if (this.substring(this.length - str.length) == str)
            return true;
        else
            return false;
        return true;
    };
    /**
     * @param {int} n
     * @returns {Number.prototype.toFixed}
     */
    Number.prototype.toFixed = function(n) {
        if (n > 20 || n < 0) {
            throw new RangeError('toFixed() digits argument must be between 0 and 20');
        }

        var number = this;

        if (isNaN(number) || number >= Math.pow(10, 21)) {
            return number.toString();
        }
        if (typeof(n) == 'undefined' || n == 0) {
            return (Math.round(number)).toString();
        }

        var result = number.toString();
        var arr = result.split('.');

        // 整数的情况
        if (arr.length < 2) {
            result += '.';
            for (var i = 0; i < n; i++) {
                result += '0';
            }
            return result;
        }

        var integer = arr[0];
        var decimal = arr[1];
        if (decimal.length == n) {
            return result;
        }
        if (decimal.length < n) {
            for (var i = 0; i < n - decimal.length; i++) {
                result += '0';
            }
            return result;
        }
        result = integer + '.' + decimal.substr(0, n);

        var last = decimal.substr(n, 1);

        // 四舍五入，转换为整数再处理，避免浮点数精度的损失
        if (parseInt(last) >= 5) {
            var x = Math.pow(10, n);
            result = (parseFloat(result) * x + 1) / x;
            result = result.toFixed(n);
        }
        return result;

    }
})(mui);

/**
 * init vue loading componnet
 */
var componentLoading = Vue.extend({
    props: ['display'],
    template: '<div class="m-component-loading f-tac {{ display }}"><span class="mui-spinner"></span> 加载中……</div>'
});
Vue.component('component-loading', componentLoading);

/**
 * amount formatter
 */
Vue.filter('format-amount', function(value, scale) {
    if (value == undefined || value == '' || value == 0) {
        return parseFloat('0.00').toFixed(scale);
    }
    value = value + "";
    scale = scale > 0 && scale <= 20 ? scale : 2;
    var positiveNum = true;
    if (value.indexOf('-') == 0) {
        positiveNum = false;
        value = value.substring(1, value.length);
    }
    value = parseFloat(value.replace(/[^\d\.-]/g, "")).toFixed(scale) + "";
    var l = value.split(".")[0].split("").reverse(),
        r = value.split(".")[1];
    var t = "";
    for (var i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    var result = t.split("").reverse().join("") + "." + r;
    return positiveNum ? result : '-' + result;
});
/**
 * get dictionary descripiton
 */
Vue.filter('dict', function(value, dictName) {
    var dict = Data[dictName];
    for (var i = 0; i < dict.length; i++) {
        if (dict[i].id == value) {
            return dict[i].text;
        }
    };
});

/**
 * datetime formatter
 */
Vue.filter('format-datetime', function(value, format) {
    if (!value) return '';
    var date = new Date(value);
    var c, b = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds(),
        "q+": Math.floor((date.getMonth() + 3) / 3),
        S: date.getMilliseconds()
    };
    /(y+)/.test(format) && (format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length)));
    for (c in b) RegExp("(" + c + ")").test(format) && (format = format.replace(RegExp.$1, 1 == RegExp.$1.length ? b[c] : ("00" + b[c]).substr(("" + b[c]).length)));
    return format;
});

/**
 * bankCard substring
 * @param  {[type]} value) {	var        bankCardPrefix [description]
 * @return {[type]}        [description]
 */
Vue.filter('bankCardSubstr', function(value) {
    var bankCardPrefix = value.substr(0, 6);
    var bankCardReturn = bankCardPrefix;
    for (var i = 0; i < value.length - 6; i++) {
        bankCardReturn += '*';
    }

    return bankCardReturn;
});

/**
 * substring
 * @param  {[type]} value [description]
 * @param  {[type]} start [description]
 * @param  {[type]} length)  {	if(length)    {		return value.substr(start, length);	} else {		return value.substr(start);	}} [description]
 * @return {[type]}       [description]
 */
Vue.filter('subStr', function(value, start, length) {
    if (length) {
        return value.substr(start, length);
    } else {
        return value.substr(start);
    }
});

var common = {
    // base path
    BASE_PATH: base,
    // index path
    INDEX_PATH: base + '/index',
    // image path
    IMG_URL: location.protocol + '//' + location.host + "/static/img/",
    // Wechat redirect to fetch code.
    wxRedirectUri: function(path) {
        return 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx7f16833ce79fbf75&redirect_uri=' + encodeURIComponent(location.protocol + '//' + location.host + '/wx' + path) + '&response_type=code&scope=snsapi_userinfo&state=2#wechat_redirect';
    },
    wx: {
        jsApi: {
            location: [
                'getLocation',
                'hideOptionMenu'
            ],
            image: [
                'chooseImage',
                'uploadImage',
                'hideOptionMenu'
            ],
            window: [
                'closeWindow'
            ],
            voice: [
                'startRecord',
                'stopRecord',
                'onVoiceRecordEnd',
                'playVoice',
                'onVoicePlayEnd',
                'pauseVoice',
                'stopVoice',
                'uploadVoice',
            ]
        },
        fetchTokenSignature: function(wx, url, jsApiList, vm, callback) {
            common.Ajax({
                url: 'api/wx/tokenSignature',
                data: {
                    url: mui.os.ios === true ? window.url : location.href.split('#')[0]
                },
                success: function(json) {
                    wx.config({
                        debug: false,
                        appId: json.appId,
                        timestamp: parseInt(json.timestamp),
                        nonceStr: json.nonce,
                        signature: json.signature,
                        jsApiList: jsApiList
                    });
                    if (callback && typeof callback === 'function') {
                        callback();
                    } else {
                        // jssdk loaded, show the whole view.
                        wx.ready(function() {
                            wx.hideOptionMenu();
                        });
                    }
                },
                failure: function() {
                    common.alert('微信接口异常，请重试', function() {
                        router.go({
                            name: 'index'
                        });
                    })
                }
            });
        },
        getLocation: function(wx, vm) {
            wx.ready(function() {
                wx.getLocation({
                    type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                    success: function(res) {
                        var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                        var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                        var speed = res.speed; // 速度，以米/每秒计
                        var accuracy = res.accuracy; // 位置精度
                        if (vm.locationInfo) {
                            vm.locationInfo = {
                                latitude: latitude,
                                longitude: longitude,
                                speed: speed,
                                accuracy: accuracy
                            };
                        }
                    }
                });
            });
        }
    },
    // send http post request with vue-resource
    Ajax: function(options) {

        var that = this;
        Vue.http.post(
                that.BASE_PATH + options.url + '?t=' + Math.random(),
                options.data, {
                    timeout: 12e4,
                    //emulateJSON: true,
                    headers: {
                        "Cache-Control": "no-cache",
                        "channel": "wx",
                        "fw": options.fw || "/user/index"
                    }
                }
            )
            .then(function(json) {
                var data = json.data;

                /*
                 * URL：后台返回流程的链接
                 * 如后台返回url为空，则流程结束，由最后流程的success函数处理fw跳转
                 */
                if (data && data.url) {
                    if (data.returnCode == '000105') {
                        // 长时间停留在当前页面至后台session超时，需重新登录
                        var redirectUrl = '/user/login';
                        //if (options.fw) {
                        // 去掉fw参数，登录后跳转至首页，避免安全性问题
                        // redirectUrl += '?fw=' + encodeURIComponent(options.fw);
                        //}
                        common.msg('会话超时，请重新登录', function() {
                            window.location.href = common.wxRedirectUri(redirectUrl);
                            return;
                        });
                    } else {
                        // 如果包含URL，则提示信息并直接跳转
                        common.msg(data.returnMsg);
                        if (options.fw) {
                            window.router.go({
                                path: data.url,
                                query: {
                                    fw: options.fw
                                }
                            });
                        } else {
                            window.router.go({
                                path: data.url
                            });
                        }
                    }
                } else {
                    // 非流程性AJAX请求
                    if (data.returnCode == '000000') {
                        if (data.count != undefined) {
                            typeof options.success === "function" && options.success(data);
                        } else {
                            typeof options.success === "function" && options.success(data.data);
                        }
                    } else {
                        // 1. 用户未提交wxCode字段 2. wxCode失效
                        if (data.returnCode == '000310' || data.returnCode == '000204') {
                            common.msg(data.returnMsg, function() {
                                var currentPath = location.pathname;
                                var redirectPath = '/user/login';
                                if (currentPath) {
                                    if (currentPath.indexOf('/user/find-password') > 0) {
                                        redirectPath = '/user/find-password' + (options.data.phone ? ('?phone=' + options.data.phone) : '');
                                    } else if (currentPath.indexOf('/user/register') > 0) {
                                        redirectPath = '/user/register';
                                    } else if (currentPath.indexOf('/user/login') > 0) {
                                        redirectPath = '/user/login' + (options.data.mobile ? ('?mobile=' + options.data.mobile) : '');
                                    } else {
                                        redirectPath = '/user/login';
                                    }
                                }
                                window.location.href = common.wxRedirectUri(redirectPath);
                            });
                        } else {
                            if (!options.failureHanlder) {
                                common.msg(data.returnMsg);
                            }
                            typeof options.failure === "function" && options.failure(data);
                        }
                    }
                }
            }, function() {
                common.msg('网络开小差了……请重试');
                typeof options.failure === "function" && options.failure();
            });
    },
    regex: {
        positiveInteger: /^\+?[1-9][0-9]*$/
    },
    msg: function(msg, callback) {
        mui.toast(msg);
        setTimeout(callback, 1500);
    },
    alert: function(msg, callback) {
        mui.alert(msg, '中原消费金融', '确定', function() {
            typeof callback === 'function' && callback();
        });
    },
    confirm: function(msg, yes, cancel) {
        mui.confirm(msg, '中原消费金融', ['确定', '取消'], function(e) {
            if (e.index == 0) {
                typeof yes === 'function' && yes();
            } else {
                typeof cancel === 'function' && cancel();
            }
        })
    },
    prompt: function(msg, defaultText, callback) {
        mui.prompt(msg, defaultText, '中原消费金融', ['确定', '取消'], callback);
    },
    /**
     * Mix properties into target object.
     *
     * @param {Object} to
     * @param {Object} from
     */
    extend: function(to, from) {
        var keys = Object.keys(from);
        var i = keys.length;
        while (i--) {
            to[keys[i]] = from[keys[i]];
        }
        return to;
    },
    type: {
        isFunction: function(obj) {
            return type(obj) === 'function';
        },
        isArray: Array.isArray || function(obj) {
            return type(obj) === 'array';
        },
        isNumeric: function(obj) {
            return !isNaN(parseFloat(obj)) && isFinite(obj);
        },
        type: function(obj) {
            if (obj == null) {
                return String(obj);
            }
            var class2type = {};
            return typeof obj === 'object' || typeof obj === 'function' ? class2type[Object.prototype.toString.call(obj)] || 'object' : typeof obj;
        },
        isPlainObject: function(obj) {
            return Object.prototype.toString.call(obj) === '[object Object]';
        }
    },
    getUrlParm: function(name) {
        var search = document.location.search;
        var pattern = new RegExp("[?&]" + name + "\=([^&]+)", "g");
        var matcher = pattern.exec(search);
        var items = null;
        if (null != matcher) {
            try {
                items = decodeURIComponent(decodeURIComponent(matcher[1]));
            } catch (e) {
                try {
                    items = decodeURIComponent(matcher[1]);
                } catch (e) {
                    items = matcher[1];
                };
            };
        }
        return items;
    },
    getDict: function(dictName, key) {
        var dict = Data[dictName];
        for (var i = 0; i < dict.length; i++) {
            if (dict[i].id == key) {
                return dict[i].text;
            }
        };
    },
    getDictByKey: function(dictName, key) {
        var dict = Data[dictName];
        for (var i = 0; i < dict.length; i++) {
            if (dict[i].value == key) {
                return dict[i].text;
            }
        };
    },
    format: {
        amount: function(value, scale) {
            if (value == undefined || value == '' || value == 0) {
                return '0.00';
            }
            value = value + "";
            scale = scale > 0 && scale <= 20 ? scale : 2;
            var positiveNum = true;
            if (value.indexOf('-') == 0) {
                positiveNum = false;
                value = value.substring(1, value.length);
            }
            value = parseFloat(value.replace(/[^\d\.-]/g, "")).toFixed(scale) + "";
            var l = value.split(".")[0].split("").reverse(),
                r = value.split(".")[1];
            var t = "";
            for (var i = 0; i < l.length; i++) {
                t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
            }
            var result = t.split("").reverse().join("") + "." + r;
            return positiveNum ? result : '-' + result;
        }
    },
    calc: {
        multiply: function(arg1, arg2) {
            var m = 0,
                s1 = arg1.toString(),
                s2 = arg2.toString();
            try {
                m += s1.split(".")[1].length;
            } catch (e) {}
            try {
                m += s2.split(".")[1].length;
            } catch (e) {}
            return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
        },
        divide: function(arg1, arg2) {
            var t1 = 0,
                t2 = 0,
                r1, r2;
            try {
                t1 = arg1.toString().split(".")[1].length;
            } catch (e) {}
            try {
                t2 = arg2.toString().split(".")[1].length;
            } catch (e) {}
            with(Math) {
                r1 = Number(arg1.toString().replace(".", ""));
                r2 = Number(arg2.toString().replace(".", ""));
                return (r1 / r2) * pow(10, t2 - t1);
            }
        }
    },
    date: {
        daysBtn: function(fromDate, toDate) {
            if (fromDate == null || toDate == null) {
                return null;
            }
            var fromDateYear = fromDate.getFullYear();
            var fromDateMonth = fromDate.getMonth();
            var fromDateDay = fromDate.getDate();

            var toDateYear = toDate.getFullYear();
            var toDateMonth = toDate.getMonth();
            var toDateDay = toDate.getDate();

            var newFromDate = new Date(fromDateYear, fromDateMonth, fromDateDay);
            var newToDate = new Date(toDateYear, toDateMonth, toDateDay);

            if (newFromDate.getTime() >= newToDate.getTime()) {
                return 0;
            }

            return (newToDate.getTime() - newFromDate.getTime()) / (24 * 60 * 60 * 1000);
        }
    },
    doc: {
        setTitle: function(title) {
            document.title = title;
            // 部分手机不能动态设置title，需要通过hack的手段处理~~
            /*if ((/iphone|ipad/gi).test(window.navigator.appVersion)) {
                var iframe = document.createElement('iframe');
                iframe.frameBorder = 'no';
                iframe.style.width = "0";
                iframe.style.height = "0";
                var $iframe = dom(iframe);
                var fn = function() {
                    setTimeout(function() {
                        $iframe.off('load', fn).remove();
                    }, 0)
                };
                $iframe.on('load', fn);
                document.body.appendChild(iframe);
            }*/
        }
    },
    //校验身份证是否合法，严格校验
    checkCardID: function(code) {
        var city = {
            11: "北京",
            12: "天津",
            13: "河北",
            14: "山西",
            15: "内蒙古",
            21: "辽宁",
            22: "吉林",
            23: "黑龙江 ",
            31: "上海",
            32: "江苏",
            33: "浙江",
            34: "安徽",
            35: "福建",
            36: "江西",
            37: "山东",
            41: "河南",
            42: "湖北 ",
            43: "湖南",
            44: "广东",
            45: "广西",
            46: "海南",
            50: "重庆",
            51: "四川",
            52: "贵州",
            53: "云南",
            54: "西藏 ",
            61: "陕西",
            62: "甘肃",
            63: "青海",
            64: "宁夏",
            65: "新疆",
            71: "台湾",
            81: "香港",
            82: "澳门",
            91: "国外 "
        };
        var tip = "";
        if (code.length != 18) {
            //tip = "身份证位数错误";
            tip = "请输入正确的身份证号码";
            mui.toast(tip);
            return false;
        } else if (!city[code.substr(0, 2)]) {
            //tip = "身份证地址编码错误";
            tip = "请输入正确的身份证号码";
            mui.toast(tip);
            return false;
        } else {
            //18位身份证需要验证最后一位校验位
            if (code.length == 18) {
                code = code.split('');
                //∑(ai×Wi)(mod 11)
                //加权因子
                var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
                //校验位
                var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
                var sum = 0;
                var ai = 0;
                var wi = 0;
                for (var i = 0; i < 17; i++) {
                    ai = code[i];
                    wi = factor[i];
                    sum += ai * wi;
                }
                var last = parity[sum % 11]; //计算出应该最后一位
                var codeLast = code[17]; //实际传入最后一位
                if (codeLast == "x") {
                    codeLast = "X";
                }
                if (last != codeLast) {
                    //tip = "身份证校验位错误";
                    tip = "请输入正确的身份证号码";
                    mui.toast(tip);
                    return false;
                }
            }
        }
        return true;
    },
    antiFraud: {
        afCallBack: function() {
            // mui.toast('Baiqishi call back');
        },
        postInfo: function(tokenKey, afCallBack) {
            _saber = {
                partnerId: 'zyxj',
                appId: 'test',
                tokenKey: tokenKey,
                callback: afCallBack
            };
            var aa = document.createElement('script');
            aa.async = true;
            aa.src = ('https:' == document.location.protocol ? 'https://' :
                'http://') + 'df.baiqishi.com/static/webdf/saber.js?t=' + (new Date().getTime() / 3600000).toFixed(0);
            var bb = document.getElementsByTagName('script')[0];
            bb.parentNode.insertBefore(aa, bb);
        },
        sendInfo: function() {
            // insert baiqishi anti-fraud saber
            common.Ajax({
                url: 'api/wx/user/getEntryptSessionId',
                data: {},
                success: function(json) {
                    common.antiFraud.postInfo(json.tokenKey, common.antiFraud.afCallBack);
                }
            })
        }
    },
    tongdun: {
        generateTokenId: function(genLength) {
            var x = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
            var tmp = '';
            var timestamp = new Date().getTime();
            for (var i = 0; i < genLength; i++) {
                tmp += x.charAt(Math.ceil(Math.random() * 100000000) % x.length);
            }
            return timestamp + tmp;
        }
    },
    bankCardSubstr: function(backCard) {
        /*var bankCardPrefix = backCard.substr(0, 6);
        var bankCardReturn = bankCardPrefix;
        for (var i = 0; i < backCard.length - 6; i++) {
        	bankCardReturn += '*';
        }

        return bankCardReturn;*/
        return backCard;
    },
    dateComp: function(d1, d2) {
        if (d1.getFullYear() > d2.getFullYear()) {
            return 1;
        } else if (d1.getFullYear() < d2.getFullYear()) {
            return -1;
        } else {
            if (d1.getMonth() > d2.getMonth()) {
                return 1;
            } else if (d1.getMonth() < d2.getMonth()) {
                return -1;
            } else {
                if (d1.getDate() > d2.getDate()) {
                    return 1;
                } else if (d1.getDate() > d2.getDate()) {
                    return -1;
                } else {
                    return 0;
                }
            }
        }
    }
};
module.exports = common;
