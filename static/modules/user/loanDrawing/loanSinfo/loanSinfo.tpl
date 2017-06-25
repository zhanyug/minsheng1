<div class="bg" transition="zoom" transition-mode="out-in">
    <c-header title="我要提款"></c-header>
    <div class="mui-content content">
        <c-loading v-show="view.isLoading"></c-loading>
		<div class="ForgotPassword_login-form" v-show="!view.isLoading">
    		<p style="font-size:1.3em">{{eduName}}</p>
			<ul class="drawMoneyFive_a"> 
				<li><i>申请人:</i>{{cust_name}}</li>
                <li><i>身份证号:</i>{{id_no}}</li>
                <li><i>额度:</i>{{loan_amt | format-amount 2}}</li>
                <li><i>已用额度:</i>{{used_amt | format-amount 2}}</li>
                <li><i>可用额度:</i>{{avail_amt | format-amount 2}}</li>
                <li><i>日利率:</i>{{day_int_rat}}</li>
                <li><i>提款类型:</i>{{chargeoff_ind| dict 'chargeoff_ind'}}<a v-on:click="goMingxi">提款明细</a></li>
                <li><i>提款卡号:</i>{{fk_card_no}}…({{fk_card_bankname}})</li>
                <li><i>还款卡号:</i>{{hk_card_no}}…({{hk_card_bankname}})</li>
                <li><i>审批日起:</i>{{sign_dt}}</li>
                <li><i>有效期至:</i>{{sign_end_dt}}</li>
                <div class=" clearfix"> </div>
			</ul>                                
            <input type="button" value="提一笔" v-on:click="toDrawing" >	
            <div class="clearfix"> </div>
		</div> 
	</div> 
</div>