<div class="bg" transition="zoom" transition-mode="out-in">
    <c-header title="我要提款"></c-header>
    <div class="mui-content content">
        <div class="ForgotPassword_login-form">
            <div class="drawMoneyFour_card">
         	    <p v-text="loanName"></p>
                <div v-if="items == null || items.length == 0" style="margin: 1rem 0 0 0;color: #888;">此处空空如也，赶快提款吧！</div>
                <ul class="drawMoneyFour_a" v-for="item in items">
            	    <li><i>￥{{ item.detail_amt | format-amount 2}}</i><span>提款金额</span></li>
                    <li><span v-text="item.detail_time"></span><span>提款日期</span></li>
                    <li> <span class="glyphicon glyphicon-ok-sign" v-bind:class="{'blue':item.settl_type=='SETL'}"></span><span>{{ item.settl_type | dict "settl_typeDa"}}</span></li>
                    <div class="clearfix"></div>
                </ul>
                <div class="clearfix"></div>
       	    </div>
    		<input type="button" value="返回" onclick="history.go(-1)">
        </div>
	</div> 
</div>