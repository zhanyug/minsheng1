/* 
* @Author: Wei
* @Date:   2016-05-12 01:06:51
* @Last Modified by:   Wei
* @Last Modified time: 2016-12-08 10:25:11
*/

'use strict';

var common = require('util/common'),
    validator = require('util/validator'),
    locationData = require('util/location'),
    Vue = require('vue');

var addressPicker = undefined,
    intervalId = undefined,
    fw = '';

module.exports = Vue.extend({
    template: __inline('set-basic-info.tpl'),
	data: function() {
		return {
            title: '基础信息',
            workCom: '',
            comTel: '',
            provinceAndCity: '',
            province: '',
            city: '',
            area: '',
            address: '',
            showProgress: false
	    }
    },
    methods: {
        setBacicInfo: function() {
            var vm = this;
            if (validator.check('#m-set-basic-info-form')) {
                common.Ajax({
                    url: 'api/wx/auth/user/setBaseInfo',
                    data: {
                        workCom: vm.workCom,
                        comTel: vm.comTel,
                        province: vm.province,
                        city: vm.city,
                        area: vm.area,
                        address: vm.address
                    },
                    fw: fw,
                    success: function(json) {
                        common.msg('基础信息录入成功', function() {
                            router.go({ path: '/user/index'});
                        });
                    }
                })
            }
        },
        showAddressPicker: function() {
            var vm = this;
            addressPicker.show(function(items) {
                vm.province = items[0].value;
                vm.city = items[1].value;
                vm.area = items[2].value;
                vm.provinceAndCity = items[0].text + '/' + items[1].text + '/' + items[2].text;
            });
        },
        getAddressPickerText: function(province, city, area) {
            var resultText = '';
            for (var i = 0; i < locationData.length; i++) {
                var firstLevelData = locationData[i];
                if (firstLevelData.value == province) {
                    resultText += firstLevelData.text;
                    var firstLevelChildrenData = firstLevelData.children;
                    for (var j = 0; j < firstLevelChildrenData.length; j++) {
                        var secondLevelData = firstLevelChildrenData[j];
                        if (secondLevelData.value == city) {
                            resultText += '/' + secondLevelData.text;
                            var secondLevelChildrenData = secondLevelData.children;
                            for (var m = 0; m < secondLevelChildrenData.length; m++) {
                                var thirdLevelData = secondLevelChildrenData[m];
                                if (thirdLevelData.value == area) {
                                    resultText += '/' + thirdLevelData.text;
                                }
                            }
                        }
                    }
                }
            }
            return resultText;
        }
    },
    ready: function() {
        fw = this.$route.query.fw;

        var vm = this;

        if (!vm.$route.query.auth == '1') {
            vm.showProgress = true;
            common.Ajax({
                url: 'api/wx/user/stepQueryDirect',
                data: {
                    url: '/user/client-info/set-basic-info'
                },
                success: function(json) {
                    vm.title = json.step + ' ' + json.desc;
                }
            });
        }

        addressPicker = new mui.PopPicker({
            layer: 3
        });
        addressPicker.setData(locationData);

        common.Ajax({
            url: 'api/wx/lg/user/queryUserAllInfo',
            data: null,
            success: function(json) {
                vm.province = json.province || '';
                vm.city = json.city || '';
                vm.area = json.area || '';
                vm.address = json.address || '';
                vm.comTel = json.comTel;
                vm.workCom = json.workCom || '';
                vm.provinceAndCity = vm.getAddressPickerText(json.province, json.city, json.area) || '';
            }
        });
    }
});