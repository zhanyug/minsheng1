<div class="bg" transition="zoom" transition-mode="out-in">
    <c-header title="我要还款"></c-header>
    <div class="mui-content content">
        <div class="repaymentFive_hi">
            <p>还款日期： {{ details.nowDate }} </p>
            <div class="repaymentFive_ha">
                <span class="left" v-on:click="selectMinRepayAmount">最低还款额<br>{{ details.pp_min_val | format-amount 2 }}</span>
                <span class="right" v-on:click="selectMaxRepayAmount">最高还款额<br>{{ details.pp_max_val | format-amount 2 }}</span>
                <div class="clearfix"></div>
            </div>
            <div class="repaymentFive_hb" id="m-loan-partial-payment-form">还款金额：<input type="text" v-model="repayAmount" placeholder="限制{{ details.pp_min_val | format-amount 2 }}-{{ details.pp_max_val | format-amount 2 }}" data-type="money"></div>
            <div>
                <input type="button" class="btn-cm" value="下一步" v-on:click="repay">
                <p class="clearfix"></p>
            </div>
        </div>
    </div>
</div>