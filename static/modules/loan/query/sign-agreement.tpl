<div class="bg" transition="zoom" transition-mode="out-in">
	<c-header title="立即签约"></c-header>
    <div class="mui-content content">
		<div class="noticeOne_img noticeOne_atext">
            <p class="f-wwb" v-html="content"></p>
            <div class="ForgotPassword_login-form" style="padding:0 0 2em;">     
                <button type="button" v-bind:class="applyBtnClass" v-on:click="applyActivate" v-html="applyBtnText"></button>
                <div class="clearfix"></div>
            </div>
		</div>
	</div>
</div>