<div class="bg" transition="zoom" transition-mode="out-in" v-show="!showPayInfo">
    <c-header title="还款"></c-header>
    <div class="mui-content content">
        <div class="repaymentSix_hi">
            <ul>
                <li>还款日期： {{currDate}}</li>
                <li>本金金额： {{ total_ps_prcp_amt | format-amount 2 }}元</li>
                <li>利息金额： {{ total_ps_norm_int | format-amount 2 }}元</li>
                <li v-show="total_ps_od_int_amt != 0">罚息金额： {{ total_ps_od_int_amt }}元</li>
                <li>增值税金额： {{ total_ps_tax_amt | format-amount 2 }}元</li>
            </ul>
            <span class="repaymentTwo_aa">
                <ul class="repaymentSix_a">
                    <li>合计：<i>{{ total_repay_amt | format-amount 2 }}</i>元</li>
                </ul>
                <input type="button" v-bind:value="btnText" v-on:click="toRepay">
                <p class="clearfix"></p>
            </span>
        </div>
    </div>
</div>
<div class="bg" transition="zoom" transition-mode="out-in" v-show="showPayInfo">
    <header class="mui-bar mui-bar-nav">
        <a class="mui-icon mui-icon-left-nav mui-pull-left" v-on:click="returnDataInputView"></a>
        <h1 class="mui-title">确认还款</h1>
        <a class="mui-icon mui-icon-contact mui-pull-right" v-link="{ path: '/user/index' }"></a>
    </header>
    <div class="mui-content content">
        <div class="ForgotPassword_login-form">
            <form id="m-loan-repay-form">
                <div class="ForgotPassword_styled-input">
                    <span class="mui-icon mui-icon-locked"></span>
                    <input type="password" id="zhifuCode" v-model="zhifuCode" placeholder="请输入交易密码" data-type="up" /></div>
                <div class="ForgotPassword_styled-input" v-show="showVerifyCode">
                    <span class="mui-icon mui-icon-email"></span>
                    <input type="text" class="width_60" v-model="duanxinCode" placeholder="请输入短信验证码" data-type="vc" />
                    <span class="disBlock">
                        <a v-bind:class="sendValidCodeBtnClass" v-on:click="sendValidCode" v-text="sendValidCodeBtnText">点击获取</a>
                    </span>
                </div>
                <h2 class="paymentOne_wi" v-show="showVerifyCode">
                    <span class="mui-icon mui-icon-info"></span>
                    还款金额较大,请输入注册手机短信验证码
                </h2>
                <button type="button" value="提交" v-bind:class="goNextBtnClass" v-on:click="goNext" v-html="goNextBtnText"></button>
            </form>
            <div class="clearfix"></div>
        </div>
    </div>
</div>