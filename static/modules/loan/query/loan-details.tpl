<div class="bg" transition="zoom" transition-mode="out-in">
    <c-header title="贷款详情(签约)"></c-header>
    <div class="mui-content content">
        <c-loading v-if="!view.isContentShow"></c-loading>
        <div class="ForgotPassword_login-form" v-if="view.isContentShow">
            <ul class="drawMoneyFive_a"> 
                <li><i>申请人:</i><span v-text="details.cust_name"></span></li>
                <li><i>身份证号:</i><span v-text="details.id_no"></span></li>
                <li><i>额度:</i><span v-text="details.loan_amt | format-amount 2"></span></li>
                <li><i>已用额度:</i><span v-text="details.used_amt | format-amount 2"></span></li>
                <li><i>可用额度:</i><span v-text="details.avail_amt | format-amount 2"></span></li>
                <li><i>日利率:</i><span v-text="details.day_int_rat*100 |format-amount 4"></span>%</li>
                <li><i>提款类型:</i><span v-text="details.chargeoff_ind | dict 'chargeoff_ind'"></span></li>
                <li><i>提款卡号:</i><span v-text="details.fk_card_no + '…(' + details.fk_card_bankname + ')'"></span></li>
                <li><i>还款卡号:</i><span v-text="details.hk_card_no + '…(' + details.hk_card_bankname + ')'"></span></li>
                <li v-if="details.sign_dt != null && details.sign_dt != ''"><i>审批日期:</i><span v-text="details.sign_dt"></span></li>
                <li v-if="details.sign_dt != null && details.sign_dt != ''"><i>有效期至:</i><span v-text="details.sign_end_dt"></span></li>
                <div class=" clearfix"> </div>
            </ul>
            <input v-if="details.loan_sts == '01'" type="button" value="立即签约" data-id="{{ details.appl_cde }}" v-on:click="sign">   
            <div class="clearfix"> </div>
        </div>      
    </div>
</div>