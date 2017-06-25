<div class="bg" transition="zoom" transition-mode="out-in">
	<c-header title="费用明细"></c-header>
    <div class="mui-content content">
        <div class="repaymentThree_hi">
            <div v-html="tips"></div>
            <ul class="repaymentThree_a" v-for="item in items"> 
                <li><span class="glyphicon glyphicon-yen"></span>费用类型 :    {{ item.fee_typ | dict 'fee_typData' }}</li>
                <li>应还费用 :{{ item.ps_fee_amt | format-amount 2 }} 元</li>
                <li>已还费用 :{{ item.setl_fee_amt | format-amount 2 }} 元</li>
                <div class=" clearfix"> </div>
            </ul>
            <input type="button" value="关闭" onclick="window.history.go(-1)">	
            <div class="clearfix"> </div>
        </div> 
    </div>  
</div>