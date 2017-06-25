/*
* @Author: bstLee
* @Date:   2016-08-03 17:22:41
* @Last Modified by:   Wei
* @Last Modified time: 2017-01-05 16:53:03
*/

'use strict';

var common = require('util/common'),
    Vue = require('vue'),
    wx = require('static/libs/wechat/jweixin')/*,
    EXIF = require('util/img/exif'),
    ImageCompresser = require('util/img/processImg')*/;

var fileData = [];

/*var compressConf = {
    maxW: 3000,
    maxH: 1280,
    quality: 0.8
};*/

var overtime = 10*60*1000, // 超时时间
	maxNum = 5, // 最大上传数量
	fw = '';

module.exports = Vue.extend({
    template: __inline('cms-multi-media.tpl'),
    data: function() {
        return {
            saveBtnText: '提交',
            saveBtnClass: {
                'z-dis': false
            },
            addFileBtnText: '添加附件',
            delFileBtnText: '删除附件',
            CURTIME: null,
            files: [],
            uploadData: {
            	BSTP: '', // 业务操作类型，001-上传资料，直接默认
            	DTTP: '', // 资料类型，001-照片、002-声纹、003-视频、004-文件、999-其他  默认001
            	FLAG: '', // 需创建模板Y 是 N 否
            	BUSSIDKNL: '', // 影像系统子平台编号
            	APPL: '', // 业务流水号
            	DOC_ID: '', // 业务模板实例编号
            	BATCH: '', // 批次号
            	WRITEPATH: '', // 上传文件相对路径
            	DIR: '', // 影像树的虚拟目录
            	TELLER_NO: '', // 业务员信息
            	img_list: '' // 包含多个影像base64编码的json字符串
            },
            urlParams: '',
            view: {
                isLoading: true
            }
        }
    },
    route: {
        data: function (transition) {
            console.log('route view activated!');
            transition.next();
            console.warn('Change view to: ' + transition.to.path);

            var vm = this;
            // fetch Wechat JS API signature
            common.wx.fetchTokenSignature(wx, transition.to.path, common.wx.jsApi.image.concat(common.wx.jsApi.window), this, function() {
                wx.ready(function () {
                    wx.hideOptionMenu();
                    vm.view.isLoading = false;
                    Vue.nextTick(function() {
                        vm.imageResize();
                    });
                });
            });
        }
    },
    methods: {
        chooseImage: function(event) {
            var vm = this;
            var index = event.target.dataset.index;
            wx.ready(function () {
                wx.chooseImage({
                    count: 1, // 默认9
                    sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
                    success: function (res) {
                        var localId = res.localIds[0];
                        event.target.src = res.localIds[0];
                        var imgId = event.target.id;
                        if (!mui.os.ios) {
                            // 支持低版本Android系统，延迟100ms执行上传
                            setTimeout(function() {
                                vm.uploadImageToWechat(localId, imgId);
                            }, 100);
                        } else {
                            vm.uploadImageToWechat(localId, imgId);
                        }
                    },
                    fail: function (res) {
                        // alert(JSON.stringify(res));
                        // common.alert('微信接口异常');
                    }
                });
            });
        },
        uploadImageToWechat: function(localId, imgId) {
            var vm = this;
            var target = document.getElementById(imgId);
            wx.uploadImage({
                localId: localId,
                success: function (res) {
                    target.dataset.serverId = res.serverId;
                },
                fail: function (res) {
                    // alert(JSON.stringify(res));
                    // common.alert('微信接口异常');
                }
            });
        },
    	addFile: function() {
            var vm = this;
    		if(vm.files.length >= maxNum) {
    			common.alert('单次允许上传附件数量最大为：' + maxNum);
    			return;
    		}
            var filePrint = common.tongdun.generateTokenId(8);
    		vm.files.push({filePrint: filePrint});
            Vue.nextTick(function() {
                vm.imageResize();
            });
    	},
    	delFile: function() {
            var vm = this;
            var print = event.target.dataset.print;

            var index = -1;
            for (var i = 0; i < this.files.length; i++) {
                if (this.files[i].filePrint == print) {
                    index = i;
                    break;
                }
            }
            if (index != -1) {
                this.files.splice(index, 1);
                Vue.nextTick(function() {
                    vm.imageResize();
                });
            }
    	},
        saveMultiMedia: function(event) {
            var vm = this;

            var now = new Date();
	        if(vm.CURTIME) {
	        	var curTimes = new Date(vm.CURTIME);
	        	if (now.getTime() - curTimes.getTime() > overtime) {
	        		common.alert('当前二维码已经失效，请重新生成！', function(){
                        wx.ready(function () {
                            // close wechat webview
                            wx.closeWindow();
                        });
	        		});
	        	}
	        }

            if (vm.saveBtnClass['z-dis'] == true) {
                return;
            }

            var imgs = document.querySelectorAll('.upload-img img');
            var serverIdArr = [];
            for (var i = 0; i < imgs.length; i++) {
                var serverId = imgs[i].dataset.serverId;
                if (serverId) {
                    serverIdArr.push(serverId);
                }
            }
            if (serverIdArr.length == 0) {
                common.msg('请上传附件');
                return;
            }

            vm.uploadData.img_list = JSON.stringify(serverIdArr);
            
            vm.saveBtnText = '<span class="mui-icon mui-icon-spinner spin"></span> 处理中';
            vm.saveBtnClass['z-dis'] = true;
            common.Ajax({
                url: 'api/wx/nolg/media/uploadImgTwoCode',
                data: vm.uploadData,
                fw: fw,
                success: function(json) {
                    vm.saveBtnText = '提交';
                    vm.saveBtnClass['z-dis'] = false;
                    router.go({
                        path: '/upload/cms-multi-media/success',
                        query: vm.$route.query
                    });
                },
                failure: function(json) {
                    vm.saveBtnText = '提交';
                    vm.saveBtnClass['z-dis'] = false;
                }
            })
        },
        imageResize: function() {
            var RegisterThree_w = $(".RegisterThree_photo").width();
            var RegisterThree_h = RegisterThree_w*2/3;
            $(".RegisterThree_photo").css("height",RegisterThree_h);
            $(".RegisterThree_photo input").css("height",RegisterThree_h);
            $(".RegisterThree_photo img").css("height",RegisterThree_h-2);
            $(".RegisterThree_photo img").css("width",RegisterThree_w);
        }
    },
    ready: function() {
        var vm = this;

        this.CURTIME = common.getUrlParm('CURTIME');
        var now = new Date();
        if(this.CURTIME) {
        	var curTimes = new Date(this.CURTIME);
        	if (now.getTime() - curTimes.getTime() > overtime) {
        		common.alert('当前二维码已经失效，请重新生成！', function(){
        			router.go({ name: 'index'});
        		});
        	}
        }

        var filePrint = common.tongdun.generateTokenId(8);
        vm.files.push({filePrint: filePrint});

        this.uploadData.BSTP = common.getUrlParm('BSTP');
        this.uploadData.DTTP = common.getUrlParm('DTTP');
        this.uploadData.FLAG = common.getUrlParm('FLAG');
        this.uploadData.BUSSIDKNL = common.getUrlParm('BUSSIDKNL');
        this.uploadData.APPL = common.getUrlParm('APPL');
        this.uploadData.DOC_ID = common.getUrlParm('DOC_ID');
        this.uploadData.BATCH = common.getUrlParm('BATCH');
        this.uploadData.WRITEPATH = common.getUrlParm('WRITEPATH');
        this.uploadData.DIR = common.getUrlParm('DIR');
        this.uploadData.TELLER_NO = common.getUrlParm('TELLER_NO');
        
        // 存储参数
        var path = vm.$route.path;
        vm.urlParams = path? path.substring(path.indexOf('?')) : '';
    }
 });
