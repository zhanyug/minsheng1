<div class="bg" transition="zoom" transition-mode="out-in">
	<c-header title="支持还款银行" v-bind:ln-link="'/user/index'"></c-header>
    <div class="mui-content content">
   		<div class="zyxf_bg">
   			<!--二级菜单-->
        	<input type="text" placeholder="请输入银行卡名称" v-model="bankName" class="zyxf_bg_inp">
        	<!-- content begin  -->
	      	<div id="m-bank-list">
				<ul class="zyxf_bg_butt">
	           		<li v-for="item in bankLimitList" data-code="{{ item.accBankCde }}" data-index="{{ $index }}" v-on:tap="">{{ item.accBankName }}<span v-show="false">点击查询</span></li>
	        	</ul>
	        	<div class="clearfix"></div>
	    	</div>
   		</div>
	   	<div class="zyxf_bg_dis" v-show="isDetailsShow">
	   		<dl>
	        	 <dt v-text="details.accBankName"></dt>
	             <dd>单笔扣款限额：<span v-text="details.deductFre | format-amount 2"></span></dd>
	             <dd>单日扣款限额：<span v-text="details.deductDay | format-amount 2"></span></dd>
	             <dd>单笔支付限额：<span v-text="details.payFre | format-amount 2"></span></dd>
	             <dd>单日支付限额：<span v-text="details.payDay | format-amount 2"></span></dd>
	        </dl>
	   	</div>
    </div>
</div>
