<div class="bg" transition="zoom" transition-mode="out-in">
    <c-header title="我要还款"></c-header>
    <div class="mui-content content">
    	<div class="repaymentSix_hi">
            <ul>
           		<li>还款日期： {{ details.nowDate }}</li>
                <li>本金金额： {{ details.total_ps_prcp_amt | format-amount 2 }}元</li>
                <li>利息金额： {{ details.total_ps_norm_int | format-amount 2 }}元</li>
                <li v-show="details.total_ps_od_int_amt != 0">应还罚息： {{ details.total_ps_od_int_amt | format-amount 2 }}元</li>
                <li>应还费用： {{ details.total_ps_fee_amt | format-amount 2 }}元</li>
            </ul>
            <span class="repaymentTwo_aa">
                <ul class="repaymentSix_a">
                    <li>合计：<i>{{ repayAmount | format-amount 2 }}</i>元</li>
                </ul>
                <input type="button" v-bind:value="repayBtnText" v-on:click="repay">
                <p class="clearfix"></p>
            </span>
        </div>
    </div>
</div>