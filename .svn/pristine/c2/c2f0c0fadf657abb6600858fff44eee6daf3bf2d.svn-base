<div class="bg" transition="zoom" transition-mode="out-in">
    <c-header title="基础信息"></c-header>
    <div class="mui-content content">
        <div class="RegisterFive_img" v-show="showProgress">
       		<ul>
            	<li><span class="glyphicon glyphicon-usd"></span><p>交易密码</p></li>
                <li><span class="glyphicon glyphicon-film"></span><p>多媒体</p></li>
                <li><span class="glyphicon glyphicon-edit"></span><p>基础信息</p></li>
            </ul>
            <div class="clearfix"> </div>
       		<cite>
            	<span class="line_one"></span>
                <span class="line_two"></span>
            </cite>
        </div>
		<div class="ForgotPassword_login-form">
			<form id="m-set-basic-info-form">
                <div class="informationOne_card">
                	<ul>
                        <li class="informationOne_q1">
                        	工作单位<input type="text" v-model="workCom" placeholder="请输入工作单位" data-type="*{0,60}">
                          <div class="clearfix"></div>
                        </li>
                        <li class="informationOne_q1">
                        	单位电话<input type="text" v-model="comTel" placeholder="请输入单位电话" data-type="tel">
                          <div class="clearfix"></div>
                        </li>
                        <li class="informationOne_q1">
                        	家庭地址<input type="text" v-model="provinceAndCity" readonly="readonly" v-on:click="showAddressPicker" placeholder="请选择家庭地址" data-type="address">
                          <input type="hidden" v-model="province">
                          <input type="hidden" v-model="city">
                          <input type="hidden" v-model="area">
                          <div class="clearfix"></div>
                        </li>
                         <li class="informationOne_q1">
                        	详细地址<input type="text" v-model="address" placeholder="请输入详细地址" data-type="*{0,100}">
                          <div class="clearfix"></div>
                        </li>
                    </ul>
                    <input type="button" value="提交" v-on:click="setBacicInfo">
                </div>
			</form>
            <div class="clearfix"> </div>
		</div>
    </div>   
</div>
