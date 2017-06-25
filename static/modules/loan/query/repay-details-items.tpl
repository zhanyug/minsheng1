<div class="bg" transition="zoom" transition-mode="out-in">
    <c-header title="还款详情"></c-header>
    <div class="mui-content content">
        <div class="ForgotPassword_login-form">
            <div class="drawMoneyFour_card">
                <ul class="repaymentEight_a" v-for="item in items">
                    <li>
                        <i>￥{{ item.ps_instm_amt | format-amount 2 }}</i>
                        <span>应还总额</span>
                    </li>
                    <li>
                        <span>{{ item.setl_instm_amt | format-amount 2 }}元</span>
                        <span>已还总额</span>
                    </li>
                    <li>
                        <span>{{ item.ps_due_dt }}</span>
                        <span>还款日期</span>
                    </li>
                    <div class="clearfix"></div>
                </ul>
                <div class="clearfix"></div>
            </div>
        </div>
    </div>
</div>