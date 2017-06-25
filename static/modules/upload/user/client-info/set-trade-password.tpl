<!-- 注册流程进入 -->
<div class="bg animated" transition="zoom" transition-mode="out-in" v-if="needRegister">
    <c-header v-bind:title="title" v-bind:ln-link="'/user/index'"></c-header>
    <div class="mui-content content">
        <!-- modal -->
        <div class="RegisterFive_img" v-show="showProgress">
       		<ul>
            	<li><span class="glyphicon glyphicon-edit"></span><p>注册信息</p></li>
                <li><span class="glyphicon glyphicon-user"></span><p>身份验证/p></li>
                <li><span class="glyphicon glyphicon-usd"></span><p>交易完成</p></li>
            </ul>
            <div class="clearfix"> </div>
       		<cite>
            	<span class="line_one"></span>
                <span class="line_two"></span>
            </cite>
        </div>
		<div class="ForgotPassword_login-form">
			<form id="m-reg-trade-password-form">
                <div class="RegisterFive_card">
                	<ul>
                        <li>您的姓名：{{ returnData.userNameConfused }}</li>
                        <li>身份证号：{{ returnData.idNoConfused }}</li>
                        <li>绑卡卡号：{{ returnData.bankCardConfused }}</li>
                        <li>预留手机：<span class="RegisterFive_card_word"> {{ returnData.resMobile }}</span></li>
						<li class="informationOne_q2" v-if="needOldPassword"><i><input style="margin:0 " type="text" v-model="verifyCode" placeholder="请输入短信验证码" data-type="vc"><a href="javascript:void(0);" v-bind:class="sendValidCodeBtnClass" v-on:click="sendValidCode" v-text="sendValidCodeBtnText">点击获取</a></i>验证码：</li>
                        <li v-if="needOldPassword"><input type="password" id="oldTxPwd" v-model="oldTxPwd" placeholder="请输入原交易密码" data-type="*{0,60}">原密码： 
                            <div class="clearfix"></div>
                        </li>
                        <li><input type="password" id="txPwd" v-model="txPwd" placeholder="请输入交易密码" data-type="up|*{6,30}">新密码：
                        	<div class="clearfix"></div>
                        </li>
                        <li><input type="password" placeholder="请确认交易密码" data-type="tobe(txPwd)">密码确认：
                        	<div class="clearfix"></div>
                        </li>
                    </ul>
                    <input type="button" value="提交" v-on:click="setTradePassword">
                </div>
			</form>
            <div class="clearfix"> </div>
		</div>
	</div>
</div>
<!-- 设置交易密码 -->
<div class="bg animated" transition="zoom" transition-mode="out-in" v-if="needSupplementInfo">
    <c-header v-bind:title="title" v-bind:ln-link="lnLink"></c-header>
    <div class="mui-content content">
        <!-- modal -->
        <div class="RegisterOne_img" v-show="showProgress">
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
            <form id="m-set-trade-password-form">
                <div class="informationOne_card">
                    <ul>
                        <li class="informationOne_q1">
                            您的姓名：<input type="text" v-model="userName" placeholder="请输入绑卡姓名" data-type="*{1,20}">
                        </li><div class="clearfix"></div>
                        <li>身份证号：
                            <div class="informationOne_wh">
                               <span class="informationOne_wh1">{{ returnData.idNoPrefix }}</span>
                               <input type="text" v-model="idNo" placeholder="请补全后六位" data-type="*">
                            </div>
                        </li>
                        <li>绑卡卡号：
                        <div class="informationOne_wh">
                           <span class="informationOne_wh1">{{ returnData.bankCardPrefix }}</span>
                           <input type="text" v-model="bankCard" placeholder="请补全后六位" data-type="n">
                        </div>
                        </li>
                        <li class="informationOne_q1" id="mobile-row"><input type="text" v-model="resMobile" v-bind:style="{ border: '0px', paddingLeft: '0px',fontSize: '0.9em',color: '#000' }" placeholder="请输入银行预留手机" data-type="{{needMobileNo? 'm' : '*'}}" v-bind:disabled="!needMobileNo">预留手机：</li>
                        <li class="informationOne_q2"><i><input type="text" v-model="verifyCode" placeholder="请输入短信验证码" data-type="vc"><a href="javascript:void(0);" v-bind:class="sendValidCodeBtnClass" v-on:click="sendValidCode" v-text="sendValidCodeBtnText">点击获取</a></i>验证码：</li>
                        <li class="informationOne_q2"><i><input type="password" id="txPwd" v-model="txPwd" placeholder="请输入交易密码" data-type="up|*{6,30}"></i>交易密码：</li>
                        <li class="informationOne_q2"><i><input type="password" placeholder="请确认交易密码" data-type="tobe(txPwd)"></i>确认密码：</li>
                    </ul>
                    <div class="clearfix"></div>
                    <input type="button" value="提交" v-on:click="setTradePassword">
                </div>
            </form>
            <div class="clearfix"> </div>
        </div> 
    </div> 
</div>


