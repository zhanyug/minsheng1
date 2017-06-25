<div class="bg" transition="zoom" transition-mode="out-in">
    <c-header title="实名认证"></c-header>
    <div class="mui-content content">
        <c-loading v-show="view.isLoading"></c-loading>
        <div class="m-loading-area" v-show="!view.isLoading">
            <!-- modal -->
            <div class="RegisterTwo_img">
           		<ul>
                  	<li><span class="glyphicon glyphicon-edit"></span><p>注册信息</p></li>
                    <li><span class="glyphicon glyphicon-user"></span><p>实名认证</p></li>
                    <li><span class="glyphicon glyphicon-usd"></span><p>交易密码</p></li>
                </ul>
                <div class="clearfix"> </div>
           		<cite>
                    <span class="line_one"></span>
                    <span class="line_two"></span>
                </cite>
            </div>	
          	<div class="ForgotPassword_login-form">
          		<form id="m-set-multi-media-form-avatar">
                  	<p>请认证您的借记卡</p>
                  	<div class="RegisterThree_photo">
                  	    <img id="u-file-set-multi-media-card-img" src="/static/images/camera_01.jpg" alt="" v-on:click="chooseImage">
                        <!-- <input type="file" accept="image/*;capture=camera"  id="u-file-set-multi-media-card" single>-->
                    </div>
                    <p>借记卡正面照片</p>
                    <div class="RegisterThree_card">
                    	<p style="color:#f00; font-size:1.7rem; font-weight:bold;" >请确认您的借记卡卡号</p>
                        <input type="text" v-model="cardNo" placeholder="请输入银行卡号" data-type="bc" style="line-height:1.5rem;padding:0;margin:2% 0;">
                        <i>*此账户将用于提现和还款<a v-on:click="showCard" class="f-dn">【查看限额】</a></i><br/>
                        <ul>
                            <li>姓名: {{ name }}</li>
                            <li>身份证: {{ idCard }}</li>
                            <li><input type="text" v-model="cardPhoneNo" placeholder="请输入银行预留手机号" data-type="m" style="line-height:2rem">银行预留手机号:</li>
                            <div class="clearfix"></div>
                        </ul>
                        <button type="button" v-bind:class="saveBtnClass" v-on:click="goNext" v-html="saveBtnText"></button>
                    </div>
            	</form>
                <div class="clearfix"> </div>
          	</div> 
        </div>
	</div> 
</div>