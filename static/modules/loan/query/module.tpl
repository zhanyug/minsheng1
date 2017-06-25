<div class="bg" transition="zoom" transition-mode="out-in">
    <c-header title="贷款查询" v-bind:ln-link="'/user/index'"></c-header>
    <div class="mui-content content">
        <!-- modal -->
        <div id="m-loan-query-list" class="drawMoneyEight_card">
            <ul class="drawMoneyEight_a" v-for="item in items" v-on:click="onQuery(item)">
                <h3>
                    <div v-if="item.loan_prom_desc != null && item.loan_prom_desc != ''">{{item.loan_prom_desc}}<span>有效时间:{{ item.sign_end_dt }}</span></div>
                    <div v-else>{{item.loan_typ_desc}}<span v-if="item.sign_end_dt != ''">有效时间:{{ item.sign_end_dt }}</span></div>
                </h3>
                <li v-if="item.exist_pay_flag != 'Y' && item.loan_sts == '01' && item.sign_model == '02'">
                    <!-- 立即签约按钮前展示贷款金额 -->
                    <span>贷款金额</span>
                    <i>￥{{ item.loan_amt | format-amount 2 }}</i>
                    <a v-on:click="onSingle(item)">立即签约</a>
                </li>
                <li v-else>
                    <span>贷款余额</span>
                    <i>￥{{ item.loan_avail | format-amount 2 }}</i>
                    <a v-if="item.exist_pay_flag == 'Y' && item.sett_ind == 'Y'" v-on:click="onRepay(item)">提前还款</a>
                    <a v-if="item.exist_pay_flag != 'Y' && item.loan_sts == '03'" class="Eight_red">结清</a>
                </li>
                <li v-if="item.loan_sts == '02'">
                    <span>可用余额</span>
                    <i>￥{{ item.avail_amt | format-amount 2 }}</i>
                    <a v-if="item.loan_sts == '02' && item.typ_grp == '02'" v-on:click="onLoan(item)">发起提款</a>
                </li>
                <div class="clearfix"></div>
            </ul>
            <div class="clearfix"></div>
        </div>
    </div>
    <!-- //modal --> 
</div> 