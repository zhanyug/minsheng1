<header class="mui-bar mui-bar-nav">
    <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
    <h1 class="mui-title">支付信息</h1>
</header>
<div class="mui-content">
	<form class="mui-input-group m-trade-password-verify-form" id="m-trade-password-verify-form">
	    <div class="mui-input-row">
	        <label>交易密码</label>
	        <input type="password" class="mui-input mui-input-password" id="password" v-model="password" placeholder="请输入密码" data-type="up">
	        <span class="mui-icon mui-icon-eye"></span>
	    </div>
	    <div class="mui-input-row">
	        <label>验证码</label>
	        <input type="text" class="mui-input" v-model="verifyCode" placeholder="请输入短信验证码" data-type="vc">
        	<button type="button" class="mui-btn mui-btn-primary mui-btn-outlined u-btn-sendvc" v-bind:class="sendValidCodeBtnClass" style="padding:5px;" v-on:click="sendValidCode" v-text="sendValidCodeBtnText">获取</button>
	    </div>
    </form>
    <div class="u-btn-trade-password-verify">
	    <button type="button" class="mui-btn mui-btn-primary mui-btn-block block-indent mui-btn-radius radius-mid" v-on:click="verifyPassword">提交</button>
    </div>
</div>