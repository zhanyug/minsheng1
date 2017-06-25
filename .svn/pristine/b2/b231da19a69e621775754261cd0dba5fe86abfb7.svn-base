/* 
 * @Author: Ma
 * @Date:   2016-05-12 01:06:51
 * @Last Modified by:   Wei
 * @Last Modified time: 2017-01-10 10:08:02
 */

'use strict';

var validator = require('util/validator'),
    common = require('util/common'),
    Vue = require('vue'),
    wx = require('static/libs/wechat/jweixin');

var par; //申请信息，从上个页面传递过来，在ready中接收

// OCR识别状态
var isBankCardRecongnizeCort = false;

module.exports = Vue.extend({
    template: __inline('msg-verified.tpl'),
    data: function() {
        return {
            cardNo: '',
            name: '',
            idCard: '',
            cardPhoneNo: '',
            saveBtnText: '下一步',
            saveBtnClass: {
                'z-dis': false
            },
            image: {
                serverId: '',
                localId: ''
            },
            view: {
                isLoading: true
            },
            ocr: {
                ocr_card_no: '', // 银行卡卡号
                ocr_recd_no_card: '' // 银行卡识别编号
            }
        }
    },
    route: {
        data: function(transition) {
            console.log('route view activated!');
            transition.next();
            console.warn('Change view to: ' + transition.to.path);

            var vm = this;
            // fetch Wechat JS API signature
            common.wx.fetchTokenSignature(wx, transition.to.path, common.wx.jsApi.image, this, function() {
                wx.ready(function () {
                    wx.hideOptionMenu();
                    // jssdk loaded, show the whole view.
                    vm.view.isLoading = false;
                    vm.$nextTick(function () {
                        initData(this);
                    });
                });
            });
        }
    },
    methods: {
        chooseImage: function(event) {
            var vm = this;
            wx.ready(function() {
                wx.chooseImage({
                    count: 1, // 默认9
                    sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
                    success: function(res) {
                        vm.image.localId = res.localIds[0];
                        event.target.src = res.localIds[0];
                        if (!mui.os.ios) {
                            // 支持低版本Android系统，延迟100ms执行上传
                            setTimeout(function() {
                                vm.uploadImageToWechat();
                            }, 100);
                        } else {
                            vm.uploadImageToWechat();
                        }
                    },
                    fail: function(res) {
                        // alert(JSON.stringify(res));
                        // common.alert('微信接口异常');
                    }
                });
            });
        },
        uploadImageToWechat: function() {
            var vm = this;
            wx.uploadImage({
                localId: vm.image.localId,
                success: function(res) {
                    vm.image.serverId = res.serverId;
                    vm.fetchRecongnizeResult(res.serverId);
                },
                fail: function(res) {
                    // alert(JSON.stringify(res));
                    // common.alert('微信接口异常');
                }
            });
        },
        // 获取识别信息
        fetchRecongnizeResult: function(serverId) {
            var vm  = this;
            // common.msg('图片信息识别中……');
            router.app.isLoadingToastShow = true;
            common.Ajax({
                url: 'api/wx/media/ocrCardRecognize',
                data: {
                    media_bank_card: serverId
                },
                success: function(json) {
                    vm.cardNo = json.card_number || vm.cardNo || '';
                    vm.ocr.ocr_card_no = json.card_number || '';
                    vm.ocr.ocr_recd_no_card = json.ocrRecdNo || '';
                    isBankCardRecongnizeCort = true;
                    Vue.nextTick(function() {
                        router.app.isLoadingToastShow = false;
                    });
                },
                failure: function(json) {
                    router.app.isLoadingToastShow = false;
                    isBankCardRecongnizeCort = false;
                }
            });
        },
        goNext: function() {
            var vm = this;
            if (vm.saveBtnClass['z-dis']) {
                return false;
            }
            if (vm.image.serverId == '') {
                common.msg('请上传银行卡照片');
                return;
            }
            if (validator.check('#m-set-multi-media-form-avatar')) {
                // 银行卡通过OCR正常识别后才允许通过
                if (!isBankCardRecongnizeCort) {
                    common.alert('请上传正确的银行卡图片');
                    return;
                } else {
                    // var str = params.cardNumber + "#" + params.period + "#" + params.userName + "#" + params.idNumber + "#" + params.resMobile + "#" + params.idInputTime + "#" + params.idInputType + "#" + params.cardInputType;
                    vm.saveBtnText = '<span class="mui-icon mui-icon-spinner spin"></span> 处理中';
                    vm.saveBtnClass['z-dis'] = true;

                    var params = {
                        media_bank_card: vm.image.serverId, //银行卡
                        cardNumber: vm.cardNo, //卡号
                        period: par.period,
                        userName: par.userName,
                        idNumber: par.idNumber,
                        resMobile: vm.cardPhoneNo, //预留手机号
                        idInputTime: par.idInputTime,
                        idInputType: par.idInputType,
                        cardInputType: par.cardInputType
                    }

                    var data = mui.extend({}, params, vm.ocr);

                    common.Ajax({
                        url: 'api/wx/media/uploadBankCard',
                        data: data,
                        success: function(json) {
                            vm.saveBtnText = '下一步';
                            vm.saveBtnClass['z-dis'] = false;
                            router.go({
                                name: 'verified-code',
                                query: params
                            })
                        },
                        failure: function(json) {
                            vm.saveBtnText = '下一步';
                            vm.saveBtnClass['z-dis'] = false;
                        }
                    });
                }
            }
        },
        showCard: function() {
            if (this.cardNo == "") {
                common.msg("请先填写银行卡号");
                return false;
            }
            common.Ajax({
                url: 'api/wx/media/limit',
                data: {
                    cardNo: this.cardNo
                },
                fw: "",
                success: function(json) {
                    if (json.data.bankName == undefined) {
                        common.alert("没有查到您的银行卡相关信息")
                    } else {
                        common.alert(getIsUnde(json.data.bankName) + "的银行卡限额<br><br>单日扣款限额：" + getIsUnde(json.data.dayDeduct) + "<br>单日支付限额：" + getIsUnde(json.data.dayPay) + "<br>单笔扣款限额：" + getIsUnde(json.data.singleDeduct) + "<br>单笔支付限额：" + getIsUnde(json.data.singlePay))
                    }
                },
                failure: function(json) {}
            })
        }
    },
    ready: function() {
        var vm = this;
        isBankCardRecongnizeCort = false;
    }
});

function initData(vueObj) {
    par = vueObj.$route.query;
    console.log(JSON.stringify(par));
    var nameSign = par.userName.substring(0, 1);
    var num = Number(par.userName.length) - 1;
    for (var i = 0; i < num; i++) {
        nameSign += '*';
    }
    vueObj.name = nameSign;
    var idCardSign = par.idNumber.substring(0, par.idNumber.length - 6) + '******';
    vueObj.idCard = idCardSign;

    // ui init
    var RegisterThree_w = $(".RegisterThree_photo").width();
    var RegisterThree_h = RegisterThree_w * 2 / 3;
    $(".RegisterThree_photo").css("height", RegisterThree_h);
    $(".RegisterThree_photo input").css("height", RegisterThree_h);
    $(".RegisterThree_photo img").css("height", RegisterThree_h - 2);
    $(".RegisterThree_photo img").css("width", RegisterThree_w);
}
//如果返回值为undefined，则返回暂无
function getIsUnde(par) {
    if (par == undefined) {
        return "暂无"
    } else {
        return par;
    }
}
