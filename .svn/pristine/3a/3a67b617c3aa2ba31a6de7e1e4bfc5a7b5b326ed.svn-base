/* 
* @Author: Wei
* @Date:   2017-02-13 16:09:51
* @Last Modified by:   Wei
* @Last Modified time: 2017-02-17 16:40:03
*/

var common = require('util/common'),
    validator = require('util/validator'),
    data = require('util/data'),
    locationData = require('util/location'),
    Vue = require('vue');

var indiv_maritalPicker = undefined,
    indiv_eduPicker = undefined,
    indiv_degreePicker = undefined,
    live_infoPicker = undefined,
    indiv_indtryPicker = undefined,
    indiv_emp_typPicker = undefined,
    liveCbPicker = undefined,
    contactCbPicker = undefined,
    fw = '';

module.exports = Vue.extend({
    template: __inline('module.tpl'),
    data: function() {
        return {
            isProgressShow: false,

            indiv_marital: '',
            indiv_maritalText: '',
            indiv_edu: '',
            indiv_eduText: '',
            indiv_degree: '',
            indiv_degreeText: '',
            live_info: '',
            live_infoText: '',
            indiv_indtry: '',
            indiv_indtryText: '',
            indiv_emp_typ: '',
            indiv_emp_typText: '',
            liveCb: '',
            live_province: '',
            live_city: '',
            live_area: '',
            live_addr: '',
            live_zip: '',
            contactCb: '',
            mail_province: '',
            mail_city: '',
            mail_area: '',
            mail_addr: '',
            indiv_emp_name: '',
            // comTel: '',
            /* 单位电话 */
            // indiv_emp_zone: '',
            indiv_emp_tel: '',
            // indiv_emp_tel_sub: '',
            /* 额外参数 */
            position_opt: '',
            indiv_position: '',
            /* 查询参数 */
            queryData: {}
        }
    },
    methods: {
        queryBaseInfo: function() {
            var vm = this;
            common.Ajax({
                url: 'api/wx/auth/credit/queryBaseInfo',
                data: {
                    // 内部客户
                    white_type: '01'
                },
                fw: fw,
                success: function(json) {
                    if (json.indiv_marital) {
                        indiv_maritalPicker.pickers[0].setSelectedValue(json.indiv_marital, 200);
                        vm.indiv_marital = json.indiv_marital;
                        vm.indiv_maritalText = common.getDictByKey('indiv_marital', json.indiv_marital);
                    }
                    if (json.indiv_edu) {
                        indiv_eduPicker.pickers[0].setSelectedValue(json.indiv_edu, 200);
                        vm.indiv_edu = json.indiv_edu;
                        vm.indiv_eduText = common.getDictByKey('indiv_edu', json.indiv_edu);
                    }
                    if (json.indiv_degree) {  
                        indiv_degreePicker.pickers[0].setSelectedValue(json.indiv_degree, 200);
                        vm.indiv_degree = json.indiv_degree;
                        vm.indiv_degreeText = common.getDictByKey('indiv_degree', json.indiv_degree);
                    }
                    if (json.live_info) {
                        live_infoPicker.pickers[0].setSelectedValue(json.live_info, 200);
                        vm.live_info = json.live_info;
                        vm.live_infoText = common.getDictByKey('live_info', json.live_info);
                    }
                    if (json.indiv_indtry) {
                        indiv_indtryPicker.pickers[0].setSelectedValue(json.indiv_indtry, 200);
                        vm.indiv_indtry = json.indiv_indtry;
                        vm.indiv_indtryText = common.getDictByKey('indiv_indtry', json.indiv_indtry);
                    }
                    if (json.indiv_emp_typ) {
                        indiv_emp_typPicker.pickers[0].setSelectedValue(json.indiv_emp_typ, 200);
                        vm.indiv_emp_typ = json.indiv_emp_typ;
                        vm.indiv_emp_typText = common.getDictByKey('indiv_emp_typ', json.indiv_emp_typ);
                    }

                    vm.live_province = json.live_province;
                    vm.live_city = json.live_city;
                    vm.live_area = json.live_area;
                    vm.live_addr = json.live_addr;
                    vm.live_zip = json.live_zip;
                    vm.mail_province = json.mail_province;
                    vm.mail_city = json.mail_city;
                    vm.mail_area = json.mail_area;
                    vm.mail_addr = json.mail_addr;
                    
                    vm.indiv_emp_name = json.indiv_emp_name;
                    vm.comTel = json.comTel;
                    vm.position_opt = json.position_opt;
                    vm.indiv_position = json.indiv_position;

                    // vm.indiv_emp_zone = json.indiv_emp_zone || '';
                    vm.indiv_emp_tel = json.indiv_emp_tel || '';
                    // vm.indiv_emp_tel_sub = json.indiv_emp_tel_sub || '';
                    /*if (json.indiv_emp_zone && json.indiv_emp_tel && json.indiv_emp_tel_sub) {
                        vm.comTel = json.indiv_emp_zone + '-' + json.indiv_emp_tel + '-' + json.indiv_emp_tel_sub;
                    } else if (json.indiv_emp_zone && json.indiv_emp_tel) {
                        vm.comTel = json.indiv_emp_zone + '-' + json.indiv_emp_tel;
                    }*/

                    vm.contactCb = vm.getAddressPickerText(json.mail_province, json.mail_city, json.mail_area) || '';
                    vm.liveCb = vm.getAddressPickerText(json.live_province, json.live_city, json.live_area) || '';

                    if (json.live_province) {
                        liveCbPicker.pickers[0].setSelectedValue(json.live_province, 0, function() {
                            if (json.live_city) {
                                liveCbPicker.pickers[1].setSelectedValue(json.live_city, 0, function() {
                                    if (json.live_area) {
                                        liveCbPicker.pickers[2].setSelectedValue(json.live_area, 0);
                                    }
                                });
                            }
                        });
                    }

                    if (json.mail_province) {
                        contactCbPicker.pickers[0].setSelectedValue(json.mail_province, 0, function() {
                            if (json.mail_city) {
                                contactCbPicker.pickers[1].setSelectedValue(json.mail_city, 0, function() {
                                    if (json.mail_area) {
                                        contactCbPicker.pickers[2].setSelectedValue(json.mail_area, 0);
                                    }
                                });
                            }
                        });
                    }

                    vm.isProgressShow = true;
                }
            })
        },
        saveBaseInfo: function() {
            var vm = this;
            if (validator.check('#m-user-info')) {
                /*var tel = vm.comTel.split('-');
                vm.indiv_emp_zone = tel[0];
                vm.indiv_emp_tel = tel[1];
                if (tel.length == 3) {
                    vm.indiv_emp_tel_sub = tel[2];
                } else {
                    vm.indiv_emp_tel_sub = '';
                }*/
                common.Ajax({
                    url: 'api/wx/auth/user/updateBaseInfo',
                    data: {
                        indiv_marital: vm.indiv_marital,
                        indiv_edu: vm.indiv_edu,
                        indiv_degree: vm.indiv_degree,
                        live_info: vm.live_info,
                        live_province: vm.live_province,
                        live_city: vm.live_city,
                        live_area: vm.live_area,
                        live_addr: vm.live_addr,
                        live_zip: vm.live_zip,
                        mail_province: vm.mail_province,
                        mail_city: vm.mail_city,
                        mail_area: vm.mail_area,
                        mail_addr: vm.mail_addr,
                        indiv_indtry: vm.indiv_indtry,
                        indiv_emp_name: vm.indiv_emp_name,
                        indiv_emp_typ: vm.indiv_emp_typ,
                        position_opt: vm.position_opt,
                        indiv_position: vm.indiv_position,

                        // indiv_emp_zone: vm.indiv_emp_zone,
                        indiv_emp_tel: vm.indiv_emp_tel
                        // indiv_emp_tel_sub: vm.indiv_emp_tel_sub
                    },
                    success: function(json) {
                        common.msg('保存成功');
                        router.go({
                            path: '/loan/apply/apply-limit',
                            query: vm.queryData
                        });
                    }
                })
            }
        },
        liveCbPicker: function() {
            var vm = this;
            liveCbPicker.show(function(items) {
                vm.live_province = items[0].value;
                vm.live_city = items[1].value;
                vm.live_area = items[2].value;
                vm.liveCb = items[0].text + '/' + items[1].text + '/' + items[2].text;
            });
        },
        contactCbPicker: function() {
            var vm = this;
            contactCbPicker.show(function(items) {
                vm.mail_province = items[0].value;
                vm.mail_city = items[1].value;
                vm.mail_area = items[2].value;
                vm.contactCb = items[0].text + '/' + items[1].text + '/' + items[2].text;
            });
        },
        indiv_maritalPicker: function() {
            var vm = this;
            indiv_maritalPicker.show(function(items) {
                vm.indiv_maritalText = items[0].text;
                vm.indiv_marital = items[0].value;
            });
        },
        indiv_eduPicker: function() {
            var vm = this;
            indiv_eduPicker.show(function(items) {
                vm.indiv_eduText = items[0].text;
                vm.indiv_edu = items[0].value;
            });
        },
        indiv_degreePicker: function() {
            var vm = this;
            indiv_degreePicker.show(function(items) {
                vm.indiv_degreeText = items[0].text;
                vm.indiv_degree = items[0].value;
            });
        },
        live_infoPicker: function() {
            var vm = this;
            live_infoPicker.show(function(items) {
                vm.live_infoText = items[0].text;
                vm.live_info = items[0].value;
            });
        },
        indiv_indtryPicker: function() {
            var vm = this;
            indiv_indtryPicker.show(function(items) {
                vm.indiv_indtryText = items[0].text;
                vm.indiv_indtry = items[0].value;
            });
        },
        indiv_emp_typPicker: function() {
            var vm = this;
            indiv_emp_typPicker.show(function(items) {
                vm.indiv_emp_typText = items[0].text;
                vm.indiv_emp_typ = items[0].value;
            });
        },
        initPicker: function() {
            contactCbPicker = new mui.PopPicker({ layer: 3 });
            contactCbPicker.setData(locationData);

            liveCbPicker = new mui.PopPicker({ layer: 3 });
            liveCbPicker.setData(locationData);

            indiv_maritalPicker = new mui.PopPicker({ layer: 1 });
            indiv_maritalPicker.setData(data.indiv_marital);
            window.indiv_maritalPicker = indiv_maritalPicker.pickers[0];

            indiv_eduPicker = new mui.PopPicker({ layer: 1 });
            indiv_eduPicker.setData(data.indiv_edu);

            indiv_degreePicker = new mui.PopPicker({ layer: 1 });
            indiv_degreePicker.setData(data.indiv_degree);

            live_infoPicker = new mui.PopPicker({ layer: 1 });
            live_infoPicker.setData(data.live_info);

            indiv_indtryPicker = new mui.PopPicker({ layer: 1 });
            indiv_indtryPicker.setData(data.indiv_indtry);

            indiv_emp_typPicker = new mui.PopPicker({ layer: 1 });
            indiv_emp_typPicker.setData(data.indiv_emp_typ);
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
        var vm = this;
        vm.queryData = this.$route.query;
        vm.initPicker();
        vm.queryBaseInfo();
    }
});