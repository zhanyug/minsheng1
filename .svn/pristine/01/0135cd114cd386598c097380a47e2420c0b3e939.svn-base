<div class="bg" transition="zoom" transition-mode="out-in">
    <c-header title="还款"></c-header>
    <div id="repay_list" class="mui-content content">
        <div class="repaymentTwo_hi">
            <div id="menu_conall">
                <div class="tagall" style="display:block">
                    <!--  content  begin  --> 
                    <span class="repaymentTwo_a" v-for="item in items" v-on:click="toggleItem(item)" v-bind:class="{'onclick_a': item.loan_no == loan_no}">
                        <span class="repaymentTwo_b">
                            <span class="repaymentTwo_dian"></span>
                        </span>
                        <ul class="repaymentTwo_c">
                            <li>提款日期： {{ item.loan_actv_dt }}</li>
                            <li>借据编号： {{ item.loan_no }}
                                <span style="color:orange" v-if="item.lm_flag == 'Y'">(审批中)</span>
                                <span style="color:orange" v-if="item.loan_sts == 'CLSDB' || item.loan_sts == 'OFFED' || item.loan_sts == 'SETL'">({{ item.loan_sts | dict 'loanStatus' }})</span>
                            </li>
                            <li>借款金额：<i>￥{{ item.orig_prcp | format-amount 2 }}</i></li>
                            <li>未还总金额：<i>￥{{ item.wait_repay_amt | format-amount 2 }}</i></li>
                        </ul>
                        <span class="repaymentTwo_d mui-icon mui-icon-forward" v-on:click="toLoanInfo(item.loan_no)"></span>
                        <p class="clearfix"></p>
                    </span>
                    <span class="repaymentTwo_aa" v-bind:class="{'onclick_a': repayAmount > 0}">
                        <span class="repaymentTwo_b">
                            <span class="repaymentTwo_dian_b"></span>               
                        </span>
                        <ul class="repaymentTwo_e">
                            <li>合计：<i>￥{{ repayAmount | format-amount 2 }}</i></li>
                            <li>仅供参考,以最终结算的金额为准</li>
                        </ul>
                        <input type="button" value="立即还款" v-on:click="repay">
                        <p class="clearfix"></p>
                    </span>
                    <!-- content  end -->
                </div> 
            </div>
        </div>
    </div>
</div>