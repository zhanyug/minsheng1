<div class="bg animated" transition="zoom" transition-mode="out-in">
	<c-header title="忘记密码"></c-header>
    <div class="mui-content content">
        <!-- modal -->
		<div class="ForgotPassword_login-form">
			<form id="m-form-password">
				<div class="ForgotPassword_styled-input">
                	<span class="mui-icon mui-icon-locked"></span>
               		<input type="password" id="password" v-model="oldPassword" placeholder="原密码" data-type="*" /> 
				</div>
				<div class="ForgotPassword_styled-input">
                	<span class="mui-icon mui-icon-locked"></span>
               		<input type="password" id="newPassword" v-model="newPassword" placeholder="重置密码" data-type="up-n|up-w|up-l" /> 
				</div>
                <div class="ForgotPassword_styled-input">
                	<span class="mui-icon mui-icon-checkmarkempty"></span>
               		<input type="password" placeholder="确认密码" data-type="tobe(newPassword)"/> 
				</div>
				<input type="button" value="确   定" v-on:click="save">	
			</form>
            <div class="clearfix"></div>
		</div> 
		<!-- //modal -->
    </div>
</div>