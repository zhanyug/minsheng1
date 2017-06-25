<div class="bg">
    <c-header title="还款计划详情"></c-header>
    <div class="mui-content content">
        <div class="repaymentFour_hi">
            <ul class="repaymentFour_a"> 
                <li><i>合同编号:</i>{{ cont_no }}</li>
                <li><i>借据编号:</i>{{ loan_no }}</li>
                <li><i>期数:</i>{{ ps_perd_no }}</li>
                <li><i>还款日:</i>{{ ps_due_dt }}</li>
                <div class="clearfix"> </div>
            </ul>
            <ul class="repaymentFour_b"> 
                <li>应还总额:{{ ps_instm_amt | format-amount 2 }}元</li>
                <li>已还总额:{{ setl_instm_amt | format-amount 2 }}元</li>
                <li>应还本金:{{ ps_prcp_amt | format-amount 2 }}元</li>
                <li>已还本金:{{ setl_prcp | format-amount 2 }}元</li>
                <li>应还利息:{{ ps_norm_int | format-amount 2 }}元</li>
                <li>已还利息:{{ setl_norm_int | format-amount 2 }}元</li>
                <li v-show="ps_od_int_amt != 0">应还罚息:{{ ps_od_int_amt | format-amount 2 }}元</li>
                <li>已还罚息:{{ setl_od_int_amt | format-amount 2 }}元</li>
                <li>还款状态:{{ ps_sts | dict "ps_stsDa"}}</li>
                <li><a v-on:click="goInfo">费用明细</a></li>
                <div class="clearfix"> </div>
            </ul>
            <input type="button" value="关闭" onclick="history.go(-1)">
            <div class="clearfix"> </div>
        </div> 
    </div> 
</div>