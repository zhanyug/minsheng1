<div class="bg" transition="zoom" transition-mode="out-in">
	<c-header title="密码找回"></c-header>
	<div class="mui-content content">
        <!-- modal -->
		<div class="ForgotPassword_login-form">
			<form action="#" method="post" id="m-find-password-form">
				<div class="ForgotPassword_styled-input" id="phone-row">
                	<span><img src="../../../images/logo_4.png" alt="" /></span>
          			<input type="text" v-model="phone" placeholder="请输入手机号" data-type="m" />
				</div>
                <div class="ForgotPassword_styled-input">
                	<span><img src="../../../images/logo_8.png" alt="" /></span>
          			<input type="text" v-model="verifyCode" placeholder="验证码" class="width_60" data-type="vc"/>
                    <span class="disBlock"><a v-bind:class="sendValidCodeBtnClass" v-on:click="sendValidCode" v-text="sendValidCodeBtnText" >点击获取</a></span>
				</div>
				<div class="ForgotPassword_styled-input">
                	<span><img src="../../../images/logo_6.png" alt="" /></span>
               		<input type="password" id="password" v-model="password" placeholder="重置密码" data-type="up-n|up-w|up-l" /> 
				</div> 
                <div class="ForgotPassword_styled-input">
                	<span><img src="../../../images/logo_6.png" alt="" /></span>
               		<input type="password" placeholder="确认密码" data-type="tobe(password)"/> 
				</div> 
		
				<input type="button" value="登&nbsp;录" v-on:click="resetPassword">	
			</form>
            <div class="clearfix"></div>
		</div> 
		<!-- //modal --> 
    </div>
</div>
