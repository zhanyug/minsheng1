<div class="bg" transition="zoom" transition-mode="out-in">
    <c-header title="支付信息"></c-header>
    <div class="mui-content content">
        <div class="ForgotPassword_login-form">
            <form id="m-trade-password-verify-form">
                <div class="ForgotPassword_styled-input">
                    <span class="mui-icon mui-icon-locked"></span>
                    <input type="password" id="txPwd" v-model="txPwd" class="mp-ipt" placeholder="请输入交易密码" data-type="up">
                </div>
                <div class="ForgotPassword_styled-input" v-if="showVerifyCode">
                    <span class="mui-icon mui-icon-email"></span>
                    <input type="text" class="width_60 mp-ipt" v-model="verifyCode" placeholder="请输入短信验证码" data-type="vc">
                    <span class="disBlock"><a v-bind:class="sendValidCodeBtnClass" v-on:click="sendValidCode" v-text="sendValidCodeBtnText">点击获取</a></span>
                </div>
                <h2 class="paymentOne_wi" v-if="showVerifyCode"><span class="mui-icon mui-icon-info"></span>操作金额较大,请输入注册手机短信验证码</h2>
                <button type="button" value="确认支付" v-bind:class="goNextBtnClass" v-on:click="verifyPassword" v-html="goNextBtnText"></button>
            </form>
            <div class="clearfix"></div>
        </div>
    </div>
</div>