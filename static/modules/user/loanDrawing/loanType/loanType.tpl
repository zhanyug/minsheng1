<div class="bg" transition="zoom" transition-mode="out-in">
    <c-header title="我要提款" v-bind:ln-link="'/user/index'"></c-header>
    <div class="mui-content content">
        <!-- modal -->
        <div id="m-loan-repay-list" class="drawMoneyThree_card">
            <ul class="drawMoneyThree_a" v-for="item in items" v-on:click="toLoanSinfo(item.appl_cde+'#'+item.loan_typ_desc,item.loan_typ)">
                <h3>{{ item.loan_typ_desc }}</h3>
                <li><i>￥{{ item.avail_amt | format-amount 2 }}</i><span>可用余额</span></li>
                <li><span>{{ item.sign_end_dt }}</span><span>有效时间</span></li>
                <li> <p class="mui-icon mui-icon-forward"></p></li>
                <div class="clearfix"></div>
            </ul>
            <div class="clearfix"></div>
        </div>
    </div> 
</div>