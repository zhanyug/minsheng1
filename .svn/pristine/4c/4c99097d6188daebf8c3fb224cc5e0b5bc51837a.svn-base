<body class="bg" transition="zoom" transition-mode="out-in">
    <c-header title="借款详情"></c-header>
    <!-- loading area -->
    <div class="mui-content content">
        <c-loading v-show="!view.isContentShow"></c-loading>
        <div v-show="view.isContentShow">
            <div class="drawMoneySeven_c">
                <ul class="drawMoneySeven_b">
                    <li><span>本期应还</span><b>￥{{ details.lastest_repay_amt | format-amount 2 }}</b></li>
                    <li><span>未还总金额</span><b>￥{{ details.wait_repay_amt | format-amount 2 }}</b></li>
                    <div class=" clearfix"> </div>
                </ul>
            </div>
            <div class="ForgotPassword_login-form">
                <ul class="drawMoneySeven_a"> 
                    <li><i>借据编号：</i>{{ details.loan_no }}</li>
                    <li><i>借款金额：</i>{{ details.orig_prcp | format-amount 2 }}</li>
                    <li><i>借款人：</i>{{ details.cust_name }}</li>
                    <li><i>身份证号：</i>{{ details.id_no }}</li>
                    <li><i>起止日期：</i>{{ details.loan_actv_dt + ' - ' + details.last_due_dt }}</li>
                    <li><i>首个还款日：</i>{{ details.fst_paym_dt }}</li>
                    <li><i>还款日：</i>{{ details.due_day }}</li>
                    <li><i>还款详情：</i><a v-on:click="fetchRepayDetails">查看</a></li>
                    <li><i>借款期限：</i>{{ details.loan_tnr }}</li>
                    <li><i>借款用途：</i>{{ details.purposename }}</li>
                    <li><i>提款卡号：</i>{{ details.fk_card_no + '…(' + details.fk_card_bankname + ')' }}</li>
                    <li><i>还款卡号：</i>{{ details.hk_card_no + '…(' + details.hk_card_bankname + ')' }}</li>
                    <div class=" clearfix"> </div>
                </ul>
                <input type="button" value="立即还款" v-if="!(details.lm_flag == 'Y' || (details.loan_sts == 'CLSDB' || details.loan_sts == 'OFFED' || details.loan_sts == 'SETL'))" data-id="{{ details.loan_no }}" v-on:click="repay">    
                <div class="clearfix"> </div>
            </div>
        </div>
    </div> 
    <!-- //modal -->  
</body>