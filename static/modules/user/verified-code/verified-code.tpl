<div class="bg" transition="zoom" transition-mode="out-in">
    <c-header title="实名认证"></c-header>
    <div class="mui-content content">
        <c-loading v-show="view.isLoading"></c-loading>
        <div v-show="!view.isLoading">
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
                <p v-text="phoneNoSignText"></p>
    			<form action="#" method="post">
                  	<div class="RegisterTwo_dl">
                    	<input type="text" class="RegisterTwo_al" v-model="phoneCode" placeholder="请输入短信验证码">
                    	<a class="RegisterTwo_cl" v-bind:class="sendValidCodeBtnClass" v-on:click="sendValidCode" v-text="sendValidCodeBtnText">重新获取</a>
                        <div class="clearfix"></div>
                    </div>
                    <button type="button" v-on:click="submitVer" v-bind:class="saveBtnClass" v-html="saveBtnText" class="RegisterTwo_bl"></button>
                </form>
                <div class="clearfix"> </div>
            </div>
        </div>
	</div> 
</div>