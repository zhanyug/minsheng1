<div class="bg" transition="zoom" transition-mode="out-in">
    <c-header title="确认信息"></c-header>
    <div class="mui-content content">
        <div class="m-loading" v-show="!isProgressShow">
            <span class="mui-icon mui-icon-spinner spin"></span> 加载中…
        </div>
        <div class="enterapk" v-show="isProgressShow">
            <ul class="enterapk1" id="m-user-info">
                <li class="enterapk2">基本信息</li>
                <li><p>婚姻状况:</p>
                    <input type="text" class="w090 enterapk3" v-model="indiv_maritalText" readonly="readonly" v-on:click="indiv_maritalPicker" placeholder="请选择婚姻状况" data-type="*">
                    <input type="hidden" class="w090 enterapk3" v-model="indiv_marital" placeholder="请选择婚姻状况" data-type="*">
                </li>
                <li><p>最高学历:</p>
                    <input type="text" class="w090 enterapk3" v-model="indiv_eduText" readonly="readonly" v-on:click="indiv_eduPicker" placeholder="请选择最高学历" data-type="*">
                    <input type="hidden" class="w090 enterapk3" v-model="indiv_edu" placeholder="请选择最高学历" data-type="*">
                </li>
                <li><p>最高学位:</p>
                    <input type="text" class="w090 enterapk3" v-model="indiv_degreeText" readonly="readonly" v-on:click="indiv_degreePicker" placeholder="请选择最高学位" data-type="*">
                    <input type="hidden" class="w090 enterapk3" v-model="indiv_degree" placeholder="请选择最高学位" data-type="*">
                </li>
                <li><p>现住房性质:</p>
                    <input type="text" class="w090 enterapk3" v-model="live_infoText" readonly="readonly" v-on:click="live_infoPicker" placeholder="请选择现住房性质" data-type="*">
                    <input type="hidden" class="w090 enterapk3" v-model="live_info" placeholder="请选择现住房性质" data-type="*">
                </li>
                <li><p>居住地邮编:</p><input type="text" class="w090 enterapk3" v-model="live_zip" data-type="p" placeholder="请输入居住地邮编"></li>
                <li>
                    <p>居住地址:</p>
                    <input type="text" class="w090 enterapk3" v-model="liveCb" readonly="readonly" v-on:click="liveCbPicker" placeholder="请选择居住地址" data-type="*">
                    <input type="hidden" v-model="live_province">
                    <input type="hidden" v-model="live_city">
                    <input type="hidden" v-model="live_area">
                </li>
                <li><p></p><input type="text" class="w090 enterapk3" v-model="live_addr" placeholder="请输入详细居住地址" data-type="address"></li>
                <li>
                    <p>通讯地址:</p>
                    <input type="text" class="w090 enterapk3" v-model="contactCb" readonly="readonly" v-on:click="contactCbPicker" placeholder="请选择通讯地址" data-type="*">
                    <input type="hidden" v-model="mail_province">
                    <input type="hidden" v-model="mail_city">
                    <input type="hidden" v-model="mail_area">
                </li>
                <li><p></p><input type="text" class="w090 enterapk3" v-model="mail_addr" placeholder="请输入详细通讯地址" data-type="address"></li>
                <li class="enterapk2" style="margin: 15px 0 10px;">工作信息</li>
                <li><p>所属行业:</p>
                    <input type="text" class="w090 enterapk3" v-model="indiv_indtryText" readonly="readonly" v-on:click="indiv_indtryPicker" placeholder="请选择所属行业" data-type="*">
                    <input type="hidden" class="w090 enterapk3" v-model="indiv_indtry" placeholder="请选择所属行业" data-type="*">
                </li>
                <li><p>单位名称:</p>
                    <input type="text" class="w090 enterapk3" v-model="indiv_emp_name" placeholder="请输入单位名称" data-type="*{0,60}">
                </li>
                <li>
                    <p>单位电话:</p>
                    <input type="text" class="w090 enterapk3" v-model="indiv_emp_tel" placeholder="请输入单位电话" data-type="tel">
                </li>
                 <li><p>职业:</p>
                    <input type="text" class="w090 enterapk3" v-model="indiv_emp_typText" readonly="readonly" v-on:click="indiv_emp_typPicker" placeholder="请选择职业" data-type="*">
                    <input type="hidden" class="w090 enterapk3" v-model="indiv_emp_typ" placeholder="请选择职业" data-type="*">
                </li>
            </ul>
            <input type="button" value="确认" v-on:tap="saveBaseInfo">
         </div>
    </div>   
</div>
