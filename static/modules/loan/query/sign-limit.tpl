<div class="bg" transition="zoom" transition-mode="out-in">
	<c-header title="立即签约"></c-header>
    <div class="mui-content content">
        <div class="noticeOne_img aimg4">
            <div class="noticeFour_wir"> 
                <ul> 
                    <li>您的额度(元)</li>
                    <li v-text="limit | format-amount 2"></li>
                </ul>
                <div class="clear"> </div>
            </div>
            <input type="button" value="立即签约" v-on:click="agreeActivate">	
            <div class="noticeFour_wiy"> 
                <ul> 
                    <li>借款一万元，利息低至1.5元/天</li>
                    <li>提前预授信，额度循环用</li>
                    <li>随借随还，线上操作更方便</li>
                </ul>
                <div class="clear"> </div>
            </div> 
            <div class="clearfix"> </div>
        </div> 
    </div> 
</div>